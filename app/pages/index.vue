<script lang="ts" setup>
	import type { TableColumn, TabsItem } from '@nuxt/ui';

	const month = ref('Month');
	const exchangeFilter = ref('All exchanges');
	const accountFilter = ref('All accounts');
	const minQty = ref('1');

	type Row = {
		id: string;
		exchange: string;
		balance: string;
		totalPositionValue: string;
		unrealized: string;
		pnl: string;
		trades: string;
		actions: string;
	};

	const rows = ref<Row[]>([]);

	const columns: TableColumn<Row>[] = [
		{ accessorKey: 'id', header: '#' },
		{ accessorKey: 'exchange', header: 'Exchange API' },
		{ accessorKey: 'balance', header: 'Balance' },
		{ accessorKey: 'totalPositionValue', header: 'Total Position Value' },
		{ accessorKey: 'unrealized', header: 'Unrealized P/L' },
		{ accessorKey: 'pnl', header: 'P/L' },
		{ accessorKey: 'trades', header: 'Trades' },
		{ accessorKey: 'actions', header: 'Actions' },
	];

	const analyticsTabs: TabsItem[] = [
		{ label: 'API Accounts' },
		{ label: 'Signal Bots' },
		{ label: 'DCA Bots' },
		{ label: 'Grid Bots' },
		{ label: 'Multi-Pair Grid Bots' },
		{ label: 'Market Neutral Bot' },
	];
</script>

<template>
	<UDashboardPanel>
		<template v-slot:header>
			<UDashboardNavbar title="Dashboard" />
		</template>

		<template v-slot:body>
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				<DashboardCard>
					<template v-slot:header>
						<div>Total equity</div>
					</template>
					<div>$42,860</div>
					<template v-slot:footer>
						<div>+4.8% this week</div>
					</template>
				</DashboardCard>
				<DashboardCard>
					<template v-slot:header>
						<div>Active bots</div>
					</template>
					<div>12</div>
					<template v-slot:footer>
						<div>9 running · 2 paused · 1 error</div>
					</template>
				</DashboardCard>
				<DashboardCard>
					<template v-slot:header>
						<div>Open deals</div>
					</template>
					<div>27</div>
					<template v-slot:footer>
						<div>Across 6 pairs</div>
					</template>
				</DashboardCard>
				<DashboardCard>
					<template v-slot:header>
						<div>Failed webhooks</div>
					</template>
					<div>3</div>
					<template v-slot:footer>
						<div>Need retry routing</div>
					</template>
				</DashboardCard>
			</div>
			<div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
				<div class="lg:col-span-1 flex flex-col gap-4">
					<DashboardCard>
						<template v-slot:header>
							<div class="flex items-center justify-between w-full">
								<div>Portfolio</div>
								<UTooltip text="Portfolio info">
									<UIcon name="i-lucide-info" />
								</UTooltip>
							</div>
						</template>

						<div class="text-4xl font-bold">
							$0
						</div>

						<div class="flex gap-4 mt-2">
							<div>
								<div class="text-sm opacity-70">
									BTC
								</div>
								<div class="text-sm">
									0
								</div>
							</div>
							<div>
								<div class="text-sm opacity-70">
									ETH
								</div>
								<div class="text-sm">
									0
								</div>
							</div>
						</div>

						<template v-slot:footer>
							<div class="flex items-center justify-between w-full">
								<div />
								<UButton variant="ghost"
										 icon="i-lucide-refresh-cw" />
							</div>
						</template>
					</DashboardCard>

					<DashboardCard>
						<template v-slot:header>
							<div>Performance (P/L)</div>
						</template>

						<div class="flex flex-col gap-3">
							<div>
								<div class="text-sm opacity-70">
									Unrealized P/L
								</div>
								<div class="text-2xl font-bold">
									$0
								</div>
							</div>

							<div>
								<div class="grid grid-cols-2 gap-2">
									<div>
										<div class="text-sm opacity-70">
											7 days
										</div>
										<div class="font-semibold">
											$0
										</div>
									</div>
									<div>
										<div class="text-sm opacity-70">
											30 days
										</div>
										<div class="font-semibold">
											$0
										</div>
									</div>
								</div>
							</div>
						</div>
						<template v-slot:footer>
							<div />
						</template>
					</DashboardCard>
				</div>

				<div class="lg:col-span-3 flex flex-col gap-4">
					<DashboardCard>
						<template v-slot:header>
							<div class="flex items-center justify-between w-full">
								<div class="text-lg font-bold">
									Analytics
								</div>
							</div>
						</template>

						<div class="mt-2">
							<UTabs :items="analyticsTabs" />
						</div>

						<div class="mt-4 flex flex-wrap gap-3 items-center">
							<USelect v-model="month"
									 :portal="true"
									 :items="['Month']" />
							<USelect v-model="exchangeFilter"
									 :portal="true"
									 :items="['All exchanges']" />
							<USelect v-model="accountFilter"
									 :portal="true"
									 :items="['All accounts']" />

							<div class="flex items-center gap-2">
								<div class="text-sm opacity-70">
									Min. trades quantity
								</div>
								<USelect v-model="minQty"
										 :portal="true"
										 :items="['1']" />
							</div>
						</div>

						<div class="mt-5">
							<UTable :data="rows"
									:columns="columns" />
						</div>

						<div class="mt-3 text-center opacity-70">
							No traders found
						</div>

						<template v-slot:footer>
							<div />
						</template>
					</DashboardCard>
				</div>
			</div>
		</template>
	</UDashboardPanel>
</template>
