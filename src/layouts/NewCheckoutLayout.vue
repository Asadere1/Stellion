<template>
  <q-layout view="lHh LpR lFf" class="layout-checkout">
    <div class="backdrop"></div>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          mode="out-in"
          :duration="checkoutTransition ? 300 : 0"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from 'pinia';
import { useDataStore } from 'stores/data-store';

import CheckoutHeader from 'components/Checkout/CheckoutHeader.vue';

export default {
  name: 'CheckoutLayout',
  components: {
    CheckoutHeader,
  },
  computed: {
    ...mapState(useDataStore, ['checkoutTransition']),
  },
};
</script>

<style scoped lang="scss">
.q-layout {
  background: #ffffff;

  &.layout-checkout {
    overflow: hidden;
  }
}

.q-page-container {
  .q-page {
    padding-top: 0px;
    padding-bottom: 80px;

    @include mobile() {
      padding-bottom: 25px !important;
    }
  }
}

.animated {
  animation-duration: 0.3s !important;
}
</style>
