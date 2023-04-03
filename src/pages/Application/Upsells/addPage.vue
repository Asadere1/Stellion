<template>
  <div class="column q-pa-lg overflow-auto full-height no-wrap">
    <div
      class="row justify-between items-center bg-warning-light rounded-1 q-pa-lg q-mb-lg"
    >
      <div class="column">
        <h6 class="q-mt-none q-mb-md">{{ $t('upsells.skipTheQueue') }}</h6>
        <p class="q-my-none">{{ $t('upsells.twiceAsFast') }}</p>
      </div>
      <ButtonComponent
        level="tertiary"
        :label="$t('generic.add') + ' - $3.66'"
        icon="/general/shopping-cart.svg"
        :stretch="false"
        size="md"
        padding="sm lg"
      />
    </div>

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
            {{ $t('generic.add') }} {{ $t('upsells.single') }}
          </span>
          <small class="text-dark-6 q-ml-md">{{ $t('generic.general') }}</small>
        </div>
      </h5>

      <div class="row gap-md">
        <q-toggle
          v-model="newUpsell.active"
          color="positive"
          class=""
          :label="$t('generic.active')"
        />
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
      <UpsellEntityForm
        ref="entityForm"
        :selectedRow="newUpsell"
        @update="($event) => (newUpsell = $event)"
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
  name: 'AddUpsellPage',
};
</script>

<script lang="ts" setup>
import ButtonComponent from 'src/components/Global/ButtonComponent.vue';
import UpsellEntityForm from 'src/components/Upsells/UpsellEntityForm.vue';
import { Upsell } from 'src/utils/EntityDefinitions';
import { ref } from 'vue';
import { useShopManagementStore } from 'stores/shop-management-store';
import { QForm } from 'quasar';
import { useRouter } from 'vue-router';

const store = useShopManagementStore();

const router = useRouter();

const newUpsell = ref(new Upsell());

const entityForm = ref<typeof UpsellEntityForm>();

const valid = ref(true);

const save = async () => {
  const form = entityForm.value?.form as QForm;
  valid.value = await form.validate();

  if (valid.value) {
    await store.addItem({
      which: 'upsells',
      entity: newUpsell.value,
    });
  }

  router.back();
};
</script>
