import { createAuthClient } from 'better-auth/client';

import { authClient } from '~/lib/client';

export const useAuthStore = defineStore('useAuthStore', () => {
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null);
  async function init() {
    const data = await authClient.useSession(useFetch);
    session.value = data;
  }
  const loading = computed(() => session.value?.isPending);

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
    session.value?.data?.user,
  );
  return {
    loading,
    user,
    init,
    signIn,
    signOut,
  };
});
