<template>
  <div>
    <q-card
      v-if="$q.screen.lt.md"
      class="alt-order-summary"
      @click="toggleSummary"
    >
      <div>
        <q-img
          src="~assets/icons/shopping_cart.svg"
          height="24px"
          width="24px"
        />
      </div>
      <div class="action">
        <div class="name">
          {{ summaryOpen ? 'Hide' : 'Show' }} order summary
        </div>
        <div class="toggle">
          <q-img
            src="~assets/icons/arrow_up.svg"
            height="24px"
            width="24px"
            :class="{ open: summaryOpen }"
          />
        </div>
      </div>
      <div class="item-info">
        <div class="price">${{ parseFloat(cartTotal).toFixed(2) }}</div>
      </div>
    </q-card>

    <!-- Above is for tablets and below -->

    <q-slide-transition>
      <div v-show="$q.screen.gt.md || summaryOpen" class="cart-card-wrapper">
        <q-card class="cart-card">
          <div class="cart-items">
            <div class="item" v-for="item in cartItems" :key="item.id">
              <q-img
                :src="`/${item.image}`"
                :height="$q.screen.gt.md ? '70px' : '52px'"
                :width="$q.screen.gt.md ? '70px' : '52px'"
              />
              <div class="item-info">
                <div class="wrapper">
                  <div class="name">{{ item.name }}</div>
                  <div class="quantity" v-if="$q.screen.gt.md">
                    X {{ item.qty }}
                  </div>
                </div>
              </div>
              <div class="item-info">
                <!--
                  ParseFloat is a good safety measure that'd save us if backend
                  sent a string for some reason
                -->
                <div class="price">
                  ${{ parseFloat(item.price).toFixed(2) }}
                </div>
              </div>
            </div>
          </div>
          <div class="discount" v-if="!noDiscountForm">
            <q-input
              v-model="discount_code"
              outlined
              placeholder="Discount code"
            />

            <q-btn no-caps color="primary" label="Apply" />
          </div>
          <div class="totals">
            <div class="subtotal">
              <div>
                <div>Subtotal</div>
                <div class="amount">${{ cartSubtotal.toFixed(2) }}</div>
              </div>
              <div>
                <div>Shipping</div>
                <div class="amount">Free</div>
              </div>
              <div v-if="noDiscountForm">
                <div>Discount</div>
                <div class="amount">$0</div>
              </div>
            </div>
            <q-separator />
            <div class="total">
              <div>Total</div>
              <div>${{ cartTotal.toFixed(2) }}</div>
            </div>
          </div>
        </q-card>

        <!-- Info Panel is only part of OrderSummary on tablets and below -->
        <!-- Due to designs -->

        <info-panels-right />
      </div>
    </q-slide-transition>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useConstantsStore } from 'stores/constants-store';

import InfoPanelsRight from 'components/Checkout/InfoPanelsRight.vue';

export default {
  props: {
    noDiscountForm: Boolean,
  },
  components: {
    InfoPanelsRight,
  },
  data() {
    return {
      shipping: 0,
      summaryOpen: false,
      discount_code: '',
    };
  },
  computed: {
    ...mapState(useConstantsStore, ['cartItems', 'countryList']),
    cartSubtotal() {
      let subtotal = 0;

      if (this.cartItems && Array.isArray(this.cartItems)) {
        subtotal = this.cartItems.reduce(
          (acc, cur) => acc + parseFloat(cur.price),
          0
        );
      }

      return subtotal;
    },
    cartTotal() {
      return this.cartSubtotal + this.shipping;
    },
  },
  methods: {
    toggleSummary() {
      this.summaryOpen = !this.summaryOpen;
    },
  },
};
</script>

<style scoped lang="scss">
/* Tablets and below */

.alt-order-summary {
  @include font(16px, 26px, 500);

  display: grid;
  grid-template-columns: auto 1fr auto;

  align-items: center;

  gap: 16px;

  margin-top: 10px;
  padding: 24px;

  border: 1px solid #d6d8ee;
  border-radius: 20px !important;

  background: #ffffff;

  color: $secondary-checkout;

  @include mobile() {
    @include font(14px, 24px, 500);

    gap: 12px;

    margin-top: 0;
    padding: 16px;

    border-radius: 12px !important;
  }

  .action {
    display: flex;
    align-items: center;

    gap: 25px;
  }

  .price {
    color: $primary-checkout;

    font-weight: 600;
  }

  .toggle .q-img {
    transition: all 0.25s;

    &.open {
      transform: rotate(180deg);
    }
  }
}

/*  */

.cart-card-wrapper {
  display: flex;
  flex-direction: column;

  gap: 30px;

  .cart-card {
    display: flex;
    flex-direction: column;

    gap: 30px;

    padding: 30px 46px 27px 34px;
    //margin-top: 30px;

    background: #f5f6fe;
    border: 1px solid #e0e7f0;

    @include tablet() {
      background: #eff6fe;

      margin-top: 30px;
    }

    @include mobile() {
      margin-top: 8px;
      padding: 20px 16px;
    }

    .cart-items {
      display: flex;
      flex-direction: column;

      gap: 16px;

      @include tablet() {
        gap: 20px;
      }

      @include mobile() {
        gap: 28px;
      }

      .item {
        @include font(16px, 26px);

        display: grid;

        grid-template-columns: auto 1fr auto;

        gap: 15px;

        .item-info {
          display: flex;
          align-items: center;

          .wrapper {
            display: flex;
            flex-direction: column;

            gap: 4px;
          }

          .name,
          .price {
            font-weight: 500;

            color: $primary-checkout;

            @include tablet() {
              font-weight: 400;
            }
          }

          @include mobile() {
            .name {
              font-weight: 400;
            }

            .price {
              font-weight: 600;
            }
          }

          .quantity {
            @include font(14px, 24px);
          }
        }
      }
    }

    .discount {
      position: relative;

      :deep(.q-input) {
        .q-field__control {
          background-color: #ffffff;
          padding-left: 25px;
          padding-right: 25px;
        }

        ::placeholder {
          font-weight: 500;
        }
      }

      .q-btn {
        @include button(46px);
        @include font(16px, 20px);

        width: 115px;

        border-radius: 16px;

        background: $primary-checkout !important;

        position: absolute;
        top: calc((56px - 46px) / 2);
        right: 5px;
      }

      @include tablet-down() {
        position: initial;

        display: grid;
        grid-template-columns: 1fr auto;

        align-items: center;

        gap: 20px;

        .q-btn {
          @include button(56px);

          width: 164px;

          position: relative;
          top: 0;
          right: 0;
        }
      }

      @include mobile() {
        gap: 12px;

        :deep(.q-input) {
          border-radius: 12px !important;

          .q-field__inner,
          .q-field__control {
            border-radius: 12px !important;
          }
        }

        .q-btn {
          @include button(46px);

          width: 110px;

          border-radius: 10px;
        }
      }
    }

    .totals {
      @include font(16px, 26px);

      display: flex;
      flex-direction: column;

      gap: 11px;

      .subtotal {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        gap: 11px;
      }

      .q-separator {
        background-color: #d6d8ee;
      }

      & > div,
      .subtotal > div {
        display: flex;
        justify-content: space-between;
      }

      .total {
        margin-top: 5px;

        font-weight: 500;
      }

      @include tablet-down() {
        gap: 10px;

        .subtotal {
          gap: 15px;
        }

        .total {
          margin-top: 0;
        }

        .amount,
        .total {
          font-weight: 600;
        }
      }
    }
  }
}
</style>
