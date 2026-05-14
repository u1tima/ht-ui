<script setup lang="ts">
	import type { TableColumn } from '@nuxt/ui';

	type PositionStatus = 'open' | 'closed'

	type LivePosition = {
		id: string
		position: string
		avgPrice: string
		maxDrawdown: string
		tp: string
		sl: string
		be: string
		trailing: string
		value: string
		dcaSettings: string
		pnl: string
		roi: string
		statusLabel: string
		status: PositionStatus
	}

	const livePositions: LivePosition[] = [];

	// const liveTabs = [
	// 	{ label: 'Live', value: 'live' as const },
	// 	{ label: 'History', value: 'history' as const },
	// ];

	// type LiveTabValue = (typeof liveTabs)[number]['value']

	// const selectedTab = ref<LiveTabValue>('live');

	const exchangeOptions = ['All exchanges'];
	const pairOptions = ['All pairs'];
	const statusOptions = ['All statuses'];

	const selectedExchange = ref(exchangeOptions[0]);
	const selectedPair = ref(pairOptions[0]);
	const selectedStatus = ref(statusOptions[0]);

	const columns: TableColumn<LivePosition>[] = [
		{ accessorKey: 'position', header: 'Position' },
		{ accessorKey: 'avgPrice', header: 'Avg price' },
		{ accessorKey: 'maxDrawdown', header: 'Max Drawdown' },
		{ accessorKey: 'tp', header: 'TP' },
		{ accessorKey: 'sl', header: 'SL' },
		{ accessorKey: 'be', header: 'BE' },
		{ accessorKey: 'trailing', header: 'Trailing' },
		{ accessorKey: 'value', header: 'Value' },
		{ accessorKey: 'dcaSettings', header: 'DCA settings' },
		{ accessorKey: 'pnl', header: 'P/L' },
		{ accessorKey: 'roi', header: 'ROI' },
		{ accessorKey: 'statusLabel', header: 'Status' },
	];

	// function formatStatus(status: PositionStatus): string {
	// 	return status === 'open' ? 'Open' : 'Closed';
	// }
</script>

<template>
	<UDashboardPanel>
		<template v-slot:header>
			<UDashboardNavbar title="Orders" />
		</template>
		<template v-slot:body>
			<div class="flex flex-col gap-4">
				<div class="flex flex-wrap gap-3 items-center">
					<USelect v-model="selectedExchange"
							 :portal="true"
							 :items="exchangeOptions" />
					<USelect v-model="selectedPair"
							 :portal="true"
							 :items="pairOptions" />
					<USelect v-model="selectedStatus"
							 :portal="true"
							 :items="statusOptions" />
					<UButton variant="soft"
							 :disabled="true">
						Clear filters
					</UButton>
				</div>
				<!-- <div v-if="selectedTab === 'live' && livePositions.length === 0"
					 class="flex justify-center py-10">
					<p class="text-sm text-muted">
						No live positions
					</p>
				</div> -->
				<UTable :data="livePositions"
						:columns="columns" />
			</div>
		</template>
	</UDashboardPanel>
</template>
