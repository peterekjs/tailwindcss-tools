import { isFilledArray } from '@peterek/helpers'
import type { DeepNonNullable } from 'ts-essentials'
import { assertTailwindPluginsCollection } from './identity'
import type { TailwindPlugin } from './types'

type Plugin = DeepNonNullable<TailwindPlugin>
type PluginConfig = DeepNonNullable<Plugin['config']>
type PluginContent = DeepNonNullable<PluginConfig['content']>
type PluginSafelist = DeepNonNullable<PluginConfig['safelist']>

export function useTailwindPlugins(input: TailwindPlugin[]) {
  assertTailwindPluginsCollection(input)

  const plugins: TailwindPlugin[] = []
  const content: PluginContent = []
  const safelist: PluginSafelist = []

  input.forEach(plugin => {
    plugins.push(plugin)

    const _content = plugin.config?.content
    if (isFilledArray(_content)) {
      _content.forEach(i => {
        if (i) content.push(i)
      })
    }

    const _safelist = plugin.config?.safelist
    if (isFilledArray(_safelist)) {
      _safelist.forEach(i => {
        if (i) safelist.push(i)
      })
    }
  })

  return {
    plugins,
    content,
    safelist
  }
}
