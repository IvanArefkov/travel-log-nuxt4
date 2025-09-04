<script setup lang="ts">
import { useSidebarStore } from '#imports';

import SidecartButton from '~/components/sidecart-button.vue';

const locationStore = useLocationStore();
const route = useRoute();

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
    <div class="bg-base-100 trasition-all duration-300" :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }">
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
              v-for="item in SidebarStore.sidebarItems"
              :key="item.id"
              :show-label="isSidebarOpen"
              :name="item.icon"
              :label="item.label"
              :link="item.href"
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
    <div class="flex-1 flex flex-col w-full">
      <NuxtPage />
      <AppMap class="flex-1" />
    </div>
  </div>
</template>

<style scoped>
.rotate {
  transform: rotateY(180deg);
}
</style>
