<template>
  <div class="row items-center">
    <q-avatar :color="color" class="q-mr-md">
      <div>
        <img v-if="icon" :src="icon" />
      </div>
    </q-avatar>
    <div class="column">
      <p class="q-my-none">{{ label }}</p>
      <h5 class="q-mt-sm q-mb-none text-weight-bold">{{ value }}</h5>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'StatBlockComponent',
};
</script>

<script lang="ts" setup>
defineProps({
  color: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
</script>
