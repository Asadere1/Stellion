<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event)"
    :title="title"
  >
    <q-card
      flat
      class="column rounded-1 q-pa-lg overflow-hidden no-wrap"
      :style="[
        size === 'small' ? 'width: 300px;' : '',
        size === 'medium' ? 'width: 435px;' : '',
        size === 'large' ? 'width: 700px; max-width: 80vw;' : '',
      ]"
    >
      <q-card-section class="row justify-between items-center q-pa-none">
        <h6
          class="q-my-none"
          :class="size === 'small' ? 'text-center' : 'text-left'"
          v-html="title"
        />
        <ButtonComponent
          v-if="documentationRoute"
          level="tertiary"
          :label="$t('generic.readDocu')"
          :stretch="false"
          size="md"
          padding="md lg"
          @click="$router.push(documentationRoute as string)"
        />
      </q-card-section>

      <q-card-section class="col overflow-auto q-pa-none q-my-md q-mb-lg">
        <p v-if="message">{{ message }}</p>
        <slot v-else />
      </q-card-section>

      <q-card-actions align="right" v-if="size === 'large'" class="q-pa-none">
        <ButtonComponent
          :level="confirmButtonLevel || 'primary'"
          :label="confirmButtonLabel"
          :stretch="false"
          :loading="loading"
          size="md"
          padding="md lg"
          @click="$emit('confirm')"
        />
        <ButtonComponent
          level="tertiary"
          :label="$t('generic.cancel')"
          :stretch="false"
          size="md"
          padding="md lg"
          v-close-popup
        />
      </q-card-actions>
      <q-card-actions align="right" v-if="size === 'medium'" class="q-pa-none">
        <ButtonComponent
          :level="confirmButtonLevel || 'primary'"
          :label="confirmButtonLabel"
          :stretch="false"
          :loading="loading"
          size="md"
          padding="md lg"
          @click="$emit('confirm')"
        />
        <ButtonComponent
          level="tertiary"
          :label="$t('generic.cancel')"
          :stretch="false"
          size="md"
          padding="md lg"
          v-close-popup
        />
      </q-card-actions>
      <q-card-actions align="center" v-if="size === 'small'" class="q-pa-none">
        <ButtonComponent
          :level="confirmButtonLevel"
          :label="confirmButtonLabel"
          :stretch="false"
          :loading="loading"
          size="md"
          padding="md lg"
          @click="$emit('confirm')"
        />
        <ButtonComponent
          level="tertiary"
          :label="$t('generic.cancel')"
          :stretch="false"
          size="md"
          padding="md lg"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
export default {
  name: 'DialogComponent',
};
</script>

<script lang="ts" setup>
import ButtonComponent from 'src/components/Global/ButtonComponent.vue';
import { ButtonLevels } from 'src/utils/Models';

import { PropType } from 'vue';

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  documentationRoute: {
    type: String,
  },
  confirmButtonLabel: {
    type: String,
    required: true,
  },
  confirmButtonLevel: {
    type: String as PropType<ButtonLevels>,
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'small',
  },
  loading: {
    type: Boolean,
  },
});
</script>
