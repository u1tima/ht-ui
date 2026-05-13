<script lang="ts" setup>
    import type { TableColumn } from '@nuxt/ui';
    import type { IWebhook } from '~~/types';

    const data = ref<IWebhook[]>([
        {
            bot: 'BTC Long Grid 10x',
            status: 'Delivered',
            event: 'BUY',
            time: '15:42:11',
            payload: { action: 'buy', symbol: 'BTC-USD' },
        },
        {
            bot: 'ETH Mean Revert',
            status: 'In work',
            event: 'DCA',
            time: '15:42:11',
            payload: { action: 'buy', symbol: 'BTC-USD' },
        },
        {
            bot: 'SOL Webhook Grid',
            status: 'Processed',
            event: 'Sell',
            time: '15:42:11',
            payload: { action: 'buy', symbol: 'BTC-USD' },
        },
    ]);

    const columns: TableColumn<IWebhook>[] = [
        {
            accessorKey: 'bot',
            header: 'Bot',
        },
        {
            accessorKey: 'status',
            header: 'Status',
        },
        {
            accessorKey: 'event',
            header: 'Event',
        },
        {
            accessorKey: 'time',
            header: 'Time',
        },
        {
            accessorKey: 'payload',
            header: 'Payload',
        },
    ];
</script>

<template>
    <UDashboardPanel>
        <template v-slot:header>
            <UDashboardNavbar title="Webhooks" />
        </template>
        <template v-slot:body>
            <UTable :data="data"
                    :columns="columns">
                <template v-slot:payload-cell="{ row }">
                    {{ row.original.payload }}
                </template>
            </UTable>
        </template>
    </UDashboardPanel>
</template>
