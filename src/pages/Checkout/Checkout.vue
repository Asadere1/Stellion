<template>
  <q-page>
    <checkout-header />

    <div class="content">
      <div class="left-side">
        <info-panels-left />

        <!-- Checkout -->

        <checkout-form />

        <checkout-footer />
      </div>

      <div class="right-side">
        <!-- Cart -->

        <order-summary />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'pinia';
import { useDataStore } from 'stores/data-store';

import CheckoutHeader from 'components/Checkout/CheckoutHeader.vue';
import CheckoutFooter from 'components/Checkout/CheckoutFooter.vue';

import InfoPanelsLeft from 'components/Checkout/InfoPanelsLeft.vue';
import CheckoutForm from 'components/Checkout/CheckoutForm.vue';

import OrderSummary from 'components/Checkout/OrderSummary.vue';

export default {
  components: {
    CheckoutHeader,
    CheckoutFooter,
    InfoPanelsLeft,
    CheckoutForm,
    OrderSummary
  },
  data() {
    return {
      steps_complete: 0,
    };
  },
  computed: {
    ...mapState(useDataStore, ['checkoutData']),
  },
  methods: {
    //
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

    gap: 30px;
  }

  @include mobile() {
    margin-top: 0px;
  }

  :deep(.q-card) {
    border-radius: 16px;

    box-shadow: none;
  }

  /* I put general form styles here instead of individual components, because those */
  /* Are parts of the flow and unlikely to be used as individual components elsewhere */
  /* Though, they can be made self-sufficient by duplicating necessary styles inside them */

  /* Otherwise we can always set their style from the parent using :deep */

  :deep(.q-form) {
    display: flex;
    flex-direction: column;

    gap: 50px;

    @include tablet-down() {
      gap: 30px;
    }

    .form-section {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .title {
        margin-bottom: 5px;

        @include tablet-down() {
          margin-top: 10px;
        }

        @include mobile() {
          margin-bottom: -4px;
        }
      }

      .fields {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(0px, 1fr));

        gap: 16px;

        @include tablet-down() {
          gap: 20px;
        }

        @include mobile() {
          display: flex;
          flex-direction: column;

          gap: 20px;
        }

        .emphasized {
          color: $primary-checkout;
          font-weight: 600;
        }

        .q-checkbox {
          align-items: start !important;
        }
      }
    }

    .actions {
      display: flex;
      justify-content: flex-end;

      .q-btn {
        @include button(56px, 40px);
        @include font(16px, 20px, 600);

        border-radius: 16px;

        background: $primary-checkout !important;

        @include tablet-down() {
          width: 100%;
        }

        @include mobile() {
          border-radius: 10px;
        }
      }

      .continue-btn .q-btn__content {
        gap: 10px;

        .q-icon {
          /* Better alignment of the icon with button label */
          transform: translateY(-1px);
        }
      }
    }
  }

  :deep(.q-input),
  :deep(.q-select) {
    @include font(14px, 18px);

    ::placeholder {
      @include font(14px, 18px);
      color: $grey-dark-checkout;
    }

    border-radius: 16px;

    .q-field__inner,
    .q-field__control {
      border-radius: 16px;
    }

    .q-field__control {
      background-color: #f1f3f6;

      padding-left: 20px;
      padding-right: 20px;

      &:before {
        border: none;
      }
    }

    &.q-field--error {
      ::placeholder {
        color: #4b4e68;
      }

      .q-field__control {
        background: rgba(245, 61, 107, 0.07);
      }
    }

    .q-field__messages {
      @include font(12px, 18px);
    }
  }

  :deep(.input-label) {
    @include font(14px, 24px, 500);

    display: block;

    margin-bottom: 10px;

    @include mobile() {
      margin-bottom: 5px;
    }

    .required-field {
      color: #f53d6b;
    }

    .optional-field {
      color: $grey-dark-checkout;
    }
  }

  /* Sides-specific styles */

  :deep(.left-side) {
    display: flex;
    flex-direction: column;

    gap: 40px;

    @include tablet-down() {
      order: 2;
    }

    @include mobile() {
      gap: 20px;
    }

    h4 {
      @include font(24px, 34px, 600);

      margin: 0;
    }
  }

  .right-side {
    display: flex;
    flex-direction: column;

    @include tablet-down() {
      order: 1;

      gap: 0;
    }
  }
}
</style>
