import { Queue, Worker, type JobsOptions, type Processor } from "bullmq"
import { Redis } from "ioredis"
import pino, { type Logger } from "pino"
import type { NormalizedEvent, VendorRawEvent } from "@guardivex/shared"

export const queueNames = {
  eventIngestion: "event-ingestion",
  eventProcessing: "event-processing",
  auditWrites: "audit-writes",
  notifications: "notifications",
  aiAnalysis: "AI-analysis",
  commandReview: "command-review",
} as const

export type QueueName = (typeof queueNames)[keyof typeof queueNames]
export type DeadLetterQueueName = `${QueueName}:dead-letter`

export interface QueuePayloads {
  [queueNames.eventIngestion]: VendorRawEvent
  [queueNames.eventProcessing]: NormalizedEvent
  [queueNames.auditWrites]: Record<string, unknown>
  [queueNames.notifications]: { tenantId: string; channel: "email" | "sms" | "push" | "webhook"; subject: string; body: string; metadata?: Record<string, unknown> }
  [queueNames.aiAnalysis]: { tenantId: string; incidentId?: string; eventIds?: string[]; promptType: "incident_summary" | "alert_correlation" | "anomaly_detection" | "draft_recommendation" }
  [queueNames.commandReview]: { tenantId: string; commandRequestId: string; requestedById: string; action: string }
}

export interface QueueRuntimeOptions {
  redisUrl: string
  logger?: Logger
}

export const defaultJobOptions: JobsOptions = {
  attempts: 5,
  backoff: { type: "exponential", delay: 1000 },
  removeOnComplete: { age: 60 * 60 * 24, count: 5000 },
  removeOnFail: false,
}

export function createRedisConnection(redisUrl: string) {
  return new Redis(redisUrl, { maxRetriesPerRequest: null })
}

export function createQueue<T extends QueueName>(name: T, options: QueueRuntimeOptions) {
  return new Queue<QueuePayloads[T], unknown, string>(name, {
    connection: createRedisConnection(options.redisUrl),
    defaultJobOptions,
  })
}

export async function enqueue<T extends QueueName>(name: T, payload: QueuePayloads[T], options: QueueRuntimeOptions) {
  const queue = createQueue(name, options)
  try {
    return await queue.add(String(name) as never, payload as never)
  } finally {
    await queue.close()
  }
}

export function createDeadLetterQueue<T extends QueueName>(name: T, options: QueueRuntimeOptions) {
  return new Queue<QueuePayloads[T], unknown, string>(`${name}:dead-letter`, {
    connection: createRedisConnection(options.redisUrl),
    defaultJobOptions: { attempts: 1, removeOnComplete: false, removeOnFail: false },
  })
}

export function createStructuredWorker<T extends QueueName>(name: T, processor: Processor<QueuePayloads[T]>, options: QueueRuntimeOptions) {
  const logger = options.logger ?? pino({ name: `guardivex-worker-${name}` })
  const connection = createRedisConnection(options.redisUrl)
  const deadLetterQueue = createDeadLetterQueue(name, options)
  const worker = new Worker<QueuePayloads[T], unknown, string>(name, processor, { connection, concurrency: 5 })

  worker.on("active", (job) => logger.info({ queue: name, jobId: job.id, attemptsMade: job.attemptsMade }, "queue job active"))
  worker.on("completed", (job) => logger.info({ queue: name, jobId: job.id }, "queue job completed"))
  worker.on("failed", async (job, error) => {
    logger.error({ queue: name, jobId: job?.id, attemptsMade: job?.attemptsMade, error }, "queue job failed")
    if (job && job.attemptsMade >= (job.opts.attempts ?? defaultJobOptions.attempts ?? 1)) {
      await deadLetterQueue.add(`${String(name)}:dead-letter` as never, job.data as never, { attempts: 1, removeOnComplete: false, removeOnFail: false })
      logger.error({ queue: name, jobId: job.id }, "queue job moved to dead-letter")
    }
  })

  return worker
}
