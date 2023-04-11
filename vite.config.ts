import dotenv from 'dotenv';
import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { resolve } from 'path';
import typescript from '@rollup/plugin-typescript';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import dts from 'vite-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig(() => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return {
    // @xxx Vite issue https://github.com/btd/rollup-plugin-visualizer/issues/124#issuecomment-1221295477
    plugins: [
      react(),
      visualizer() as PluginOption,
      ViteMinifyPlugin({}),
      dts({
        insertTypesEntry: true,
      }),
    ],
    define: isDevelopment ? { 'process.env': process.env } : undefined,
    server: {
      port: 8081,
      open: true,
      strictPort: true,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    build: {
      sourcemap: true,
      manifest: true,
      minify: true,
      reportCompressedSize: true,
      rollupOptions: {
        external: [],
        plugins: [
          typescriptPaths({
            preserveExtensions: true,
          }),
          typescript({
            sourceMap: false,
            declaration: true,
            outDir: 'dist',
          }),
          // adding libraries peerDependencies to the external configuration
          peerDepsExternal(),
        ],
      },
      lib: {
        // entry: resolve(__dirname, "src/lib/index.tsx"),
        // fileName: "index",
        // formats: ["es", "cjs"],

        // ignore all other components
        // https://vitejs.dev/guide/build.html#library-mode
        entry: resolve(__dirname, 'src/lib/Me.tsx'),
        name: 'Me',
        formats: ['es', 'cjs'],
        fileName: 'Me',
      },
    },
  };
});
