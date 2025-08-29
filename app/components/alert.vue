<script setup lang="ts">
const props = defineProps<{
  alertClass: 'alert-error' | 'alert-success' | 'alert-warning' | 'alert-info';
  message: string;
}>();
const emit = defineEmits(['close']);
</script>

<template>
  <div
    role="alert"
    class="alert alert-soft mb-4 flex justify-between"
    :class="props.alertClass"
  >
    <span>{{ props.message }}</span>
    <Icon
      name="tabler:x"
      size="18"
      class="hover:cursor-pointer"
      @click="emit('close')"
    />
  </div>
</template>
