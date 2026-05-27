import type { Permission, RoleName } from "@guardivex/shared"

interface GuardivexCookieOptions {
  httpOnly?: boolean
  secure?: boolean | "auto"
  sameSite?: "lax" | "none" | "strict" | boolean
  path?: string
  maxAge?: number
  expires?: Date
  domain?: string
  signed?: boolean
}

export interface AuthContext {
  userId: string
  tenantId: string
  email: string
  roles: RoleName[]
  permissions: Permission[]
}

declare module "fastify" {
  interface FastifyRequest {
    auth?: AuthContext
    cookies: { [cookieName: string]: string | undefined }
  }

  interface FastifyReply {
    setCookie(name: string, value: string, options?: GuardivexCookieOptions): this
    clearCookie(name: string, options?: GuardivexCookieOptions): this
  }
}
