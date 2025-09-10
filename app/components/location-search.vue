<script setup lang="ts">
const searchStore = useSearchResultStore();
</script>

<template>
  <div>
    <div v-if="searchStore.searchResults && searchStore.searchTerm" class="my-4">
      <SearchResults :search-results="searchStore.searchResults" :search-term="searchStore.searchTerm" />
    </div>
    <div class="flex flex-col my-4">
      <div class="flex flex-1 gap-2">
        <label class="input">
          <svg
            class="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
              />
              <path d="m21 21-4.3-4.3" />
            </g>
          </svg>

          <input
            id="search"
            v-model="searchStore.searchTerm"
            type="text"
            name="search"
            placeholder="Search location..."
            :disabled="searchStore.loadingResults"
          >
        </label>
        <span v-if="searchStore.loadingResults" class="loading loading-spinner loading-md" />
        <button
          v-else
          type="button"
          class="btn flex-1"
          @click="searchStore.searchLocation()"
        >
          Search
        </button>
      </div>
      <div v-if="searchStore.error">
        <p>{{ searchStore.error }}</p>
      </div>
    </div>
  </div>
</template>
