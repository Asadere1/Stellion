<template>
  <div class="column q-px-lg">
    <template v-if="selectedRow">
      <h4 class="text-weight-bold q-mt-lg q-mb-none">{{ route.params.id }}</h4>

      <q-separator class="full-width q-my-lg" />

      <p class="q-mb-lg">
        {{
          `From Product ${selectedRow?.order} via Order ${selectedRow?.order}`
        }}
      </p>

      <TableComponent v-if="rows" :rows="rows" :columns="columns" />
    </template>
    <h4 v-else class="text-weight-bold q-my-md">
      {{ $t('management.nonExistantManagementSubscription') }}
    </h4>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ManagementSubscriptionPage',
};
</script>

<script lang="ts" setup>
import TableComponent from 'src/components/Global/TableComponent.vue';
import { computed } from 'vue';
import { useDataStore } from 'stores/data-store';
import { ManagementSubscription } from 'src/utils/EntityDefinitions';
import { TableColumn } from 'src/utils/Models';
import { useRoute } from 'vue-router';

const store = useDataStore();

const route = useRoute();

const rows = computed(() => {
  return store.getManagementSubscriptions;
});

const selectedRow = computed(
  () =>
    store.getManagementSubscriptions?.filter(
      (sub) => sub.id === (route.params.id as string)
    )[0] || null
) as unknown as null | ManagementSubscription;

const columns: TableColumn[] = [
  {
    name: 'information',
    required: true,
    label: 'Information',
    align: 'left',
    field: (row: ManagementSubscription) => row.id,
    sortable: true,
  },
  {
    name: 'status',
    required: true,
    label: 'Status',
    align: 'left',
    field: (row: ManagementSubscription) => row.status,
    sortable: true,
  },
];
</script>
