// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    rootId: 'mtp-app',
    rootTag: 'mtp-main',
    baseURL: '/',
    buildAssetsDir: '_mtp',
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      htmlAttrs: {
        // This sets the initial theme (will update based on the user's preferences)
        class: 'light'
      },
      title: 'My Test Project Nuxt 3',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'My amazing Nuxt 3 app' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  modules:['@nuxt/ui','@nuxtjs/color-mode'],
  components: true,
  css: ['~/assets/styles/main.css','~/assets/styles/tailwind.css','@/assets/styles/global.scss'],

  colorMode: {
    preference: 'system', // Use system preference or 'light' / 'dark'
    fallback: 'light',    // Fallback to 'light' if system preference is not available
    classSuffix: '',      // No suffix added to classes (use 'dark' or 'light' on <html>)
    storageKey: 'nuxt-color-mode' // Storage key for the user's color mode preference
  },  
})
