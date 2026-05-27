import type { CommandRequest } from "@guardivex/database"

export interface CommandExecutionResult {
  status: "queued" | "failed"
  executor: string
  responsePayload: Record<string, unknown>
  errorMessage?: string
}

export async function executeApprovedCommand(command: CommandRequest): Promise<CommandExecutionResult> {
  return {
    status: "failed",
    executor: "safe-null-executor",
    responsePayload: {
      commandId: command.id,
      action: command.action,
      hardwareControlEnabled: false,
    },
    errorMessage: "No live hardware executor is configured. This Phase 1 backend records approved commands but never controls physical hardware.",
  }
}
