<template>
  <div class="full-width row q-gutter-md">
    <InputField
      v-model="userProfileDupe.telephone"
      @update:model-value="$emit('update', userProfileDupe)"
      :label="$t('generic.telephone')"
      class="col-6 q-mb-lg"
      filled
      :rules="[(val) => !!val || 'Field is required']"
    />
    <InputField
      v-model="userProfileDupe.mobile"
      @update:model-value="$emit('update', userProfileDupe)"
      :label="$t('generic.mobile')"
      class="col q-mb-lg"
      filled
      :rules="[(val) => !!val || 'Field is required']"
    />
    <InputField
      v-model="userProfileDupe.website"
      @update:model-value="$emit('update', userProfileDupe)"
      :label="$t('generic.website')"
      class="col-6 q-mb-lg"
      filled
      :rules="[(val) => !!val || 'Field is required']"
    />
    <InputField
      v-model="userProfileDupe.languages"
      @update:model-value="$emit('update', userProfileDupe)"
      :label="$t('generic.languages')"
      class="col q-mb-lg"
      filled
      :rules="[(val) => !!val || 'Field is required']"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProfileContactInfo',
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
