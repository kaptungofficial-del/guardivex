import type { CommandAction } from "@guardivex/shared"
import type { AccessControlAdapter, AlarmPanelAdapter, CameraNvrAdapter, NetworkSwitchAdapter, SafeAdapterCommandResult } from "./types.js"

function mockResult(action: CommandAction, targetId: string): SafeAdapterCommandResult {
  return {
    accepted: false,
    action,
    targetId,
    message: "Mock adapter recorded the request only. Hardware execution is disabled until RBAC, policy, approval, audit, and executor controls approve a real adapter.",
  }
}

export class MockAccessControlAdapter implements AccessControlAdapter {
  async requestMomentaryUnlock(doorId: string) {
    return mockResult("door.unlock.momentary", doorId)
  }

  async requestLockdown(doorId: string) {
    return mockResult("door.lockdown", doorId)
  }
}

export class MockAlarmPanelAdapter implements AlarmPanelAdapter {
  async requestArm(panelId: string) {
    return mockResult("alarm.arm", panelId)
  }

  async requestDisarm(panelId: string) {
    return mockResult("alarm.disarm", panelId)
  }
}

export class MockNetworkSwitchAdapter implements NetworkSwitchAdapter {
  async requestPortDisable(switchId: string, portId: string) {
    return mockResult("switch.port.disable", `${switchId}:${portId}`)
  }

  async requestPortEnable(switchId: string, portId: string) {
    return mockResult("switch.port.enable", `${switchId}:${portId}`)
  }
}

export class MockCameraNvrAdapter implements CameraNvrAdapter {
  async requestSync(deviceId: string) {
    return mockResult("device.sync", deviceId)
  }

  async requestConnectionTest(deviceId: string) {
    return mockResult("device.test_connection", deviceId)
  }
}
