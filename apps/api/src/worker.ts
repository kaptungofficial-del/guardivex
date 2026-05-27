import { startPhase2Workers } from "./workers/phase2-workers.js"

const workers = startPhase2Workers()

async function shutdown(signal: NodeJS.Signals) {
  console.log(`Received ${signal}; closing Guardivex workers`)
  await Promise.all(workers.map((worker) => worker.close()))
  process.exit(0)
}

process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)

console.log(`Guardivex worker runtime started with ${workers.length} workers`)