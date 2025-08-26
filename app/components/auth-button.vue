<script lang="ts" setup>
const auth = useAuthStore();
</script>

<template>
  <button
    :disabled="auth.loading"
    class="btn btn-accent"
    @click="auth.signIn()"
  >
    Sign In with Github
    <span v-if="auth.loading" class="loading loading-spinner loading-lg" />
    <Icon
      v-else
      name="tabler:brand-github"
      size="24"
    />
  </button>
</template>
