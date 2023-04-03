<template>
  <div class="footer">
    <q-separator />

    <div class="footer-links">
      <router-link :to="{ path: '' }">Terms and Conditions</router-link>
      <router-link :to="{ path: '' }">Privacy Policy</router-link>
      <router-link :to="{ path: '' }">Refund Policy</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      //
    };
  },
};
</script>

<style scoped lang="scss">
.footer {
  .q-separator {
    background-color: #d9d9d9;

    margin-bottom: 11px;
  }

  .footer-links {
    @include font(12px, 18px, 500);

    display: flex;
    gap: 20px;

    a {
      color: #000000 !important;
      text-decoration: none;

      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
