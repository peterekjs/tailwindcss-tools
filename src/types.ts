import plugin from 'tailwindcss/plugin'
import type { ContentConfig } from 'tailwindcss/types/config'

export type TailwindPlugin = ReturnType<typeof plugin>
export type PluginContent = ContentConfig & {}
