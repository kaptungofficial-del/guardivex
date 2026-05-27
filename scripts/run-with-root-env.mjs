import { existsSync, readFileSync } from "node:fs"
import { spawn } from "node:child_process"
import { resolve } from "node:path"
import { fileURLToPath } from "node:url"

const repoRoot = resolve(fileURLToPath(new URL("..", import.meta.url)))
const envPath = resolve(repoRoot, ".env")

if (existsSync(envPath)) {
  const lines = readFileSync(envPath, "utf8").split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue

    const separatorIndex = trimmed.indexOf("=")
    if (separatorIndex === -1) continue

    const key = trimmed.slice(0, separatorIndex).trim()
    let value = trimmed.slice(separatorIndex + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    process.env[key] ??= value
  }
}

const [command, ...args] = process.argv.slice(2)
if (!command) {
  console.error("Usage: node scripts/run-with-root-env.mjs <command> [...args]")
  process.exit(1)
}

function resolveCommand(commandName) {
  const localBinary = resolve(repoRoot, "node_modules", ".bin", commandName)
  if (process.platform === "win32") {
    const localWindowsBinary = `${localBinary}.cmd`
    if (existsSync(localWindowsBinary)) return localWindowsBinary
  }

  if (existsSync(localBinary)) return localBinary

  return commandName
}

function quoteCommandArgument(value) {
  if (!/[\s"&()<>^|]/.test(value)) return value
  return `"${value.replace(/"/g, '\\"')}"`
}

const commandPath = resolveCommand(command)
const childCommand = process.platform === "win32" ? process.env.ComSpec ?? "cmd.exe" : commandPath
const childArgs =
  process.platform === "win32"
    ? ["/d", "/s", "/c", [commandPath, ...args].map(quoteCommandArgument).join(" ")]
    : args

const child = spawn(childCommand, childArgs, {
  cwd: process.cwd(),
  env: process.env,
  stdio: "inherit",
})

child.on("error", (error) => {
  console.error(`Failed to start ${command}: ${error.message}`)
  process.exit(1)
})

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }
  process.exit(code ?? 1)
})
