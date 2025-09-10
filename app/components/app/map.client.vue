<script setup lang="ts">
import type { MglEvent } from '@indoorequal/vue-maplibre-gl';
import type { LngLat } from 'maplibre-gl';

import { MglMap } from '@indoorequal/vue-maplibre-gl';

import { CENTER_USA } from '@/lib/constants';

const colorMode = useColorMode();
const mapStore = useMapStore();

function setMarkerDblClick(event: MglEvent<'dblclick'>) {
  if (mapStore.addedPoint) {
    mapStore.addedPoint.long = event.event.lngLat.lng;
    mapStore.addedPoint.lat = event.event.lngLat.lat;
  }
}
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
    @map:dblclick="setMarkerDblClick($event)"
  >
    <mgl-marker
      v-if="mapStore.addedPoint"
      :coordinates="[mapStore.addedPoint.long, mapStore.addedPoint.lat]"
      draggable
      @update:coordinates="updateAddedPoint($event)"
    >
      <template #marker>
        <div
          class="tooltip tooltip-top tooltip-open"
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
