<template>
  <div class="row items-center">
    <div class="relative-position q-mr-md">
      <q-badge
        v-if="count > 1"
        rounded
        color="accent"
        class="absolute"
        style="top: -7px; right: -7px"
        >{{ count }}</q-badge
      >
      <img class="" style="width: 85px; height: 85px" :src="imgSrc" />
    </div>
    <p class="q-ma-none col">{{ name }}</p>
    <p class="q-ma-none" v-if="price" v-currency="{ amount: price }" />
    <div class="column -right" v-if="text || subtext">
      <p class="q-ma-none" v-if="text">{{ text }}</p>
      <small class="q-ma-none" v-if="subtext">{{ subtext }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  imgSrc: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
  },
  text: {
    type: String,
  },
  subtext: {
    type: String,
  },
});
</script>
