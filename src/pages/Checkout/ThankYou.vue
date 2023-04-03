<template>
  <q-page>
     <checkout-header />

    <div class="content">
      <div class="left-side">
        <q-card class="thank-you-card">
          <div>
            <q-img src="checkout/OrderComplete.svg" width="210px" />
          </div>

          <div class="title">Thank you!</div>

          <div class="subtitle">
            Your order <span class="emphasize">#15636561</span> has been placed
          </div>

          <div class="actions">
            <q-btn
              class="finish-btn"
              no-caps
              color="primary"
              @click="resetFlow"
            >
              <div>
                <q-icon
                  :name="`img:${require('assets/icons/arrow_right.svg')}`"
                  size="11px"
                />
              </div>
              <div>Back to Shop</div>
            </q-btn>
          </div>
        </q-card>

        <q-card class="order-info-card">
          <div>
            <div class="key">Name:</div>
            <div class="value">{{ orderInfo.name }}</div>
          </div>

          <q-separator />

          <div>
            <div class="key">Email:</div>
            <div class="value">{{ orderInfo.email }}</div>
          </div>

          <q-separator />

          <div>
            <div class="key">Ship to:</div>
            <div class="value">{{ orderInfo.ship_to }}</div>
          </div>

          <q-separator />

          <div>
            <div class="key">Bill to:</div>
            <div class="value">{{ orderInfo.bill_to }}</div>
          </div>

          <q-separator />

          <div>
            <div class="key">Payment:</div>
            <div class="value">{{ orderInfo.payment }}</div>
          </div>
        </q-card>
      </div>

      <div class="right-side">
        <order-summary no-discount-form />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'pinia';
import { useDataStore } from 'stores/data-store';

import CheckoutHeader from 'components/Checkout/CheckoutHeader.vue';
import OrderSummary from 'components/Checkout/OrderSummary.vue';

export default {
  components: {
    CheckoutHeader,
    OrderSummary
  },
  data() {
    return {
      orderInfo: {
        name: 'Oleo Bone',
        email: 'oleo_bone@gmail.com',
        ship_to: '4140 Parker Rd. Allentown, New Mexico 31134',
        bill_to: '4140 Parker Rd. Allentown, New Mexico 31134',
        payment: 'Credit Card',
      },
    };
  },
  computed: {
    ...mapState(useDataStore, ['checkoutData']),
  },
  methods: {
    resetFlow() {
      this.$router.push({ name: 'checkout' });
    },
  },
};
</script>

<style scoped lang="scss">

.content {
  @include container();

  display: grid;

  grid-template-columns: 540px 510px;

  justify-content: space-between;

  margin-top: 20px;

  @include tablet-down() {
    display: flex;
    flex-direction: column;

    gap: 40px;
  }

  @include mobile() {
    margin-top: 0;
  }

  :deep(.q-card) {
    border-radius: 16px;

    box-shadow: none;
  }

  @include mobile() {
    gap: 30px;
  }

  /* Sides-specific styles */

  .left-side {
    display: flex;
    flex-direction: column;

    gap: 30px;

    @include tablet-down() {
      order: 2;

      gap: 40px;
    }

    @include mobile() {
      gap: 30px;
    }

    .thank-you-card {
      display: flex;
      flex-direction: column;

      align-items: center;

      padding: 63px 50px 60px;

      background: #ffffff;
      border: 1px solid #d6d8ea;

      @include mobile() {
        padding: 32px 34px;
      }

      .title {
        @include font(24px, 34px);

        font-weight: 600;

        margin-top: 30px;
      }

      .subtitle {
        @include font(16px, 26px);

        margin-top: 10px;

        color: $secondary-checkout;
        .emphasize {
          color: $primary-checkout;
          font-weight: 600;
        }

        @include mobile() {
          @include font(14px, 24px);
        }
      }

      :deep(.actions) {
        margin-top: 40px;

        @include mobile() {
          margin-top: 30px;
        }

        .q-btn {
          @include button(56px, 50px);
          @include font(16px, 20px, 600);

          border-radius: 16px;

          background: $primary-checkout !important;

          @include mobile() {
            @include button(42px, 0);
            font-weight: 500;

            width: 193px;
          }
        }

        .finish-btn .q-btn__content {
          gap: 10px;

          .q-icon {
            /* Better alignment of the icon with button label */
            transform: rotate(180deg) translateY(0.5px);
          }
        }
      }
    }

    .order-info-card {
      @include font(14px, 24px);

      display: flex;
      flex-direction: column;

      gap: 10px;

      padding: 40px;

      background: #f1f3f6;
      border: 1px solid #e0e7f0;

      @include mobile() {
        padding: 20px;
      }

      & > div {
        display: grid;
        grid-template-columns: 110px auto;

        color: $secondary-checkout;

        .value {
          color: $primary-checkout;
        }
      }

      .q-separator {
        background: #d6d8ea;
      }
    }
  }

  .right-side {
    display: flex;
    flex-direction: column;

    gap: 30px;

    @include tablet-down() {
      order: 1;

      gap: 0;
    }
  }
}
</style>
