import { defineStore } from 'pinia';
//import { api } from 'src/boot/axios';

import {
  CheckoutData,
} from 'src/utils/EntityDefinitions';

export interface IStore {
  restRoot: string;
  checkoutTransition: boolean | string;
  checkoutData: CheckoutData;
}

const isDev = document.location.href.startsWith('http://localhost');

export const useCheckoutStore = defineStore('checkout', {
  state: (): IStore => ({
    restRoot: isDev ? 'http://localhost:8000' : 'https://api.rebillion.io',
    checkoutTransition: false,
    checkoutData: {
      currentStep: 1,
    },
  }),
  persist: true,
  actions: {
    async saveCustomerInfo(value) {
      this.checkoutData.customer = value?.customer;
    },
    async savePaymentInfo(value) {
      this.checkoutData.payment = value?.payment;
    },

    /* Restart the workflow */

    async setCheckoutTransition(value) {
      this.checkoutTransition = value;
    },
  },
});
