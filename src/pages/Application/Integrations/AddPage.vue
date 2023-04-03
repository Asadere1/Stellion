<template>
  <div class="column q-pa-lg overflow-auto full-height no-wrap">
    <div class="row justify-between items-center q-pa-none">
      <h5 class="q-my-none">
        <div class="row">
          <span class="text-weight-bold row items-center text-capitalize">
            {{ $route.params.name }}
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
          @click="$router.push('/documentstion/integrations')"
        />
      </div>
    </div>

    <IntegrationEntityForm
      ref="entityForm"
      :selectedRow="newIntegration"
      @update="($event) => (newIntegration = $event)"
    />

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
  name: 'IntegrationsPage',
  components: { IntegrationEntityForm },
};
</script>

<script lang="ts" setup>
import ButtonComponent from 'src/components/Global/ButtonComponent.vue';
import IntegrationEntityForm from 'src/components/Integrations/IntegrationEntityForm.vue';
import { Integration, IntegrationType } from 'src/utils/EntityDefinitions';
import { ref } from 'vue';
import { useIntegrationsStore } from 'stores/integrations-store';
import { useRoute, useRouter } from 'vue-router';
const store = useIntegrationsStore();
const router = useRouter();
const route = useRoute();
/**
 * SHOPIFY ACCOUNT DETAILS
 * 
  "store_name": "skinr20",
  "access_token": "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"
 */

const newIntegration = ref(
  new Integration({ type: +route.params.integtationType })
);

async function save() {
  try {
    console.log('route.params: ', route.params);
    const payload = {
      type: +route.params.integtationType as unknown as IntegrationType, // 'shopify', // (route.params.name as string).toLowerCase(),
      name: newIntegration.value.name,
      token: newIntegration.value.key,
      domain: '',
    };

    if (newIntegration.value.domain) {
      payload.domain = newIntegration.value.domain;
    }
    await store.addIntegration(payload);

    router.back();
  } catch (err) {
    console.error(err);
  }
}
</script>
