<template>
  <div style="width: 360px">
    <h4 class="q-mt-none q-mb-sm text-weight-bold">
      {{ $t('registration.login.resetCTA') }}
    </h4>
    <p class="q-mb-lg">{{ $t('registration.login.welcomeTo') }}</p>

    <h6
      v-if="!auth"
      class="q-ma-none q-my-md q-pa-md rounded-1 bg-negative-light text-negative"
    >
      {{ errorMessage }}
    </h6>

    <InputField
      autofocus
      type="email"
      ref="emailInput"
      v-model="creds.email"
      :label="$t('registration.registration.emailAddress')"
      class="q-mb-lg"
      @keyup.enter="resetPassword"
    />
    <a
      href=""
      @click.prevent="$router.push('login')"
      class="text-right text-dark-5 block"
      >{{ $t('registration.login.login') }}</a
    >

    <ButtonComponent
      :label="$t('registration.login.resetCTA')"
      class="q-mt-lg"
      stretch
      :disable="!creds.email || loading"
      :loading="loading"
      @click="resetPassword"
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
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const store = useUsersStore();

const router = useRouter();

const auth = ref(true);

const loading = ref(false);

const errorMessage = ref('');

const creds = reactive({
  email: '',
});

async function resetPassword() {
  loading.value = true;
  try {
    const success = await store.resetPassword(creds);

    if (success) {
      router.push('/login');
    } else {
      errorMessage.value = t('registration.login.resetFailed');
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
