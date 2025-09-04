<script setup lang="ts">
const { data, status } = await useFetch('/api/locations', {
  lazy: true,
});

;
</script>

<template>
  <div class="m-4">
    <h1 class="text-2xl">
      Locations
    </h1>
    <div v-if="status === 'pending'">
      <span class="loading loading-spinner loading-md" />
    </div>
    <div v-else-if="data && data.length > 0" class="flex gap-2">
      <div
        v-for="location in data"
        :key="location.id"
        class="card bg-base-300 w-96 shadow-sm my-2"
      >
        <div class="card-body">
          <h2 class="card-title">
            {{ location.name }}
          </h2>
          <p>{{ location.description }}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="mt-4">
        <p>
          Add a location to get started
        </p>
        <NuxtLink to="/dashboard/add" class="flex items-center w-fit btn btn-primary mt-1">
          Add location <Icon
            name="tabler:circle-plus-filled"
            size="18"
            class="ms-2"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
