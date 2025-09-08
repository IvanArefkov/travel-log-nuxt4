<script setup lang="ts">
import type { LngLat } from 'maplibre-gl';

import { MglMap } from '@indoorequal/vue-maplibre-gl';

import { CENTER_USA } from '@/lib/constants';

const colorMode = useColorMode();
const mapStore = useMapStore();

function updateAddedPoint(location: LngLat) {
  if (mapStore.addedPoint) {
    mapStore.addedPoint.lat = location.lat;
    mapStore.addedPoint.long = location.lng;
  }
}

const style = computed(() => colorMode.value === 'dark' ? '/styles/dark.json' : 'https://tiles.openfreemap.org/styles/liberty');
const zoom = 3;
onMounted(() => {
  mapStore.init();
});
</script>

<template>
  <MglMap
    :map-style="style"
    :center="CENTER_USA"
    :zoom="zoom"
  >
    <mgl-marker
      v-if="mapStore.addedPoint"
      :coordinates="CENTER_USA"
      draggable
      @update:coordinates="updateAddedPoint($event)"
      @dragstart="console.log('dragstart')"
      @drag="console.log('drag')"
      @dragend="console.log('dragend')"
    >
      <template #marker>
        <div
          class="tooltip tooltip-top hover:tooltip-open"
          data-tip="drag to your desired location"
        >
          <Icon
            name="tabler:map-pin-filled"
            size="32"
            class="text-warning"
          />
        </div>
      </template>
    </mgl-marker>

    <mgl-marker
      v-for="location in mapStore.mapPoints"
      :key="location.id"
      :coordinates="[location.long, location.lat]"
    >
      <template #marker>
        <div
          class="tooltip hover:cursor-pointer"
          :data-tip="location.name"
          :class="{ 'tooltip-open': mapStore.selectedPoint === location }"
          @mouseenter="mapStore.hightlightedPoint = location"
          @mouseleave="mapStore.hightlightedPoint = null"
        >
          <Icon
            name="tabler:map-pin-filled"
            size="32"
            :class="{
              'text-accent': mapStore.selectedPoint?.id === location.id,
              'text-secondary': mapStore.selectedPoint?.id !== location.id,
            }"
          />
        </div>
      </template>
      <mgl-popup>
        <h1>{{ location.name }}</h1>
        <p v-if="location.description">
          {{ location.description }}
        </p>
      </mgl-popup>
    </mgl-marker>
    <MglNavigationControl />
  </MglMap>
</template>
