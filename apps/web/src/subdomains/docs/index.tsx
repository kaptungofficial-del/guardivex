/**
 * DocsApp — entry point for docs.guardivex.com
 *
 * Thin wrapper: renders the full DocsLayout. URL-hash routing within
 * the docs portal is handled inside DocsLayout itself.
 */

import { DocsLayout } from "./DocsLayout"

export function DocsApp() {
  return <DocsLayout />
}
