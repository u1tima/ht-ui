<script setup lang="ts">
	import * as zod from 'zod';
	import type { AuthFormField } from '@nuxt/ui'

	definePageMeta({
		layout: 'auth',
	})

	const supabase = useSupabaseClient()

	const loading = ref(false)
	const sign = ref<'Login' | 'Sign up'>('Sign up')

	const description = computed(() => {
		return sign.value === 'Login'
			? 'Don\'t have an account?'
			: 'Already have an account?'
	})

	const signButtonText = computed(() => {
		return sign.value === 'Login'
			? 'Sign up'
			: 'Login'
	});

	const fields = ref<AuthFormField[]>([
		{
			name: 'email',
			type: 'text',
			label: 'Email',
			placeholder: 'Enter your email',
			required: true
		},
		{
			name: 'password',
			type: 'password',
			label: 'Password',
			placeholder: 'Enter your password',
			required: true
		}
	])

	const providers = [{
		label: 'Google',
		icon: 'i-simple-icons-google',
		onClick: () => {
			signWithGoogle();
		}
	}]

	const schema = zod.object({
		email: zod.email('Invalid email'),
		password: zod.string('Password is required').min(8, 'Must be at least 8 characters')
	})

	const changeSign = () => {
		sign.value = sign.value === 'Login'
			? 'Sign up'
			: 'Login'
	}

	const submit = () => {
		console.log('submit')
	}

	const signWithGoogle = async () => {
		const { public: publicConfig } = useRuntimeConfig()

		console.log(publicConfig)

		const baseUrl =
			publicConfig.siteUrl ||
			(typeof window !== 'undefined' ? window.location.origin : '')

		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: 'https://ht-ui.vercel.app/confirm',
			},
		})

		console.log(data)
	};
</script>

<template>
	<div class="flex flex-col items-center justify-center gap-4 p-4">
		<UPageCard class="w-full max-w-md">
			<UAuthForm :title="sign"
					   :fields="fields"
					   :schema="schema"
					   :loading="loading"
					   :providers="providers"
					   icon="i-lucide-user"
					   class="max-w-md"
					   @submit.prevent="submit">
				<template #description>
					{{ description }}
					<UButton variant="link"
							 @click="changeSign">
						{{ signButtonText }}
					</UButton>
				</template>
			</UAuthForm>
		</UPageCard>
	</div>
</template>
