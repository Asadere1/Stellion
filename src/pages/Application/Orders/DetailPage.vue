<template>
  <div class="column q-pa-lg overflow-auto full-height no-wrap" v-if="order">
    <h4 class="q-mt-none q-mb-lg text-weight-bold">
      Order {{ order.orderId }}
    </h4>
    <div class="row gap-md">
      <div class="col justify-start">
        <p class="text-weight-bold q-mt-none q-mb-md">
          {{ $t('orders.action') }}
        </p>

        <div class="row border-dark-4 rounded-1 q-pa-md gap-md">
          <ButtonComponent
            :label="$t('generic.cancel')"
            level="negative"
            class="col-2"
            :stretch="false"
            @click="cancel"
          />
          <ButtonComponent
            :label="$t('generic.refund')"
            level="warning"
            class="col-2"
            :stretch="false"
            @click="refund"
          />
          <ButtonComponent
            :label="$t('generic.fulfill')"
            level="accent"
            class="col-2"
            :stretch="false"
            @click="fulfill"
          />
        </div>

        <div class="column q-mt-lg no-wrap">
          <p
            class="q-mb-none bg-secondary-light q-pa-sm text-weight-medium border-l-secondary-light border-r-secondary-light border-t-secondary-light"
          >
            {{ $t('orders.information') }}
          </p>
          <div class="row no-wrap q-pa-sm border-l-dark-4 border-r-dark-4">
            <div class="col-6">{{ $t('orders.price') }}</div>
            <div class="col-6" v-currency="{ amount: order.price }" />
          </div>
          <div
            class="row no-wrap q-pa-sm border-l-dark-4 border-r-dark-5 dark-bg"
          >
            <div class="col-6">{{ $t('orders.dateTime') }}</div>
            <div class="col-6" v-date="order.created" />
          </div>
          <div class="row no-wrap q-pa-sm border-l-dark-4 border-r-dark-4">
            <div class="col-6">Shipping</div>
            <div class="col-6">Free Shipping</div>
          </div>
          <div
            class="row no-wrap q-pa-sm border-l-dark-4 border-r-dark-4 dark-bg">
            <div class="col-6">
              {{ $t('orders.fulfillment') }} {{ $t('generic.status') }}
            </div>
            <div class="" v-bind:class="[(order.fulfillmentStatus === 1 || order.fulfillmentStatus === 2) ? 'chip-fulfill' : 'chip-warning']">
              {{ OrderFullfilmentStatus[order.fulfillmentStatus] }}
            </div>
          </div>
          <div
            class="row no-wrap q-pa-sm border-l-dark-4 border-r-dark-4 border-b-dark-4">
            <div class="col-6">
              {{ $t('orders.payment') }} {{ $t('generic.status') }}
            </div>
            <div class="" v-bind:class="[(order.paymentStatus === 1) ? 'chip-paid' : 'chip-refunded']">
              {{ OrderPaymentStatus[order.paymentStatus] }}
            </div>
          </div>
        </div>

        <div class="column q-mt-lg no-wrap" v-if="customersData">
          <p
            class="q-mb-none row justify-between bg-secondary-light col q-pa-sm text-weight-medium border-l-secondary-light border-r-secondary-light border-t-secondary-light"
          >
            {{ $t('orders.customer') }}
            <a class="row  items-center cursor-pointer">
              <img
                src="/general/edit-light.svg"
                class="q-mr-sm"
                style="width: 18px; height: 18px"
              />
              <span class="text-accent">Edit</span>
            </a>
          </p>
          <div v-for="(customer, index) in customersData" :key="index">
            <div class="row no-wrap q-pa-sm border-l-dark-4 border-r-dark-4">
              <div class="col-6">Name</div>
              <div class="col-6">
                {{ customer.firstname }} {{ customer.lastname }}
              </div>
            </div>
            <div
              class="row no-wrap q-pa-sm dark-bg border-l-dark-4 border-r-dark-4"
            >
              <div class="col-6">Email</div>
              <div class="col-6">{{ customer.email }}</div>
            </div>
            <div class="row no-wrap q-pa-sm border-l-dark-4 border-r-dark-4">
              <div class="col-6">Phone number</div>
              <div class="col-6">{{ customer.phone }}</div>
            </div>
            <div
              class="row no-wrap q-pa-sm dark-bg border-l-dark-4 border-r-dark-4 border-b-dark-4"
            >
              <div class="col-6">Address</div>
              <div class="col-6">
                {{ customer.address1 }},{{ customer.address2 }},
                {{ customer.city }}
                <br />
                {{ customer.state }}
                <br />
                {{ customer.zip }}
                <br />
                {{ customer.country }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col column">
        <p class="text-weight-bold q-mt-none q-mb-md">
          {{ $t('orders.products') }}
        </p>

        <div class="column gap-md">
          <ProductComponent
            v-for="product in products"
            :product="product"
            :key="`product-${product.id}`"
          />
        </div>

        <p class="row justify-between q-mt-lg q-mb-none">
          <span
            >{{ shipping?.name
            }}<span class="q-ml-sm" v-currency="{ amount: 0 }"
          /></span>
          <span class="q-ml-md" v-currency="{ amount: order.price }" />
        </p>

        <q-separator class="q-my-lg" />

        <p class="row justify-between text-weight-bold">
          <span>Total</span>
          <span class="q-ml-md" v-currency="{ amount: order.price }" />
        </p>
      </div>
    </div>
  </div>
  <h5 v-else>No order selected</h5>
</template>
<style>
.dark-bg {
  background-color: #f4f5f9;
}
.chip-fulfill{
  background-color: #e8eaf8;
  color:#7782F1;
  padding: 1px 10px;
  border-radius: 20px;
}

.chip-refunded,
.chip-warning{
  background-color: #feecf0;
  color:#FF6B00;
  padding: 1px 10px;
  border-radius: 20px;
}
</style>
<script lang="ts">
export default {
  name: 'OrderDetailPage',
};
</script>

<script lang="ts" setup>
import ButtonComponent from 'src/components/Global/ButtonComponent.vue';
import ProductComponent from 'src/components/Orders/Product.vue';
import {
  OrderFullfilmentStatus,
  OrderPaymentStatus,
  Product,
  Shipping,
} from 'src/utils/EntityDefinitions';
import { useShopManagementStore } from 'stores/shop-management-store';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const store = useShopManagementStore();
const route = useRoute();
const ordersData = [
  {
    orderId: 'Order MV-1052',
    price: 70,
    items: '2 items',
    paymentStatus: 1,
    fulfillmentStatus: 1,
    customer: 'Ellie Marklew',
    created: '21 November, 2022',
  },
  {
    orderId: 'MV-1052',
    price: 240,
    items: '2 items',
    paymentStatus: 3,
    fulfillmentStatus: 2,
    created: '13 November, 2022',
    customer: 'Philippe Fischer',
  },
  {
    orderId: 'MV-1052',
    price: 340,
    items: '2 items',
    paymentStatus: 3,
    fulfillmentStatus: 3,
    created: '09 November, 2022',
    customer: 'Virginie Guyon',
  },
  {
    orderId: 'MV-1062',
    price: 40,
    items: '2 items',
    paymentStatus: 1,
    fulfillmentStatus: 1,
    created: '07 November, 2022',
    customer: 'Philippe Fischer',
  },
  {
    orderId: 'MV-1022',
    price: 65,
    items: '1 items',
    paymentStatus: 1,
    fulfillmentStatus: 1,
    created: '03 November, 2022',
    customer: 'Ellie Marklew',
  },
  {
    orderId: 'MV-1082',
    price: 40,
    items: '2 items',
    paymentStatus: 3,
    fulfillmentStatus: 2,
    created: '03 November, 2022',
    customer: 'Philippe Fischer',
  },
];
const customersData = [
  {
    firstname: 'Ellie',
    lastname: 'Marklew',
    email: 'eliiemarklew@gmail.com',
    phone: '380074973294',
    address1: '685 Rue du Taye',
    address2: 'Lestrem',
    city: 'Paris',
    state: 'Brittany',
    country: 'Fr',
    zip: '2203',
  },
];
const order = ordersData?.filter(
  (order) => order.orderId === (route.params.id as string)
)[0];
const shippings = computed(() => {
  return store.getShippings;
});

const shipping = computed(() => {
  return shippings.value?.filter(
    (shipping) => shipping.id === order?.shipping
  )[0];
});

const products = [
  {
    id: 0,
    created: 1670101670781,
    lastModified: 1670101670781,
    name: 'You&Me™ Bracelets de Couple Connecté',
    img: '/products/phones.jpg',
    price: 29.99,
  },
  {
    id: 1,
    created: 1670101670781,
    lastModified: 1670101670781,
    name: 'Hiconic Rewards™',
    img: '/products/phones.jpg',
    price: 59.99,
  },
] as Product[];

const cancel = () => {
  alert('cancel');
};
const refund = () => {
  alert('refund');
};
const fulfill = () => {
  alert('fulfill');
};

if (!shippings.value) {
  store.pullData<Shipping[]>('shipping');
}
</script>
