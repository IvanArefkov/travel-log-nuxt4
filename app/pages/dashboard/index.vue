<script setup lang="ts">
const locationStore = useLocationStore();
const mapStore = useMapStore();
const { data, status } = storeToRefs(locationStore);
onMounted(() => {
  locationStore.refresh();
});
</script>

<template>
  <div class="m-4 min-h-64">
    <h1 class="text-2xl">
      Locations
    </h1>
    <div v-if="status === 'pending'">
      <span class="loading loading-spinner loading-md" />
    </div>
    <div v-else-if="data && data.length" class="flex gap-2 overflow-auto">
      <NuxtLink
        v-for="location in data"
        :key="location.id"
        :to="{ name: 'dashboard-location-slug', params: { slug: location.slug } }"
        class="card bg-base-300 w-96 shadow-sm my-2 shrink-0 border-2"
        :class="{ 'border-accent': mapStore.selectedPoint?.id === location.id || mapStore.hightlightedPoint?.id === location.id,
                  'border-transparent': mapStore.selectedPoint?.id !== location.id && mapStore.hightlightedPoint?.id !== location.id,
        }"
        @mouseenter="mapStore.selectedPoint = location"
        @mouseleave="mapStore.selectedPoint = null"
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
      </NuxtLink>
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
