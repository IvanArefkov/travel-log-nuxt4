<script lang="ts" setup>
const auth = useAuthStore();
</script>

<template>
  <button
    v-if="!auth.user"
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

  <div v-if="auth.user && !auth.loading" class="dropdown dropdown-end">
    <div
      tabindex="0"
      role="button"
      class="btn m-1"
    >
      <div v-if="auth.user.image" class="avatar">
        <div class="w-8 rounded-full">
          <img :src="auth.user.image" :alt="auth.user.name">
        </div>
      </div>
      {{ auth.user.name }}
    </div>
    <ul tabindex="0" class="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm">
      <li>
        <NuxtLink to="/signout">
          <Icon name="tabler:logout" size="18" />
          Sign out
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
