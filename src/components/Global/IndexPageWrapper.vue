<template>
  <div>
    <div class="column q-px-lg">
      <slot name="header" />
      <slot name="table" />
    </div>
    <slot name="dialogs" />
  </div>
</template>

<script lang="ts" setup>
import { Entities, EntityType } from 'src/utils/EntityDefinitions';
import {  PropType, reactive } from 'vue';
// import { useDataStore } from 'stores/data-store';
// const store = useDataStore();

// const props = defineProps({
//   selectedRow: {
//     type: Object as PropType<Entities>,
//   },
//   showEditPopup: {
//     type: Boolean,
//   },
//   showDeletePopup: {
//     type: Boolean,
//   },
//   entity: {
//     type: String as PropType<EntityType>,
//     required: true,
//   },
// });

const emit = defineEmits([
  'updateSelectedRow',
  'updateShowEditPopup',
  'updateShowDeletePopup',
  'setLoading',
]);

const exportEvent = () => {
  console.log('export');
};

const editRow = <T extends object>(row: T) => {
  const entityDupe = reactive<T>({ ...row });
  emit('updateSelectedRow', entityDupe);
  emit('updateShowEditPopup', true);
};

const deleteRow = <T>(row: T) => {
  emit('updateSelectedRow', row);
  emit('updateShowDeletePopup', true);
};

/* const deleteItem = () => {
  if (props.selectedRow) {
    emit('setLoading', true);
    store
      .deleteItem({
        which: props.entity,
        entity: props.selectedRow,
      })
      .then(() => {
        nextTick(() => {
          emit('updateSelectedRow', undefined);
          emit('updateShowDeletePopup', false);
          emit('setLoading', false);
        }).catch((err) => console.error(err));
      });
  }
};

const updateItem = () => {
  if (props.selectedRow) {
    emit('setLoading', true);
    store
      .updateItem({
        which: props.entity,
        entity: props.selectedRow,
        entityName: props.entity,
      })
      .then(() => {
        nextTick(() => {
          emit('updateSelectedRow', undefined);
          emit('updateShowEditPopup', false);
          emit('setLoading', false);
        }).catch((err) => console.error(err));
      });
  }
}; */

defineExpose({
  exportEvent,
  editRow,
  deleteRow,
  /* deleteItem,
  updateItem, */
});
</script>
