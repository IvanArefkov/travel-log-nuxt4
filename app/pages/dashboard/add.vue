<script setup lang="ts">
import type { FetchError } from 'ofetch';

import { toTypedSchema } from '@vee-validate/zod';

import { CENTER_USA } from '~/lib/constants';
import { InsertLocation } from '~/lib/db/schema';

const submitError = ref();
const mapStore = useMapStore();
const submited = ref(false);
const router = useRouter();
const loading = ref(false);
const { $csrfFetch } = useNuxtApp();
const { handleSubmit, errors, meta, setErrors, setFieldValue } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
});

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    submitError.value = '';
    await $csrfFetch('/api/locations', {
      method: 'post',
      body: values,
    });
    submited.value = true;
    navigateTo('/dashboard');
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data?.data);
    }
    submitError.value = error.data?.statusMessage || error.statusMessage || 'An unknown error occured';
  }
  loading.value = false;
});

onBeforeRouteLeave(() => {
  if (meta.value.dirty && !submited.value) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm('Are you sure you want to leave? All unsaved changes will be lost.');
    if (!confirm) {
      return false;
    }
    mapStore.addedPoint = null;
    return true;
  }
});

effect(() => {
  if (mapStore.addedPoint) {
    setFieldValue('long', mapStore.addedPoint.long);
    setFieldValue('lat', mapStore.addedPoint.lat);
  }
});

onMounted(() => {
  mapStore.addedPoint = {
    long: CENTER_USA[0],
    lat: CENTER_USA[1],
    description: '',
    name: 'added',
    id: 1,
  };
});
</script>

<template>
  <div class="container max-w-md mx-auto mt-4 p-4">
    <div>
      <Alert
        v-if="submitError"
        alert-class="alert-error"
        :message="submitError"
        @close="submitError = ''"
      />
      <h1 class="text-lg">
        Add Location
      </h1>
      <p>
        A location is a place you have traveled or will travel to. It can be a city. country, state or point of interest. You can add specific times you visited this location after adding it.
      </p>
    </div>
    <form action="" @submit.prevent="onSubmit()">
      <AppFormField
        label="Name"
        :error="errors.name"
        name="name"
        :disabled="loading"
      />
      <AppFormField
        tag="textarea"
        label="Description"
        :error="errors.description"
        name="description"
        :disabled="loading"
      />
      <div>
        <p>Drag <Icon name="tabler:map-pin-filled" class="text-warning" /> marker to your desired location</p>
        <p class="text-gray-500">
          <span>Latitude: {{ mapStore.addedPoint?.lat.toFixed(4) }}, Longitude: {{ mapStore.addedPoint?.long.toFixed(4) }}</span>
        </p>
      </div>

      <div class="flex justify-end gap-3 mt-4">
        <button
          :disabled="loading"
          type="button"
          class="btn btn-outline"
          @click="router.back()"
        >
          Cancel <Icon name="tabler:arrow-back" size="16" />
        </button>

        <button
          class="btn btn-primary"
          type="submit"
          :disabled="loading"
        >
          Add <Icon
            v-if="!loading"
            name="tabler:plus"
            size="18"
          />
          <span v-if="loading" class="loading loading-spinner loading-md" />
        </button>
      </div>
    </form>
  </div>
</template>
