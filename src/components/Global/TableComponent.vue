<template>
  <q-table
    :rows="filteredRows"
    :columns="columns"
    class="full-width"
    row-key="name"
    binary-state-sort
    flat
    v-model:pagination="pagination"
    :pagination-label="getPaginationLabel"
    :hide-pagination="hidePagination"
  >
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          class="bg-secondary"
        >
          <span class="text-h6">{{ col.label }}</span>
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <div v-if="col.name === 'status'">
            <q-chip
              :color="`${StatusColorLookup[col.value.val as EntityStatus]}-light`"
              :text-color="StatusColorLookup[col.value.val as EntityStatus]"
              icon="radio_button_checked"
              class="text-capitalize"
            >
              {{ col.value.label }}
            </q-chip>
          </div>
             <div v-else-if="col.name === 'order_status'" class="order-status">
            <q-chip
              class="text-capitalize"
              :class="{
                fulfill: col.value === 1,
                unfulfilled: col.value === 2,
                cancel: col.value === 3,
              }"
            >
              <span v-if="col.value === 1">Fulfill</span>
              <span v-else-if="col.value === 2">Unfulfilled</span>
              <span v-else-if="col.value === 3">Cancelled</span>
            </q-chip>
          </div>
          <div v-else-if="col.name === 'management_status'" class="management-status">
            <q-chip
              class="text-capitalize"
              :class="{
                new: col.value === 1,
                trial: col.value === 2,
                running: col.value === 3,
                declined: col.value === 4,
              }"
            >
              <span v-if="col.value === 1">New</span>
              <span v-else-if="col.value === 2">Trial</span>
              <span v-else-if="col.value === 3">Running</span>
              <span v-else>Declined</span>
            </q-chip>
          </div>
          <div v-else-if="col.name === 'account_status'" class="account-status">
            <q-chip
              class="text-capitalize"
              :class="{ live: col.value === 'live' }"
            >
              <span v-if="col.value === 'live'">Live</span>
            </q-chip>
          </div>
          <div v-else-if="col.name === 'accounca'" class="accounca">
            <div class="wrap">
              <p>{{ col.value }}</p>
              <q-img
                src="~/assets/positive-trend.svg"
                width="36px"
                height="19px"
                no-spinner
              />
            </div>
          </div>
       


          <div v-else-if="col.actions" class="row justify-end">
            <q-btn icon="more_vert" round padding="xs" unelevated>
              <q-popup-proxy
                ref="popupProxy"
                class="bg-white rounded-1 overflow-hidden shadow-14 actions-menu"
              >
                <q-card flat class="actions">
                  <q-card-section class="q-pa-none">
                    <q-list
                      separator
                      dark
                      dense
                      class="bg-white column no-wrap full-height"
                    >
                      <q-item
                        v-for="(option, o) in col.actions"
                        :key="`action-${props.key}-${col.name}-${o}-${option}`"
                        class="q-py-md"
                        :class="[
                          option === 'delete' || option === 'cancel'
                            ? 'text-negative'
                            : '',
                          option === 'refund' ? 'text-warning' : '',
                          option === 'manage' ? 'text-danger' : '',
                          option === 'disable' ? 'text-primary' : '',
                          option === 'fulfill' ? 'text-accent' : '',
                          option !== 'delete' &&
                          option !== 'refund' &&
                          option !== 'fulfill'
                            ? 'text-dark'
                            : '',
                        ]"
                        clickable
                        @click="$emit(option, props.row)"
                        v-close-popup
                        v-ripple
                      >
                        <q-item-section>
                          {{ $t(`generic.${option}`) }}
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card-section>
                </q-card>
              </q-popup-proxy>
            </q-btn>
          </div>

          <div v-else-if="col.currency" v-currency="{ amount: col.value }" />

          <div v-else-if="col.date" v-date="col.value" />

          <div v-else-if="col.image">
            <img :src="col.value" style="width: 75px" />
          </div>

          <template v-else>
            {{ col.value }}
          </template>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script lang="ts">
export default {
  name: 'TableComponent',
};
</script>

<script lang="ts" setup>
import { QPopupProxy } from 'quasar';
import { EntityStatus } from 'src/utils/EntityDefinitions';
import { StatusColorLookup } from 'src/utils/helpers';
import { computed, PropType, ref } from 'vue';
import { useDataStore } from 'stores/data-store';
import { TableColumn } from 'src/utils/Models';
const store = useDataStore();

const props = defineProps({
  rows: {
    type: Array as PropType<{ [key: string]: string | number | boolean }[]>,
    required: true,
  },
  columns: {
    type: Array as PropType<TableColumn[]>,
    required: true,
  },
  hidePagination: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const filteredRows = computed(() => {
  if (store.globalSearch.length === 0) {
    return props.rows;
  }

  return props.rows.filter((row) => {
    const rowDupe = { ...row } as typeof row;
    props.columns
      .filter((col) => col.valueMap)
      .forEach((col) => {
        rowDupe[col.name] = col.valueMap?.[rowDupe[col.name] as number] || '';
      });

    const rowString = JSON.stringify(rowDupe).toLowerCase();
    return rowString.includes(store.globalSearch.toLowerCase());
  });
});

const getPaginationLabel = (
  firstRowIndex: number,
  endRowIndex: number,
  totalRowsNumber: number
) => {
  return `Showing ${firstRowIndex} to ${endRowIndex} of ${totalRowsNumber} entries`;
};
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  // rowsNumber: xx if getting data from a server
});

defineEmits(['edit', 'delete', 'manage', 'view']);
</script>

<style scoped lang="scss"></style>
