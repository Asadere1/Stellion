import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

import { buildRestPath } from 'src/utils/rest';

import {
  Customer,
  Discount,
  Subscription,
  Shipping,
  Upsell,
  Order,
  ManagementSubscription,
  ShopifyCartData,
  ShopifyProduct,
  /*  */
  Entities,
  EntityType,
  ListEntity,
  WrappedResponse,
  PagedResponse,
  CartJsonResponse,
} from 'src/utils/EntityDefinitions';

import { CheckoutResponse, Enum } from 'src/utils/Models';

export interface IStore {
  restRoot: string;
  customers: null | Customer[];
  discounts: null | Discount[];
  subscriptions: null | Subscription[] | PagedResponse<Subscription>;
  shipping: null | Shipping[];
  upsells: null | Upsell[];
  upsellTypes: null | Enum;
  managementSubscriptions: null | ManagementSubscription[];
  orders: null | Order[];
  preselectTypes: null | Enum;
  logo: null | unknown;
  shopifyCartData: ShopifyCartData;
  shopifyProducts: null | ShopifyProduct[];
}

const isDev = document.location.href.startsWith('http://localhost');

export const useShopManagementStore = defineStore('shop-management', {
  state: (): IStore => ({
    restRoot: isDev ? 'http://localhost:8000' : 'https://api.rebillion.io',
    customers: null,
    discounts: null,
    subscriptions: null,
    shipping: null,
    upsells: null,
    upsellTypes: null,
    managementSubscriptions: null,
    orders: null,
    preselectTypes: null,
    logo: null,
    shopifyProducts: null,
    shopifyCartData: {
      cartId: '',
      agree_to_terms: false,
      billingAddress1: '',
      billingCity: '',
      billingCountry: '',
      billingFirstName: '',
      billingLastName: '',
      billingSameAsShipping: 'YES',
      billingState: '',
      billingZip: '',
      campaignId: undefined,
      creditCardNumber: '',
      currency: '',
      CVV: '',
      email: '',
      expirationDate: '',
      firstName: '',
      freeShipping: false,
      gift_order: false,
      lastName: '',
      phone: '',
      shippingAddress1: '',
      shippingCity: '',
      shippingCountry: 'FR',
      shippingId: undefined,
      shippingState: '',
      shippingZip: '',
      step: 'information',
    },
  }),
  persist: true,
  getters: {
    getCustomers: (state) => state.customers,
    getDiscounts: (state) => state.discounts,
    getSubscriptions: (state) => state.subscriptions,
    getShippings: (state) => state.shipping,
    getUpsells: (state) => state.upsells,
    getUpsellTypes: (state) => state.upsellTypes,
    getManagementSubscriptions: (state) => state.managementSubscriptions,
    getOrders: (state) => state.orders,
    getPreSelectTypes: (state) => state.preselectTypes,
    getShopifyCartData: (state) => state.shopifyCartData,
  },
  actions: {
    /* Generics */

    async pullData<T>(which: EntityType) {
      const { data } = await api.get<T>(buildRestPath(this, which));
      // const { data } = await api.get<T>(`/mock/${which}.json`)
      this[which] = data as T;
    },

    deleteItem<T extends Entities>(args: {
      which: EntityType;
      entity: Entities;
    }) {
      return new Promise(async (resolve, reject) => {
        // Needs converting to a back end request
        // The calls below will go in the success handler
        const { which, entity } = args;

        if (!Array.isArray(this[which])) {
          return;
        }

        const index = this[which]?.indexOf(entity as T);
        if (index > -1) {
          const url = `${buildRestPath(this, which)}/${entity.id}`;
          try {
            await api.delete<T>(url)
          } catch (error) {
            return reject(error)
          }

          this[which]?.splice(index, 1);
          resolve(true)
        }
      })
    },
    updateItem<T extends ListEntity | WrappedResponse<T>>(args: {
      which: EntityType
      entity: ListEntity
      id?: string | number
      entityName?: string
    }) {
      return new Promise(async (resolve, reject) => {
        const { which, entity, id, entityName } = args
        const url =
          Array.isArray(this[entityName || which]) ||
            entityName === 'userProfile'
            ? `${buildRestPath(this, which)}/${id || entity.id}`
            : buildRestPath(this, which)

        try {
          const { data } = await api.put<T>(url, entity)

          if (Array.isArray(this[which])) {
            const existingEntity = this[which]?.filter(
              (el: T) => el.id === entity.id
            )[0]
            const index = this[which]?.indexOf(existingEntity) as number
            if (index !== undefined && index !== null && this[which]) {
              this[which][index] = 'data' in data ? data.data : data
            }
          } else {
            this[which] = 'data' in data ? data.data : data
          }

          resolve(true)
        } catch (error) {
          reject(error)
        }
      })
    },

    async addItem<T extends Entities>(args: {
      which: EntityType;
      entity: Entities;
    }) {
      // Needs converting to a back end request
      // The calls below will go in the success handler
      const { which, entity } = args;
      const { data } = await api.post<T>(buildRestPath(this, which), entity);
      this[which]?.push(data as T);
    },

    /*  */

    async pullShopifyProducts() {
      const { data } = await api.get<{ products: ShopifyProduct[] }>(
        buildRestPath(this, 'shopify_products')
      )

      this.shopifyProducts = data.products
    },

    async pullShopifyCartData(token: string) {
      const url = `${buildRestPath(this, 'cart')}/${token}`
      const { data } = await api.get<CartJsonResponse>(url)

      return data
    },
    updateShopifyCartData(newData: ShopifyCartData) {
      this.shopifyCartData = newData;
    },

    checkout(payload: ShopifyCartData) {
      return new Promise(async (resolve, reject) => {
        delete payload.step;
        delete payload.agree_to_terms;

        try {
          const { data } = await api.post<CheckoutResponse>(
            buildRestPath(this, 'checkout'),
            payload
          )

          resolve(data)
        } catch (error) {
          reject(error)
        }
      })
    },
  },
});
