<template>
  <div class="column q-pa-lg overflow-auto full-height no-wrap">
    <div class="row justify-between items-center q-pa-none">
      <h5 class="q-my-none">
        <div class="row">
          <span class="text-weight-bold row items-center">
            {{ $t('generic.new') }} {{ $t('shipping.single') }}
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
          @click="$router.push('/documentstion/shipping')"
        />
      </div>
    </div>

    <div class="col overflow-auto q-my-md">
      <ShippingEntityForm
        ref="entityForm"
        :selectedRow="newShipping"
        @update="($event) => (newShipping = $event)"
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
  name: 'AddShippingPage',
};
</script>

<script lang="ts" setup>
import ButtonComponent from 'src/components/Global/ButtonComponent.vue';
import ShippingEntityForm from 'src/components/Shipping/ShippingEntityForm.vue';
import { Shipping } from 'src/utils/EntityDefinitions';
import { ref } from 'vue';
import { useShopManagementStore } from 'stores/shop-management-store';
import { QForm } from 'quasar';
import { useRouter } from 'vue-router';

const store = useShopManagementStore();

const router = useRouter();

const newShipping = ref(new Shipping());

const entityForm = ref<typeof ShippingEntityForm>();

const valid = ref(true);

const save = async () => {
  const form = entityForm.value?.form as QForm;
  valid.value = await form.validate();

  if (valid.value) {
    await store.addItem({
      which: 'shipping',
      entity: newShipping.value,
    });
  }

  router.back();
};
</script>
