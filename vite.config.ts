import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { getExternals } from '@peterek/rollup-externals'
import { dependencies, peerDependencies } from './package.json'

console.log()

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'tailwindcss-tools',
      formats: ['cjs', 'es']
    },
    rollupOptions: {
      external: getExternals(dependencies, peerDependencies)
    },
    sourcemap: true,
    target: 'esnext',
    minify: true
  },
  plugins: [dts()]
})
