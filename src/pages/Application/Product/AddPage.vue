<template>
  <div class="column q-pa-lg overflow-auto full-height no-wrap">
    <h6
      v-if="!valid"
      class="row justify-between items-center bg-negative-light text-negative rounded-1 q-py-md q-px-lg q-mt-none q-mb-md"
    >
      {{ $t('errors.invalidDetails') }}
    </h6>

    <div class="row justify-between items-center q-pa-none">
      <h5 class="q-my-none">
        <div class="row">
          <span class="text-weight-bold row items-center">
            {{ $t('generic.new') }} {{ $t('product.subscription') }}
          </span>
          <small class="text-dark-6 q-ml-md">{{ $t('generic.general') }}</small>
        </div>
      </h5>

      <div class="row gap-md">
        <ButtonComponent
          level="accent"
          :label="$t('generic.readDocu')"
          :stretch="false"
          size="md"
          padding="sm lg"
          @click="$router.push('/documentstion/upsells')"
        />
      </div>
    </div>

    <div class="col overflow-auto q-my-md">
      <ProductSubscriptionEntityForm
        ref="entityForm"
        :selectedRow="newProductSubscription"
        @update="($event) => (newProductSubscription = $event)"
      />
    </div>

    <div class="q-pa-none row justify-end gap-sm">
      <ButtonComponent
        level="cta"
        :label="$t('generic.save')"
        :stretch="false"
        size="md"
        padding="sm xl"
        @click="save"
      />
      <ButtonComponent
        level="tertiary"
        :label="$t('generic.cancel')"
        :stretch="false"
        size="md"
        padding="sm xl"
        @click="$router.back()"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AddProductPage',
};
</script>

<script lang="ts" setup>
import ButtonComponent from 'src/components/Global/ButtonComponent.vue';
import { Subscription } from 'src/utils/EntityDefinitions';
import { ref } from 'vue';
import { useShopManagementStore } from 'stores/shop-management-store';
import { QForm } from 'quasar';
import { useRouter } from 'vue-router';
import ProductSubscriptionEntityForm from 'src/components/Products/ProductSubscriptionEntityForm.vue';

const store = useShopManagementStore();

const router = useRouter();

const newProductSubscription = ref(new Subscription());

const entityForm = ref<typeof ProductSubscriptionEntityForm>();

const valid = ref(true);

const save = async () => {
  const form = entityForm.value?.form as QForm;
  valid.value = await form.validate();

  if (valid.value) {
    await store.addItem({
      which: 'subscriptions',
      entity: newProductSubscription.value,
    });
  }

  router.back();
};
</script>
