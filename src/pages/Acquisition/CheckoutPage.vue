<template>
  <div class="column justify-center items-center">
    <h4 class="text-center text-weight-bold" style="width: 416px; margin-top: 65px; margin-bottom: 48px;">
      {{ $t('checkout.title') }}
    </h4>
    <div
      class="row bg-white rounded-1 overflow-hidden col q-pa-xl gap-xl"
      style="width: 70vw; max-width: 1000px"
    >
      <q-form class="col">
        <InputField
          v-model="creds.shopLink"
          :label="$t('checkout.shopLink')"
          placeholder="Enter shop link"
          class="q-mb-md"
        />
        <InputField
          v-model="creds.address"
          :label="$t('checkout.address')"
          class="q-mb-md"
          placeholder="Enter Address"
        />
        <div class="row q-gutter-md">
          <InputField
            v-model="creds.postcode"
            :label="$t('checkout.postcode')"
            class="q-mb-md col"
            placeholder="Enter postal code"
          />
          <InputField
            v-model="creds.city"
            :label="$t('checkout.city')"
            class="q-mb-md col"
            placeholder="Enter city"
          />
        </div>
        <InputField
          v-model="creds.cardNumber"
          :label="$t('checkout.cardNumber')"
          class="q-mb-md"
          mask="card"
          placeholder="Enter card number"
        />
        <div class="row q-gutter-md">
          <InputField
            v-model="creds.expiryDate"
            :label="$t('checkout.Expire')"
            class="q-mb-md col"
            mask="##/##"
            :fill-mask="false"
            placeholder="MM/YY"
          />
          <InputField
            v-model="creds.cvc"
            :label="$t('checkout.cvc')"
            class="q-mb-md col"
            :fill-mask="false"
            mask="###"
            placeholder="Enter CVC"
          />
        </div>
      </q-form>
      <div class="col">
        <p class="text-primary text-uppercase text-weight-bold" id="chosen-offer">
          {{ $t('offer.offer') }} {{ chosenOffer }}
        </p>
        <p class="text-h5 text-weight-bold" style="margin-bottom: 16px;">
          {{ $t(`offer.offer${chosenOffer}.title`) }}
        </p>
        <ul class="bullets">
          <li>
            <q-avatar
              color="primary-light"
              text-color="primary"
              icon="check"
              class="q-mr-sm"
              size="sm"
              padding="sm"
            />{{ $t(`offer.offer${chosenOffer}.bullet1`) }}
          </li>
          <li>
            <q-avatar
              color="primary-light"
              text-color="primary"
              icon="check"
              class="q-mr-sm"
              size="sm"
              padding="sm"
            />{{ $t(`offer.offer${chosenOffer}.bullet2`) }}
          </li>
          <li>
            <q-avatar
              color="primary-light"
              text-color="primary"
              icon="check"
              class="q-mr-sm"
              size="sm"
              padding="sm"
            />{{ $t(`offer.offer${chosenOffer}.bullet3`) }}
          </li>
          <li>
            <q-avatar
              color="primary-light"
              text-color="primary"
              icon="check"
              class="q-mr-sm"
              size="sm"
              padding="sm"
            />{{ $t(`offer.offer${chosenOffer}.bullet4`) }}
          </li>
          <li>
            <q-avatar
              color="primary-light"
              text-color="primary"
              icon="check"
              class="q-mr-sm"
              size="sm"
              padding="sm"
            />{{ $t(`offer.offer${chosenOffer}.bullet5`) }}
          </li>
          <li>
            <q-avatar
              color="primary-light"
              text-color="primary"
              icon="check"
              class="q-mr-sm"
              size="sm"
              padding="sm"
            />{{ $t(`offer.offer${chosenOffer}.bullet6`) }}
          </li>
        </ul>
        <q-separator class="col q-my-md" />
        <InputField
          v-model="creds.discount"
          :label="$t('checkout.discount')"
          :placeholder="$t('checkout.enterPromoCode')"
          class="q-mb-lg"
        />
        <ButtonComponent
          :label="$t('generic.subscribe')"
          stretch
          @click="$router.push('/success')"
          style="margin-top: 24px;"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CheckoutPage',
};
</script>

<script lang="ts" setup>
import ButtonComponent from 'src/components/Global/ButtonComponent.vue';
import InputField from 'src/components/Global/InputField.vue';

import { computed, reactive } from 'vue';

const creds = reactive({
  shopLink: '',
  address: '',
  postcode: '',
  city: '',
  cardNumber: '',
  expiryDate: '',
  cvc: '',
  discount: '',
});

const chosenOffer = computed(() => 2);
</script>

<style lang="scss">
.column {
  p {
    font-weight: 500;
    color: $dark-1 !important;
    margin-bottom: 10px;
  }
}

.bullets {
  li {
    margin-bottom: 12px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
}

#chosen-offer {
  margin-bottom: 8px;
  color: $primary !important;
}
</style>
