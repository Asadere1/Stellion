<template>
  <div
    class="rounded-1 border-dark-3 column bg-white q-pa-md integration transition-all"
    :class="hover ? 'hover shadow-14' : ''"
    style="min-width: 200px; max-width: 200px"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <div
      class="q-pa-md column justify-center items-center rounded-1"
      :class="name"
    >
      <img :src="logo" class="full-width" />
    </div>
    <h6 class="q-mt-md q-mb-none">{{ title }}</h6>
    <p class="q-my-md">{{ description }}</p>
    <ButtonComponent
      class="q-mt-auto"
      :level="hover ? 'primary' : 'outline-primary'"
      :label="$t('integrations.newIntegration')"
      :stretch="false"
      size="md"
      padding="sm lg"
      :disable="disabled"
      @click="$router.push(`/integrations/add/${type}/${name}`)"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'NewIntegrationComponent',
  components: { ButtonComponent },
};
</script>

<script lang="ts" setup>
import { ref } from 'vue';
import ButtonComponent from 'components/Global/ButtonComponent.vue';

defineProps({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: [String, Number],
    required: true,
  },
});

const hover = ref(false);
</script>

<style scoped lang="scss">
.Facebook {
  background-color: #e7f1fe;
}
.Klaviyo {
  background-color: #e8f7f0;
}
.Snapchat {
  background-color: #fffdeb;
}
.TikTok {
  background-color: #edfffd;
}
.Shopify {
  background-color: #d0ffdf;
}
</style>
