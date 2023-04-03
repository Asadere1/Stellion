<template>
  <div class="column justify-center items-center">
    <h4 class="text-center text-weight-bold q-mb-sm">
      {{ $t('offer.title') }}
    </h4>
    <p class="text-center">{{ $t('offer.subtitle') }}</p>
    <div
      class="row justify-center gap-md q-my-xl"
      style="width: 80vw; max-width: 1050px"
    >
      <div class="column bg-white rounded-1 overflow-hidden col">
        <div class="column bg-accent-light q-pa-lg">
          <p class="text-primary text-uppercase text-weight-bold">
            {{ $t('offer.offer') }} 1
          </p>
          <p class="text-weight-bold text-h6 q-mb-none text-dark">
            {{ $t('offer.offer1.title') }}
          </p>
        </div>
        <ul class="q-pa-lg">
          <li class="q-mb-md">
            <q-avatar
              color="primary-light"
              text-color="primary"
              icon="check"
              class="q-mr-sm"
              size="sm"
              padding="sm"
            />{{ $t('offer.offer1.bullet1') }}
          </li>
          <li class="q-mb-md">
            <q-avatar
              color="primary-light"
              text-color="primary"
              icon="check"
              class="q-mr-sm"
              size="sm"
              padding="sm"
            />{{ $t('offer.offer1.bullet2') }}
          </li>
          <li class="q-mb-md">
            <q-avatar
              color="primary-light"
              text-color="primary"
              icon="check"
              class="q-mr-sm"
              size="sm"
              padding="sm"
            />{{ $t('offer.offer1.bullet3') }}
          </li>
          <li class="q-mb-md">
            <q-avatar
              color="primary-light"
              text-color="primary"
              icon="check"
              class="q-mr-sm"
              size="sm"
              padding="sm"
            />{{ $t('offer.offer1.bullet4') }}
          </li>
          <li>
            <q-avatar
              color="primary-light"
              text-color="primary"
              icon="check"
              class="q-mr-sm"
              size="sm"
              padding="sm"
            />{{ $t('offer.offer1.bullet5') }}
          </li>
        </ul>
      </div>

      <div
        class="column bg-white rounded-1 overflow-hidden shadow-15 col offer-primary"
        @click="$router.push('/checkout')"
      >
        <div class="column bg-primary q-pa-lg">
          <p class="text-white text-uppercase text-weight-bold">
            {{ $t('offer.offer') }} 2
          </p>
          <p class="text-weight-bold text-h6 q-mb-none text-white">
            {{ $t('offer.offer2.title') }}
          </p>
        </div>
        <ul class="q-pa-lg">
          <li class="q-mb-md">
            <q-avatar
              color="primary-light"
              text-color="primary"
              icon="check"
              class="q-mr-sm"
              size="sm"
              padding="sm"
            />{{ $t('offer.offer2.bullet1') }}
          </li>
          <li class="q-mb-md">
            <q-avatar
              color="primary-light"
              text-color="primary"
              icon="check"
              class="q-mr-sm"
              size="sm"
              padding="sm"
            />{{ $t('offer.offer2.bullet2') }}
          </li>
          <li class="q-mb-md">
            <q-avatar
              color="primary-light"
              text-color="primary"
              icon="check"
              class="q-mr-sm"
              size="sm"
              padding="sm"
            />{{ $t('offer.offer2.bullet3') }}
          </li>
          <li class="q-mb-md">
            <q-avatar
              color="primary-light"
              text-color="primary"
              icon="check"
              class="q-mr-sm"
              size="sm"
              padding="sm"
            />{{ $t('offer.offer2.bullet4') }}
          </li>
          <li>
            <q-avatar
              color="primary-light"
              text-color="primary"
              icon="check"
              class="q-mr-sm"
              size="sm"
              padding="sm"
            />{{ $t('offer.offer2.bullet5') }}
          </li>
        </ul>
      </div>

      <div class="column bg-white rounded-1 overflow-hidden col">
        <div class="column bg-accent-light q-pa-lg">
          <p class="text-primary text-uppercase text-weight-bold">
            {{ $t('offer.offer') }} 3
          </p>
          <p class="text-weight-bold text-h6 q-mb-none text-dark">
            {{ $t('offer.offer3.title') }}
          </p>
        </div>
        <ul class="q-pa-lg">
          <li class="q-mb-md">
            <q-avatar
              color="primary-light"
              text-color="primary"
              icon="check"
              class="q-mr-sm"
              size="sm"
              padding="sm"
            />{{ $t('offer.offer3.bullet1') }}
          </li>
          <li class="q-mb-md">
            <q-avatar
              color="primary-light"
              text-color="primary"
              icon="check"
              class="q-mr-sm"
              size="sm"
              padding="sm"
            />{{ $t('offer.offer3.bullet2') }}
          </li>
          <li class="q-mb-md">
            <q-avatar
              color="primary-light"
              text-color="primary"
              icon="check"
              class="q-mr-sm"
              size="sm"
              padding="sm"
            />{{ $t('offer.offer3.bullet3') }}
          </li>
          <li class="q-mb-md">
            <q-avatar
              color="primary-light"
              text-color="primary"
              icon="check"
              class="q-mr-sm"
              size="sm"
              padding="sm"
            />{{ $t('offer.offer3.bullet4') }}
          </li>
          <li>
            <q-avatar
              color="primary-light"
              text-color="primary"
              icon="check"
              class="q-mr-sm"
              size="sm"
              padding="sm"
            />{{ $t('offer.offer3.bullet5') }}
          </li>
        </ul>
      </div>
    </div>

    <div class="row justify-center">
      <ButtonComponent
        :label="$t('generic.nextStep')"
        class="q-mt-lg q-px-xl"
        :stretch="false"
        style="width: 300px"
      />
    </div>
  </div>
</template>

<script lang="ts">
import ButtonComponent from 'src/components/Global/ButtonComponent.vue';

export default {
  name: 'OfferPage',
  components: { ButtonComponent },
};
</script>

<script lang="ts" setup></script>

<style lang="scss">
.offer-primary {
  border: 2px solid $primary;
}
</style>
