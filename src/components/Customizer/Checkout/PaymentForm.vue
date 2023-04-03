<template>
  <q-form class="" ref="form" greedy>
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

    <p class="row">
      <span class="text-capitalize q-mr-md col-5"
        >{{ $t('generic.method') }}:</span
      >
      <span class="text-weight-bold q-mr-sm">{{ shippingMethod.name }}</span>
      <span
        class="text-weight-bold"
        v-currency="{ amount: shippingMethod.amount_trial }"
      />
    </p>

    <q-separator class="col" />

    <h5 class="q-mt-lg q-mb-sm">{{ $t('orders.payment') }}</h5>
    <p class="q-mb-md">{{ $t('customizer.paymentInstruction') }}</p>

    <h6 class="row justify-between q-my-lg">
      {{ $t('customizer.card') }}
      <img src="/customizer/card-payment-types.svg" />
    </h6>

    <div class="column gap-md">
      <InputField
        :model-value="shopifyCartData.creditCardNumber"
        :disable="processingCart"
        @update:model-value="
          (ev) =>
            $emit('updateProp', {
              prop: 'creditCardNumber',
              value: ev,
            })
        "
        :hint="$t('customizer.cardNumber')"
        :rules="[(val) => !!val || 'Field is required']"
        mask="card"
        class="col"
      />
      <div class="row gap-md">
        <InputField
          :model-value="shopifyCartData.expirationDate"
          :disable="processingCart"
          @update:model-value="
            (ev) =>
              $emit('updateProp', {
                prop: 'expirationDate',
                value: ev,
              })
          "
          :rules="[(val) => !!val || 'Field is required']"
          mask="##/##"
          :hint="$t('customizer.expDate')"
          class="col-7"
        />
        <InputField
          :model-value="shopifyCartData.CVV"
          :disable="processingCart"
          @update:model-value="
            (ev) =>
              $emit('updateProp', {
                prop: 'CVV',
                value: ev,
              })
          "
          :hint="$t('customizer.securityCode')"
          :rules="[(val) => !!val || 'Field is required']"
          mask="###"
          class="col"
        />
      </div>
    </div>

    <h6
      v-if="submitted && !shopifyCartData.agree_to_terms"
      class="q-ma-none q-mt-md q-pa-md rounded-1 bg-negative-light text-negative"
    >
      {{ $t('customizer.termsErrorMessage') }}
    </h6>

    <q-checkbox
      required
      :disable="processingCart"
      :model-value="shopifyCartData.agree_to_terms"
      @update:model-value="
        (ev) =>
          $emit('updateProp', {
            prop: 'agree_to_terms',
            value: ev,
          })
      "
      class="items-start q-mt-md"
      color="positive"
    >
      {{ $t('customizer.readAndAgreed') }}
      <a href="" @click.stop.prevent="openTC" target="_BLANK">{{
        $t('customizer.termsAndConditions')
      }}</a>
    </q-checkbox>

    <q-separator class="col" />

    <h5 class="q-mt-lg q-mb-sm">{{ $t('customizer.billingAddress') }}</h5>
    <p class="q-mb-md">{{ $t('customizer.billingAddressInstruction') }}</p>

    <q-radio
      :model-value="shopifyCartData.billingSameAsShipping"
      @update:model-value="
        (ev) =>
          $emit('updateProp', {
            prop: 'billingSameAsShipping',
            value: ev,
          })
      "
      val="YES"
      class="full-width"
      :disable="processingCart"
      :label="$t('customizer.sameAsShipping')"
    />
    <q-radio
      :model-value="shopifyCartData.billingSameAsShipping"
      @update:model-value="
        (ev) =>
          $emit('updateProp', {
            prop: 'billingSameAsShipping',
            value: ev,
          })
      "
      val="NO"
      :disable="processingCart"
      class="full-width"
      :label="$t('customizer.useDifferentBilling')"
    />

    <div
      class="column gap-md"
      v-if="shopifyCartData.billingSameAsShipping === 'NO'"
    >
      <InputField
        type="select"
        :select-options="countries"
        :model-value="shopifyCartData.billingCountry"
        @update:model-value="
          (ev) =>
            $emit('updateProp', {
              prop: 'billingCountry',
              value: ev,
            })
        "
        :placeholder="$t('generic.country')"
        :disable="processingCart"
        class="col"
        :rules="[(val) => !!val || 'Field is required']"
      />
      <div class="row gap-md">
        <InputField
          :model-value="shopifyCartData.billingFirstName"
          @update:model-value="
            (ev) =>
              $emit('updateProp', {
                prop: 'billingFirstName',
                value: ev,
              })
          "
          :placeholder="`${$t('registration.registration.first')} ${$t(
            'generic.name'
          )}`"
          :disable="processingCart"
          :rules="[(val) => !!val || 'Field is required']"
          class="col"
        />
        <InputField
          :model-value="shopifyCartData.billingLastName"
          @update:model-value="
            (ev) =>
              $emit('updateProp', {
                prop: 'billingLastName',
                value: ev,
              })
          "
          :placeholder="`${$t('registration.registration.last')} ${$t(
            'generic.name'
          )}`"
          :disable="processingCart"
          :rules="[(val) => !!val || 'Field is required']"
          class="col"
        />
      </div>

      <InputField
        :model-value="shopifyCartData.billingAddress1"
        @update:model-value="
          (ev) =>
            $emit('updateProp', {
              prop: 'billingAddress1',
              value: ev,
            })
        "
        :placeholder="$t('generic.address')"
        :disable="processingCart"
        :rules="[(val) => !!val || 'Field is required']"
        class="col"
      />

      <InputField
        :model-value="shopifyCartData.billingCity"
        @update:model-value="
          (ev) =>
            $emit('updateProp', {
              prop: 'billingCity',
              value: ev,
            })
        "
        :placeholder="$t('generic.city')"
        :disable="processingCart"
        :rules="[(val) => !!val || 'Field is required']"
        class="col"
      />
      <div class="row gap-md">
        <InputField
          :model-value="shopifyCartData.billingState"
          @update:model-value="
            (ev) =>
              $emit('updateProp', {
                prop: 'billingState',
                value: ev,
              })
          "
          :placeholder="$t('generic.state')"
          :disable="processingCart"
          :rules="[(val) => !!val || 'Field is required']"
          class="col"
        />
        <InputField
          :model-value="shopifyCartData.billingZip"
          @update:model-value="
            (ev) =>
              $emit('updateProp', {
                prop: 'billingZip',
                value: ev,
              })
          "
          :placeholder="$t('generic.zip')"
          :disable="processingCart"
          :rules="[(val) => !!val || 'Field is required']"
          class="col"
        />
      </div>
    </div>

    <ButtonComponent
      level="accent"
      :label="`${$t('orders.payment')}`"
      size="md"
      padding="sm xl"
      class="q-mt-md"
      :loading="processingCart"
      @click="(submitted = true), $emit('save')"
    />
    <ButtonComponent
      level="tertiary"
      :label="`${$t('generic.back')} ${$t('generic.to')} ${$t(
        'shipping.single'
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
  name: 'PaymentForm',
  components: { InputField },
};
</script>

<script lang="ts" setup>
import { PropType, ref } from 'vue';
import countries from 'src/utils/countries';
import ButtonComponent from 'components/Global/ButtonComponent.vue';
import InputField from 'components/Global/InputField.vue';
import { QForm } from 'quasar';
import {
  CartJsonResponse,
  Customizer,
  ShippingMethod,
  ShopifyCartData,
} from 'src/utils/EntityDefinitions';

const props = defineProps({
  shopifyCartData: {
    type: Object as PropType<ShopifyCartData>,
    required: true,
  },
  customizer: {
    type: Object as PropType<Customizer>,
    required: true,
  },
  processingCart: {
    type: Boolean,
    required: true,
  },
  cartPayload: {
    type: Object as PropType<CartJsonResponse>,
    required: true,
  },
  shippingMethod: {
    type: Object as PropType<ShippingMethod>,
    required: true,
  },
});

const form = ref<QForm>();

const submitted = ref(false);

function openTC() {
  window.open(props.customizer.tc_link, '_BLANK');
}
defineExpose({
  form,
});
</script>
