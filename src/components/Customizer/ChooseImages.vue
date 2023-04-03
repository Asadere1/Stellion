<template>
  <div class="column justify-center items-center q-px-md">
    <h5 class="q-mb-md q-mt-lg">{{ $t('navigation.customizer.Images') }}</h5>
    <div class="column full-width">
      <p class="q-mt-none q-mb-sm text-subtitle1">{{ $t('generic.logo') }}</p>
      <img :src="imageUrl" class="full-width q-mb-md" v-if="imageUrl" />
      <ButtonComponent
        file
        level="tertiary"
        :label="$t('generic.chooseFile')"
        stretch
        icon="image"
        @update="($ev) => (selectedFile = $ev)"
      />
      <small v-if="!selectedFile">{{ $t('customizer.noFileSelected') }}</small>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ChooseImagesComponent',
};
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import ButtonComponent from 'components/Global/ButtonComponent.vue';
import { useCustomizationsStore } from 'stores/customizations-store';

const store = useCustomizationsStore();
const selectedFile = ref<File>();
const imageUrl = ref<string>();
watch(selectedFile, (newVal) => {
  if (newVal) {
    console.log({ newVal });
    const reader = new FileReader();
    reader.readAsDataURL(newVal);
    reader.onload = async function () {
      imageUrl.value = reader.result as string;

      const formData = new FormData();
      formData.append('file', newVal);
      // formData.append('filename', 'jamies-file.png')

      try {
        let file = await store.uploadLogo(formData)

        console.log(file)
      } catch (error) {
        console.error(error)
      }
    };
  }
});
</script>
