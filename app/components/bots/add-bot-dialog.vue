<script lang="ts" setup>
	import { reactive } from 'vue';
	import { z } from 'zod';
	import type { IBot } from '~~/types/IBot';

	type ExchangeValue = 'binance' | 'hyperLiquid'
	type PairValue = 'BTCUSDT' | 'ETHUSDT'

	type FormState = {
		name: string
		description?: string
		exchange: ExchangeValue
		pair: PairValue
	}

	const state = reactive<FormState>({
		name: '',
		description: '',
		exchange: 'hyperLiquid',
		pair: 'BTCUSDT',
	});

	const exchanges = [
		{
			label: 'Binance',
			value: 'binance' as const,
		},
		{
			label: 'HyperLiquid',
			value: 'hyperLiquid' as const,
		},
	];

	const pairs: string[] = ['BTCUSDT', 'ETHUSDT'];

	const schema = z.object({
		name: z.string().min(1, 'Bot name is required'),
		description: z.string().optional().or(z.literal('')),
		exchange: z.enum(['binance', 'hyperLiquid']),
		pair: z.enum(['BTCUSDT', 'ETHUSDT']),
	});

	const onSubmit = (payload: unknown) => {
		const data = (payload as { data?: unknown }).data ?? payload;
		const parsed = schema.safeParse(data);
		if (!parsed.success) return;

		// TODO: здесь можно создавать IBot через API
		// parsed.data: { name, description?, exchange, pair }

		const botDraft: IBot = {
			id: '',
			status: '',
			enabled: false,
			totalPl: '',
			...parsed.data,
		};

		console.log('Create bot:', botDraft);
	};
</script>

<template>
	<UModal :ui="{ content: 'sm:max-w-2xl' }"
			title="Add new Bot"
			description="Dialog will create a new bot">
		<UButton label="Add Bot" />
		<template v-slot:body>
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

		<template v-slot:footer>
			<UButton type="submit">
				Create
			</UButton>
		</template>
	</UModal>
</template>
