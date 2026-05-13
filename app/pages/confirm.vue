<script setup lang="ts">
    definePageMeta({
        layout: 'auth',
    });

    const supabase = useSupabaseClient();

    const complete = async () => {
        const { error } = await supabase.auth.getSession();

        if (error) {
            console.error('OAuth callback error:', error);
            return navigateTo('/login');
        }

        return navigateTo('/');
    };

    await complete();
</script>

<template>
    <div class="flex items-center justify-center p-6">
        <div class="text-sm">
            Подключаем аккаунт…
        </div>
    </div>
</template>
