import { createAuthClient } from 'better-auth/client';

import { authClient } from '~/lib/client';

export const useAuthStore = defineStore('useAuthStore', () => {
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null);
  const loading = computed(() => session.value?.isPending);

  async function init() {
    const data = await authClient.useSession(useFetch);
    session.value = data;
  }

  async function signIn() {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append('csrf-token', csrf);
    const authClient = createAuthClient();
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/dashboard',
      errorCallbackURL: '/error',
      fetchOptions: {
        headers,
      },
    });
  }

  async function signOut() {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append('csrf-token', csrf);
    authClient.signOut({
      fetchOptions: {
        headers,
      },
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
