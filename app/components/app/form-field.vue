<script setup lang="ts">
const props = defineProps<{
  error?: string;
  label: string;
  name: string;
  type?: 'number';
  tag?: 'textarea';
  disabled?: boolean;
}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <Field
      :as="props.tag || 'input'"
      :name="props.name"
      :type="props.type || 'text'"
      class="input w-full"
      :class="{ 'input-error': props.error, 'h-24': props.tag === 'textarea' }"
      :disabled="props.disabled || false"
    />
    <p v-if="props.error" class="fieldset-label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>
