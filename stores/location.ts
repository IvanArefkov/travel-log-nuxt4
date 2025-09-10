export const useLocationStore = defineStore('useLocationStore', () => {
  const { data, status, refresh } = useFetch('/api/locations', {
    lazy: true,
  });
  const sidebarStore = useSidebarStore();
  const mapStore = useMapStore();

  effect(() => {
    if (data.value) {
      sidebarStore.loading = true;
      sidebarStore.sidebarItems = data.value.map(location => ({
        id: `location-${location.id}`,
        name: location.name,
        icon: 'tabler:map-pin-filled',
        href: location.slug,
        location,
      }));
      mapStore.mapPoints = data.value;
    }

    sidebarStore.loading = status.value === 'pending';
  });
  return {
    data,
    status,
    refresh,
  };
});
