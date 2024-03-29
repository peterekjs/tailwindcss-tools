import { assertArray, assertFunction, assertObject, isFunction, isObject } from '@peterek/helpers'
import type { TailwindPlugin } from './types'

export function assertTailwindPlugin(value: unknown): asserts value is TailwindPlugin {
  assertObject(value)
  assertFunction(value.handler)
}
export function ensureTailwindPlugin(value: unknown) {
  assertTailwindPlugin(value)
  return value
}
export function isTailwindPlugin(value: unknown): value is TailwindPlugin {
  return isObject(value) && isFunction(value.handler)
}

export function assertTailwindPluginsCollection(value: unknown): asserts value is TailwindPlugin[] {
  assertArray(value)
  if (!value.every(isTailwindPlugin)) {
    throw new TypeError('[tailwindcss-tools] Some items of the plugins collection are not valid tailwind plugins')
  }
}
