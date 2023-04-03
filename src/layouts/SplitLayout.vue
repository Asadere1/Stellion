<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="row">
        <div class="split-screen-wrapper">
          <div
            class="flex col justify-center items-center text-white bg-dark full-height overflow-auto"
          >
            <img src="~/assets/logowhite.jpeg" style="width: 40%; height: auto" />
          </div>
          <div
            class="flex col justify-center items-center q-px-xl q-pt-xl q-pb-md full-height overflow-auto"
          >
            <router-view />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>

<style>
.split-screen-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;

  flex-grow: 1;
}
</style>