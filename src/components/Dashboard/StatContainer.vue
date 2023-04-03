<template>
  <div
    class="column col border-dark-3 rounded-1 q-pa-md"
    style="min-width: 220px; max-width: 300px"
  >
    <slot name="top" />
    <q-separator class="full-width q-my-md" />
    <slot name="bottom" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'StatContainerComponent',
};
</script>
