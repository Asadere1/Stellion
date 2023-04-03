<template>
  <div class="flex justify-center items-center full-height">
    <div
      class="column bg-white rounded-1 overflow-hidden col q-pa-xl justify-center items-center"
      style="width: 40vw; max-width: 600px"
    >
      <img src="~/assets/welcome.svg" style="width: 50%; height: auto" />
      <h4
        class="text-center text-weight-bold"
        style="font-size: 30px; margin: 24px;"
      >
        {{ $t('success.welcome') }}
      </h4>
      <p class="text-center" id="support-verbiage">
        {{ $t('success.getSupport') }},
        <a href="" @click.stop.prevent="$router.push('/')">{{
          $t('success.clickSend')
        }}</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SuccessPage',
};
</script>

<script lang="ts" setup></script>

<style lang="scss">
#support-verbiage {
  color: $dark-2;
  font-size: 16px;
  line-height: 26px;
  font-weight: 400;
}
</style>
