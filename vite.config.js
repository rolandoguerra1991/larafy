import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import fs from 'node:fs';

const host = 'larafy.test';

export default defineConfig({
    server: {
        host,
        hmr: { host },
        https: {
            key: fs.readFileSync(`C:/laragon/etc/ssl/laragon.key`),
            cert: fs.readFileSync(`C:/laragon/etc/ssl/laragon.crt`),
        },
    },
    plugins: [
        laravel({
            input: ['resources/js/app.js'],
            refresh: true,
        }),
        vue({
            template: { transformAssetUrls }
        }),
        // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
        vuetify({
            autoImport: true,
            styles: {
                configFile: 'resources/scss/app.scss',
            },
        }),
    ],
    resolve: {
        alias: {
            '@': '/resources/js'
        },
        extensions: [
            '.js',
            '.json',
            '.ts',
            '.vue',
        ],
    },
});
