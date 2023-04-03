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
          type="number"
          v-model="entityDupe.amount_trial"
          :label="$t('generic.price')"
          :class="contained ? 'col-12' : 'q-mb-lg col-6'"
          filled
        />
      </div>
    </div>
    <!--
    <q-separator class="row q-my-md" v-if="contained" />

    <div class="flex" :class="contained ? 'full-width' : 'no-wrap gap-md'">
      <div :class="contained ? 'full-width' : 'col'">
        <div class="row items-center">
          <h5 class="q-mt-none text-weight-bold q-my-none">
            {{ $t('generic.weight') }}
          </h5>
          <q-toggle
            v-model="entityDupe.weightSpecific"
            color="positive"
            class="q-ml-md"
            :label="$t('shipping.specificRange')"
          />
        </div>

        <div
          :class="contained ? '' : 'q-pa-lg q-mt-md rounded-1 border-dark-3'"
        >
          <div class="row q-gutter-md">
            <InputField
              type="number"
              v-model="entityDupe.weightRangeMin"
              :label="$t('generic.minimum')"
              class="col"
              filled
              :rules="[(val) => !!val || 'Field is required']"
            />
            <InputField
              type="number"
              v-model="entityDupe.weightRangeMax"
              :label="$t('generic.maximum')"
              class="col"
              filled
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
        </div>
      </div>

      <q-separator class="full-width q-my-md" v-if="contained" />

      <div :class="contained ? 'full-width' : 'col'">
        <div class="row items-center">
          <h5 class="q-mt-none text-weight-bold q-my-none">
            {{ $t('shipping.cartTotal') }}
          </h5>
          <q-toggle
            v-model="entityDupe.weightSpecific"
            color="positive"
            class="q-ml-md"
            :label="$t('shipping.specificRange')"
          />
        </div>

        <div
          :class="contained ? '' : 'q-pa-lg q-mt-md rounded-1 border-dark-3'"
        >
          <div class="row q-gutter-md">
            <InputField
              type="number"
              v-model="entityDupe.weightRangeMin"
              :label="$t('shipping.cartTotalMin')"
              class="col"
              filled
              :rules="[(val) => !!val || 'Field is required']"
            />
            <InputField
              type="number"
              v-model="entityDupe.weightRangeMax"
              :label="$t('shipping.cartTotalMax')"
              class="col"
              filled
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
        </div>
      </div>
    </div>

    <q-separator class="row q-my-md" v-if="contained" />

    <div class="flex no-wrap gap-md" :class="contained ? '' : 'q-mt-lg'">
      <div :class="contained ? 'full-width' : 'col'">
        <div class="row items-center">
          <h5 class="q-mt-none text-weight-bold q-my-none">
            {{ $t('generic.countries') }}
          </h5>
          <q-toggle
            :model-value="entityDupe.countries.length === 0"
            @update:model-value="
              ($ev) => ($ev === true ? (entityDupe.countries = []) : null)
            "
            color="positive"
            class="q-ml-md"
            :label="$t('generic.allCountries')"
          />
        </div>

        <div
          :class="contained ? '' : 'q-pa-lg q-mt-md rounded-1 border-dark-3'"
        >
          <div class="row q-gutter-md">
            <InputField
              type="select"
              :select-options="countries"
              multiple
              v-model="entityDupe.countries"
              :label="$t('generic.country')"
              class="col"
              filled
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
        </div>
      </div>
      <div class="col" v-if="!contained" />
    </div>
  -->
  </q-form>
</template>

<script lang="ts">
export default {
  name: 'ShippingEntityFormComponent',
};
</script>

<script lang="ts" setup>
import { QForm } from 'quasar';
import InputField from 'src/components/Global/InputField.vue';
import { Shipping } from 'src/utils/EntityDefinitions';
import { PropType, reactive, ref, watch } from 'vue';

const props = defineProps({
  selectedRow: {
    type: Object as PropType<Shipping>,
    required: true,
  },
  contained: {
    type: Boolean,
  },
});

const emit = defineEmits(['update']);

const entityDupe = reactive<Shipping>({ ...props.selectedRow });

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
