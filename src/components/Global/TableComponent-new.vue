<template>
  <q-table
    :rows="filteredRows"
    :columns="columns"
    class="full-width"
    row-key="name"
    binary-state-sort
    flat
    hide-pagination
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
          <div v-else-if="col.actions" class="row justify-end">
            <q-btn icon="more_vert" round padding="xs" unelevated>
              <q-popup-proxy
                ref="popupProxy"
                class="bg-white rounded-1 overflow-hidden shadow-14"
              >
                <q-card flat>
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
import { computed, PropType } from 'vue';
import { useDataStore } from 'stores/data-store';
import { TableColumn } from 'src/utils/Models';
const store = useDataStore();

const props = defineProps({
  rows: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  columns: {
    type: Array as PropType<TableColumn[]>,
    required: true,
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
defineEmits(['edit', 'delete', 'manage']);

</script>

<style scoped lang="scss"></style>
