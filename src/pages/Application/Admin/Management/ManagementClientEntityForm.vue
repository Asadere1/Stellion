<template>
  <div>
    <h5 class="q-mt-lg q-mb-xl q-ml-xl" style="margin-bottom: 24px;">
      {{ $t('management.customerDetails') }}
    </h5>
    <div class="row q-pa-xl" style="padding-bottom: 0 !important; padding-top: 0 !important;">
      <div class="col-6">
        <q-form class="client-form" ref="form" greedy>
          <div class="row">
            <div class="col">
              <InputField
                :model-value="customer.fullName"
                class="col"
                :label="$t('generic.fullName')"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <InputField
                :model-value="customer.address"
                class="col"
                :label="$t('generic.address')"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <InputField
                style="margin-right: 16px"
                :model-value="customer.zip_code"
                class="col"
                :label="$t('generic.zipCode')"
              />
            </div>
            <div class="col">
              <InputField
                :model-value="customer.post_code"
                class="col"
                :label="$t('generic.postCode')"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <InputField
                :model-value="customer.card"
                class="col"
                :label="$t('generic.card')"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <InputField
                style="margin-right: 16px"
                :model-value="customer.expiration_date"
                class="col"
                :label="$t('generic.expirationDate')"
              />
            </div>
            <div class="col">
              <InputField
                :model-value="customer.cvc"
                class="col"
                :label="$t('generic.cvc')"
              />
            </div>
          </div>
          <ButtonComponent
            level="cta"
            :label="$t('generic.remake')"
            :stretch="false"
            size="md"
            padding="sm xl"
          />
          <p style="margin-top: 34px; color: #4b4e68">
            <span style="color: #000034">Date:</span> 18 Sep 2022 12:48 pm
          </p>
        </q-form>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-12">
            <q-form class="client-form" ref="form" greedy>
              <div class="row">
                <div class="col">
                  <InputField
                    :model-value="customer.rebill"
                    class="col"
                    :label="$t('generic.rebill')"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <InputField
                    style="margin-right: 16px"
                    :model-value="customer.direct_sale"
                    class="col"
                    :label="$t('generic.directSale')"
                  />
                </div>
                <div class="col">
                  <InputField
                    :model-value="customer.cost_per"
                    class="col"
                    :label="$t('generic.costPer')"
                  />
                </div>
              </div>
              <ButtonComponent
                level="tertiary"
                :label="$t('generic.submit')"
                :stretch="false"
                size="md"
                padding="sm xl"
                style="text-transform: capitalize"
              />
            </q-form>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-form class="client-form" ref="form" greedy style="height: 373px;">
              <div class="row">
                <div class="col">
                  <InputField
                    :model-value="customer.email_address"
                    class="col"
                    :label="$t('generic.emailAddress')"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <InputField
                    :model-value="customer.password"
                    class="col"
                    :label="$t('generic.password')"
                  />
                </div>
              </div>
              <ButtonComponent
                level="tertiary"
                :label="$t('generic.submit')"
                :stretch="false"
                size="md"
                padding="sm xl"
                style="text-transform: capitalize"
              />
            </q-form>
          </div>
        </div>
      </div>
    </div>
    <div
      class="row q-pa-xl"
      style="padding-top: 0 !important; padding-bottom: 0 !important"
    >
      <div class="col-6">
        <q-form class="client-form" ref="form" greedy>
          <h4 class="q-ma-none" style="margin-bottom: 20px; font-size: 24px">
            {{ $t('generic.subscription') }}
          </h4>
          <div class="row">
            <div class="col">
              <InputField
                :model-value="customer.type_subscription"
                class="col"
                :label="$t('generic.typeSubscription')"
                type="select"
                :select-options="subscriptionTypes"
              />
            </div>
          </div>
          <ButtonComponent
            level="tertiary"
            :label="$t('generic.submit')"
            :stretch="false"
            size="md"
            padding="sm xl"
            style="text-transform: capitalize"
          />
        </q-form>
      </div>
      <div class="col-6">
        <q-form class="client-form" ref="form" greedy style="height: 292px;">
          <h4 class="q-ma-none" style="margin-bottom: 20px; font-size: 24px">
            {{ $t('generic.overview') }}
          </h4>
          <div class="row">
            <div class="col"></div>
          </div>
        </q-form>
      </div>
    </div>
    <div class="row q-pa-xl" style="padding-top: 0 !important">
      <div class="col-12">
        <q-form class="client-form" ref="form" greedy>
          <div class="row">
            <div class="col" style="padding-right: 50px; border-right: 1px solid #D6D8EE;">
              <h4
                class="q-ma-none"
                style="margin-bottom: 20px; font-size: 24px"
              >
                {{ $t('generic.accountStatus') }}
              </h4>
              <div class="row">
                <div class="col">
                  <InputField
                    :model-value="customer.account_status"
                    class="col"
                    :label="$t('generic.account')"
                    type="select"
                    :select-options="statusTypes"
                  />
                </div>
              </div>
            </div>
            <div class="col" style="padding-left: 50px;">
              <h4
                class="q-ma-none"
                style="margin-bottom: 20px; font-size: 24px"
              >
                {{ $t('generic.log') }}
              </h4>
              <div class="row">
                <div class="col">
                  <p
                    style="
                      font-size: 16px;
                      font-weight: 400;
                      line-height: 26px;
                      color: #84849a;
                    "
                  >
                    IP: 66.249.64.203 Comeete at 12:48 pm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </q-form>
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
  rebill: '',
  direct_sale: '',
  cost_per: '',
  email_address: '',
  password: '',
});

const subscriptionTypes = ref([
  {
    label: 'Master',
    value: 'master',
  },
]);

const statusTypes = ref([
  {
    label: 'Live',
    value: 'live',
  },
]);
</script>

<style lang="scss">
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
</style>
