<template>
  <q-form class="" ref="form" greedy>
    <h5 class="q-mt-none q-mb-md">{{ $t('customizer.contact') }}</h5>
    <InputField
      :model-value="shopifyCartData.email"
      @update:model-value="
        (ev) =>
          $emit('updateProp', {
            prop: 'email',
            value: ev,
          })
      "
      :placeholder="$t('customizer.emailPlaceholder')"
      :rules="[
        (val) => !!val || 'Field is required',
        (val) => validateEmail(val) || 'Valid email required',
      ]"
    />
    <h5 class="q-mt-lg q-mb-md">{{ $t('customizer.shippingAddress') }}</h5>
    <div class="column gap-md">
      <InputField
        type="select"
        :select-options="countries"
        :model-value="shopifyCartData.shippingCountry"
        @update:model-value="
          (ev) =>
            $emit('updateProp', {
              prop: 'shippingCountry',
              value: ev,
            })
        "
        :placeholder="$t('generic.country')"
        class="col"
        :rules="[(val) => !!val || 'Field is required']"
      />
      <div class="row gap-md">
        <InputField
          :model-value="shopifyCartData.firstName"
          @update:model-value="
            (ev) =>
              $emit('updateProp', {
                prop: 'firstName',
                value: ev,
              })
          "
          :placeholder="`${$t('registration.registration.first')} ${$t(
            'generic.name'
          )}`"
          :rules="[(val) => !!val || 'Field is required']"
          class="col"
        />
        <InputField
          :model-value="shopifyCartData.lastName"
          @update:model-value="
            (ev) =>
              $emit('updateProp', {
                prop: 'lastName',
                value: ev,
              })
          "
          :placeholder="`${$t('registration.registration.last')} ${$t(
            'generic.name'
          )}`"
          :rules="[(val) => !!val || 'Field is required']"
          class="col"
        />
      </div>
      <!--
      <InputField
        :model-value="shopifyCartData.shipping_appt"
        @update:model-value="
          (ev) =>
            $emit('updateProp', {
              prop: 'shipping_appt',
              value: ev,
            })
        "
        :placeholder="$t('customizer.apptSuite')"
        :rules="[(val) => !!val || 'Field is required']"
        class="col"
      />
      -->
      <InputField
        :model-value="shopifyCartData.shippingAddress1"
        @update:model-value="
          (ev) =>
            $emit('updateProp', {
              prop: 'shippingAddress1',
              value: ev,
            })
        "
        :placeholder="$t('generic.address')"
        :rules="[(val) => !!val || 'Field is required']"
        class="col"
      />
      <InputField
        :model-value="shopifyCartData.shippingCity"
        @update:model-value="
          (ev) =>
            $emit('updateProp', {
              prop: 'shippingCity',
              value: ev,
            })
        "
        :placeholder="$t('generic.city')"
        :rules="[(val) => !!val || 'Field is required']"
        class="col"
      />
      <div class="row gap-md">
        <InputField
          :model-value="shopifyCartData.shippingState"
          @update:model-value="
            (ev) =>
              $emit('updateProp', {
                prop: 'shippingState',
                value: ev,
              })
          "
          :placeholder="$t('generic.state')"
          :rules="[(val) => !!val || 'Field is required']"
          class="col"
        />
        <InputField
          :model-value="shopifyCartData.shippingZip"
          @update:model-value="
            (ev) =>
              $emit('updateProp', {
                prop: 'shippingZip',
                value: ev,
              })
          "
          :placeholder="$t('generic.zip')"
          :rules="[(val) => !!val || 'Field is required']"
          class="col"
        />
      </div>
      <InputField
        type="tel"
        mask="(###) ### - ####"
        :model-value="shopifyCartData.phone"
        @update:model-value="
          (ev) =>
            $emit('updateProp', {
              prop: 'phone',
              value: ev,
            })
        "
        :hint="$t('generic.phoneDesc')"
        :rules="[(val) => !!val || 'Field is required']"
        class="col"
      />
      <ButtonComponent
        level="accent"
        :label="`${$t('generic.continue')} ${$t('generic.to')} ${$t(
          'shipping.single'
        )}`"
        :stretch="false"
        size="md"
        padding="sm xl"
        @click="$emit('save')"
      />
    </div>
  </q-form>
</template>

<script lang="ts">
export default {
  name: 'InformationForm',
  components: { ButtonComponent, InputField },
};
</script>

<script lang="ts" setup>
import { PropType, ref } from 'vue';
import countries from 'src/utils/countries';
import ButtonComponent from 'components/Global/ButtonComponent.vue';
import InputField from 'components/Global/InputField.vue';
import { QForm } from 'quasar';
import { validateEmail } from 'src/utils/helpers';
import { Customizer, ShopifyCartData } from 'src/utils/EntityDefinitions';

defineProps({
  customizer: {
    type: Object as PropType<Customizer>,
    required: true,
  },
  shopifyCartData: {
    type: Object as PropType<ShopifyCartData>,
    required: true,
  },
});

const form = ref<QForm>();
defineExpose({
  form,
});
</script>
