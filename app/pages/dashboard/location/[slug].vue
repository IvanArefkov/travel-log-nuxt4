<script setup lang="ts">
const route = useRoute();
const mapStore = useMapStore();
const { slug } = route.params;

const { data: location, status, error } = await useFetch(`/api/locations/${slug}`, {
  method: 'get',
  lazy: true,
});
effect(() => {
  if (location.value) {
    mapStore.mapPoints = [location.value];
  }
});
</script>

<template>
  <div class="min-h-64 m-4">
    <div v-if="status === 'pending'">
      <div class="loading" />
    </div>
    <div v-if="location && status !== 'pending'">
      <h2 class="text-xl">
        {{ location.name }}
      </h2>
      <p class="text-gray-400 text-sm">
        {{ location.description }}
      </p>
      <p v-if="!location.locationLogs.length" class="text-sm italic mt-2">
        Add a location log to get started
      </p>
      <button class="btn btn-primary mt-4">
        Add Location Log
        <Icon name="tabler:map-pin-plus" size="24" />
      </button>
    </div>
    <div
      v-if="error && status !== 'pending'"
      role="alert"
      class="alert alert-error alert-soft"
    >
      <span>
        {{ error.statusMessage }}
      </span>
    </div>
  </div>
</template>
