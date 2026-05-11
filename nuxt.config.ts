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
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? '',
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
