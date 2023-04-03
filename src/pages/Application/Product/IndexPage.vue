<style module>
.wrapper {
  padding: 48px;
}
</style>
<template>
  <div :class="$style.wrapper">
    <Header
      :title="$t('product.subscriptionProducts')"
      @add="handleAdd"
      :tertiaryBtnLabel="$t('generic.add')"
      tertiaryBtnIcon="/general/add-dark.svg"
    />
    <TableComponent
      v-if="rows"
      :rows="rows"
      :columns="columns"
      @delete="deleteRow"
      @edit="editRow"
    />
    <div v-else class="text-center self-center q-mt-xl" style="max-width: 20vw">
      <img src="/no-data/no-upsells.svg" class="full-width" />
      <h6>{{ $t('product.no-data') }}</h6>
    </div>
    <a-pagination
      v-model:current="query.page"
      :total="500"
      :showSizeChanger="false"
    />
    <DialogComponent
      v-if="selectedRow"
      v-model="showDeletePopup"
      :title="`${$t('generic.doYouReally')} ${$t('generic.delete')} \'${
        selectedRow.name
      }\' ${$t('generic.listing')}?`"
      size="small"
      :loading="loading"
      :confirmButtonLabel="$t('generic.delete')"
      confirmButtonLevel="negative"
      @confirm="deleteItemConfirmed"
    />
    <DialogComponent
      v-if="selectedRow"
      v-model="showEditPopup"
      :title="`<div class='row'><span class='text-weight-bold row items-center'><img src='/general/${editMode}-light.svg' class='q-mr-sm' />${$t(
        'generic.' + editMode
      )} ${$t('product.plural')}</span><small class='text-dark-6 q-ml-md'>${$t(
        'generic.general'
      )}</small></div>`"
      documentationRoute="/documentation/products"
      size="large"
      :loading="loading"
      :confirmButtonLabel="$t('generic.update')"
      @confirm="updateItem"
    >
      <ProductSubscriptionEntityForm
        :selectedRow="selectedRow"
        @update="($ev) => (selectedRow = $ev)"
        contained
      />
    </DialogComponent>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProductsPage',
};
</script>

<script lang="ts" setup>
import { api } from 'src/boot/axios';
import TableComponent from 'src/components/Global/TableComponent-new.vue';
import Header from 'src/components/Layout/Header.vue';
import { computed, reactive, ref, watch, toRaw } from 'vue';
import { useAsyncState } from '@bowencool/vhooks';
import { useDataStore } from 'stores/data-store';
import { useShopManagementStore } from 'stores/shop-management-store';
import { Subscription } from 'src/utils/EntityDefinitions';
import { TableColumn } from 'src/utils/Models';
import { Pagination as APagination } from 'ant-design-vue';
import DialogComponent from 'src/components/Global/DialogComponent.vue';
import ProductSubscriptionEntityForm from 'src/components/Products/ProductSubscriptionEntityForm.vue';

const store = useShopManagementStore();
const shopManagementStore = useDataStore();

shopManagementStore.pullShopifyProducts();
const shopifyProducts = computed(() => shopManagementStore.shopifyProducts);

const query = reactive({
  // sortBy: 'desc',
  // descending: false,
  page: 1,
  rowsPerPage: 10,
});

const {
  data: rows,
  run,
  loading,
  // error,
} = useAsyncState(() =>
  api
    .get<Subscription[]>(`${store.restRoot}/subscriptions`, {
      params: query,
    })
    .then((res) => res.data)
);
watch(query, () => {
  run();
});

const selectedRow = ref<Subscription>();

const showDeletePopup = ref(false);
const deleteRow = (row: Subscription) => {
  selectedRow.value = row;
  showDeletePopup.value = true;
};
const deleteItemConfirmed = async () => {
  if (selectedRow.value) {
    await api.delete(`${store.restRoot}/subscriptions/${selectedRow.value.id}`);
    run();
    showDeletePopup.value = false;
  }
};

const editMode = ref('edit');
const showEditPopup = ref(false);
const editRow = (row: Subscription) => {
  editMode.value = 'edit';
  selectedRow.value = row;
  showEditPopup.value = true;
};
const handleAdd = () => {
  editMode.value = 'add';
  selectedRow.value = new Subscription();
  showEditPopup.value = true;
};
const updateItem = async () => {
  if (selectedRow.value) {
    if (editMode.value === 'edit') {
      await api.post(
        `${store.restRoot}/subscriptions/${selectedRow.value.id}`,
        toRaw(selectedRow.value)
      );
    } else {
      await api.post(
        `${store.restRoot}/subscriptions`,
        toRaw(selectedRow.value)
      );
    }
    run();
    showEditPopup.value = false;
  }
};

const columns = computed<TableColumn[]>(() => [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row: Subscription) => row.name,
    sortable: true,
  },
  {
    name: 'price',
    required: true,
    label: 'Price',
    align: 'left',
    field: (row: Subscription) => row.price,
    sortable: true,
    currency: true,
  },
  {
    name: 'product',
    required: true,
    label: 'Product',
    align: 'left',
    field: (row: Subscription) =>
      shopifyProducts.value?.filter((prod) => prod.id === row.shopifyProduct)[0]
        ?.title || '',
    sortable: true,
  },
  {
    name: 'rebillPeriod',
    required: true,
    label: 'Rebill Period',
    align: 'left',
    field: (row: Subscription) => `${row.rebillPeriod} Days`,
    sortable: true,
  },
  {
    name: 'trialPeriod',
    required: true,
    label: 'Trial Period',
    align: 'left',
    field: (row: Subscription) => `${row.trialPeriod} Days`,
    sortable: true,
  },
  {
    name: 'actions',
    required: true,
    label: 'Actions',
    align: 'right',
    field: () => null,
    actions: ['edit', 'delete'],
  },
]);
</script>
