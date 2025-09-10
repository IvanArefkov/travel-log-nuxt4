<script setup lang="ts">
import type { SearchResultType } from '~/lib/types';

const props = defineProps<{
  searchResults: SearchResultType[];
  searchTerm: string;
}>();
const mapStore = useMapStore();
</script>

<template>
  <ul class="list bg-base-100 rounded-box shadow-md search-resluts-popup ">
    <li class="p-4 pb-2 text-xs opacity-60 tracking-wide list-row">
      Search results for "{{ props.searchTerm }}" <span v-if="!props.searchResults.length">have no results.</span>
    </li>
    <li
      v-for="result, i in props.searchResults"
      :key="i"
      class="list-row"
    >
      <div class="text-4xl font-thin opacity-30 tabular-nums">
        {{ i + 1 }}
      </div>
      <div>
        <div>{{ result.name }}</div>
        <div class="text-xs uppercase font-semibold opacity-60">
          {{ result.addresstype }}
        </div>
      </div>
      <p class="list-col-wrap text-xs">
        {{ result.display_name }}
      </p>
      <button class="btn btn-warning" @click="mapStore.selectResult(result)">
        Select
      </button>
    </li>
  </ul>
</template>

<style scoped>
.list-icon {
  align-self: center;
  justify-self: center;
}
</style>
