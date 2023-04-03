<template>
  <div class="column q-pa-lg overflow-auto full-height no-wrap">
    <h6
      v-if="!valid"
      class="row justify-between items-center bg-negative-light text-negative rounded-1 q-py-md q-px-lg q-mt-none q-mb-md"
    >
      {{ $t('errors.invalidDetails') }}
    </h6>

    <div class="row justify-between items-center q-pa-none edit-upsell-header">
      <h5 class="q-my-none">
        <div class="row">
          <span class="text-weight-bold row items-center">
            {{ $t('generic.template') }} -
          </span>
          &nbsp;
          <span v-if="upsell.template_type === 'cross_sell'">{{
            $t('upsells.crossSell')
          }}</span>
          <span
            v-else-if="upsell.template_type === 'cross_sell_subscriptions'"
            >{{ $t('upsells.crossSellSubscriptions') }}</span
          >
          <span
            v-else
            >{{ $t('upsells.oneClicUpsell') }}</span
          >
        </div>
      </h5>

      <div class="row gap-md">
        <q-toggle
          v-model="upsell.active"
          color="positive"
          class=""
          :label="$t('generic.active')"
        />
        <ButtonComponent
          level="accent"
          :label="$t('generic.readDocu')"
          :stretch="false"
          size="md"
          padding="sm lg"
          icon="/general/paper-light.svg"
          @click="$router.push('/documentstion/upsells')"
        />
      </div>
    </div>
    <div class="edit-upsell-wrapper row">
      <div class="col right-main-col">
        <h5 class="text-weight-bold">Edit</h5>
        <q-form greedy ref="form" class="edit-upsell-form">
          <div class="row">
            <div class="col">
              <InputField
                v-model="upsell.title"
                :label="$t('generic.title')"
                placeholder="Skip the Queue"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <InputField
                v-model="upsell.descriptions"
                :label="$t('upsells.descriptions')"
                placeholder="Hiconic Rewards"
                type="textarea"
              />
            </div>
          </div>
          <div
            class="row"
            v-if="
              upsell.template_type === 'cross_sell' ||
              upsell.template_type === 'one_clic_upsell'
            "
          >
            <div class="col">
              <InputField
                v-model="upsell.button_text"
                :label="$t('upsells.buttonText')"
                style="margin-right: 13px"
                class="bottom-radial"
                placeholder="Add"
              />
            </div>
          </div>
          <div class="row" v-if="upsell.template_type === 'one_clic_upsell'">
            <div class="col">
              <InputField
                v-model="upsell.button_text_two"
                :label="$t('upsells.buttonText')"
                style="margin-right: 13px"
                class="bottom-radial"
                placeholder="Add"
              />
            </div>
          </div>
        </q-form>
      </div>
      <div class="col left-main-col">
        <h5 class="text-weight-bold">Live</h5>
        <div
          v-if="upsell.template_type === 'cross_sell'"
          class="row justify-between items-center bg-warning-light rounded-1 q-pa-lg q-mb-lg"
        >
          <div class="column">
            <h6 class="q-mt-none q-mb-md">{{ $t('upsells.skipTheQueue') }}</h6>
            <p class="q-my-none">{{ $t('upsells.twiceAsFast') }}</p>
          </div>
          <ButtonComponent
            level="tertiary"
            :label="$t('generic.add') + ' - $3.66'"
            icon="/general/shopping-cart.svg"
            :stretch="false"
            size="md"
            padding="sm lg"
          />
        </div>
        <q-card
          v-else-if="upsell.template_type === 'cross_sell_subscriptions'"
          class="info-card card-2"
        >
          <div class="title">The ultimate jewellery club</div>

          <div class="info">
            Ornare rhoncus nunc ut felis. Faucibus dolor at ultrices tincidunt.
            Pulvinar sed justo et viverra pellentesque.
          </div>

          <div class="perks">
            <div v-for="perk in perks" :key="perk">
              <q-img
                src="~assets/icons/checkmark.svg"
                width="16px"
                height="12px"
              />
              <div>{{ perk }}</div>
            </div>
          </div>
        </q-card>
        <q-page v-else>
          <div class="content">
            <div class="upsell-text">
              Here is a product that might interest you
            </div>

            <div class="gallery">
              <q-carousel
                animated
                v-model="slide"
                arrows
                infinite
              >
                <q-carousel-slide
                  :name="1"
                  img-src="checkout/Nike_4_Upsell.jpg"
                />

                <q-carousel-slide
                  :name="2"
                  img-src="checkout/Nike_4_Upsell.jpg"
                />
              </q-carousel>
            </div>

            <div class="product-info">
              <p>
                Quis tincidunt nunc suscipit egestas. Viverra erat cras
                ullamcorper amet. tempor ipsum orci placerat urna pretium
              </p>
            </div>

            <div class="actions">
              <q-btn
                class="continue-btn"
                no-caps
                color="dark"
              >
                <div>Yes I want</div>
                <div>
                  <q-icon
                    :name="`img:${require('assets/icons/arrow_right.svg')}`"
                    size="19px"
                  />
                </div>
              </q-btn>

              <div class="decline-btn">No, Thanks</div>
            </div>
          </div>
        </q-page>
      </div>
    </div>
    <div class="q-pa-none row justify-end gap-sm q-mt-md button-group">
      <ButtonComponent
        level="cta"
        :label="$t('generic.save')"
        :stretch="false"
        size="md"
        padding="sm xl"
        @click="save"
      />
      <ButtonComponent
        level="tertiary"
        :label="$t('generic.cancel')"
        :stretch="false"
        size="md"
        padding="sm xl"
        @click="$router.back()"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import ButtonComponent from 'components/Global/ButtonComponent.vue';
import InputField from 'components/Global/InputField.vue';

// Should be fetched from API
const upsell = ref({
  active: true,
  title: '',
  button_text: '',
  descriptions: '',
  button_text_two: '',
  template_type: 'one_clic_upsell',
});

const slide = ref(1);

const perks = ref([
  'Extra 10$ off!',
  'Free shipping on marked club items!',
  'Free returns on marked club items!',
]);

const valid = ref(true);

function save() {
  // Call API request endpoint save here
  console.log('Save');
}
</script>

<style lang="scss">
.edit-upsell-header {
  margin-bottom: 78px;
}
.edit-upsell-form {
  .row {
    .q-field {
      margin-bottom: 33px;
    }
  }

  .form-btn {
    display: flex;
    justify-content: flex-end;
    button {
      width: 136px !important;
    }
  }
}

.edit-upsell-wrapper {
  .right-main-col {
    padding-right: 52px;
    border-right: 1px solid #d9d9d9;
  }

  .left-main-col {
    padding-left: 30px;
  }
}

.button-group {
  margin-top: 48px;
}

.info-card {
  margin-top: 70px;
  display: flex;
  flex-direction: column;

  gap: 22.5px;

  padding: 30px 30px 36px 30px;

  box-shadow: 0px 10px 30px rgba(22, 8, 49, 0.05) !important;

  @include mobile() {
    padding: 16px;
  }

  .q-separator {
    background: #ebecf3;
  }

  &.card-1 {
    @include font(18px, 27px);

    color: $secondary-checkout;

    border: 1px solid #daddf5;

    @include mobile() {
      @include font(16px, 24px);

      gap: 20px;
    }

    & > div {
      display: flex;
      align-items: center;

      padding-right: 50px;

      gap: 25px;

      .emphazied {
        color: $primary-checkout;
        font-weight: 500;
      }

      @include mobile() {
        gap: 20px;

        padding-right: 0;
      }
    }

    @include tablet-down() {
      background: rgba(239, 246, 254, 0.2);

      .q-img.money-back {
        height: 48px !important;
        width: 48px !important;
      }

      .q-img.truck {
        height: 36px !important;
        width: 48px !important;
      }
    }
  }

  &.card-2 {
    @include font(14px, 24px);
    color: $secondary-checkout;

    border: 1px solid #daddf5;

    .title {
      @include font(18px, 27px, 600);
      color: $primary-checkout;
    }

    .perks {
      display: flex;
      flex-direction: column;

      gap: 4px;

      & > div {
        display: flex;
        align-items: center;

        gap: 10px;

        @include mobile {
          gap: 8px;
        }
      }
    }

    @include tablet-down() {
      border: 1px solid #daddf5;

      gap: 0;

      padding: 30px;

      .title {
        margin-bottom: 10px;
      }

      .info {
        margin-bottom: 20px;
      }
    }

    @include mobile() {
      .title {
        margin-bottom: 12px;
      }

      .info {
        margin-bottom: 16px;
      }
    }
  }
}

.q-page {
  display: flex;
  justify-content: center;
  width: 500px;
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
    width: 275px;
    text-align: center;
    margin-bottom: 10px;
  }

  .gallery {
    width: 100%;

    .q-carousel__slide {
      border-radius: 32px;
    }

    margin-top: 10px;

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

  .product-info {
    @include font(18px, 28px);

    color: #4B4E68;
    margin-top: 18px;
  }

  .actions {
    display: flex;
    flex-direction: column;

    align-items: center;

    gap: 30px;

    margin-top: 22px;

    .q-btn {
      @include button(76px, 59px);
      @include font(24px, 32px);

      font-weight: 500px;
      border-radius: 16px;
      background: $primary-checkout !important;
      height: 42px;
      font-size: 16px;
    }

    .continue-btn .q-btn__content {
      gap: 14px;

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
}
</style>
