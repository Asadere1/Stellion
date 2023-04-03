<template>
  <div class="info-cards">
    <!-- Info-Card -->
    <q-card class="express-checkout">
      <div class="title">Express Checkout</div>
      <q-card-actions>
        <q-btn flat class="shop-pay">
          <q-img src="~assets/ShopPay.svg" width="85px" no-spinner />
        </q-btn>
        <q-btn flat class="pay-pal">
          <q-img src="~assets/PayPal.svg" width="90px" no-spinner />
        </q-btn>
        <q-btn flat class="g-pay">
          <q-img src="~assets/GPay.svg" width="56px" no-spinner />
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.info-cards {
  display: flex;
  flex-direction: column;

  gap: 18px;

  @include tablet() {
    gap: 30px;
  }

  @include mobile() {
    gap: 20px;
  }

  .q-card {
    padding: 30px;

    @include mobile() {
      padding: 16px;
    }

    .title {
      @include font(20px, 30px, 600);
    }

    &.express-checkout {
      background: #ffffff;
      border: 1px solid #daddf5;

      box-shadow: 0px 10px 30px rgba(22, 8, 49, 0.05) !important;

      .title {
        margin-bottom: 20px;

        @include mobile() {
          margin-bottom: 12px;
        }
      }

      .q-card__actions {
        gap: 15px;

        .q-btn {
          @include button(50px);

          width: 100%;
          max-width: 147px;

          border-radius: 12px;

          margin-left: 0;

          &.shop-pay {
            background: #5a31f4;
          }

          &.pay-pal {
            background: #f6c657;
          }

          &.g-pay {
            background: #000000;
          }
        }

        @include tablet-down() {
          display: grid;
          grid-template-columns: repeat(3, 1fr);

          gap: 30px;

          .q-btn {
            max-width: 100%;
          }
        }

        @include mobile() {
          grid-template-columns: repeat(1, 1fr);
          gap: 12px;
        }
      }
    }
  }
}
</style>
