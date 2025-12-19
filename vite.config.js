import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        outDir: 'lib',
        lib: {
            entry: path.resolve(__dirname, 'src/components/index.ts'),
            name: 'uranUI',
            fileName: "uran-ui"
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                exports: 'named',
                globals: {
                    vue: 'Vue'
                }
            },
        },
        minify: 'terser', // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
        terserOptions: {
            compress: {
                /* (default: false) -- Pass true to discard calls to console.* functions.
                  If you wish to drop a specific function call such as console.info and/or
                  retain side effects from function arguments after dropping the function
                  call then use pure_funcs instead
                */
                drop_console: true, // 生产环境时移除console
                drop_debugger: true
            },
            format: {
                comments: false // 删除注释comments
            }
        }
    },
});
