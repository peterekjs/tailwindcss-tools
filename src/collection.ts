import { mergeDeepRight } from 'ramda'
import plugin from 'tailwindcss/plugin'

import { assertTailwindPluginsCollection } from './identity'
import type { TailwindPlugin } from './types'
import { isObject } from '@peterek/helpers'

const mergeAll = (...args) => args.reduce(mergeDeepRight, {})

export function pluginsCollection(plugins: TailwindPlugin[]) {
  assertTailwindPluginsCollection(plugins)

  return plugin(
    function (...args) {
      plugins.forEach(({ handler }) => {
        handler.apply(this, args)
      })
    },
    mergeAll(...plugins.map((p) => p.config).filter(isObject))
  )
}
