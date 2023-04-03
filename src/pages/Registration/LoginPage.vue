<template>
  <div style="width: 446px" class="login-container">
    <h4 class="q-mt-none q-mb-sm text-weight-bold">
      {{ $t('registration.login.login') }}
    </h4>
    <p class="text-dark-2">{{ $t('registration.login.welcomeTo') }}</p>

    <h6
      v-if="!auth"
      class="q-ma-none q-my-md q-pa-md rounded-1 bg-negative-light text-negative"
    >
      {{ errorMessage }}
    </h6>

    <InputField
      autofocus
      ref="usernameInput"
      v-model="creds.username"
      :label="$t('registration.login.username')"
      class="q-mb-lg"
      style="margin-top: 48.51px"
      placeholder="Username"
      @keyup.enter="
        creds.password.length > 0
          ? login()
          : (
              $refs.passwordField as InstanceType<typeof InputField>
            )?.inputField?.focus()
      "
    />
    <InputField
      ref="passwordField"
      v-model="creds.password"
      placeholder="Password"
      type="password"
      :label="$t('registration.login.password')"
      class="q-mb-sm"
      style="border-radius: 16px"
      @keyup.enter="
        creds.username.length > 0
          ? login()
          : (
              $refs.usernameInput as InstanceType<typeof InputField>
            )?.inputField?.focus()
      "
    />

    <a
      href=""
      @click.prevent="$router.push('reset_password')"
      class="text-right text-dark-4 block"
      style="
        text-decoration: none;
        font-size: 14px;
        margin-top: 12px;
        margin-bottom: 14px;
      "
      >{{ $t('registration.login.forgotPassword') }}</a
    >

    <ButtonComponent
      :label="$t('registration.login.loginCTA')"
      class="q-mt-none login-btn"
      stretch
      :disable="!creds.username || !creds.password || loading"
      :loading="loading"
      @click="login"
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
import { useRouter } from 'vue-router';
import { useUsersStore } from 'stores/users-store';
// import { useI18n } from 'vue-i18n';
// const { t } = useI18n();

const store = useUsersStore();

const router = useRouter();

const auth = ref(true);

const loading = ref(false);

const errorMessage = ref('');

const creds = reactive({
  username: '',
  password: '',
});

async function login() {
  loading.value = true;
  try {
    const response = await store.login(creds);
    console.log(response);
    if (response.success) {
      router.push('/dashboard');
    } else {
      errorMessage.value = response.error.error;
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

<style lang="scss">
.login-container {
  .column {
    margin-bottom: 14px;
    p {
      font-weight: 500;
      font-size: 14px;
      color: $dark-1 !important;
      line-height: 24px;
    }
  }

  .login-btn {
    span.block {
      font-size: 16px;
      font-weight: 600;
      border-radius: 16px;
      color: $dark-1;
    }
  }
}
</style>
