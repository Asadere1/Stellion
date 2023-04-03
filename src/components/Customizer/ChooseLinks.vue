<template>
  <div class="column justify-center items-center q-px-md">
    <h5 class="q-mb-md q-mt-lg">{{ $t('navigation.customizer.Links') }}</h5>

    <q-form greedy ref="form">
      <div
        class="column full-width"
        v-for="(block, b) in linkBlocks"
        :key="`link-block-${block.model}`"
      >
        <p class="q-mt-none q-mb-sm text-subtitle1">{{ block.title }}</p>
        <InputField
          v-model="links[block.model].value"
          :placeholder="block.placeholder"
          :rules="[
            (val) => (b === 0 ? !!val || 'Field is required' : true),
            (val) =>
              val.length > 0
                ? isValidUrl(val) || 'Must be a full, valid URL'
                : true,
          ]"
          class="col"
        />
        <q-checkbox
          v-if="block.checkRequired"
          v-model="links[block.model].required"
          class="col"
          color="positive"
          :label="$t('customizer.checkRequired')"
        />
        <q-separator
          v-if="b < linkBlocks.length - 1"
          class="full-width q-my-lg"
        />
      </div>
    </q-form>
    <ButtonComponent
      level="secondary"
      :label="$t('generic.save')"
      size="md"
      padding="sm xl"
      class="q-mt-md"
      @click="save"
      :loading="loading"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'ChooseLinksComponent',
  components: { InputField, ButtonComponent },
};
</script>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import InputField from 'components/Global/InputField.vue';
import { useCustomizationsStore } from 'stores/customizations-store';
import ButtonComponent from 'components/Global/ButtonComponent.vue';
import { isValidUrl } from 'src/utils/helpers';
import { QForm } from 'quasar';

const store = useCustomizationsStore();
const { t } = useI18n();
const form = ref<QForm>();
const loading = ref(false);
const links = reactive({
  termsAndConditions: {
    value: store.getCustomizer?.tc_link || '',
    required: store.getCustomizer?.tc_link_checked || false,
  },
  privacyPolicy: {
    value: store.getCustomizer?.privacy_policy_link || '',
    required: false,
  },
  returnPolicy: {
    value: store.getCustomizer?.return_policy_link || '',
    required: false,
  },
  shippingPolicy: {
    value: store.getCustomizer?.shipping_policy_link || '',
    required: false,
  },
  refundPolicy: {
    value: store.getCustomizer?.refund_policy_link || '',
    required: false,
  },
});

const linkBlocks = [
  {
    title: t('customizer.termsAndConditions'),
    placeholder: 'www.demo.com',
    model: 'termsAndConditions',
    checkRequired: true,
  },
  {
    title: t('customizer.privacyPolicy'),
    placeholder: 'www.demo.com',
    model: 'privacyPolicy',
    checkRequired: false,
  },
  {
    title: t('customizer.returnPolicy'),
    placeholder: 'www.demo.com',
    model: 'returnPolicy',
    checkRequired: false,
  },
  {
    title: t('customizer.shippingPolicy'),
    placeholder: 'www.demo.com',
    model: 'shippingPolicy',
    checkRequired: false,
  },
  {
    title: t('customizer.refundPolicy'),
    placeholder: 'www.demo.com',
    model: 'refundPolicy',
    checkRequired: false,
  },
];

async function save() {
  if (form.value) {
    const valid = await form.value.validate();

    if (!valid) {
      return;
    }

    loading.value = true;

    const data = {
      tc_link: links.termsAndConditions.value,
      tc_link_checked: links.termsAndConditions.required,
      privacy_policy_link: links.privacyPolicy.value,
      return_policy_link: links.returnPolicy.value,
      shipping_policy_link: links.shippingPolicy.value,
      refund_policy_link: links.refundPolicy.value,
    };

    await store.customizerLinks(data);

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
}
</script>
