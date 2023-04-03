<template>
  <div class="column justify-center items-center q-px-md">
    <h5 class="q-mb-md q-mt-lg">{{ $t('navigation.customizer.Meta') }}</h5>
    <div class="column full-width">
      <p class="q-mt-none q-mb-sm text-subtitle1">
        {{ $t('generic.favicon') }}
      </p>
      <img :src="faviconUrl" class="full-width q-mb-md" v-if="faviconUrl" />
      <ButtonComponent
        file
        level="tertiary"
        :label="$t('generic.chooseFile')"
        stretch
        icon="image"
        @update="($ev) => (selectedFile = $ev)"
      />
      <small v-if="!selectedFile">{{ $t('customizer.noFileSelected') }}</small>

      <q-separator class="full-width q-my-lg" />

      <div class="column full-width">
        <p class="q-mt-none q-mb-sm text-subtitle1">
          {{ $t('generic.title') }}
        </p>
        <InputField
          v-model="title"
          placeholder="Rebillion"
          :rules="[(val) => !!val || 'Field is required']"
          class="col"
        />
        <ButtonComponent
          level="secondary"
          :label="$t('generic.save')"
          size="md"
          padding="sm xl"
          class="q-mt-md"
          @click="save"
          :loading="loading"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ChooseMetaComponent',
};
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import ButtonComponent from 'components/Global/ButtonComponent.vue';
import InputField from 'components/Global/InputField.vue';
import { useCustomizationsStore } from 'stores/customizations-store';

const store = useCustomizationsStore();
const selectedFile = ref<File>();
const faviconUrl = ref<string>();
const title = ref<string>('');
const loading = ref(false);

watch(selectedFile, (newVal) => {
  if (newVal) {
    const reader = new FileReader();
    reader.readAsDataURL(newVal);
    reader.onload = async function () {
      faviconUrl.value = reader.result as string;

      const formData = new FormData();
      formData.append('file', newVal);
      // formData.append('filename', 'jamies-file.png')

      try {
        let file = await store.uploadFavicon(formData)

        console.log(file)
      } catch (error) {
        console.error(error)
      }
    };
  }
});

async function save() {
  loading.value = true;

  const data = {
    favicon_title: title.value,
  };

  await store.customizerLinks(data);

  setTimeout(() => {
    loading.value = false;
  }, 500);
}
</script>
