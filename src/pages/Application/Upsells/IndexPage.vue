<template>
  <IndexPageWrapper
    ref="wrapper"
    :selected-row="selectedRow"
    :show-edit-popup="showEditPopup"
    :show-delete-popup="showDeletePopup"
    entity="upsells"
    @updateSelectedRow="($ev) => (selectedRow = $ev)"
    @updateShowEditPopup="($ev) => (showEditPopup = $ev)"
    @updateShowDeletePopup="($ev) => (showDeletePopup = $ev)"
    @setLoading="($ev) => (loading = $ev)"
  >
    <template v-slot:header>
      <Header
        title="Upsells"
        @add="showAddPopup = true"
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
        @edit="$router.push('/upsells/edit')"
        @delete="wrapper?.deleteRow"
      />
      <div
        v-else
        class="text-center self-center q-mt-xl"
        style="max-width: 20vw"
      >
        <img src="/no-data/no-upsells.svg" class="full-width" />
        <h6>{{ $t('upsells.no-data') }}</h6>
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
        v-model="showAddPopup"
        :title="`<div class='row'><span class='text-weight-bold row items-center'><img src='/general/add-light.svg' class='q-mr-sm' />${$t(
          'generic.addUpsell'
        )}`"
        :confirm-button-label="`${$t('generic.create')}`"
        confirm-button-level="negative"
        size="medium"
      >
        <AddUpsellForm />
      </DialogComponent>
    </template>
  </IndexPageWrapper>
</template>

<script lang="ts">
export default {
  name: 'UpsellsPage',
  components: { AddUpsellForm },
};

</script>

<script lang="ts" setup>
import TableComponent from 'src/components/Global/TableComponent.vue';
import Header from 'src/components/Layout/Header.vue';
import { nextTick, computed, ref } from 'vue';
import { useShopManagementStore } from 'stores/shop-management-store';
import { EntityStatus, Upsell } from 'src/utils/EntityDefinitions';
import { Enum, TableColumn } from 'src/utils/Models';
import DialogComponent from 'src/components/Global/DialogComponent.vue';
import IndexPageWrapper from 'src/components/Global/IndexPageWrapper.vue';
import AddUpsellForm from 'src/components/Upsells/AddUpsellForm.vue';

const store = useShopManagementStore();

const rows = computed(() => {
  // return store.getUpsells;
  const upsellOne = new Upsell();
  const upsellTwo = new Upsell();

  upsellOne.title = 'Star Wars 1';
  upsellOne.name = 'Star Wars 1';

  upsellTwo.title = 'Star Wars 2';
  upsellTwo.name = 'Star Wars 2';

  return [upsellOne, upsellTwo];
});

const UpsellType = computed(() => store.upsellTypes);
const PreSelectType = computed(() => store.preselectTypes);

const wrapper = ref<typeof IndexPageWrapper>();

const showDeletePopup = ref(false);

const loading = ref(false);

const showEditPopup = ref(false);
const showAddPopup = ref(false);

const columns: TableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row: Upsell) => row.name,
    sortable: true,
  },
  {
    name: 'type',
    required: true,
    label: 'Type',
    align: 'left',
    field: (row: Upsell) => UpsellType.value?.[row.type],
    valueMap: UpsellType.value,
    sortable: true,
  },
  {
    name: 'status',
    required: true,
    label: 'Status',
    align: 'left',
    field: (row: Upsell) => row.status,
    format: (val) => {
      return {
        label: EntityStatus[val],
        val,
      };
    },
    valueMap: EntityStatus,
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
const selectedRow = ref<Upsell>();

// function update(newEntity: Upsell) {
//   selectedRow.value = newEntity;
// }

const deleteItem = async () => {
  if (selectedRow.value) {
    loading.value = true

    await store.deleteItem({
      which: 'upsells',
      entity: selectedRow.value,
    })

    nextTick(() => {
      selectedRow.value = undefined
      showEditPopup.value = false
      loading.value = false
    })

  }
};

if (!rows.value) {
  store.pullData<Upsell[]>('upsells');
}
if (!UpsellType.value) {
  store.pullData<Enum>('upsellTypes');
}
if (!PreSelectType.value) {
  store.pullData<Enum>('preselectTypes');
}
</script>
