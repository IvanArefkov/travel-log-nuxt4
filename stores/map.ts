import type { LngLatBounds } from 'maplibre-gl';

import type { MapPoint, SearchResultType } from '@/lib/types';

export const useMapStore = defineStore('useMapStore', () => {
  const mapPoints = ref<MapPoint[]>([]);
  const selectedPoint = ref<MapPoint | null>(null);
  const hightlightedPoint = ref<MapPoint | null>(null);
  const addedPoint = ref<MapPoint | null>(null);
  const searchStore = useSearchResultStore();

  const flyTo = ref<boolean>(true);
  function selectResult(location: SearchResultType) {
    flyTo.value = true;
    addedPoint.value = {
      id: 1,
      description: '',
      name: location.name,
      long: Number.parseFloat(location.lon),
      lat: Number.parseFloat(location.lat),
    };
    searchStore.searchTerm = '';
  }

  function highlightMapPoint(point: MapPoint) {
    selectedPoint.value = point;
  }
  async function init() {
    const { useMap } = await import('@indoorequal/vue-maplibre-gl');
    const { LngLatBounds } = await import('maplibre-gl');

    let bounds: LngLatBounds | null = null;
    const padding = 60;
    const map = useMap();

    effect(() => {
      const firstPoint = mapPoints.value[0];
      if (!firstPoint)
        return;
      bounds = mapPoints.value.reduce((bounds, point) => {
        return bounds.extend([point.long, point.lat]);
      }, new LngLatBounds([firstPoint.long, firstPoint.lat], [firstPoint.long, firstPoint.lat]));
      map.map?.fitBounds(bounds, {
        padding,
        maxZoom: 10,
      });
    });
    watch(addedPoint, () => {
      if (addedPoint.value && flyTo.value) {
        map.map?.flyTo({
          zoom: 9,
          center: [addedPoint.value.long, addedPoint.value.lat],
          essential: true,
        });
        flyTo.value = false;
      }
    }, {
      immediate: true,
      deep: true,
    });
  }

  return {
    init,
    mapPoints,
    hightlightedPoint,
    selectedPoint,
    highlightMapPoint,
    addedPoint,
    selectResult,
  };
});
