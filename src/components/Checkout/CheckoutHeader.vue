<template>
  <div class="header container">
    <q-img
      class="logo"
      src="checkout/DemoClubLogo.png"
      fit="contain"
      no-spinner
    />

    <q-card flat class="secure-checkout-card">
      <div class="checkout-info">
        <div>
          <q-img
            src="~assets/icons/secure_lock.svg"
            width="20px"
            height="24px"
            no-spinner
          />
        </div>
        <div>Secure SSL Encryption & Guaranteed Safe Checkout</div>
      </div>
      <div class="card-icons">
        <div>
          <q-img
            src="~assets/icons/mastercard.svg"
            width="40px"
            height="24px"
          />
        </div>
        <div>
          <q-img
            src="~assets/icons/visa.svg"
            width="40px"
            height="24px"
            no-spinner
          />
        </div>
        <div>
          <q-img
            src="~assets/icons/amex.svg"
            width="40px"
            height="24px"
            no-spinner
          />
        </div>
        <div>
          <q-img
            src="~assets/icons/jcb.svg"
            width="40px"
            height="24px"
            no-spinner
          />
        </div>
        <div>
          <q-img
            src="~assets/icons/diners_club.svg"
            width="40px"
            height="24px"
            no-spinner
          />
        </div>
      </div>
    </q-card>
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
.header {
  height: 140px;

  padding-top: 40px;

  background: transparent;

  display: flex;
  align-items: center;

  &.container {
    @include container();

    display: flex;
    align-items: center;

    gap: 35px;

    width: 100%;

    @include tablet-down() {
      gap: 10px;
      justify-content: space-between;
    }
  }

  .q-img {
    width: 155px;
  }

  .secure-checkout-card {
    @include font(16px, 26px);

    display: flex;
    flex-direction: column;

    gap: 14px;

    padding: 0;

    color: $secondary-checkout;

    @include tablet() {
      @include font(12px, 18px, 500);

      gap: 21px;
    }

    @include mobile() {
      @include font(7px, 10px, 300);
      gap: 6px;
    }

    .checkout-info {
      display: flex;
      align-items: center;

      gap: 17px;

      @include mobile() {
        gap: 2px;

        .q-img {
          width: 8px !important;
          height: 10px !important;
        }
      }
    }

    .card-icons {
      display: flex;

      gap: 15px;

      @include tablet() {
        .q-img {
          width: 66px !important;
          height: 40px !important;
        }
      }

      @include mobile() {
        gap: 6px;

        .q-img {
          width: 36px !important;
          height: 21px !important;
        }
      }
    }
  }

  @include tablet() {
    padding: 34px 0 0 0;

    .q-img {
      width: 170px;
    }
  }

  @include mobile() {
    height: 80px;

    padding: 8px 0 0 0;

    .q-img {
      width: 115px;
    }
  }
}
</style>
