import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import {
  RegisterPayload,
} from 'src/utils/EntityDefinitions';
import { CurrencyTypes } from 'src/utils/Models';
import { buildRestPath } from 'src/utils/rest';

export interface IStore {
  globalCurrency: CurrencyTypes;
  globalSearch: string;
  isDev: boolean;
  restRoot: string;
}

const isDev = document.location.href.startsWith('http://localhost');

export const useDataStore = defineStore('data', {
  state: (): IStore => ({
    globalCurrency: 'USD',
    globalSearch: '',
    isDev,
    restRoot: isDev ? 'http://localhost:8000' : 'https://api.rebillion.io',
  }),
  persist: true,
  getters: {
    /* Generics */

    getIsDev: (state) => state.isDev,

    getGlobalSearch: (state) => state.globalSearch,
    getRestRoot: (state) => state.restRoot,
  },
  actions: {
    /* Generics */

    setGlobalSearch(val: string) {
      this.globalSearch = val;
    },
    setGlobalCurrency(currency: CurrencyTypes) {
      this.globalCurrency = currency;
    },

    /* ??? */

    async register(payload: RegisterPayload) {
      const { data } = await api.post(buildRestPath(this, 'register'), payload);
      console.log('Registered: ', data);
    }
  },
});
