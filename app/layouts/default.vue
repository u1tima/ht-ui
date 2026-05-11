<script setup lang="ts">
	import type { NavigationMenuItem } from '@nuxt/ui'

	const supabase = useSupabaseClient();
	const open = ref(false);
	const logout = async () => {
		await supabase.auth.signOut();

		navigateTo('/login');
	}

	const links = [
		{
			label: 'Dashboard',
			to: '/',
			icon: 'i-lucide-layout-dashboard'
		},
		{
			label: 'Exchanges',
			to: '/exchanges',
			icon: 'i-lucide-arrow-right-left'
		},
		{
			label: 'Webhooks',
			to: '/webhooks',
			icon: 'i-lucide-webhook'
		},
		{
			label: 'Orders',
			to: '/orders',
			icon: 'i-lucide-list-ordered',
		},
		{
			label: 'Bots',
			to: '/bots',
			icon: 'i-lucide-bot',
		},
		{
			label: 'Logs',
			to: '/logs',
			icon: 'i-lucide-logs',
		},
		{
			label: 'Settings',
			to: '/settings',
			icon: 'i-lucide-settings',
			defaultOpen: true,
			type: 'trigger',
			// children: [{
			// 	label: 'General',
			// 	to: '/settings',
			// 	exact: true,
			// 	onSelect: () => {
			// 		open.value = false
			// 	}
			// }, {
			// 	label: 'Members',
			// 	to: '/settings/members',
			// 	onSelect: () => {
			// 		open.value = false
			// 	}
			// }, {
			// 	label: 'Notifications',
			// 	to: '/settings/notifications',
			// 	onSelect: () => {
			// 		open.value = false
			// 	}
			// }, {
			// 	label: 'Security',
			// 	to: '/settings/security',
			// 	onSelect: () => {
			// 		open.value = false
			// 	}
			// }]
		},
		{
			label: 'Logout',
			icon: 'i-lucide-log-out',
			onSelect: logout,
		},
	] as NavigationMenuItem[]
</script>

<template>
	<UDashboardGroup unit="rem">
		<UDashboardSidebar id="default"
						   v-model:open="open"
						   class="bg-elevated/25"
						   :ui="{ footer: 'lg:border-t lg:border-default' }">
			<template #default="{ collapsed }">
				<UNavigationMenu :collapsed="collapsed"
								 :items="links"
								 orientation="vertical"
								 tooltip
								 popover />
			</template>
		</UDashboardSidebar>
		<slot />
	</UDashboardGroup>
</template>