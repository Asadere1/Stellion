<template>
  <div class="column justify-center items-center q-px-md">
    <h5 class="q-mb-md q-mt-lg">{{ $t('navigation.customizer.Discounts') }}</h5>
    <q-checkbox
      v-model="displayDiscounts"
      class="full-width"
      color="positive"
      :label="$t('generic.display')"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'BuildThemeComponent',
};
</script>

<script lang="ts" setup>
import { ref } from 'vue';

const displayDiscounts = ref(false);
</script>
