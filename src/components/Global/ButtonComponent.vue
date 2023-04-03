<template>
  <q-btn-dropdown
    v-if="dropdown"
    :label="label"
    :loading="loading"
    :disable="loading"
    :icon="icon && !isFilename(icon) ? icon : undefined"
    rounded
    no-caps
    class="text-dark q-px-xl text-weight-bold rounded-1"
    :class="[
      level,
      stretch ? 'full-width' : '',
      level === 'primary' ? 'q-py-md' : '',
      level === 'accent' ? 'text-white' : '',
    ]"
    unelevated
  >
    <slot />
  </q-btn-dropdown>

  <q-btn
    v-else
    :label="icon ? undefined : label"
    rounded
    no-caps
    :loading="loading"
    :disable="loading"
    class="text-weight-bold rounded-half transition-all"
    :class="[
      level,
      stretch ? 'full-width' : '',
      label && !file ? 'q-px-xl' : '',
      level === 'cta' ? 'q-py-md' : '',
      level === 'accent' ||
      level === 'negative' ||
      level === 'primary' ||
      level === 'dark' ||
      level === 'warning'
        ? 'text-white'
        : level === 'outline-primary'
        ? 'text-primary'
        : 'text-dark',
    ]"
    @click="file ? filePicker?.pickFiles() : null"
    unelevated
  >
    <div class="row full-width">
      <q-icon
        v-if="icon && !isFilename(icon)"
        :left="!!label"
        size="2em"
        :name="icon"
        :class="label ? 'q-mr-md' : ''"
      />
      <img
        v-if="icon && isFilename(icon)"
        left
        size="2em"
        :src="icon"
        :class="label ? 'q-mr-md' : ''"
      />
      <div v-if="label && icon">{{ label }}</div>
    </div>

    <q-file
      v-if="file"
      ref="filePicker"
      style="width: 0px; height: 0px; overflow: hidden"
      :model-value="selectedFile"
      @update:model-value="($ev) => $emit('update', $ev)"
      rounded
      no-caps
      class="rounded-half transition-all"
      :class="[
        level,
        stretch ? 'full-width' : '',
        level === 'cta' ? 'q-py-md' : '',
        level === 'accent' ||
        level === 'negative' ||
        level === 'primary' ||
        level === 'warning'
          ? 'text-white'
          : level === 'outline-primary'
          ? 'text-primary'
          : 'text-dark',
      ]"
      unelevated
      :label="icon ? undefined : label"
    />
  </q-btn>
</template>

<script lang="ts">
export default {
  name: 'ButtonComponent',
};
</script>

<script lang="ts" setup>
import { PropType, ref } from 'vue';
import { isFilename } from 'src/utils/helpers';
import { ButtonLevels } from 'src/utils/Models';
import { QFile } from 'quasar';

defineProps({
  label: {
    type: String,
  },
  icon: {
    type: String,
  },
  level: {
    type: String as PropType<ButtonLevels>,
    default: 'cta',
  },
  stretch: {
    type: Boolean,
    default: true,
  },
  dropdown: {
    type: Boolean,
  },
  loading: {
    type: Boolean,
  },
  file: {
    type: Boolean,
  },
});

const selectedFile = ref<File>();

const filePicker = ref<QFile>();

defineEmits(['update']);
</script>

<style lang="scss" scoped>
button.q-btn {
  .q-btn__content {
    width: 100%;
  }
  &.cta {
    background: rgb(78, 253, 234);
    background: $primary-gradient;
  }
  &.primary {
    background: $primary;
  }
  &.secondary {
    background: $secondary;
  }
  &.accent {
    background: $accent;
  }
  &.warning {
    background: $warning;
  }
  &.negative {
    background: $negative;
  }
  &.tertiary {
    // background: white;
    border: 1px solid $dark-3;
  }

  &.dark {
    // background: white;
    border: 1px solid $dark;
    background: $dark;
  }

  &.outline-primary {
    // background: white;
    border: 1px solid $primary;
    color: $primary;
  }
  &.minimal {
    background: transparent;
  }
}
</style>
