<script lang="ts" setup>
	import type { IBot } from '~~/types/IBot'

	const state = reactive<IBot>({
		id: '',
		name: '',
		description: '',
		pair: '',
		exchange: '',
		status: '',
		enabled: false,
		totalPl: '',
	})

	const exchanges = [
		{
			label: 'Binance',
			value: 'binance',
		},
		{
			label: 'HyperLiquid',
			value: 'hyperLiquid',
		},
	];
	const pairs = ['BTCUSDT', 'ETHUSDT'];
</script>

<template>
	<UModal :ui="{ content: 'sm:max-w-2xl' }"
			title="Add new Bot"
			description="Dialog will create a new bot">
		<UButton label="Add Bot" />
		<template #body>
			<UForm :schema="schema"
				   :state="state"
				   class="space-y-4"
				   @submit="onSubmit">
				<div class="flex gap-4 w-full">
					<UFormField label="Bot name"
								name="name"
								class="w-full">
						<UInput v-model="state.name"
								class="w-full" />
					</UFormField>
					<UFormField label="Description"
								name="description"
								class="w-full">
						<UInput v-model="state.description"
								class="w-full" />
					</UFormField>
				</div>
				<UFormField label="Exchange"
							name="exchange">
					<USelect v-model="state.exchange"
							 :items="exchanges"
							 default-value="hyperLiquid"
							 class="w-2/3" />
				</UFormField>
				<UFormField label="Pair"
							name="pair">
					<USelect v-model="state.pair"
							 :items="pairs"
							 class="w-2/3" />
				</UFormField>
			</UForm>
		</template>
		<template #footer>
			<UButton type="submit">
				Create
			</UButton>
		</template>
	</UModal>
</template>