<template>
  <q-form class="column product-entity-form" ref="form" greedy>
    <div :class="contained ? '' : 'q-pa-lg q-mt-md rounded-1 border-dark-3'" style="padding: 30px !important;">
      <InputField
        v-model="entityDupe.name"
        :label="$t('generic.name')"
        class="col q-mb-lg"
        filled
        :rules="[(val) => !!val || 'Field is required']"
      />
      <div class="row q-col-gutter-md">
        <InputField
          type="number"
          v-model="entityDupe.rebillPeriod"
          :label="$t('product.rebillPeriod')"
          class="col-6 q-mb-lg"
          filled
        >
          <template v-slot:append>
            <small class="q-ma-none">{{ $t('generic.days') }}</small>
          </template>
        </InputField>
        <InputField
          v-model="entityDupe.trialPeriod"
          :label="$t('product.trialPeriod')"
          class="col-6 q-mb-lg"
          filled
          :rules="[(val) => !!val || 'Field is required']"
        >
          <template v-slot:append>
            <small class="q-ma-none">{{ $t('generic.days') }}</small>
          </template>
        </InputField>
      </div>
      <InputField
        v-model="entityDupe.termsLink"
        :label="$t('product.termsAndConsLink')"
        class="col q-mb-lg"
        filled
        :rules="[(val) => !!val || 'Field is required']"
      />
      <InputField
        type="select"
        :select-options="shopifyProducts"
        v-model="entityDupe.shopifyProduct"
        :label="$t('generic.shopifyProduct')"
        class="col"
        :class="contained ? 'q-mb-md' : 'q-mb-none'"
        filled
        style=""
      />
    </div>

    <h5
      class="q-mt-none text-weight-bold"
      :class="contained ? 'q-mb-md' : 'q-mb-none q-mt-lg'"
    >
      {{ $t('generic.display') }}
    </h5>

    <div :class="contained ? '' : 'q-pa-lg q-mt-md rounded-1 border-dark-3'">
      <InputField
        v-model="entityDupe.text"
        :label="$t('generic.text')"
        class="q-mb-lg col"
        filled
        :rules="[(val) => !!val || 'Field is required']"
      />
      <InputField
        v-model="entityDupe.subtext"
        :label="$t('generic.subtext')"
        class="q-mb-sm col"
        filled
        :rules="[(val) => !!val || 'Field is required']"
      />
    </div>
  </q-form>
</template>

<script lang="ts">
export default {
  name: 'ProductEntityFormComponent',
};
</script>

<script lang="ts" setup>
import { QForm } from 'quasar';
import InputField from 'src/components/Global/InputField.vue';
import { Subscription } from 'src/utils/EntityDefinitions';
import { computed, PropType, reactive, ref, watch } from 'vue';
import { useShopManagementStore } from 'stores/shop-management-store';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const store = useShopManagementStore();

const props = defineProps({
  selectedRow: {
    type: Object as PropType<Subscription>,
    required: true,
  },
  contained: {
    type: Boolean,
  },
});

const emit = defineEmits(['update']);

const entityDupe = reactive<Subscription>({ ...props.selectedRow });

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

const shopifyProducts = computed(() => {
  return [
    {
      label: t('product.chooseProduct'),
      value: 0,
    },
    ...(store.shopifyProducts?.map((product) => {
      return {
        label: product.title,
        value: product.id,
      };
    }) || []),
  ];
});

defineExpose({
  form,
});

store.pullShopifyProducts();
</script>

<style lang="scss">
.border-dark-3 {
  border: 1px solid #d6d8ea !important;
}

.product-entity-form {
  .column {
    margin-bottom: 20px !important;
    p {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 10px;
      color: #000034 !important;
    }
  }

  .q-field {
    height: 46px;
    color: #84849A;
    .q-field__control {
      justify-content: center;
      align-items: center;
      height: 46px;
      font-size: 16px;
    }

    .q-field__native {
      min-height: 0px;
      font-size: 16px;
      color: #84849A !important;
      font-weight: 500 !important;
    }

    .q-field__append {
      font-size: 16px;
      font-weight: 500;
      color: #84849A !important;
    }
  }
}
</style>
