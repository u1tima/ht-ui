<script setup lang="ts">
	import type { NavigationMenuItem } from '@nuxt/ui';

	const links: NavigationMenuItem[] = [
		{
			label: 'General',
			icon: 'i-lucide-user',
			to: '/settings',
			exact: true,
		},
		{
			label: 'Telegram',
			icon: 'i-lucide-bell',
			to: '/settings/telegram',
		},
		{
			label: 'Security',
			icon: 'i-lucide-shield',
			to: '/settings/security',
		},
	];
</script>

<template>
	<UDashboardPanel>
		<template v-slot:header>
			<UDashboardNavbar title="Settings" />
			<UDashboardToolbar>
				<UNavigationMenu :items="links"
								 highlight
								 class="flex-1" />
			</UDashboardToolbar>
		</template>
		<template v-slot:body>
			<div class="flex flex-col gap-4 sm:gap-6 lg:gap-12 w-full lg:max-w-2xl mx-auto">
				<NuxtPage />
			</div>
		</template>
	</UDashboardPanel>
</template>
