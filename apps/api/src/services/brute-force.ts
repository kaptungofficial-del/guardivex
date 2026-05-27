interface AttemptBucket {
  count: number
  firstAttemptAt: number
  lockedUntil?: number
}

const buckets = new Map<string, AttemptBucket>()
const windowMs = 15 * 60 * 1000
const maxAttempts = 8
const lockMs = 15 * 60 * 1000

function keyFor(email: string, ipAddress: string) {
  return `${email.toLowerCase()}:${ipAddress}`
}

export function assertLoginAllowed(email: string, ipAddress: string) {
  const key = keyFor(email, ipAddress)
  const bucket = buckets.get(key)
  const now = Date.now()
  if (!bucket) return
  if (bucket.lockedUntil && bucket.lockedUntil > now) {
    throw Object.assign(new Error("Too many failed login attempts. Try again later."), { statusCode: 429 })
  }
  if (now - bucket.firstAttemptAt > windowMs) {
    buckets.delete(key)
  }
}

export function recordLoginAttempt(email: string, ipAddress: string, success: boolean) {
  const key = keyFor(email, ipAddress)
  if (success) {
    buckets.delete(key)
    return
  }

  const now = Date.now()
  const current = buckets.get(key)
  const bucket = current && now - current.firstAttemptAt <= windowMs ? current : { count: 0, firstAttemptAt: now }
  bucket.count += 1
  if (bucket.count >= maxAttempts) bucket.lockedUntil = now + lockMs
  buckets.set(key, bucket)
}
