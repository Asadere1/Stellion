<template>
  <q-form class="" ref="form" greedy v-if="shopifyCartData && cartPayload">
    <h5 class="q-mt-none q-mb-md">{{ $t('customizer.contact') }}</h5>
    <p class="row">
      <span class="text-capitalize q-mr-md col-5"
        >{{ $t('shipping.single') }} {{ $t('generic.to') }}:</span
      >
      <span class="text-weight-bold">{{
        countries.filter(
          (country) => country.value === shopifyCartData.shippingCountry
        )[0].label
      }}</span>
    </p>

    <q-separator class="col" />

    <h5 class="q-mt-lg q-mb-md">{{ $t('customizer.shippingMethod') }}</h5>

    <h6
      v-if="submitted && !shopifyCartData.shippingId"
      class="q-ma-none q-mt-md q-pa-md rounded-1 bg-negative-light text-negative"
    >
      {{ $t('customizer.shippingErrorMessage') }}
    </h6>

    <template v-if="cartPayload">
      <q-radio
        v-for="method in cartPayload.shipping_methods"
        :key="`shipping-method-${method.id}`"
        :val="method.id"
        :model-value="shopifyCartData.shippingId"
        @update:model-value="
          (ev) =>
            $emit('updateProp', {
              prop: 'shippingId',
              value: ev,
            })
        "
        class="full-width"
        color="positive"
      >
        <p class="q-ma-none">
          {{ method.name }} (<span
            v-currency="{ amount: method.amount_trial }"
          />)
        </p>
      </q-radio>
    </template>

    <ButtonComponent
      level="accent"
      :label="`${$t('generic.continue')} ${$t('generic.to')} ${$t(
        'orders.payment'
      )}`"
      size="md"
      padding="sm xl"
      class="q-mt-md"
      @click="(submitted = true), $emit('save')"
    />
    <ButtonComponent
      level="tertiary"
      :label="`${$t('generic.back')} ${$t('generic.to')} ${$t(
        'orders.information'
      )}`"
      size="md"
      padding="sm xl"
      class="q-mt-md"
      @click="$emit('back')"
    />
  </q-form>
</template>

<script lang="ts">
export default {
  name: 'ShippingForm',
};
</script>

<script lang="ts" setup>
import { PropType, ref } from 'vue';
import countries from 'src/utils/countries';
import ButtonComponent from 'components/Global/ButtonComponent.vue';
import { QForm } from 'quasar';
import {
  CartJsonResponse,
  Customizer,
  ShopifyCartData,
} from 'src/utils/EntityDefinitions';

defineProps({
  shopifyCartData: {
    type: Object as PropType<ShopifyCartData>,
    required: true,
  },
  customizer: {
    type: Object as PropType<Customizer>,
    required: true,
  },
  cartPayload: {
    type: Object as PropType<CartJsonResponse>,
    required: true,
  },
});

const submitted = ref(false);

defineEmits(['save']);

const form = ref<QForm>();
defineExpose({
  form,
});
</script>
