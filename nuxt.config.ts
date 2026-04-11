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
      htmlAttrs: {
        lang: 'es'
      },
      title: 'Modo Fit - Tu Tienda de Suplementos Deportivos',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Compra suplementos deportivos, proteínas, creatinas y productos saludables al mejor precio en Modo Fit. Mejora tu rendimiento físico hoy.' },
        { name: 'format-detection', content: 'telephone=no' },
        
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://ifit-mx12.onrender.com/' }, // Update with your actual domain
        { property: 'og:title', content: 'Modo Fit - Tu Tienda de Suplementos Deportivos' },
        { property: 'og:description', content: 'Compra suplementos deportivos, proteínas, creatinas y productos saludables al mejor precio en Modo Fit.' },
        { property: 'og:image', content: '/favicon.png' }, // Consider using a larger cover image like /og-image.jpg
        
        // Twitter
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: 'https://ifit-mx12.onrender.com/' },
        { property: 'twitter:title', content: 'Modo Fit - Tu Tienda de Suplementos Deportivos' },
        { property: 'twitter:description', content: 'Compra suplementos deportivos, proteínas, creatinas y productos saludables al mejor precio en Modo Fit.' },
        { property: 'twitter:image', content: '/favicon.png' }
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
