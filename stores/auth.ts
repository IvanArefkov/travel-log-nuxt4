import { createAuthClient } from 'better-auth/client';

import { authClient } from '~/lib/client';

export const useAuthStore = defineStore('useAuthStore', () => {
  const session = authClient.useSession();
  const loading = computed(() => session.value.isPending || session.value.isRefetching);

  function signOut() {
    authClient.signOut();
  }
  async function signIn() {
    const authClient = createAuthClient();
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/dashboard',
      errorCallbackURL: '/error',
    });
  }
  const user = computed(() =>
    session.value.data?.user,
  );
  return {
    loading,
    user,
    signIn,
    signOut,
  };
});
