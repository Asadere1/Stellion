<template>
  <q-form
    class="q-pa-lg q-mt-md rounded-1 border-dark-3 q-mb-lg row gap-md"
    ref="form"
    greedy
  >
    <InputField
      v-model="entityDupe.name"
      :label="$t('generic.name')"
      class="col"
      filled
      :rules="[(val) => !!val || 'Field is required']"
    />
    <InputField
      v-model="entityDupe.key"
      :label="$t('generic.key')"
      class="col"
      filled
      :rules="[(val) => !!val || 'Field is required']"
    />
    <InputField
      v-if="requiresDomain"
      v-model="entityDupe.domain"
      :label="$t('generic.domain')"
      class="col"
      filled
      :rules="[(val) => !!val || 'Field is required']"
    />
  </q-form>
</template>

<script lang="ts">
/**
 * SHOPIFY ACCOUNT DETAILS
 * 
  "store_name": "skinr20",
  "access_token": "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"

  OLD
  "store_name": "thebestdealofurlife",
  "access_token": "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"
 */
export default {
  name: 'IntegrationEntityFormComponent',
};
</script>

<script lang="ts" setup>
import { QForm } from 'quasar';
import InputField from 'src/components/Global/InputField.vue';
import { Integration } from 'src/utils/EntityDefinitions';
import { PropType, reactive, ref, watch } from 'vue';

const props = defineProps({
  selectedRow: {
    type: Object as PropType<Integration>,
    required: true,
  },
  contained: {
    type: Boolean,
  },
});

const emit = defineEmits(['update']);

const entityDupe = reactive<Integration>({ ...props.selectedRow });

const integrationsRequiringDomain = [8];

const requiresDomain = integrationsRequiringDomain.includes(
  props.selectedRow.type
);

watch(
  entityDupe,
  (newVal) => {
    emit('update', newVal);
  },
  {
    deep: true,
  }
);

const form = ref<QForm>();

defineExpose({
  form,
});
</script>
