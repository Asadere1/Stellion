<template>
  <div class="full-width row q-gutter-md">
    <InputField
      v-model="userProfileDupe.firstName"
      @update:model-value="$emit('update', userProfileDupe)"
      :label="$t('generic.firstName')"
      class="col-6"
      filled
      :rules="[(val) => !!val || 'Field is required']"
    />
    <InputField
      v-model="userProfileDupe.lastName"
      @update:model-value="$emit('update', userProfileDupe)"
      :label="$t('generic.lastName')"
      class="col"
      filled
      :rules="[(val) => !!val || 'Field is required']"
    />
    <InputField
      type="select"
      :select-options="optionsFromType(ProfileRole)"
      v-model="userProfileDupe.role"
      @update:model-value="$emit('update', userProfileDupe)"
      :label="$t('generic.preselect')"
      class="col-6"
      filled
    />
    <InputField
      v-model="userProfileDupe.username"
      @update:model-value="$emit('update', userProfileDupe)"
      :label="$t('registration.login.username')"
      class="col"
      filled
      :rules="[(val) => !!val || 'Field is required']"
    />
    <InputField
      type="select"
      :select-options="optionsFromType(ProfileStatus)"
      v-model="userProfileDupe.status"
      @update:model-value="$emit('update', userProfileDupe)"
      :label="$t('generic.status')"
      class="col-6"
      filled
    />
    <InputField
      v-model="userProfileDupe.email"
      @update:model-value="$emit('update', userProfileDupe)"
      :label="$t('generic.email')"
      class="col"
      filled
      :rules="[(val) => !!val || 'Field is required']"
    />
    <InputField
      type="select"
      :select-options="optionsFromType(ProfileDepartment)"
      v-model="userProfileDupe.department"
      @update:model-value="$emit('update', userProfileDupe)"
      :label="$t('profile.department')"
      class="col-6"
      filled
    />
    <InputField
      v-model="userProfileDupe.address"
      @update:model-value="$emit('update', userProfileDupe)"
      :label="$t('generic.address')"
      class="col"
      filled
      :rules="[(val) => !!val || 'Field is required']"
    />
    <InputField
      type="select"
      :select-options="optionsFromType(CitiesFrance)"
      v-model="userProfileDupe.city"
      @update:model-value="$emit('update', userProfileDupe)"
      :label="$t('generic.city')"
      class="col-6"
      filled
    />

    <InputField
      v-model="userProfileDupe.password"
      @update:model-value="$emit('update', userProfileDupe)"
      type="password"
      :label="$t('registration.login.password')"
      class="col"
      filled
    />

    <InputField
      v-model="userProfileDupe.repeatPassword"
      @update:model-value="$emit('update', userProfileDupe)"
      type="password"
      :label="$t('registration.login.repeatPassword')"
      class="col-6"
      filled
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProfileBasicInfo',
};
</script>

<script lang="ts" setup>
import {
  ProfileRole,
  ProfileStatus,
  ProfileDepartment,
  CitiesFrance,
  User,
} from 'src/utils/EntityDefinitions';
import { optionsFromType } from 'src/utils/helpers';
import { PropType, reactive } from 'vue';
import InputField from 'components/Global/InputField.vue';

const props = defineProps({
  userProfile: {
    type: Object as PropType<User>,
    required: true,
  },
});

const userProfileDupe = reactive<User>({ ...props.userProfile });
</script>
