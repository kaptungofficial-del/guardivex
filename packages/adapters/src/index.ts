export * from "./types.js"
export * from "./base.js"
export * from "./mock-control-adapters.js"
export * from "./mercury/index.js"
export * from "./cisco/index.js"
export * from "./iq4/index.js"
export * from "./2gig/index.js"

import type { SourceVendor } from "@guardivex/shared"
import type { ReadOnlyHardwareAdapter } from "./types.js"
import { MercuryReadOnlyAdapter } from "./mercury/index.js"
import { CiscoReadOnlyAdapter } from "./cisco/index.js"
import { IQ4ReadOnlyAdapter } from "./iq4/index.js"
import { TwoGigReadOnlyAdapter } from "./2gig/index.js"

const registry: Record<SourceVendor, ReadOnlyHardwareAdapter | undefined> = {
  mercury: new MercuryReadOnlyAdapter(),
  cisco: new CiscoReadOnlyAdapter(),
  iq4: new IQ4ReadOnlyAdapter(),
  "2gig": new TwoGigReadOnlyAdapter(),
  guardivex: undefined,
  unknown: undefined,
}

export function getReadOnlyAdapter(vendor: SourceVendor) {
  return registry[vendor]
}

export function listReadOnlyAdapters() {
  return Object.values(registry).filter((adapter): adapter is ReadOnlyHardwareAdapter => Boolean(adapter))
}
