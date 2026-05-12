// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: [
		'@nuxt/ui',
		'@nuxtjs/supabase',
	],
	css: ['~/assets/css/main.css'],

	runtimeConfig: {
		public: {
			// Set to production URL on Vercel, localhost locally
			siteUrl: process.env.NODE_ENV === 'production'
				? 'https://ht-ui.vercel.app/'
				: 'http://localhost:3000'
		},
	},

	ui: {
		theme: {
			defaultVariants: {
				color: 'secondary',
			}
		},
	}
})
