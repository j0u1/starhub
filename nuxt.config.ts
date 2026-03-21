import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    viewTransition: true,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
    },
  },
  modules: ['@nuxt/image'],
})
