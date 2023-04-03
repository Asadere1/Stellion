<template>
  <q-card v-if="['checkout-done'].includes($route.name)" class="info-card card-1">
    <div>
      <div>
        <q-img
          class="money-back"
          src="~assets/Cashback.svg"
          height="60px"
          width="60px"
        />
      </div>
      <div>
        30 days satisfaction
        <span class="emphazied">Guareantee</span> with
        <span class="emphazied">money back</span>
      </div>
    </div>

    <q-separator />

    <div>
      <div>
        <q-img
          class="truck"
          src="~assets/Delivery.svg"
          height="45px"
          width="60px"
        />
      </div>
      <div>
        Over <span class="emphazied">38,957</span> successfully
        <span class="emphazied">shipped orders</span>
      </div>
    </div>
  </q-card>

  <q-card v-if="!['checkout-done'].includes($route.name)" class="info-card card-2">
    <div class="title">The ultimate jewellery club</div>

    <div class="info">
      Ornare rhoncus nunc ut felis. Faucibus dolor at ultrices tincidunt.
      Pulvinar sed justo et viverra pellentesque.
    </div>

    <div class="perks">
      <div v-for="perk in perks" :key="perk">
        <q-img src="~assets/icons/checkmark.svg" width="16px" height="12px" />
        <div>{{ perk }}</div>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      perks: [
        'Extra 10$ off!',
        'Free shipping on marked club items!',
        'Free returns on marked club items!',
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.info-card {
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

    border: 1px solid #DADDF5;

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
</style>
