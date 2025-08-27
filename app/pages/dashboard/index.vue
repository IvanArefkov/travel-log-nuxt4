<script setup lang="ts">
import SidecartButton from '~/components/sidecart-button.vue';

const isSidebarOpen = ref(true);
onMounted(() => {
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
        />
        <div class="divider" />
        <SidecartButton
          :show-label="isSidebarOpen"
          name="tabler:logout-2"
          label="Sign Out"
          link="/signout"
        />
      </div>
    </div>
    <div class="flex-1" />
  </div>
</template>

<style scoped>
.rotate {
  transform: rotateY(180deg);
}
</style>
