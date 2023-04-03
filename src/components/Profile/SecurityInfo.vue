<template>
  <div
    ref="form"
    class="full-width row q-gutter-md"
    v-if="$route.params.section === 'password-and-security'"
  >
    <InputField
      v-model="userProfileDupe.email"
      @update:model-value="$emit('update', userProfileDupe)"
      :label="$t('generic.email')"
      class="col-6 q-mb-lg"
      filled
      :rules="[(val) => !!val || 'Field is required']"
    />
    <InputField
      type="password"
      v-model="existingPassword"
      @update:model-value="$emit('update', userProfileDupe)"
      :label="$t('generic.oldPassword')"
      class="col q-mb-lg"
      filled
      :rules="[(val) => !!val || 'Field is required']"
    />
    <InputField
      type="password"
      v-model="userProfileDupe.password"
      @update:model-value="$emit('update', userProfileDupe)"
      :label="$t('generic.newPassword')"
      class="col-6 q-mb-lg"
      filled
      :rules="[(val) => !!val || 'Field is required']"
    />
    <InputField
      type="password"
      v-model="userProfileDupe.repeatPassword"
      @update:model-value="$emit('update', userProfileDupe)"
      :label="$t('registration.login.repeatPassword')"
      class="col q-mb-lg"
      filled
      :rules="[(val) => !!val || 'Field is required']"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProfileSecurityInfo',
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

const userProfileDupe = reactive<User>({ ...props.userProfile });

const form = ref<QForm>();

defineExpose(form);

const existingPassword = ref('');
</script>
