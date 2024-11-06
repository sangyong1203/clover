import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // 자동 import Element components
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('src/components/')) {
                        return 'components'
                    }
                },
            },
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    css: {
        preprocessorOptions: {
            // to avoid legacy JS Api Deprecation Warning
            scss: {
                api: 'modern-compiler', // or "modern", "legacy"
            },
        },
    },
    // server: {
    //   proxy: {
    //     '/api': {
    //       target: 'http://localhost:8082',
    //       changeOrigin: true,
    //       //   rewrite: path => path.replace(/^\/api/, '')
    //     },
    //     '/batch': {
    //       target: 'http://192.168.0.122:8083',
    //       changeOrigin: true,
    //       //   rewrite: path => path.replace(/^\/api/, '')
    //     },
    //   },
    // },
})
