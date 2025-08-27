<script setup lang="ts">
const props = defineProps({
  name: String,
  label: String,
  link: String,
  showLabel: Boolean,
});
const route = useRoute();
</script>

<template>
  <div :class="{ 'tooltip tooltip-right': !props.showLabel }" :data-tip="props.label">
    <NuxtLink
      :to="props.link"
      class="flex gap-2 items-center p-2 hover:bg-base-300 hover:cursor-pointer"
      :class="{ 'bg-base-200': route.path === props.link, 'justify-start': props.showLabel, 'justify-center': !props.showLabel }"
    >
      <Icon :name="props.name || ''" size="32" />
      <Transition>
        <span v-if="props.showLabel">{{ props.label }}</span>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style scoped>
.v-enter-active {
  transition: all 0.5s ease;
}
.v-leave-active {
  transition: all 0s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scaleX(0.4);
}
</style>
