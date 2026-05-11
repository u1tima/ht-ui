<script lang="ts" setup>
	import type { TableColumn } from '@nuxt/ui'
	import type { IBot } from '~~/types';
	import AddBotDialog from '~/components/bots/add-bot-dialog.vue';

	const data = ref<IBot[]>([
		{
			id: 'test1',
			name: 'BOT-NAME-NmYb50',
			pair: 'BTCUSDT(1x)',
			exchange: 'Binance Futures (USDT-M)',
			status: 'Active',
			enabled: true,
			totalPl: '$0.00'
		},
		{
			id: 'test2',
			name: 'BOT-NAME-NmYb50',
			pair: 'BTCUSDT(1x)',
			exchange: 'Binance Futures (USDT-M)',
			status: 'Active',
			enabled: true,
			totalPl: '$0.00'
		},
	])

	const columns: TableColumn<IBot>[] = [
		{
			accessorKey: 'name',
			header: 'Name'
		},
		{
			accessorKey: 'exchange',
			header: 'Exchange'
		},
		{
			accessorKey: 'pair',
			header: 'Pair'
		},
		{
			accessorKey: 'totalPl',
			header: 'Total / Pl'
		},
		{
			accessorKey: 'status',
			header: 'Status'
		},
		{
			id: 'enabled',
			header: 'Enabled'
		},
		{
			id: 'actions',
			header: 'Actions',
		},
	];
</script>

<template>
	<UDashboardPanel id="bots">
		<template #header>
			<UDashboardNavbar title="Bots">
				<template #right>
					<AddBotDialog />
				</template>
			</UDashboardNavbar>
		</template>
		<template #body>
			<UTable :data="data"
					:columns="columns">
				<template #enabled-cell="{ row }">
					<USwitch />
				</template>
				<template #actions-cell="{ row }">
					<div class="flex gap-2">
						<UTooltip text="Edit">
							<UButton icon="i-lucide-edit"
									 variant="ghost" />
						</UTooltip>
						<UTooltip text="Copy">
							<UButton icon="i-lucide-copy"
									 variant="ghost" />
						</UTooltip>
						<UTooltip text="Start">
							<UButton icon="i-lucide-circle-play"
									 variant="ghost" />
						</UTooltip>
						<UTooltip text="Pause">
							<UButton icon="i-lucide-circle-pause"
									 variant="ghost" />
						</UTooltip>
						<UTooltip text="Details">
							<UButton icon="i-lucide-info"
									 variant="ghost" />
						</UTooltip>
					</div>
				</template>
			</UTable>
		</template>
	</UDashboardPanel>
</template>