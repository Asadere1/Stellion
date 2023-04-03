<template>
  <div>
    <h5 class="q-mt-lg q-mb-xl q-ml-xl" style="margin-bottom: 24px">
      {{ $t('management.addNewCustomer') }}
    </h5>
    <div
      class="row q-pa-xl add-new-customer-form"
      style="padding-bottom: 0 !important; padding-top: 0 !important"
    >
      <div class="col-12">
        <q-form class="client-form" ref="form" greedy>
          <div class="row">
            <div class="col">
              <InputField
                :model-value="customer.fullName"
                class="col"
                :label="$t('generic.customerName')"
                placeholder="Enter customer name"
                style="margin-right: 30px"
              />
            </div>
            <div class="col">
              <InputField
                :model-value="customer.emailAddress"
                class="col"
                :label="$t('generic.customerEmail')"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <InputField
                :model-value="customer.cost_per"
                class="col"
                :label="$t('generic.costPer')"
                placeholder="Enter cost per .."
                style="margin-right: 30px"
              />
            </div>
            <div class="col">
              <InputField
                :model-value="customer.emailAddress"
                class="col"
                :label="`${$t('generic.rebill')} %`"
                type="select"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <InputField
                :model-value="customer.direct_sales"
                class="col"
                :label="$t('generic.directSales')"
                type="select"
              />
            </div>
          </div>
        </q-form>
        <div class="button-wrap">
          <ButtonComponent
            level="cta"
            :label="$t('generic.submit')"
            :stretch="false"
            size="md"
            padding="sm xl"
            style="text-transform:capitalize; margin-right: 24px;"
            @click="createCustomer"
          />
          <ButtonComponent
            level="tertiary"
            :label="$t('generic.cancel')"
            :stretch="false"
            size="md"
            padding="sm xl"
            style="text-transform:capitalize;"
            @click="$router.push('/admin/management/client')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ManagementClientEntityForm',
};
</script>

<script lang="ts" setup>
import { ref } from 'vue';
import InputField from 'components/Global/InputField.vue';
import ButtonComponent from 'src/components/Global/ButtonComponent.vue';

const customer = ref({
  fullName: '',
  address: '',
  zip_code: '',
  post_code: '',
  card: '',
  expiration_date: '',
  cvc: '',
  type_subscription: 'master',
  account_status: 'live',
  emailAddress: '',
  cost_per: '',
  direct_sales: '',
});

function createCustomer () {
    // create customer here.
}
</script>

<style lang="scss">
.add-new-customer-form {
  .client-form {
    border: 1px solid #d6d8ea;
    margin-right: 24px;
    border-radius: 16px;
    padding: 40px;
    margin-bottom: 24px;

    .row {
      .q-field {
        margin-bottom: 20px;
      }
    }
  }

  .button-wrap {
    display: flex;
    justify-content: flex-end;
    margin: 24px;
    margin-right: 65px;
  }
}
</style>
