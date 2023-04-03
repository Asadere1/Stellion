<template>
  <div style="width: 360px">
    <h4 class="q-mt-none q-mb-sm text-weight-bold">
      {{ $t('registration.verification.verification') }}
    </h4>
    <p class="q-mb-lg">{{ $t('registration.verification.putAuthCode') }}</p>

    <InputField
      v-model="creds.authCode"
      :label="$t('registration.verification.authCode')"
      class="q-mb-lg"
    />

    <ButtonComponent
      :label="$t('generic.submit')"
      class="q-mt-lg"
      stretch
      :disable="!creds.authCode"
      @click="$router.push('/login')"
      style="text-transform: capitalize;"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'VerificationPage',
};
</script>

<script lang="ts" setup>
import ButtonComponent from 'src/components/Global/ButtonComponent.vue';
import InputField from 'src/components/Global/InputField.vue';
import { reactive } from 'vue';

const creds = reactive({
  authCode: '',
});
</script>
