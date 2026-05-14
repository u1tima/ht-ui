<script setup lang="ts">
	import * as zod from 'zod';
	import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';

	definePageMeta({
		layout: 'auth',
	});

	const supabase = useSupabaseClient();

	const loading = ref(false);
	const sign = ref<'Login' | 'Sign up'>('Sign up');

	const description = computed(() => {
		return sign.value === 'Login'
			? 'Don\'t have an account?'
			: 'Already have an account?';
	});

	const signButtonText = computed(() => {
		return sign.value === 'Login'
			? 'Sign up'
			: 'Login';
	});

	const fields = ref<AuthFormField[]>([
		{
			name: 'email',
			type: 'text',
			label: 'Email',
			placeholder: 'Enter your email',
			required: true,
		},
		{
			name: 'password',
			type: 'password',
			label: 'Password',
			placeholder: 'Enter your password',
			required: true,
		},
	]);

	const providers = [{
		label: 'Google',
		icon: 'i-simple-icons-google',
		onClick: () => {
			signWithGoogle();
		},
	}];

	const schema = zod.object({
		email: zod.email('Invalid email'),
		password: zod.string('Password is required').min(8, 'Must be at least 8 characters'),
	});

	type Schema = zod.output<typeof schema>

	const changeSign = () => {
		sign.value = sign.value === 'Login'
			? 'Sign up'
			: 'Login';
	};

	const loginWithEmail = async (email: string, password: string) => {
		loading.value = true;
		const { error } = await supabase.auth.signInWithPassword({ email, password });

		if (!error) {
			await navigateTo('/');
		}
		loading.value = false;
	};

	const signupWithEmail = async (email: string, password: string) => {
		loading.value = true;
		const { error } = await supabase.auth.signUp({ email, password });
		loading.value = false;

		if (!error) {
			navigateTo('/confirm-email');
		}
	};

	const submit = (payload: FormSubmitEvent<Schema>) => {
		const { email, password } = payload.data;

		if (sign.value === 'Login') {
			loginWithEmail(email, password);
		} else {
			signupWithEmail(email, password);
		}
	};



	const signWithGoogle = async () => {
		loading.value = true;
		const { public: publicConfig } = useRuntimeConfig();

		const redirectTo
			= (publicConfig?.siteUrl ? `${publicConfig.siteUrl}/confirm` : `${window.location.origin}/confirm`);

		const { data: _data, error: _error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo,
			},
		});
		loading.value = false;
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
				<template v-slot:description>
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
