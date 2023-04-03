<template>
  <div class="row justify-between q-mt-lg q-mb-md">
    <div class="row">
      <h4 class="text-weight-bold q-my-none">{{ title }}</h4>
      <ButtonComponent
        v-if="filters"
        level="primary"
        :label="`${$t('generic.filters')} ${
          appliedFilterCount && appliedFilterCount > 0
            ? '(' + appliedFilterCount + ')'
            : ''
        }`"
        :stretch="false"
        icon="/general/unfilled-filter.svg"
        class="q-ml-xl filter-btn"
        @click="$emit('filters', true)"
      />
      <ButtonComponent
        v-if="filters && appliedFilterCount && appliedFilterCount > 0"
        level="negative"
        :stretch="false"
        icon="clear"
        class="q-ml-xs"
        @click="$emit('clearFilters')"
      />
    </div>

    <div class="row gap-sm">
      <ButtonComponent
        v-if="tertiaryBtnLabel"
        level="tertiary"
        :label="tertiaryBtnLabel"
        :stretch="false"
        :icon="tertiaryBtnIcon"
        @click="$emit('add', true)"
      />
      <ButtonComponent
        v-if="showExport"
        level="accent"
        :label="$t('generic.export')"
        :stretch="false"
        icon="/general/export-white.svg"
        @click="$emit('export', true)"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AppHeader',
};
</script>

<script lang="ts" setup>
import ButtonComponent from 'src/components/Global/ButtonComponent.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  filters: {
    type: Boolean,
  },
  tertiaryBtnLabel: {
    type: String,
  },
  tertiaryBtnIcon: {
    type: String,
  },
  appliedFilterCount: {
    type: Number,
  },
  showExport: {
    type: Boolean,
    default: false,
  },
});
</script>
