<template>
  <div class="column q-pa-lg overflow-auto full-height no-wrap">
    <div class="row justify-between items-center q-pa-none">
      <h5 class="q-my-none">
        <div class="row">
          <span class="text-weight-bold row items-center">
            {{ $t('generic.add') }} {{ $t('discounts.single') }}
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
          @click="$router.push('/documentstion/discounts')"
        />
      </div>
    </div>

    <div class="col overflow-auto q-my-md">
      <DiscountEntityForm
        ref="entityForm"
        :selectedRow="newDiscount"
        @update="($event) => (newDiscount = $event)"
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
  name: 'AddDiscountPage',
  components: { ButtonComponent, DiscountEntityForm },
};
</script>

<script lang="ts" setup>
import DiscountEntityForm from 'src/components/Discounts/DiscountEntityForm.vue';
import ButtonComponent from 'src/components/Global/ButtonComponent.vue';
import { ref } from 'vue';
import { useShopManagementStore } from 'stores/shop-management-store';
import { QForm } from 'quasar';
import { useRouter } from 'vue-router';
import { Discount } from 'src/utils/EntityDefinitions';

const store = useShopManagementStore();

const router = useRouter();

const newDiscount = ref(new Discount());

const entityForm = ref<typeof DiscountEntityForm>();

const valid = ref(true);

const save = async () => {
  const form = entityForm.value?.form as QForm;
  valid.value = await form.validate();

  if (valid.value) {
    await store.addItem({
      which: 'discounts',
      entity: newDiscount.value,
    });
  }

  router.back();
};
</script>
