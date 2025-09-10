<script setup lang="ts">
const props = defineProps<{
  name: string;
  label: string;
  link?: string;
  slug?: string;
  showLabel: boolean;
  iconColor?: 'text-primary' | 'text-secondary' | 'text-accent';
}>();

const route = useRoute();
</script>

<template>
  <div
    :class="{ 'tooltip tooltip-right': !props.showLabel }"
    :data-tip="props.label"
  >
    <NuxtLink

      :to="props.link || { name: 'dashboard-location-slug', params: { slug: props.slug } }"
      class="flex gap-2 items-center p-2 hover:bg-base-300 hover:cursor-pointer"
      :class="{ 'bg-base-200': route.path === props.link, 'justify-start': props.showLabel, 'justify-center': !props.showLabel }"
    >
      <Icon
        :name="props.name || ''"
        size="32"
        :class="props.iconColor"
      />
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
