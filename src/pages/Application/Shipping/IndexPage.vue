<template>
  <IndexPageWrapper
    ref="wrapper"
    :selected-row="selectedRow"
    :show-edit-popup="showEditPopup"
    :show-delete-popup="showDeletePopup"
    entity="shipping"
    @updateSelectedRow="($ev) => (selectedRow = $ev)"
    @updateShowEditPopup="($ev) => (showEditPopup = $ev)"
    @updateShowDeletePopup="($ev) => (showDeletePopup = $ev)"
    @setLoading="($ev) => (loading = $ev)"
  >
    <template v-slot:header>
      <Header
        title="Shipping"
        @add="$router.push('/shipping/add')"
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
        <div class="relative-position q-mt-xl">
          <img src="/no-data/no-shipping-a.svg" class="full-width" />
          <img
            src="/no-data/no-shipping-b.svg"
            class="absolute"
            style="
              width: 50%;
              top: -40px;
              position: absolute;
              left: 0;
              right: 0;
              margin-left: auto;
              margin-right: auto;
            "
          />
        </div>

        <h6 class="q-mt-md q-mb-none">{{ $t('shipping.no-data') }}</h6>

        <ButtonComponent
          :label="$t('generic.add')"
          level="primary"
          class="q-mt-lg"
          stretch
          @click="$router.push('/shipping/add')"
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
          'shipping.single'
        )}</span><small class='text-dark-6 q-ml-md'>${$t(
          'generic.general'
        )}</small></div>`"
        documentationRoute="/documentation/shipping"
        size="large"
        :loading="loading"
        :confirmButtonLabel="$t('generic.update')"
        @confirm="updateItem"
      >
        <ShippingEntityForm
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
  name: 'ShippingPage',
  components: { IndexPageWrapper },
};
</script>

<script lang="ts" setup>
import TableComponent from 'src/components/Global/TableComponent.vue';
import Header from 'src/components/Layout/Header.vue';
import { nextTick, computed, ref } from 'vue';
import { useShopManagementStore } from 'stores/shop-management-store';
import { Shipping } from 'src/utils/EntityDefinitions';
import { TableColumn } from 'src/utils/Models';
import DialogComponent from 'src/components/Global/DialogComponent.vue';
import ButtonComponent from 'src/components/Global/ButtonComponent.vue';
import ShippingEntityForm from 'src/components/Shipping/ShippingEntityForm.vue';
import IndexPageWrapper from 'src/components/Global/IndexPageWrapper.vue';

const store = useShopManagementStore();

const rows = computed(() => {
  return store.getShippings;
});

const showDeletePopup = ref(false);

const showEditPopup = ref(false);

const wrapper = ref<typeof IndexPageWrapper>();

const loading = ref(false);

const columns: TableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row: Shipping) => row.name,
    sortable: true,
  },
  {
    name: 'amount_trial',
    required: true,
    label: 'Price',
    align: 'left',
    field: (row: Shipping) => row.amount_trial,
    sortable: true,
    currency: true,
  },
  /*
  {
    name: 'amount_reocuring',
    required: true,
    label: 'Amount Reccuring',
    align: 'left',
    field: (row: Shipping) => row.amount_recurring,
    sortable: true,
    currency: true,
  },
  */
  /*
  {
    name: 'status',
    required: true,
    label: 'Status',
    align: 'left',
    field: (row: Shipping) => row.status,
    format: (val) => {
      return {
        label: EntityStatus[val],
        val,
      };
    },
    sortable: true,
  },
  */
  {
    name: 'actions',
    required: true,
    label: 'Actions',
    align: 'right',
    field: () => null,
    actions: ['edit', 'delete'],
  },
];

const selectedRow = ref<Shipping>();

const deleteItem = async () => {
  if (selectedRow.value) {
    loading.value = true

    await store.deleteItem({
      which: 'shipping',
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
      which: 'shipping',
      entity: selectedRow.value,
      entityName: 'shipping',
    })

    nextTick(() => {
      selectedRow.value = undefined
      showEditPopup.value = false
      loading.value = false
    })
  }
};

store.pullData<Shipping[]>('shipping');
</script>
