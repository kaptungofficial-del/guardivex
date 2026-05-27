import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_ENV: z.enum(["dev", "staging", "production"]).default("dev"),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().default("redis://127.0.0.1:6379"),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  COOKIE_SECRET: z.string().min(32),
  REFRESH_COOKIE_NAME: z.string().default("guardivex_refresh"),
  CSRF_COOKIE_NAME: z.string().default("guardivex_csrf"),
  CSRF_REQUIRED: z.coerce.boolean().default(true),
  OTEL_SERVICE_NAME: z.string().default("guardivex-api"),
  CORS_ORIGIN: z.string().default("http://127.0.0.1:5000,http://localhost:5173"),
})

export const env = envSchema.parse(process.env)
export const corsOrigins = env.CORS_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean)
