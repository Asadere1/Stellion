<template>
  <q-page>
    <div class="content">
      <div v-if="$q.screen.xs" class="upsell-text">
        Here is a product that might interest you
      </div>

      <div class="gallery">
        <q-carousel
          animated
          v-model="slide"
          arrows
          infinite
          :prev-icon="`img:${require('assets/icons/prev_icon.svg')}`"
          :next-icon="`img:${require('assets/icons/prev_icon.svg')}`"
        >
          <q-carousel-slide :name="1" img-src="checkout/Nike_4_Upsell.jpg" />

          <q-carousel-slide :name="2" img-src="checkout/Nike_4_Upsell.jpg" />
        </q-carousel>
      </div>

      <q-card class="upsell-qty-card">
        <div class="price-info">
          <div class="price-tag">
            Price: <span class="price">${{ upsell.price }}</span>
          </div>
          <div class="discount">-{{ upsell.discount }}%</div>
        </div>

        <div class="quantity">
          <div>Quantity:</div>
          <div class="selector">
            <!-- I've done them as simple <div/> instead of using <q-btn/> because they're simple -->
            <!-- And likely won't have any special effects. Using <div/> here is faster than -->
            <!-- Removing all unnecessary effects <q-btn/> brings here -->

            <div class="qty-btn" @click="updateQty(-1)">
              <span
                ><q-icon
                  :name="`img:${require('assets/icons/minus.svg')}`"
                  size="20px"
              /></span>
            </div>
            <div class="qty">{{ upsell.selected_qty }}</div>
            <div class="qty-btn" @click="updateQty(1)">
              <span
                ><q-icon
                  :name="`img:${require('assets/icons/plus.svg')}`"
                  size="20px"
              /></span>
            </div>
          </div>
        </div>
      </q-card>

      <div class="product-info">
        <p class="emphasized">
          Ornare rhoncus nunc ut felis. Faucibus dolor at ultrices tincidunt.
          Pulvinar sed justo et viverra pellentesque.
        </p>

        <p class="q-mb-none">
          Mauris augue nulla proin vel a. Facilisis fringilla molestie dignissim
          elit orci malesuada. Lorem sit sagittis vitae nulla id. Mauris ipsum
          sed sed faucibus. Nulla amet metus gravida orci faucibus nisl eros
          arcu lorem. Nullam ornare molestie nam id gravida volutpat bibendum
          sem feugiat. Neque vulputate in et maecenas porta mi tellus. In massa
          porttitor urna quis volutpat at.
        </p>
      </div>

      <div class="info-cards">
        <q-card class="card-1">
          <div class="checkout-info">
            <div>
              <q-img
                src="~assets/icons/secure_lock.svg"
                width="20px"
                height="24px"
                no-spinner
              />
            </div>
            <div>
              Guaranteed <span class="emphasized">Safe</span> &
              <span class="emphasized">Secure</span> Checkout
            </div>
          </div>
          <div class="card-icons">
            <div>
              <q-img
                src="~assets/icons/mastercard.svg"
                width="40px"
                height="24px"
                no-spinner
              />
            </div>
            <div>
              <q-img src="~assets/icons/visa.svg" width="40px" height="24px" no-spinner />
            </div>
            <div>
              <q-img
                src="~assets/icons/paypal.svg"
                width="40px"
                height="24px"
                no-spinner
              />
            </div>
            <div>
              <q-img src="~assets/icons/amex.svg" width="40px" height="24px" no-spinner />
            </div>
            <div>
              <q-img src="~assets/icons/jcb.svg" width="40px" height="24px" no-spinner />
            </div>
            <div>
              <q-img
                src="~assets/icons/diners_club.svg"
                width="40px"
                height="24px" no-spinner
              />
            </div>
          </div>
        </q-card>

        <q-card class="card-2">
          <div>
            <q-img
              src="~assets/icons/customer_service.svg"
              width="63px"
              height="70px"
              no-spinner
            />
          </div>
          <div>
            <div class="emphasized">24/7</div>
            <div>Support</div>
          </div>
        </q-card>
      </div>

      <div class="actions">
        <q-btn class="continue-btn" no-caps color="primary" @click="toNextStep">
          <div>Yes, I want</div>
          <div>
            <q-icon
              :name="`img:${require('assets/icons/arrow_right.svg')}`"
              size="19px"
            />
          </div>
        </q-btn>

        <div class="decline-btn" @click="toNextStep">No, Thanks</div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  components: {
    //
  },
  data() {
    return {
      slide: 1,
      upsell: {
        price: 50,
        discount: 80,
        selected_qty: 1,
      },
    };
  },
  methods: {
    toNextStep() {
      this.$router.push({ name: 'checkout-done' });
    },
    updateQty(value) {
      if (this.upsell.selected_qty + value >= 1)
        this.upsell.selected_qty += value;
    },
  },
};
</script>

<style scoped lang="scss">
.q-page {
  display: flex;

  justify-content: center;

  padding-bottom: 120px !important;
}

.content {
  @include container();

  display: flex;
  flex-direction: column;

  align-items: center;

  width: 790px;

  :deep(.q-card) {
    border: 1px solid #daddf5;
    border-radius: 16px;

    box-shadow: 0px 10px 30px rgba(22, 8, 49, 0.05);

    background: #ffffff;
  }

  .upsell-text {
    @include font(24px, 34px, 500);

    margin-top: 17px;

    text-align: center;
  }

  .gallery {
    width: 100%;

    margin-top: 73px;

    @include tablet-down() {
      margin-top: 32px;
    }

    :deep(.q-carousel) {
      border-radius: 32px;

      height: 520px;

      @include tablet() {
        height: 437px;
      }

      @include mobile() {
        height: 226px;
      }

      .q-icon {
        font-size: 44px;

        @include mobile() {
          font-size: 30px;
        }
      }

      .q-carousel__prev-arrow--horizontal {
        left: 30px;

        @include mobile() {
          left: 12px;
        }
      }

      /* This would allow us to save a little on a bundle size! */
      /* These are the same icon we can reuse by just rotating it */
      /* Instead of using 2 different icons */

      .q-carousel__next-arrow--horizontal {
        transform: rotate(180deg);

        right: 30px;

        @include mobile() {
          right: 12px;
        }
      }
    }
  }

  .upsell-qty-card {
    display: flex;
    flex-direction: column;

    align-items: center;

    gap: 27px;

    margin-top: 30px;
    padding: 42px 50px 40px 50px;

    width: 100%;

    @include tablet() {
      margin-top: 40px;

      padding: 42px 40px 40px 40px;
    }

    @include mobile() {
      margin-top: 30px;

      padding: 40px 16px;
    }

    .price-info {
      @include font(20px, 30px);

      display: flex;
      align-items: center;

      gap: 12px;

      .price-tag {
        display: flex;
        align-items: center;

        gap: 10px;

        .price {
          @include font(30px, 40px, 600);

          color: $primary-checkout;

          /* It looks more like 5px in the browser. That better matches 10px from designs */

          padding-left: 5px;
        }
      }

      .discount {
        padding: 3px 15px;

        background: #eff0f5;
        border-radius: 8px;

        color: $primary-checkout;
        font-weight: 500;
      }
    }

    .quantity {
      @include font(20px, 30px, 500);

      display: flex;
      align-items: center;
      justify-content: center;

      gap: 40px;

      padding: 25px 115px;

      border-radius: 16px;

      background: #eff0f5;

      @include tablet-down() {
        padding: 15px;

        width: 100%;
      }

      @include mobile() {
        padding: 15px 20px;

        gap: 30px;
      }

      .selector {
        @include font(20px, 30px, 500);

        display: flex;
        align-items: center;

        color: $secondary-checkout;

        .qty {
          display: flex;
          justify-content: center;

          min-width: 48px;
          font-weight: 600;

          color: $primary-checkout;
        }

        .qty-btn {
          position: relative;

          background: #ffffff;
          border-radius: 16px;

          width: 50px;
          height: 50px;

          cursor: pointer;

          span {
            position: absolute;

            top: 50%;
            left: 50%;

            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }

  .product-info {
    @include font(18px, 28px);

    color: $secondary-checkout;

    margin-top: 40px;

    @include tablet() {
      @include font(16px, 26px);
    }

    @include mobile() {
      @include font(14px, 24px);

      margin-top: 30px;
    }
  }

  .info-cards {
    display: flex;
    justify-content: center;

    gap: 30px;

    margin-top: 40px;

    @include tablet() {
      gap: 0;

      justify-content: space-between;

      width: 100%;
    }

    @include mobile() {
      flex-direction: column;

      gap: 15px;

      margin-top: 30px;
    }

    .card-1 {
      @include font(16px, 26px);

      display: flex;
      flex-direction: column;

      gap: 31px;

      padding: 30px 70px;

      color: $secondary-checkout;

      @include tablet() {
        padding: 30px;
      }

      @include mobile() {
        gap: 21px;
      }

      @include mobile() {
        @include font(14px, 21px);

        padding: 20px;
      }

      .checkout-info {
        display: flex;
        align-items: center;

        gap: 17px;

        @include mobile() {
          gap: 9px;
        }
      }

      .card-icons {
        display: flex;

        gap: 15px;

        @include mobile() {
          gap: 13px;
        }
      }
    }

    .card-2 {
      @include font(20px, 30px);

      display: flex;
      align-items: center;

      gap: 34px;

      padding: 35px 55px;

      @include tablet() {
        padding: 35px 35px 35px 38px;
      }

      @include mobile() {
        padding: 22px;
      }
    }
  }

  :deep(.actions) {
    display: flex;
    flex-direction: column;

    align-items: center;

    gap: 30px;

    margin-top: 70px;

    @include tablet() {
      margin-top: 40px;
    }

    @include mobile() {
      margin-top: 30px;

      width: 100%;
    }

    .q-btn {
      @include button(76px, 59px);
      @include font(24px, 32px);

      font-weight: 600;

      border-radius: 16px;

      background: $primary-checkout !important;

      @include mobile() {
        @include button(42px);
        @include font(16px, 20px, 500);

        width: 100%;

        border-radius: 10px;
      }
    }

    .continue-btn .q-btn__content {
      gap: 14px;

      @include mobile() {
        gap: 11px;
      }

      .q-icon {
        /* Better alignment of the icon with button label */

        transform: translateY(-1px);

        @include mobile() {
          font-size: 12px !important;
        }
      }
    }

    .decline-btn {
      @include font(18px, 24px);

      text-align: center;
      color: $secondary-checkout;

      cursor: pointer;
    }
  }

  .emphasized {
    font-weight: 600;

    color: $primary-checkout;
  }
}
</style>
