export default defineNuxtPlugin(async (nuxtApp) => {
    const authStore = useAuthStore();
    authStore.initializeAuth();
});
