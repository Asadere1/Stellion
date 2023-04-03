<template>
  <div class="row full-height">
    <div class="bg-accent-light col full-height">
      <slot name="page" />
    </div>
    <q-separator vertical class="full-height" />
    <div class="bg-white" style="width: 224px">
      <slot name="side" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
