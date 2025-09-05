<script setup lang="ts">
import { useSidebarStore } from '#imports';

import SidecartButton from '~/components/sidecart-button.vue';

const locationStore = useLocationStore();
const route = useRoute();
const mapStore = useMapStore();

const SidebarStore = useSidebarStore();
const isSidebarOpen = ref(true);
onMounted(() => {
  if (route.path !== '/dashboard')
    locationStore.refresh();
  isSidebarOpen.value = localStorage.getItem('sideCartState') === 'true';
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem('sideCartState', `${isSidebarOpen.value}`);
}
</script>

<template>
  <div class="flex-1 flex">
    <div class="bg-base-100 trasition-all duration-300 shrink-0" :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }">
      <div
        class="flex hover:cursor-pointer transition-all duration-200"
        :class="{ 'justify-end': isSidebarOpen, 'justify-center': !isSidebarOpen, 'rotate': !isSidebarOpen }"
        @click="toggleSidebar()"
      >
        <Icon
          name="tabler:chevron-left"
          size="32"
        />
      </div>
      <div class="flex flex-col gap-2 ">
        <SidecartButton
          :show-label="isSidebarOpen"
          name="tabler:map"
          label="Locations"
          link="/dashboard"
        />
        <SidecartButton
          :show-label="isSidebarOpen"
          name="tabler:map-pin-plus"
          label="Add Location"
          link="/dashboard/add"
        />
        <ClientOnly>
          <div v-if="SidebarStore.sidebarItems.length || SidebarStore.loading" class="divider" />
          <div v-if="SidebarStore.loading" class="px-4">
            <div class="skeleton h-4 w-full" />
          </div>
          <div v-if="!SidebarStore.loading && SidebarStore.sidebarItems.length">
            <SidecartButton
              v-for="location in SidebarStore.sidebarItems"
              :key="location.id"
              :show-label="isSidebarOpen"
              :name="location.icon"
              :label="location.name"
              :link="location.href"
              :icon-color="mapStore.selectedPoint === location.location || mapStore.hightlightedPoint === location.location ? 'text-accent' : undefined"
              @mouseenter="mapStore.selectedPoint = location.location"
              @mouseleave="mapStore.selectedPoint = null"
            />
          </div>
        </ClientOnly>
        <div class="divider" />
        <SidecartButton
          :show-label="isSidebarOpen"
          name="tabler:logout-2"
          label="Sign Out"
          link="/signout"
        />
      </div>
    </div>
    <div class="flex-1 overflow-auto">
      <div class="flex flex-col size-full">
        <NuxtPage />
        <AppMap />
      </div>
    </div>
  </div>
</template>

<style scoped>
.rotate {
  transform: rotateY(180deg);
}
</style>
