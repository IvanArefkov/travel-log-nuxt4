import type { SearchResultType } from '@/lib/types';

export const useSearchResultStore = defineStore('useSearchResultStore', () => {
  const searchResults = ref<SearchResultType[] | null>(null);
  const searchTerm = ref<string>();
  const error = ref();
  const loadingResults = ref<boolean>(false);

  function clearSearch() {
    searchResults.value = null;
  }

  async function searchLocation() {
    if (!searchTerm.value)
      return;
    try {
      loadingResults.value = true;
      const response = await $fetch(`/api/search-poi?q=${searchTerm.value}`, {
        method: 'get',
      });

      searchResults.value = response;
    }
    catch (e) {
      error.value = e;
    }
    loadingResults.value = false;
  }

  return {
    searchResults,
    searchTerm,
    error,
    searchLocation,
    clearSearch,
    loadingResults,
  };
});
