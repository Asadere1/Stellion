<template>
  <IndexPageWrapper
    ref="wrapper"
    :selected-row="selectedRow"
    entity="managementSubscriptions"
    @updateSelectedRow="($ev) => (selectedRow = $ev)"
    @setLoading="($ev) => (loading = $ev)"
  >
    <template v-slot:header>
      <Header
        filters
        :title="$t('management.subscriptions')"
        :tertiaryBtnLabel="$t('orders.massFulfillment')"
        @add="($ev) => (showMassFulfillmentPopup = $ev)"
        @export="($ev) => (showExportPopup = $ev)"
        @filters="($ev) => (showFiltersPopup = $ev)"
        @clearFilters="clearFilters"
        :appliedFilterCount="appliedFilters.length"
      />
    </template>
    <template v-slot:table>
      <TableComponent
        v-if="rows"
        :rows="rows"
        :columns="columns"
        @manage="($ev) => $router.push(`/management/${$ev.id}`)"
      />
      <div
        v-else
        class="text-center self-center q-mt-xl"
        style="max-width: 20vw"
      >
        <img src="/no-data/no-upsells.svg" class="full-width" />
        <h6>{{ $t('management.no-data') }}</h6>
      </div>
    </template>
    <template v-slot:dialogs>
      <DialogComponent
        v-model="showFiltersPopup"
        :title="`<div class='row'><span class='text-weight-bold row items-center'><img src='/general/filter.svg' class='q-mr-sm' />${$t(
          'generic.filters'
        )}</span></div>`"
        size="large"
        :confirmButtonLabel="$t('generic.search')"
        confirmButtonLevel="cta"
        :loading="loading"
        @confirm="updateFilter"
      >
        <Filters :filter="filter" ref="filterForm" />
      </DialogComponent>

      <DialogComponent
        v-model="showMassFulfillmentPopup"
        :title="$t('orders.massFulfillment')"
        size="large"
        :confirmButtonLabel="$t('generic.upload-csv')"
        :loading="loading"
        confirmButtonLevel="cta"
      >
        <div class="column justify-center items-center">
          <img src="/general/mass-fulfillment.svg" />
          <p>{{ $t('orders.exportOrders') }}</p>
        </div>
      </DialogComponent>
    </template>
  </IndexPageWrapper>
</template>

<script lang="ts">
export default {
  name: 'ManagementsPage',
  components: { DialogComponent },
};
</script>

<script lang="ts" setup>
import TableComponent from 'src/components/Global/TableComponent.vue';
import Header from 'src/components/Layout/Header.vue';
import { computed, ref } from 'vue';
import { useDataStore } from 'stores/data-store';
import {
  ManagementSubscription,
  OrdersFilter,
} from 'src/utils/EntityDefinitions';
import { TableColumn } from 'src/utils/Models';
import IndexPageWrapper from 'src/components/Global/IndexPageWrapper.vue';
import Filters from 'src/components/Orders/Filters.vue';
import DialogComponent from 'src/components/Global/DialogComponent.vue';

const store = useDataStore();

const rows = computed(() => {
  // return store.getManagementSubscriptions;
  return [
    {
      id: '1',
      subscription: 'test sub',
      customer: 'test customer',
      order: 'mv-1092',
      value: '$19.00/30 days',
      processed: '$0',
      status: 'new',
    },
  ];
});

const filterForm = ref<typeof Filters>();

const wrapper = ref<typeof IndexPageWrapper>();
const showExportPopup = ref(false);
const showFiltersPopup = ref(false);
const showMassFulfillmentPopup = ref(false);
const loading = ref(false);

const appliedFilters = computed(() => {
  const appliedFilters = filter.value
    ? Object.keys(filter.value).filter((key) => {
        const value = filter.value?.[key as keyof OrdersFilter] as
          | string
          | number;
        value !== '' && value !== null && value !== undefined;
        return value;
      })
    : [];
  return appliedFilters;
});

const columns: TableColumn[] = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: (row: ManagementSubscription) => row.id,
    sortable: true,
  },
  {
    name: 'subscription',
    required: true,
    label: 'Subscription',
    align: 'left',
    field: (row: ManagementSubscription) => row.subscription,
    sortable: true,
    currency: true,
  },
  {
    name: 'customer',
    required: true,
    label: 'Customer',
    align: 'left',
    field: (row: ManagementSubscription) => row.customer,
    sortable: true,
  },
  {
    name: 'order',
    required: true,
    label: 'Order',
    align: 'left',
    field: (row: ManagementSubscription) => row.order,
    sortable: true,
  },
  {
    name: 'value',
    required: true,
    label: 'Value',
    align: 'left',
    field: (row: ManagementSubscription) => row.value,
    sortable: true,
  },
  {
    name: 'processed',
    required: true,
    label: 'Processed',
    align: 'left',
    field: (row: ManagementSubscription) => row.processed,
    sortable: true,
    currency: true,
  },
  {
    name: 'status',
    required: true,
    label: 'Status',
    align: 'left',
    field: (row: ManagementSubscription) => row.status,
    sortable: true,
  },
  {
    name: 'actions',
    required: true,
    label: 'Actions',
    align: 'right',
    field: () => null,
    actions: ['manage'],
  },
];
const selectedRow = ref<ManagementSubscription>();

const filter = ref<OrdersFilter>();
clearFilters();
const updateFilter = () => {
  filter.value = filterForm.value?.filtersDupe as OrdersFilter;
  showFiltersPopup.value = false;
};

function clearFilters() {
  filter.value = {
    startDate: '', // DateTime.now().toFormat('LL/dd/yyyy'),
    endDate: '', // DateTime.now().plus({ days: 1 }).toFormat('LL/dd/yyyy'),
    orderId: '',
    customerName: '',
    customerEmail: '',
    fulfillmentStatus: '',
    paymentStatus: '',
  };
}

if (!rows.value) {
  store.pullData<ManagementSubscription[]>('managementSubscriptions');
}
</script>
