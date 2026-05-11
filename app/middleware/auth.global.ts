export default defineNuxtRouteMiddleware(async (to) => {
	// Public routes
	if (to.path === '/login' || to.path === '/confirm') return

	const supabase = useSupabaseClient()

	// getSession() will return the current session if tokens exist (incl. SSR cookies)
	const { data, error } = await supabase.auth.getSession()

	if (error) {
		// If session lookup fails, treat as unauthenticated
		return navigateTo('/login')
	}

	if (!data.session) {
		return navigateTo('/login')
	}
})
