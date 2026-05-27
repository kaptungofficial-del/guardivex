import { useEffect, useState } from "react"

type SetValue<T> = T | ((current: T) => T)

const STORAGE_EVENT = "sentinelgrid:storage-change"

function readStoredValue<T>(key: string, initialValue: T): T {
  if (typeof window === "undefined") {
    return initialValue
  }

  try {
    const rawValue = window.localStorage.getItem(key)
    if (rawValue === null) {
      return initialValue
    }

    return JSON.parse(rawValue) as T
  } catch {
    return initialValue
  }
}

export function usePersistentKV<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => readStoredValue(key, initialValue))

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    if (window.localStorage.getItem(key) === null) {
      window.localStorage.setItem(key, JSON.stringify(initialValue))
    }
  }, [initialValue, key])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const syncValue = (updatedKey: string) => {
      if (updatedKey !== key) {
        return
      }

      setValue(readStoredValue(key, initialValue))
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key) {
        syncValue(event.key)
      }
    }

    const handleCustomEvent = (event: Event) => {
      const storageEvent = event as CustomEvent<{ key?: string }>
      if (storageEvent.detail?.key) {
        syncValue(storageEvent.detail.key)
      }
    }

    window.addEventListener("storage", handleStorage)
    window.addEventListener(STORAGE_EVENT, handleCustomEvent)

    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener(STORAGE_EVENT, handleCustomEvent)
    }
  }, [initialValue, key])

  const updateValue = (nextValue: SetValue<T>) => {
    const resolvedValue = nextValue instanceof Function ? nextValue(readStoredValue(key, initialValue)) : nextValue

    setValue(resolvedValue)

    if (typeof window === "undefined") {
      return
    }

    window.localStorage.setItem(key, JSON.stringify(resolvedValue))
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { key } }))
  }

  return [value, updateValue] as const
}