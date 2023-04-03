<template>
  <div
    ref="form"
    class="full-width row q-gutter-md"
    v-if="$route.params.section === 'social'"
  >
    <InputField
      v-model="userProfileDupe.twitter"
      @update:model-value="$emit('update', userProfileDupe)"
      :label="$t('generic.twitter')"
      class="col-6 q-mb-lg"
      filled
      :rules="[(val) => !!val || 'Field is required']"
    />
    <InputField
      v-model="userProfileDupe.instagram"
      @update:model-value="$emit('update', userProfileDupe)"
      :label="$t('generic.instagram')"
      class="col q-mb-lg"
      filled
      :rules="[(val) => !!val || 'Field is required']"
    />
    <InputField
      v-model="userProfileDupe.facebook"
      @update:model-value="$emit('update', userProfileDupe)"
      :label="$t('generic.facebook')"
      class="col-6 q-mb-lg"
      filled
      :rules="[(val) => !!val || 'Field is required']"
    />
    <InputField
      v-model="userProfileDupe.pinterest"
      @update:model-value="$emit('update', userProfileDupe)"
      :label="$t('generic.pinterest')"
      class="col q-mb-lg"
      filled
      :rules="[(val) => !!val || 'Field is required']"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProfileSocialInfo',
};
</script>

<script lang="ts" setup>
import { QForm } from 'quasar';
import { User } from 'src/utils/EntityDefinitions';
import { PropType, reactive, ref } from 'vue';
import InputField from 'components/Global/InputField.vue';

const props = defineProps({
  userProfile: {
    type: Object as PropType<User>,
    required: true,
  },
});

const form = ref<QForm>();

defineExpose(form);

const userProfileDupe = reactive<User>({ ...props.userProfile });
</script>
