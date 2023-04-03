<template>
  <q-form class="column" ref="form" greedy>
    <div :class="contained ? '' : 'q-pa-lg q-mt-md rounded-1 border-dark-3'">
      <div class="row q-col-gutter-md">
        <InputField
          v-model="entityDupe.name"
          :label="$t('generic.name')"
          :class="contained ? 'q-mb-sm col-12' : 'col-6'"
          filled
          :rules="[(val) => !!val || 'Field is required']"
        />
        <InputField
          v-model="entityDupe.code"
          :label="$t('generic.code')"
          :class="contained ? 'col-12' : 'q-mb-lg col-6'"
          filled
        />
      </div>
      <div class="row q-col-gutter-md" :class="contained ? 'q-mt-md' : ''">
        <InputField
          type="select"
          :select-options="optionsFromType(DiscountType)"
          v-model="entityDupe.type"
          :label="$t('generic.type')"
          :class="contained ? 'q-mb-sm col-12' : 'col-4'"
          filled
          :rules="[(val) => !!val || 'Field is required']"
        />
        <InputField
          type="number"
          v-model="entityDupe.value"
          :label="$t('generic.value')"
          :class="contained ? 'col-12' : 'q-mb-lg col-4'"
          filled
          currency
        />
        <InputField
          type="number"
          v-model="entityDupe.maxUsage"
          :label="$t('discounts.maxUsage')"
          :class="contained ? 'col-12' : 'q-mb-lg col-4'"
          filled
        />
      </div>
    </div>
  </q-form>
</template>

<script lang="ts">
export default {
  name: 'DiscountEntityFormComponent',
};
</script>

<script lang="ts" setup>
import { QForm } from 'quasar';
import InputField from 'src/components/Global/InputField.vue';
import { Discount, DiscountType } from 'src/utils/EntityDefinitions';
import { optionsFromType } from 'src/utils/helpers';
import { PropType, reactive, ref, watch } from 'vue';

const props = defineProps({
  selectedRow: {
    type: Object as PropType<Discount>,
    required: true,
  },
  contained: {
    type: Boolean,
  },
});

const emit = defineEmits(['update']);

const entityDupe = reactive<Discount>({ ...props.selectedRow });

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
