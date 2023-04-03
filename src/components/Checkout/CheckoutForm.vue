<template>
  <q-form @submit="completePurchase" @validation-error="scrollFormToError">
    <!-- I assumed that every non-optional field is required -->
    <!-- This is because there are example error messages in design even for -->
    <!-- Fields that are not marked as required (red star) -->

    <!-- Form Section 1 -->

    <div class="form-section">
      <h4 class="title">Contact Information</h4>
      <div class="fields">
        <div>
          <label class="input-label">Email</label>
          <q-input
            v-model="checkoutData.customer.email"
            outlined
            placeholder="Enter your email"
            lazy-rules
            no-error-icon
            hide-bottom-space
            :rules="[
              (v) => !!v || 'Required field',
              (v) =>
                /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
                  v
                ) || 'Enter a valid email address',
            ]"
          >
            <template v-slot:prepend>
              <q-icon
                :name="`img:${require('assets/icons/email.svg')}`"
                size="18px"
              />
            </template>
          </q-input>
        </div>
      </div>
      <div class="fields">
        <!-- Proper phone validation requires an API like Twilio's -->
        <!-- At least if you want to really validate phone numbers existance -->

        <div>
          <label class="input-label">Phone Number</label>
          <q-input
            v-model="checkoutData.customer.phone_number"
            outlined
            placeholder="Enter your phone number"
            :mask="phoneMaskData.mask
            "
            lazy-rules
            no-error-icon
            hide-bottom-space
            :rules="[(v) => !!v || 'Enter a valid phone number']"
          >
            <template v-slot:prepend>
              <q-icon
                :name="`img:${require('assets/icons/phone.svg')}`"
                size="18px"
              />
            </template>
          </q-input>
        </div>
      </div>
    </div>

    <!-- Form Section 2 -->

    <div class="form-section">
      <h4 class="title">Shipping Information</h4>

      <address-form v-model:address="checkoutData.customer.address" />
    </div>

    <!-- Form Section 3 -->

    <div class="form-section shipping-method">
      <h4 class="title">Shipping Method</h4>

      <q-list>
        <q-item tag="label" class="radio-input">
          <q-item-section avatar>
            <q-radio v-model="checkoutData.shipping_method" val="free" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Free Shipping</q-item-label>
          </q-item-section>
          <q-item-section side>FREE</q-item-section>
        </q-item>

        <q-item tag="label" class="radio-input">
          <q-item-section avatar>
            <q-radio v-model="checkoutData.shipping_method" val="dhl" />
          </q-item-section>
          <q-item-section>
            <q-item-label>DHL with price</q-item-label>
          </q-item-section>
          <q-item-section side>$54,89</q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- I assumed that every non-optional field is required -->
    <!-- This is because there are example error messages in design even for -->
    <!-- Fields that are not marked as required (red star) -->

    <!-- Form Section 4 -->

    <div class="form-section billing-address">
      <h4 class="title">Billing Address</h4>

      <div class="subtitle">Specify the address for your payment option</div>

      <div class="fields">
        <q-option-group
          :options="billingAddressOptions"
          type="radio"
          v-model="checkoutData.payment.billing_address.same_as_shipping"
        />
      </div>

      <q-slide-transition>
        <!-- Here we need an extra wrapper to handle the paddings correctly -->
        <!-- If we don't, then sliding animation will appear jagged -->

        <div v-if="!checkoutData.payment.billing_address.same_as_shipping">
          <div class="form-section different-billing-address">
            <address-form
              v-model:address="
                checkoutData.payment.billing_address.custom_billing_address
              "
            />
          </div>
        </div>
      </q-slide-transition>
    </div>

    <!-- Form Section 5 -->

    <div class="form-section">
      <div>
        <h4 class="title">Payment</h4>
        <div class="subtitle">All transactions are secure and encrypted</div>
      </div>

      <div class="fields">
        <div>
          <label class="input-label cc-number">
            <div>Credit Card Number</div>
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
                  src="~assets/icons/card_more.svg"
                  width="55px"
                  height="24px"
                  no-spinner
                />
              </div>
            </div>
          </label>
          <q-input
            v-model="checkoutData.payment.card_number"
            outlined
            placeholder="**** **** **** ****"
            :mask="cardMask"
            lazy-rules
            no-error-icon
            hide-bottom-space
            :rules="[
              (v) =>
                (!!v && cardLenghts.includes(v.length)) ||
                'Enter a valid card number',
            ]"
            @update:model-value="handleCardNumberInput"
          >
            <template v-slot:prepend>
              <q-icon
                :name="`img:${require('assets/icons/credit_card.svg')}`"
                size="18px"
              />
            </template>
            <template v-slot:append>
              <div v-if="ccValidationDetails.card?.type">
                <q-img
                  :src="`checkout/icons/${cardIcon}.svg`"
                  width="40px"
                  height="24px"
                  no-spinner
                />
              </div>
            </template>
          </q-input>
        </div>
      </div>
      <div class="fields">
        <div>
          <label class="input-label">Name on Card</label>
          <q-input
            v-model="checkoutData.payment.cardholder_name"
            outlined
            placeholder="Enter name on card"
            lazy-rules
            no-error-icon
            hide-bottom-space
            :rules="[(v) => !!v || 'Enter the name on card']"
            @update:model-value="handleCardNameInput"
          >
            <template v-slot:prepend>
              <q-icon
                :name="`img:${require('assets/icons/user.svg')}`"
                size="18px"
              />
            </template>
          </q-input>
        </div>
      </div>
      <div class="fields">
        <div>
          <label class="input-label">Expiry Date </label>
          <q-input
            v-model="checkoutData.payment.exp_date"
            outlined
            placeholder="MM/YY"
            mask="##/##"
            lazy-rules
            no-error-icon
            hide-bottom-space
            :rules="[(v) => !!v || 'Enter card date']"
            @update:model-value="handleExpiryDateInput"
          >
            <template v-slot:append>
              <q-icon
                :name="`img:${require('assets/icons/calendar.svg')}`"
                size="18px"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  transition-show="scale"
                  ref="qDateProxy"
                  transition-hide="scale"
                >
                  <!-- We're going to set a reasonable min year too -->

                  <q-date
                    v-model="checkoutData.payment.exp_date"
                    default-view="Years"
                    emit-immediately
                    years-in-month-view
                    navigation-min-year-month="2013/01"
                    @update:model-value="handleDateSelection"
                    mask="MM/YY"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div>
          <label class="input-label">Secutiry Code </label>
          <q-input
            v-model="checkoutData.payment.cvv"
            outlined
            :mask="cvvMask"
            type="password"
            placeholder="CVV"
            lazy-rules
            no-error-icon
            hide-bottom-space
            :rules="[
              (v) =>
                (!!v && securityCodeLenght == v.length) ||
                'Enter security code',
            ]"
          />
        </div>
      </div>
      <div class="fields">
        <div>
          <!-- Quasar's default checkbox has specific size and it can be fully seen -->
          <!-- On mouseover, so naturally they're a little different than in designs -->
          <!-- It is possible to remove the mouseover effect and use transform to move it -->
          <!-- But, quite often it is not really important when it comes to implementation -->
          <!-- And often it is left just "close" to designs but not perfect -->

          <q-checkbox
            v-model="checkoutData.payment.tos_accepted"
            outlined
            lazy-rules
            no-error-icon
            @update:model-value="tos_error = false"
          >
            By checking this box, I acknowledge that I have read and agree to
            the <span class="emphasized">Terms of Service</span>, and
            <span class="emphasized">Monthly Billing Terms</span> of this
            website and want to opt-in for the monthly billed Dream Collection
            Club®
          </q-checkbox>

          <q-slide-transition>
            <div v-if="tos_error">
              <div>
                <div class="tos-error">You must accept ToS to continue</div>
              </div>
            </div>
          </q-slide-transition>
        </div>
      </div>
    </div>

    <!-- Actions -->

    <div class="actions">
      <q-btn class="continue-btn" no-caps color="primary" type="submit">
        <div>Complete Purchase</div>
        <div>
          <q-icon
            :name="`img:${require('assets/icons/arrow_right.svg')}`"
            size="11px"
          />
        </div>
      </q-btn>
    </div>
  </q-form>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useCheckoutStore } from 'stores/checkout-store';
import { useConstantsStore } from 'stores/constants-store';

import AddressForm from 'components/Checkout/AddressForm.vue';

import { DateTime } from 'luxon';
import CardValidator from 'card-validator';

export default {
  components: {
    AddressForm,
  },
  data() {
    return {
      payment_type: 'credit-card',
      tos_error: false,
      checkoutData: {
        shipping_method: 'free',
        customer: {
          email: '',
          phone_number: '',
          address: {
            first_name: '',
            last_name: '',
            country: 'US',
            address: '',
            apartment: '',
            suit: '',
            post_code: '',
            city: '',
          },
        },
        payment: {
          card_number: '',
          cardholder_name: '',
          exp_date: '',
          cvv: '',
          tos_accepted: false,
          billing_address: {
            same_as_shipping: true,
            custom_billing_address: {
              first_name: '',
              last_name: '',
              country: '',
              address: '',
              apartment: '',
              suit: '',
              post_code: '',
              city: '',
            },
          },
        },
      },
      billingAddressOptions: [
        {
          label: 'Same as shipping address',
          value: true,
        },
        {
          label: 'Use a different billing address',
          value: false,
        },
      ],
      ccValidationDetails: {
        card: null,
        isPotentiallyValid: true,
        isValid: false,
      },
    };
  },
  watch: {
    'checkoutData.payment.billing_address.same_as_shipping'(isSame) {
      if (
        !isSame &&
        !this.checkoutData.payment.billing_address.custom_billing_address
          .country
      ) {
        this.checkoutData.payment.billing_address.custom_billing_address.country =
          this.checkoutData.customer.address.country;
      }
    },
  },
  computed: {
    ...mapState(useConstantsStore, ['countryList']),
    phoneMaskData() {
      let countryData = JSON.parse(JSON.stringify(this.countryList.find(
        (country) => country.iso === this.checkoutData.customer.address.country
      )))

      let mask = Array.isArray(countryData.mask)
          ? countryData.mask.slice(-1)[0]
        : countryData.mask

      if (!mask.includes(countryData.code)) {
        countryData.mask = `${countryData.code} ${mask}`;
      }

      return countryData;
    },
    cardIcon() {
      let icon = '';

      switch (this.ccValidationDetails.card?.type) {
        case 'visa':
          icon = 'visa';
          break;
        case 'mastercard':
          icon = 'mastercard';
          break;
        case 'american-express':
          icon = 'amex';
          break;
        case 'jcb':
          icon = 'jcb';
          break;
        case 'diners-club':
          icon = 'diners_club';
          break;
      }

      return icon;
    },
    cardMask() {
      let mask = '#### #### #### ####';

      if (this.ccValidationDetails.card?.lengths) {
        mask = new Array(
          this.ccValidationDetails.card?.lengths.slice(-1)[0]
        ).fill('#');

        for (let [
          index,
          gapIndex,
        ] of this.ccValidationDetails.card.gaps.entries()) {
          mask.splice(gapIndex + index, 0, ' ');
        }

        mask = mask.join('');
      }

      return mask;
    },
    cvvMask() {
      let mask = '###';

      if (this.ccValidationDetails.card?.code) {
        mask = new Array(this.ccValidationDetails.card?.code.size).fill('#');

        mask = mask.join('');
      }

      return mask;
    },
    cardLenghts() {
      let possibleLengths = [];

      if (this.ccValidationDetails.card?.lengths) {
        let gaps = this.ccValidationDetails.card.gaps.length;

        for (let value of this.ccValidationDetails.card.lengths) {
          possibleLengths.push(value + gaps);
        }
      }

      return possibleLengths;
    },
    securityCodeLenght() {
      let cvv_length = 3;

      if (this.ccValidationDetails.card?.code) {
        cvv_length = this.ccValidationDetails.card?.code.size;
      }

      return cvv_length;
    },
  },
  methods: {
    ...mapActions(useCheckoutStore, ['saveCustomerInfo', 'savePaymentInfo']),
    completePurchase() {
      if (!this.checkoutData.payment.tos_accepted)
        return (this.tos_error = true);

      this.saveCustomerInfo(this.checkoutData);
      this.savePaymentInfo(this.checkoutData);

      this.$router.push({ name: 'checkout-upsell' });
    },

    scrollFormToError(el) {
      const yOffset = -300;
      const y =
        el.$el.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    },

    handleCardNumberInput(value) {
      let validation_details = CardValidator.number(value);

      this.ccValidationDetails = validation_details;
    },
    handleCardNameInput(value) {
      /* Replace all numbers and special chars then capitalize */

      this.checkoutData.payment.cardholder_name = value
        .replace(/[`0-9~!@#$%^&*()_|+\-=?;:'",.<>{}\[\]\\\/]/gi, '')
        .toUpperCase();
    },
    handleExpiryDateInput(input) {
      let today = DateTime.fromJSDate(new Date());

      let date = input.split('/');

      let months = date[0];
      let years = date[1];

      if (months && months.length > 1) {
        months = parseInt(months);

        if (months == 0) months = 1;
        if (months > 12) months = 12;
      }

      if (date[0].length == 2 && !years) {
        return (this.checkoutData.payment.exp_date =
          months < 10 ? `0${months}` : months);
      }

      if (months && years && years.length > 1) {
        let final_date = DateTime.fromFormat(input, 'MM/yy');

        let diff = parseInt(final_date.diff(today, 'days')['days']);

        if (diff < 0) {
          return (this.checkoutData.payment.exp_date = today.toFormat('MM/yy'));
        }
      }
    },
    handleDateSelection(date, reason) {
      /* We want to close the calendar as soon as user */
      /* Have selected year and month */

      if (reason == 'month') {
        this.$refs.qDateProxy.hide();

        this.handleExpiryDateInput(date);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.subtitle {
  @include font(14px, 21px);

  color: $grey-dark-checkout;

  @include mobile() {
    margin-bottom: 24px;
  }
}

.shipping-method {
  .q-list {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .q-item__section {
      color: #050824;
    }

    .q-item__section--side {
      @include font(16px, 24px);
    }
  }

  .radio-input {
    @include font(16px, 24px);

    display: flex;
    justify-content: space-between;
    align-items: center;

    background: #f1f3f6;
    border-radius: 16px;

    padding: 20px 25px 20px 12px;
  }
}

/* Here we need to remove out convenient flex-gaps because this property can't be */
/* Animated smoothly. We're going to put custom margins and paddings instead */
/* Having a wrapper around custom address form, given that it is also wrapped by another */
/* <div/> with v-if gives us a smooth animation with q-slide-transition */

.billing-address {
  gap: 0 !important;

  .title {
    margin-bottom: 5px !important;
  }

  .subtitle {
    margin-bottom: 20px;
  }

  .different-billing-address {
    margin-top: 20px;
  }
}

.payment-type {
  display: flex;
  gap: 15px;

  margin: 20px 0 5px;

  @include mobile() {
    margin-bottom: -4px;
  }

  & > div {
    @include font(14px, 18px, 500);

    display: flex;
    align-items: center;

    gap: 10px;

    height: 50px;

    border: 1px solid #d6d8ea;
    border-radius: 16px;
    padding: 0 25px;

    transition: all 0.25s;

    color: $grey-dark-checkout;

    cursor: pointer;

    svg path {
      transition: all 0.25s;
      fill: $grey-dark-checkout;
    }

    &.selected {
      background: rgba(228, 228, 255, 0.1);
      border-color: #7782f1;

      color: #7782f1;

      svg path {
        fill: #7782f1;
      }
    }
  }
}

.cc-number {
  display: flex !important;
  justify-content: space-between;

  .card-icons {
    display: flex;

    gap: 15px;

    @include mobile() {
      gap: 13px;
    }
  }
}

:deep(.form-section) {
  .q-checkbox__inner--truthy,
  .q-radio__inner--truthy {
    color: $secondary-checkout !important;
  }
}

.tos-error {
  @include font(12px, 18px);
  color: $negative;

  padding-top: 10px;
}
</style>
