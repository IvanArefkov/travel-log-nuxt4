import { createAuthClient } from 'better-auth/client';

export const useAuthStore = defineStore('useAuthStore', () => {
  const loading = ref(false);
  async function signIn() {
    const authClient = createAuthClient();
    loading.value = true;
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/dashboard',
      errorCallbackURL: '/error',
    });
    loading.value = false;
  }
  return {
    loading,
    signIn,
  };
});
