// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-gtag'
  ],
  gtag: {
    id: 'G-YZ7EDV3NNV',
  },
  css: [
    '@/assets/css/tailwind.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  build: {
    transpile: ['@fortawesome/vue-fontawesome', 'swiper']
  },
  app: {
    head: {
      title: 'Modo Fit - Tu Tienda de Suplementos',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Compra suplementos y productos saludables al mejor precio en Modo Fit.' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap' }
      ]
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.VUE_APP_API_URL || 'https://ifit-mx12.onrender.com'
    }
  }
})
