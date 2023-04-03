<template>
  <q-layout view="lHh Lpr lFf" class="layout-anonymous">
    <q-header class="bg-transparent q-py-sm" style="margin: 15px 48px; margin-bottom: 0px; padding: 0px;">
      <q-toolbar style="height: 42px;">
        <img
          src="~/assets/logo-horizontal-black.svg"
          style="height: 32px; width: auto"
        />

        <q-space />
      </q-toolbar>
    </q-header>

    <q-page-container style="height: 100vh">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.layout-anonymous {
  background: linear-gradient(180deg, #e3ebff 0%, rgba(203, 239, 255, 0) 100%);
}
</style>
