import { mergeDeepRight } from 'ramda'
import plugin from 'tailwindcss/plugin'
import type { Config, PluginCreator } from 'tailwindcss/types/config'

import { assertTailwindPluginsCollection } from './identity'
import type { TailwindPlugin } from './types'
import { isObject } from '@peterek/helpers'

const mergeAllConfigs = (...args: Partial<Config>[]) => args.reduce(mergeDeepRight, {})

export function pluginsCollection(plugins: TailwindPlugin[]) {
  assertTailwindPluginsCollection(plugins)

  return plugin(
    function (this: PluginCreator, ...args) {
      plugins.forEach(({ handler }) => {
        handler.apply(this, args)
      })
    },
    mergeAllConfigs(...plugins.map((p): Partial<Config> | undefined => p.config).filter(isObject))
  )
}
