<template>
  <div class="column justify-center items-center">
    <h5 class="q-mb-md q-mt-lg">{{ $t('navigation.customizer.Theme') }}</h5>

    <template
      v-for="(themePanel, t) in themePanelData"
      :key="`theme-panel-${t}`"
    >
      <p class="q-mt-md q-mb-sm text-subtitle1">
        {{
          $t(`customizer.${themePanel.title.toLowerCase().replace(/ /g, '-')}`)
        }}
      </p>
      <div class="row gap-sm q-mb-md">
        <div
          v-for="(chip, c) in themePanel.swatches"
          :key="`chip-${t}-${c}`"
          class="cursor-pointer q-px-md q-py-md rounded-half border-dark-3"
          :class="chip.color.indexOf('rgb') === -1 ? `bg-${chip.color}` : ''"
          :style="
            chip.color.indexOf('rgb') > -1
              ? `background-color: ${chip.color}`
              : ''
          "
        >
          <q-tooltip
            class="bg-white shadow-6 text-black text-body2"
            :offset="[10, 10]"
          >
            {{ chip.tooltip }}
          </q-tooltip>
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-color v-model="chip.color" />
          </q-popup-proxy>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BuildThemeComponent',
};
</script>

<script lang="ts" setup>
import { reactive } from 'vue';

const themePanelData = reactive([
  {
    title: 'General',
    swatches: [
      {
        color: 'accent',
        tooltip: 'Primary text',
      },
      {
        color: 'primary-light',
        tooltip: 'Primary text',
      },
      {
        color: 'secondary',
        tooltip: 'Primary text',
      },
      {
        color: 'dark-5',
        tooltip: 'Primary text',
      },
    ],
  },
  {
    title: 'Form color',
    swatches: [
      {
        color: 'accent',
        tooltip: 'Primary text',
      },
      {
        color: 'primary-light',
        tooltip: 'Primary text',
      },
      {
        color: 'secondary',
        tooltip: 'Primary text',
      },
    ],
  },
  {
    title: 'Cards color',
    swatches: [
      {
        color: 'pink',
        tooltip: 'Primary text',
      },
      {
        color: 'dark-2',
        tooltip: 'Primary text',
      },
      {
        color: 'dark-5',
        tooltip: 'Primary text',
      },
    ],
  },
  {
    title: 'Primary buttons',
    swatches: [
      {
        color: 'pink',
        tooltip: 'Primary text',
      },
      {
        color: 'white',
        tooltip: 'Primary text',
      },
    ],
  },
  {
    title: 'Secondary buttons',
    swatches: [
      {
        color: 'grey-4',
        tooltip: 'Primary text',
      },
      {
        color: 'grey-7',
        tooltip: 'Primary text',
      },
      {
        color: 'black',
        tooltip: 'Primary text',
      },
    ],
  },
  {
    title: 'Hyperlinks',
    swatches: [
      {
        color: 'grey-7',
        tooltip: 'Primary text',
      },
      {
        color: 'purple',
        tooltip: 'Primary text',
      },
    ],
  },
]);
</script>
