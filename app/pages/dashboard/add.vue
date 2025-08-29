<script setup lang="ts">
import type { FetchError } from 'ofetch';

import { toTypedSchema } from '@vee-validate/zod';

import { InsertLocation } from '~/lib/db/schema';

const submitError = ref();
const submited = ref(false);
const router = useRouter();
const loading = ref(false);
const { $csrfFetch } = useNuxtApp();
const { handleSubmit, errors, meta, setErrors } = useForm({
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
    submitError.value = error.statusMessage || 'An unknown error occured';
    if (error.data?.data) {
      setErrors(error.data?.data);
    }
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
    return true;
  }
});
</script>

<template>
  <div class="container max-w-md mx-auto mt-4">
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
      <AppFormField
        label="Latitude"
        :error="errors.lat"
        type="number"
        name="lat"
        :disabled="loading"
      />
      <AppFormField
        label="Longitude"
        :error="errors.long"
        type="number"
        name="long"
        :disabled="loading"
      />

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
