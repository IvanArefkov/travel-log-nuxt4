<script setup>
const authStore = useAuthStore();
</script>

<template>
  <div class="hero bg-base-300 container mx-auto mt-4 min-h-96">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          Travel Log
        </h1>
        <p class="py-6">
          Keep track of your travels and adventures. Add locations, photos, and notes to
          create a digital journal of your journeys!
        </p>
        <AuthButton v-if="!authStore.user" />
        <NuxtLink
          v-else
          to="/dashboard"
          class="btn btn-primary"
        >
          Dashboard
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
