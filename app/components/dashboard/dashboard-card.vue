<template>
	<UCard :ui="{
		root: 'divide-y-0',
		header: 'p-2 sm:px-4 uppercase text-md font-bold',
		body: 'p-2 sm:px-4 sm:py-0 text-3xl font-bold',
		footer: 'p-2 sm:px-4',
	}">
		<template #header>
			<slot name="header" />
		</template>
		<slot></slot>
		<template #footer>
			<slot name="footer" />
		</template>
	</UCard>
</template>