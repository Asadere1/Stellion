<template>
  <IndexPageWrapper
    ref="wrapper"
    :selected-row="selectedRow"
    :show-delete-popup="showDeletePopup"
    entity="integration"
    @updateSelectedRow="($ev) => (selectedRow = $ev)"
    @updateShowEditPopup="($ev) => (showEditPopup = $ev)"
    @updateShowDeletePopup="($ev) => (showDeletePopup = $ev)"
    @setLoading="($ev) => (loading = $ev)"
  >
    <template v-slot:header>
      <Header :title="$t('integrations.plural')" :showExport="false" />
    </template>
    <template v-slot:table>
      <TableComponent
        v-if="rows"
        :rows="rows"
        :columns="columns"
        @edit="wrapper?.editRow"
        @delete="wrapper?.deleteRow"
      />

      <q-separator class="full-width q-my-md" />

      <div class="row gap-sm full-width wrap">
        <NewIntegration
          v-for="int in integrations"
          :key="`int-${int.logo}`"
          :name="int.name"
          :logo="int.logo"
          :title="$t(int.title)"
          :type="int.type"
          :disabled="int.disabled"
          :description="$t(int.description)"
          class="col"
        />
      </div>
    </template>
    <template v-slot:dialogs>
      <DialogComponent
        v-if="selectedRow"
        v-model="showDeletePopup"
        :title="`${$t('generic.doYouReally')} ${$t('generic.delete')} \'${
          selectedRow.name
        }\' ${$t('generic.listing')}?`"
        size="small"
        :confirmButtonLabel="$t('generic.delete')"
        :loading="loading"
        confirmButtonLevel="negative"
        @confirm="deleteItem"
      />
      <DialogComponent
        v-if="selectedRow"
        v-model="showEditPopup"
        :title="`<div class='row'><span class='text-weight-bold row items-center'><img src='/general/edit-light.svg' class='q-mr-sm' />${$t(
          'generic.edit'
        )} ${$t(
          'integrations.single'
        )}</span><small class='text-dark-6 q-ml-md'>${$t(
          'generic.general'
        )}</small></div>`"
        documentationRoute="/documentation/integrations"
        size="large"
        :confirmButtonLabel="$t('generic.update')"
        :loading="loading"
        @confirm="updateItem"
      >
        <IntegrationEntityForm
          :selectedRow="selectedRow"
          @update="($ev) => (selectedRow = $ev)"
          contained
        />
      </DialogComponent>
    </template>
  </IndexPageWrapper>
</template>

<script lang="ts">
export default {
  name: 'IntegrationsPage',
};
</script>

<script lang="ts" setup>
import TableComponent from 'src/components/Global/TableComponent.vue';
import { nextTick, computed, ref } from 'vue';
import { useIntegrationsStore } from 'stores/integrations-store';
import {
  EntityStatus,
  Integration,
  IntegrationType,
} from 'src/utils/EntityDefinitions';
import { IntegrationCardDefinition, TableColumn } from 'src/utils/Models';
import IndexPageWrapper from 'src/components/Global/IndexPageWrapper.vue';
import DialogComponent from 'src/components/Global/DialogComponent.vue';
import Header from 'src/components/Layout/Header.vue';
import NewIntegration from 'src/components/Integrations/NewIntegration.vue';
import IntegrationEntityForm from 'src/components/Integrations/IntegrationEntityForm.vue';
const store = useIntegrationsStore();
const wrapper = ref<typeof IndexPageWrapper>();
const showDeletePopup = ref(false);
const showEditPopup = ref(false);
const selectedRow = ref<Integration>();
const loading = ref(false);
const rows = computed(() => {
  return store.getIntegrations;
});
const logoLookup = {
  1: '/integration/Shopify.svg',
  2: '/integration/Facebook.svg',
  3: '/integration/Klaviyo.svg',
  4: '/integration/Snapchat.svg',
  5: '/integration/TikTok.svg',
  6: '',
  7: '',
};

const columns: TableColumn[] = [
  {
    name: 'logo',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row: Integration) => (row.type ? logoLookup[row.type] : ''),
    sortable: true,
    image: true,
  },
  {
    name: 'name',
    required: true,
    label: '',
    align: 'left',
    field: (row: Integration) => row.name,
    sortable: true,
  },
  {
    name: 'type',
    required: true,
    label: 'Type',
    align: 'left',
    field: (row: Integration) => IntegrationType[row.type],
    sortable: true,
  },
  {
    name: 'status',
    required: true,
    label: 'Status',
    align: 'left',
    field: (row: Integration) => row.status,
    format: (val) => {
      return {
        label: EntityStatus[val],
        val,
      };
    },
    sortable: true,
  },
  {
    name: 'actions',
    required: true,
    label: 'Actions',
    align: 'right',
    field: () => null,
    actions: ['edit' /*, 'delete'*/],
  },
];

const deleteItem = async () => {
  if (selectedRow.value) {
    loading.value = true

    await store.deleteItem({
      which: 'integration',
      entity: selectedRow.value,
    })

    nextTick(() => {
      selectedRow.value = undefined
      showEditPopup.value = false
      loading.value = false
    })

  }
};

const updateItem = async () => {
  if (selectedRow.value) {
    loading.value = true

    await store.updateItem({
      which: 'integration',
      entity: selectedRow.value,
      entityName: 'integration',
    })

    nextTick(() => {
      selectedRow.value = undefined
      showEditPopup.value = false
      loading.value = false
    })
  }
};

// pull integrations every time the page loads
// this will ensure it gets updated after returning from adding an integration
store.pullData<Integration[]>('integration');

const integrations = computed(() => {
  const integrationList: IntegrationCardDefinition[] = [];

  if (
    !store.integration_shopify &&
    rows.value?.filter((int) => int.type === 1).length === 0
  ) {
    integrationList.push({
      name: 'Shopify',
      logo: '/integration/Shopify.svg',
      title: 'integrations.shopify',
      description: 'integrations.shopifyDesc',
      type: 1,
    });
  }
  if (!store.integration_facebook) {
    integrationList.push({
      name: 'Facebook',
      logo: '/integration/Facebook.svg',
      title: 'integrations.facebookPixel',
      description: 'integrations.facebookPixelDesc',
      type: 2,
      disabled: true,
    });
  }
  if (!store.integration_klaviyo) {
    integrationList.push({
      name: 'Klaviyo',
      logo: '/integration/Klaviyo.svg',
      title: 'integrations.klaviyo',
      description: 'integrations.klavioDesc',
      type: 3,
      disabled: true,
    });
  }
  if (!store.integration_snapchat) {
    integrationList.push({
      name: 'Snapchat',
      logo: '/integration/Snapchat.svg',
      title: 'integrations.snapchat',
      description: 'integrations.snapchatDesc',
      type: 4,
      disabled: true,
    });
  }
  if (!store.integration_tiktok) {
    integrationList.push({
      name: 'TikTok',
      logo: '/integration/TikTok.svg',
      title: 'integrations.tiktok',
      description: 'integrations.tiktokDesc',
      type: 5,
      disabled: true,
    });
  }

  return integrationList;
});
</script>
