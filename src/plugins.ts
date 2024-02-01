import { isArray } from '@peterek/helpers'
import { assertTailwindPluginsCollection } from './identity'
import type { PluginContent, TailwindPlugin } from './types'

type Plugin = TailwindPlugin
type PluginConfig = Plugin['config'] & {}
type PluginSafelist = PluginConfig['safelist'] & {}

export function useTailwindPlugins(input: TailwindPlugin[]) {
  assertTailwindPluginsCollection(input)

  const plugins: TailwindPlugin[] = []
  const content: PluginContent = []
  const safelist: PluginSafelist = []

  input.forEach(plugin => {
    plugins.push(plugin)

    const _content: PluginContent | undefined = plugin.config?.content
    if (isArray(_content)) {
      _content.forEach(i => {
        if (i) content.push(i)
      })
    }

    const _safelist = plugin.config?.safelist
    if (isArray(_safelist)) {
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
