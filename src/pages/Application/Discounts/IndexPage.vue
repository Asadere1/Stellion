<template>
  <IndexPageWrapper
    ref="wrapper"
    :selected-row="selectedRow"
    :show-edit-popup="showEditPopup"
    :show-delete-popup="showDeletePopup"
    entity="discounts"
    @updateSelectedRow="($ev) => (selectedRow = $ev)"
    @updateShowEditPopup="($ev) => (showEditPopup = $ev)"
    @updateShowDeletePopup="($ev) => (showDeletePopup = $ev)"
    @setLoading="($ev) => (loading = $ev)"
  >
    <template v-slot:header>
      <Header
        title="Discounts"
        @add="$router.push('/discounts/add')"
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
        <img src="/no-data/no-discounts.svg" class="full-width" />
        <h6>{{ $t('discounts.no-data') }}</h6>
        <ButtonComponent
          :label="`${$t('generic.add')} ${$t('generic.new')} ${$t(
            'discounts.single'
          )}`"
          level="primary"
          class="q-mt-lg"
          stretch
          @click="$router.push('/discounts/add')"
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
          'discounts.single'
        )}</span><small class='text-dark-6 q-ml-md'>${$t(
          'generic.general'
        )}</small></div>`"
        documentationRoute="/documentation/discounts"
        size="large"
        :confirmButtonLabel="$t('generic.update')"
        :loading="loading"
        @confirm="updateItem"
      >
        <DiscountEntityForm
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
  name: 'DiscountsPage',
};
</script>

<script lang="ts" setup>
import TableComponent from 'src/components/Global/TableComponent.vue';
import Header from 'src/components/Layout/Header.vue';
import { nextTick, computed, ref } from 'vue';
import { useShopManagementStore } from 'stores/shop-management-store';
import { Discount, DiscountType } from 'src/utils/EntityDefinitions';
import { TableColumn } from 'src/utils/Models';
import DialogComponent from 'src/components/Global/DialogComponent.vue';
import ButtonComponent from 'src/components/Global/ButtonComponent.vue';
import DiscountEntityForm from 'src/components/Discounts/DiscountEntityForm.vue';
import IndexPageWrapper from 'src/components/Global/IndexPageWrapper.vue';

const store = useShopManagementStore();

const rows = computed(() => {
  return store.getDiscounts;
});

const showDeletePopup = ref(false);

const showEditPopup = ref(false);

const loading = ref(false);

const wrapper = ref<typeof IndexPageWrapper>();

const columns: TableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row: Discount) => row.name,
    sortable: true,
  },
  {
    name: 'type',
    required: true,
    label: 'Type',
    align: 'left',
    field: (row: Discount) => DiscountType[row.type],
    sortable: true,
  },
  {
    name: 'value',
    required: true,
    label: 'Value',
    align: 'left',
    field: (row: Discount) => row.value,
    sortable: true,
    currency: true,
  },
  {
    name: 'usages',
    required: true,
    label: 'Usages',
    align: 'left',
    field: (row: Discount) => `${row.usage}/${row.maxUsage}`,
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
];

const selectedRow = ref<Discount>();

const deleteItem = async () => {
  if (selectedRow.value) {
    loading.value = true

    await store.deleteItem({
      which: 'discounts',
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
      which: 'discounts',
      entity: selectedRow.value,
      entityName: 'discounts',
    })

    nextTick(() => {
      selectedRow.value = undefined
      showEditPopup.value = false
      loading.value = false
    })
  }
};

if (!rows.value) {
  store.pullData<Discount[]>('discounts');
}
</script>
