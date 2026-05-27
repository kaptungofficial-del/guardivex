import { getReadOnlyAdapter } from "@guardivex/adapters"
import { createStructuredWorker, queueNames } from "@guardivex/queues"
import { vendorRawEventSchema } from "@guardivex/shared"
import { env } from "../config/env.js"
import { processAlertFanout, processDeviceHeartbeat } from "./alert-evaluator.worker.js"
import { processCommandExecution } from "./command-executor.worker.js"
import { processNormalizedEvent } from "./event-processor.worker.js"

export function startPhase2Workers() {
  const redisUrl = env.REDIS_URL

  return [
    createStructuredWorker(queueNames.eventIngestion, async (job) => {
      const rawEvent = vendorRawEventSchema.parse(job.data)
      const adapter = getReadOnlyAdapter(rawEvent.sourceVendor)
      if (!adapter) throw new Error(`No read-only adapter for ${rawEvent.sourceVendor}`)
      return adapter.ingestEvent(rawEvent)
    }, { redisUrl }),

    createStructuredWorker(queueNames.eventProcessing, processNormalizedEvent, { redisUrl }),

    createStructuredWorker(queueNames.auditWrites, async (job) => job.data, { redisUrl }),
    createStructuredWorker(queueNames.notifications, async (job) => job.data, { redisUrl }),
    createStructuredWorker(queueNames.aiAnalysis, async (job) => job.data, { redisUrl }),
    createStructuredWorker(queueNames.commandReview, async (job) => job.data, { redisUrl }),
    createStructuredWorker(queueNames.commandExecution, processCommandExecution, { redisUrl }),
    createStructuredWorker(queueNames.alertFanout, processAlertFanout, { redisUrl }),
    createStructuredWorker(queueNames.deviceHeartbeat, processDeviceHeartbeat, { redisUrl }),
  ]
}
