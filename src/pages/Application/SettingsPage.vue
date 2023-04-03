<template>
  <div class="column q-pa-lg overflow-auto full-height no-wrap">
    <div class="row justify-between items-center q-pa-none">
      <h5 class="q-my-none">{{ $t('navigation.settings') }}</h5>
    </div>

    <div class="row gap-md items-start">
      <div
        class="col-3 q-pa-none q-mt-md rounded-1 border-dark-3 overflow-hidden"
      >
        <q-list>
          <q-item
            @click="$router.push('/settings/payment')"
            clickable
            v-ripple
            :class="
              $route.params.section === 'payment' ? 'bg-primary-light' : ''
            "
          >
            <q-item-section>{{ $t('settings.payment') }}</q-item-section>
          </q-item>
          <q-item
            @click="$router.push('/settings/invoice')"
            clickable
            v-ripple
            :class="
              $route.params.section === 'invoice' ? 'bg-primary-light' : ''
            "
          >
            <q-item-section>{{ $t('settings.invoice') }}</q-item-section>
          </q-item>
          <q-item
            @click="$router.push('/settings/pspConnection')"
            clickable
            v-ripple
            :class="
              $route.params.section === 'pspConnection'
                ? 'bg-primary-light'
                : ''
            "
          >
            <q-item-section>{{ $t('settings.pspConnection') }}</q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="column col">
        <q-form
          v-if="$route.params.section === 'payment'"
          ref="form"
          class="q-pa-lg q-mt-md rounded-1 border-dark-3 q-mb-md"
        >
          <h6 class="q-mt-none q-mb-md">
            {{ $t('settings.selectPayMethod') }}
          </h6>
          <p class="q-my-none">{{ $t('settings.beSure') }}</p>

          <q-separator class="full-width q-my-md" />

          <div class="row gap-md q-mb-md">
            <div
              class="rounded-half border-dark-4 q-pa-sm row justify-center items-center"
              style="min-width: 110px"
              v-for="payType in payTypes"
              :key="payType.type"
            >
              <img v-if="payType.logo" :src="payType.logo" />
              <span v-else>{{ payType.type }}</span>
            </div>
          </div>

          <div class="column gap-md">
            <InputField
              type="search"
              v-model="settings.payment.nameOnCard"
              :label="$t('settings.nameOnCard')"
              class="col-12"
              filled
              :rules="[(val) => !!val || 'Field is required']"
            />

            <InputField
              type="search"
              v-model="settings.payment.cardNumber"
              :label="$t('settings.cardNumber')"
              class="col-12"
              filled
              :rules="[(val) => !!val || 'Field is required']"
            />

            <div class="row gap-md">
              <InputField
                type="search"
                v-model="settings.payment.expiry"
                :label="$t('settings.expiry')"
                class="col-6"
                filled
                :rules="[(val) => !!val || 'Field is required']"
              />

              <InputField
                type="search"
                v-model="settings.payment.cvv"
                :label="$t('settings.cvv')"
                class="col"
                filled
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>

          <p class="q-mt-md">
            <img src="/settings/lock-grey.svg" class="q-mr-sm" />{{
              $t('settings.cardDetailsProtected')
            }}
          </p>
        </q-form>

        <q-form
          ref="form"
          v-if="$route.params.section === 'invoice'"
          class="q-pa-lg q-mt-md rounded-1 border-dark-3 q-mb-md"
        >
          <h6 class="q-mt-none q-mb-md">{{ $t('settings.invoice') }}</h6>
          <p class="q-my-none">{{ $t('settings.invoiceList') }}</p>

          <q-separator class="full-width q-my-md" />

          <TableComponent :rows="rows" :columns="columns" />
        </q-form>

        <q-form
          ref="form"
          v-if="$route.params.section === 'pspConnection'"
          class="q-pa-lg q-mt-md rounded-1 border-dark-3 q-mb-md"
        >
          <h6 class="q-mt-none q-mb-md">{{ $t('settings.complete') }}</h6>
          <p class="q-my-none">Lorem ipsum dolor sit amet, consectetur.</p>
        </q-form>

        <div
          v-if="$route.params.section === 'payment'"
          class="col q-pa-lg q-mt-md rounded-1 border-dark-3"
        ></div>
      </div>
    </div>

    <div class="q-pa-none row justify-end gap-sm q-mt-md">
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

<script lang="ts">
export default {
  name: 'RedirectionsPage',
};
</script>

<script lang="ts" setup>
import ButtonComponent from 'src/components/Global/ButtonComponent.vue';
import InputField from 'src/components/Global/InputField.vue';
import TableComponent from 'src/components/Global/TableComponent.vue';
import { Invoice } from 'src/utils/EntityDefinitions';
import { TableColumn } from 'src/utils/Models';
import { reactive } from 'vue';

const settings = reactive({
  payment: {
    cardType: 'VISA',
    nameOnCard: '',
    cardNumber: 0,
    expiry: '',
    cvv: '',
  },
});

const rows: Invoice[] = [];

const columns: TableColumn[] = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: (row: Invoice) => row.id,
    sortable: true,
  },
  {
    name: 'date',
    required: true,
    label: 'Date',
    align: 'left',
    field: (row: Invoice) => row.created,
    sortable: true,
    date: true,
  },
  {
    name: 'customer',
    required: true,
    label: 'Customer',
    align: 'left',
    field: (row: Invoice) => row.customer,
    sortable: true,
  },
  {
    name: 'amount',
    required: true,
    label: 'Amount',
    align: 'left',
    field: (row: Invoice) => row.amount,
    sortable: true,
    currency: true,
  },
  {
    name: 'status',
    required: true,
    label: 'Status',
    align: 'left',
    field: (row: Invoice) => row.status,
    sortable: true,
  },
];

const payTypes = [
  {
    type: 'VISA',
    logo: '/settings/visa-logo.svg',
  },
  {
    type: 'MC',
    logo: '/settings/Mastercard.svg',
  },
  {
    type: 'JCB',
    logo: '/settings/JCB.svg',
  },
  {
    type: 'DISC',
    logo: '/settings/Discover.svg',
  },
  {
    type: 'Add Method',
  },
];

function save() {
  alert('save');
}
</script>
