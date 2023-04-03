<template>
  <IndexPageWrapper
    ref="wrapper"
    :selected-row="selectedRow"
    :show-edit-popup="showEditPopup"
    :show-delete-popup="showDeletePopup"
    entity="subscriptions"
    @updateSelectedRow="($ev) => (selectedRow = $ev)"
    @updateShowEditPopup="($ev) => (showEditPopup = $ev)"
    @updateShowDeletePopup="($ev) => (showDeletePopup = $ev)"
    @setLoading="($ev) => (loading = $ev)"
  >
    <template v-slot:header>
      <Header
        :title="$t('product.subscriptionProducts')"
        @add="$router.push('/product/add')"
        @export="wrapper?.exportEvent"
        :tertiaryBtnLabel="$t('generic.add')"
        tertiaryBtnIcon="/general/add-dark.svg"
      />
    </template>
    <template v-slot:table>
      <TableComponent
        v-if="rows"
        :rows="rows"
        :columns="columns"
        @edit="wrapper?.editRow"
        @delete="wrapper?.deleteRow"
      />
      <div
        v-else
        class="text-center self-center q-mt-xl"
        style="max-width: 20vw"
      >
        <img src="/no-data/no-upsells.svg" class="full-width" />
        <h6>{{ $t('product.no-data') }}</h6>
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
        :loading="loading"
        :confirmButtonLabel="$t('generic.delete')"
        confirmButtonLevel="negative"
        @confirm="deleteItem"
      />
      <DialogComponent
        v-if="selectedRow"
        v-model="showEditPopup"
        :title="`<div class='row'><span class='text-weight-bold row items-center'><img src='/general/edit-light.svg' class='q-mr-sm' />${$t(
          'generic.edit'
        )} ${$t(
          'product.plural'
        )}</span><small class='text-dark-6 q-ml-md'>${$t(
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
    </template>
  </IndexPageWrapper>
</template>

<script lang="ts">
export default {
  name: 'ProductsPage',
};
</script>

<script lang="ts" setup>
import TableComponent from 'src/components/Global/TableComponent.vue';
import Header from 'src/components/Layout/Header.vue';
import { nextTick, computed, ref } from 'vue';
import { useShopManagementStore } from 'stores/shop-management-store';
import { Subscription } from 'src/utils/EntityDefinitions';
import { TableColumn } from 'src/utils/Models';
import DialogComponent from 'src/components/Global/DialogComponent.vue';
import ProductSubscriptionEntityForm from 'src/components/Products/ProductSubscriptionEntityForm.vue';
import IndexPageWrapper from 'src/components/Global/IndexPageWrapper.vue';

const store = useShopManagementStore();

store.pullShopifyProducts();

const rows = computed(() => {
  return Array.isArray(store.getSubscriptions)
    ? store.getSubscriptions
    : store.getSubscriptions?.data;
});

const wrapper = ref<typeof IndexPageWrapper>();

const showDeletePopup = ref(false);

const loading = ref(false);

const showEditPopup = ref(false);

const shopifyProducts = computed(() => store.shopifyProducts);

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
      shopifyProducts.value?.filter((prod) => prod.id === row.shopifyProduct/* todo: waitting API changed into camelCase */)[0]
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
const selectedRow = ref<Subscription>();

const deleteItem = async () => {
  if (selectedRow.value) {
    loading.value = true

    await store.deleteItem({
      which: 'subscriptions',
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
      which: 'subscriptions',
      entity: selectedRow.value,
      entityName: 'subscriptions',
    })

    nextTick(() => {
      selectedRow.value = undefined
      showEditPopup.value = false
      loading.value = false
    })
  }
};

store.pullData<Subscription[]>('subscriptions');
</script>
