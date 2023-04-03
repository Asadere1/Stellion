<template>
  <div class="column">
    <p class="q-mb-sm text-capitalize" v-if="label">{{ label }}</p>
    <q-select
      v-if="type === 'select'"
      ref="inputField"
      :options="selectOptions"
      :outlined="!filled"
      :filled="!!filled"
      :autofocus="autofocus"
      :dense="dense"
      :rules="rules"
      :disable="disable"
      stack-label
      map-options
      emit-value
      debounce="200"
      hide-bottom-space
      :multiple="multiple"
      :use-chips="multiple"
      :model-value="modelValue"
      @update:model-value="($ev) => $emit('update:model-value', $ev)"
      :placeholder="placeholder || ''"
    />
    <q-input
      v-else-if="
        typeof modelValue === 'string' || typeof modelValue === 'number'
      "
      ref="inputField"
      :type="getType"
      :outlined="!filled"
      :filled="!!filled"
      :autofocus="autofocus"
      :dense="dense"
      :disable="disable"
      stack-label
      :bg-color="typeof filled === 'string' ? filled : ''"
      :rules="rules"
      hide-bottom-space
      :mask="mask"
      :fill-mask="fillMask"
      :hint="hint"
      :model-value="modelValue"
      :min="type === 'number' && currency ? 0 : null"
      @update:model-value="($ev) => $emit('update:model-value', getType === 'number' ? parseFloat($ev as string) : $ev)"
      debounce="200"
      :placeholder="placeholder || ''"
    >
      <template v-slot:append>
        <q-icon
          v-if="type === 'password'"
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
        <template v-if="type === 'search'">
          <q-icon
            v-if="typeof modelValue === 'string' && modelValue.length === 0"
            name="search"
          />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="$emit('update:model-value', '')"
          />
        </template>
        <q-icon v-if="type === 'date'" name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date
              :model-value="modelValue"
              @update:model-value="updateModel"
              mask="MM/DD/YYYY"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
        <slot name="append" v-if="$slots.append" />
      </template>

      <template v-slot:prepend v-if="currency">
        {{ Currencies[store.globalCurrency] }}
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
export default {
  name: 'InputField',
};
</script>

<script lang="ts" setup>
import { QInput, QSelect, QSelectOption, ValidationRule } from 'quasar';
import { computed, PropType, ref } from 'vue';
import { Currencies } from 'src/utils/Models';
import { useDataStore } from 'stores/data-store';
const store = useDataStore();

const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
  },
  placeholder: {
    type: String,
  },
  mask: {
    type: String,
  },
  hint: {
    type: String,
  },
  filled: {
    type: [Boolean, String],
  },
  multiple: {
    type: Boolean,
  },
  disable: {
    type: Boolean,
  },
  dense: {
    type: Boolean,
  },
  autofocus: {
    type: Boolean,
  },
  label: {
    type: String,
  },
  currency: {
    type: Boolean,
  },
  fillMask: {
    type: [Boolean, String],
  },
  type: {
    type: String as PropType<
      | 'select'
      | 'number'
      | 'textarea'
      | 'time'
      | 'text'
      | 'password'
      | 'email'
      | 'search'
      | 'tel'
      | 'file'
      | 'url'
      | 'date'
      | undefined
    >,
    default: 'text',
  },
  selectOptions: {
    type: Array as PropType<QSelectOption<string | number>[]>,
    default: () => [],
  },
  rules: {
    type: Array as PropType<ValidationRule[] | undefined>,
  },
});

const isPwd = ref(true);

const inputField = ref<QSelect | QInput>();

const getType = computed(() => {
  if (props.type === 'password') {
    return isPwd.value ? 'password' : 'text';
  }

  if (props.type === 'date') {
    return 'text';
  }

  return props.type;
});

const emit = defineEmits(['update:model-value']);

const updateModel = ($ev: string | number | Array<string | number>) => {
  emit('update:model-value', $ev);
};

defineExpose({
  inputField,
});
</script>

<style lang="scss">
.q-field {
  border-radius: 1rem;
  overflow: hidden;

  .q-field__control {
    border-radius: 1rem !important;
  }

  .q-field--error .q-field__bottom {
    padding: 0;
    border-radius: 1rem;
    margin-top: -20px;
    padding-left: 10px;
  }
}
</style>
