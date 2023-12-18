/**
 * plugins/index.js
 *
 * Automatically included in `./resources/app.js`
 */

// Plugins
import { loadFonts } from '@/plugins/webfontloader'
import vuetify from '@/plugins/vuetify'
import pinia from '@/store'
import router from '@/router'

export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
}
