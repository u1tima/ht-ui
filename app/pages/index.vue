<template>
	<UDashboardPanel>
		<template #header>
			<UDashboardNavbar title="Dashboard" />
		</template>
		<template #body>
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				<DashboardCard>
					<template #header>
						<div>Total equity</div>
					</template>
					<div>$42,860</div>
					<template #footer>
						<div>+4.8% this week</div>
					</template>
				</DashboardCard>
				<DashboardCard>
					<template #header>
						<div>Active bots</div>
					</template>
					<div>12</div>
					<template #footer>
						<div>9 running · 2 paused · 1 error</div>
					</template>
				</DashboardCard>
				<DashboardCard>
					<template #header>
						<div>Open deals</div>
					</template>
					<div>27</div>
					<template #footer>
						<div>Across 6 pairs</div>
					</template>
				</DashboardCard>
				<DashboardCard>
					<template #header>
						<div>Failed webhooks</div>
					</template>
					<div>3</div>
					<template #footer>
						<div>Need retry routing</div>
					</template>
				</DashboardCard>				
			</div>
		</template>
	</UDashboardPanel>
</template>