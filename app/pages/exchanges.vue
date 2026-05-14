<script lang="ts" setup>
	import type { TableColumn } from '@nuxt/ui';

	type ExchangeRow = {
		id: string;
		exchange: string;
		exchangeIcon: string;
		accountName: string;
		accountIdShort: string;
		api: string;
		enabled: boolean;
		status: string;
		type: string;
		balancesCollaterals: string;
		balancesTotal: string;
	};

	type SupportedExchangeRow = {
		id: string;
		exchange: string;
		markets: string;
		signalBot: boolean;
		gridBot: boolean;
		multiPairGridBot: boolean;
		marketNeutralBot: boolean;
		dcaBot: boolean;
		multiApiManagement: boolean;
		spreadsAndArbitrage: boolean;
		terminal: boolean;
		actions: boolean;
	};

	const filterStatusOptions = ['All statuses'];
	const filterNameOptions = ['All names'];
	const filterExchangeOptions = ['All exchanges'];

	const selectedStatus = ref(filterStatusOptions[0]);
	const selectedName = ref(filterNameOptions[0]);
	const selectedExchange = ref(filterExchangeOptions[0]);

	const exchanges = ref<ExchangeRow[]>([
		{
			id: 'ex_1',
			exchange: 'Binance DEMO',
			exchangeIcon: 'i-lucide-coins',
			accountName: 'DemoAccount',
			accountIdShort: '1a320314781d44d43a31...',
			api: '$10000',
			enabled: true,
			status: 'Active',
			type: 'Demo',
			balancesCollaterals: '10000',
			balancesTotal: '10000',
		},
		{
			id: 'ex_2',
			exchange: 'Binance DEMO',
			exchangeIcon: 'i-lucide-coins',
			accountName: 'testtete',
			accountIdShort: '03a83e947486129bff24...',
			api: '$10000',
			enabled: true,
			status: 'Active',
			type: 'Demo',
			balancesCollaterals: '10000',
			balancesTotal: '10000',
		},
	]);

	const columns: TableColumn<ExchangeRow>[] = [
		{
			id: 'exchange',
			accessorKey: 'exchange',
			header: 'Exchange',
		},
		{
			id: 'account',
			accessorKey: 'accountName',
			header: 'Account Name',
		},
		{
			id: 'api',
			accessorKey: 'api',
			header: 'API',
		},
		{
			id: 'total',
			accessorKey: 'balancesTotal',
			header: 'Total USD value',
		},
		{
			id: 'enabled',
			header: 'Enabled',
		},
		{
			id: 'actions',
			header: 'Actions',
		},
	];

	const supportedExchanges = ref<SupportedExchangeRow[]>([
		{
			id: 'se_1',
			exchange: 'Hyperliquid Premium Free',
			markets: 'Spot Futures (USDT-M)',
			signalBot: true,
			gridBot: true,
			multiPairGridBot: true,
			marketNeutralBot: true,
			dcaBot: true,
			multiApiManagement: true,
			spreadsAndArbitrage: true,
			terminal: false,
			actions: true,
		},
		{
			id: 'se_2',
			exchange: 'CoinEx',
			markets: 'Spot Futures (USDT-M)',
			signalBot: true,
			gridBot: true,
			multiPairGridBot: true,
			marketNeutralBot: true,
			dcaBot: true,
			multiApiManagement: true,
			spreadsAndArbitrage: true,
			terminal: false,
			actions: true,
		},
		{
			id: 'se_3',
			exchange: 'Binance',
			markets: 'Spot Futures (USDT-M) Futures (Coin-M)',
			signalBot: true,
			gridBot: true,
			multiPairGridBot: true,
			marketNeutralBot: true,
			dcaBot: true,
			multiApiManagement: true,
			spreadsAndArbitrage: true,
			terminal: false,
			actions: true,
		},
	]);

	const supportedColumns: TableColumn<SupportedExchangeRow>[] = [
		{ accessorKey: 'exchange', header: 'Exchange' },
		{ accessorKey: 'markets', header: 'Markets' },
		{ id: 'signalBot', header: 'Signal Bot' },
		{ id: 'gridBot', header: 'Grid Bot' },
		{ id: 'multiPairGridBot', header: 'Multi-Pair Grid Bot' },
		{ id: 'marketNeutralBot', header: 'Market Neutral Bot' },
		{ id: 'dcaBot', header: 'DCA Bot' },
		{ id: 'multiApiManagement', header: 'Multi-API Management' },
		{ id: 'spreadsAndArbitrage', header: 'Spreads & Arbitrage' },
		{ id: 'terminal', header: 'Terminal' },
		{ id: 'actions', header: 'Actions' },
	];
</script>

<template>
	<UDashboardPanel>
		<template v-slot:header>
			<UDashboardNavbar title="Exchanges">
				<template v-slot:right>
					<UButton variant="solid"
							 icon="i-lucide-plus">
						Add exchange
					</UButton>
				</template>
			</UDashboardNavbar>
		</template>

		<template v-slot:body>
			<div class="flex flex-col gap-4">
				<div class="flex flex-wrap gap-3 items-center">
					<UButton variant="solid"
							 icon="i-lucide-plus">
						Add exchange
					</UButton>

					<USelect v-model="selectedStatus"
							 :portal="true"
							 :items="filterStatusOptions"
							 class="min-w-[140px]" />

					<USelect v-model="selectedName"
							 :portal="true"
							 :items="filterNameOptions"
							 class="min-w-[140px]" />

					<USelect v-model="selectedExchange"
							 :portal="true"
							 :items="filterExchangeOptions"
							 class="min-w-[160px]" />

					<UButton variant="soft">
						Collapse/Expand All
					</UButton>
				</div>

				<UTable :data="exchanges"
						:columns="columns">
					<template v-slot:exchange-cell="{ row }">
						<div class="flex items-center gap-2">
							<i :class="row.original.exchangeIcon" />
							<span class="font-bold">
								{{ row.original.exchange }}
							</span>
						</div>
					</template>

					<template v-slot:account-cell="{ row }">
						<div class="flex flex-col">
							<span class="font-medium">
								{{ row.original.accountName }}
							</span>
							<span class="text-xs opacity-70">
								{{ row.original.accountIdShort }}
							</span>
						</div>
					</template>

					<template v-slot:api-cell="{ row }">
						<span>
							{{ row.original.api }}
						</span>
					</template>

					<template v-slot:total-cell="{ row }">
						<span class="font-semibold">
							{{ row.original.balancesTotal }}
						</span>
					</template>

					<template v-slot:enabled-cell>
						<USwitch />
					</template>

					<template v-slot:actions-cell>
						<div class="flex gap-2">
							<UTooltip text="Refresh">
								<UButton icon="i-lucide-refresh-cw"
										 variant="ghost" />
							</UTooltip>
							<UTooltip text="Edit">
								<UButton icon="i-lucide-edit"
										 variant="ghost" />
							</UTooltip>
							<UTooltip text="Delete">
								<UButton icon="i-lucide-trash-2"
										 variant="ghost" />
							</UTooltip>
						</div>
					</template>
				</UTable>

				<div class="flex flex-col gap-3 pt-2">
					<h3 class="text-xl font-bold">
						Supported exchanges
					</h3>

					<div class="flex items-center gap-3">
						<USelect :portal="true"
								 :items="['All markets']"
								 class="min-w-[180px]" />
					</div>
				</div>

				<UTable :data="supportedExchanges"
						:columns="supportedColumns">
					<template v-slot:signalBot-cell="{ row }">
						<span v-if="row.original.signalBot">✓</span>
					</template>

					<template v-slot:gridBot-cell="{ row }">
						<span v-if="row.original.gridBot">✓</span>
					</template>

					<template v-slot:multiPairGridBot-cell="{ row }">
						<span v-if="row.original.multiPairGridBot">✓</span>
					</template>

					<template v-slot:marketNeutralBot-cell="{ row }">
						<span v-if="row.original.marketNeutralBot">✓</span>
					</template>

					<template v-slot:dcaBot-cell="{ row }">
						<span v-if="row.original.dcaBot">✓</span>
					</template>

					<template v-slot:multiApiManagement-cell="{ row }">
						<span v-if="row.original.multiApiManagement">✓</span>
					</template>

					<template v-slot:spreadsAndArbitrage-cell="{ row }">
						<span v-if="row.original.spreadsAndArbitrage">✓</span>
					</template>

					<template v-slot:terminal-cell="{ row }">
						<span v-if="row.original.terminal">✓</span>
					</template>

					<template v-slot:actions-cell>
						<UButton variant="ghost"
								 icon="i-lucide-plus" />
					</template>
				</UTable>
			</div>
		</template>
	</UDashboardPanel>
</template>
