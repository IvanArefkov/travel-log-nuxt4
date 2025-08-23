<script lang="ts" setup>
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set(value) {
    colorMode.preference = value ? 'dark' : 'light';
  },
});
</script>

<template>
  <label class="swap swap-rotate pe-5">
    <!-- this hidden checkbox controls the state -->
    <input v-model="isDark" type="checkbox">

    <!-- sun icon -->

    <Icon
      name="tabler:sun"
      class="swap-on"
      size="32"
    />

    <!-- moon icon -->
    <Icon
      name="tabler:moon-filled"
      class="swap-off"
      size="32"
    />
  </label>
</template>
