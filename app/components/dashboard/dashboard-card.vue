<template>
    <UCard :ui="{
        root: &apos;divide-y-0&apos;,
        header: &apos;p-2 sm:px-4 uppercase text-md font-bold&apos;,
        body: &apos;p-2 sm:px-4 sm:py-0 text-3xl font-bold&apos;,
        footer: &apos;p-2 sm:px-4&apos;,
    }">
        <template v-slot:header>
            <slot name="header" />
        </template>
        <slot />
        <template v-slot:footer>
            <slot name="footer" />
        </template>
    </UCard>
</template>
