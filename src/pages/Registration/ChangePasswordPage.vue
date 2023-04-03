<template>
  <div style="width: 360px">
    <h4 class="q-mt-none q-mb-sm text-weight-bold">
      {{ $t('registration.login.changePassword') }}
    </h4>
    <p class="q-mb-lg">{{ $t('registration.login.welcomeTo') }}</p>

    <h6
      v-if="!auth"
      class="q-ma-none q-my-md q-pa-md rounded-1 bg-negative-light text-negative"
    >
      {{ errorMessage }}
    </h6>

    <p
      v-if="
        creds.repeatPassword &&
        creds.password &&
        creds.repeatPassword !== creds.password
      "
      class="q-ma-none q-my-md q-pa-sm rounded-1 bg-negative-light text-negative"
    >
      {{ $t('registration.login.passwordsMustMatch') }}
    </p>

    <InputField
      ref="passwordField"
      v-model="creds.password"
      type="password"
      :label="$t('registration.login.password')"
      class="q-mb-lg"
      @keyup.enter="
        creds.repeatPassword.length > 0
          ? changePassword()
          : (
              $refs.repeatPasswordField as InstanceType<typeof InputField>
            )?.inputField?.focus()
      "
    />
    <InputField
      ref="repeatPasswordField"
      v-model="creds.repeatPassword"
      type="password"
      :label="$t('registration.login.changePassword')"
      class="q-mb-sm"
      :rules="[
        (val) =>
          val === creds.password || $t('registration.login.passwordsMustMatch'),
      ]"
      @keyup.enter="
        creds.password.length > 0
          ? changePassword()
          : (
              $refs.passwordField as InstanceType<typeof InputField>
            )?.inputField?.focus()
      "
    />

    <a
      href=""
      @click.prevent="$router.push('/login')"
      class="text-right text-dark-5 block"
      >{{ $t('registration.login.login') }}</a
    >

    <ButtonComponent
      :label="$t('registration.login.changePassword')"
      class="q-mt-lg"
      stretch
      :disable="
        !creds.repeatPassword ||
        !creds.password ||
        creds.repeatPassword !== creds.password ||
        loading
      "
      :loading="loading"
      @click="changePassword"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'LoginPage',
};
</script>

<script lang="ts" setup>
import ButtonComponent from 'src/components/Global/ButtonComponent.vue';
import InputField from 'src/components/Global/InputField.vue';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUsersStore } from 'stores/users-store';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const store = useUsersStore();

const router = useRouter();

const route = useRoute();

const auth = ref(true);

const loading = ref(false);

const errorMessage = ref('');

const creds = reactive({
  email: route.params.email as string,
  code: route.params.code as string,
  repeatPassword: '',
  password: '',
});

async function changePassword() {
  loading.value = true;
  try {
    const success = await store.changePassword(creds);

    if (success) {
      router.push('/dashboard');
    } else {
      errorMessage.value = t('registration.login.changePasswordFailed');
      auth.value = false;
      loading.value = false;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    errorMessage.value = err.response.data.error;
    auth.value = false;
    loading.value = false;
  }
}
</script>
