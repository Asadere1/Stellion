import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

import { buildRestPath } from 'src/utils/rest';

import {
  Customizer,
  BillingModel,
  EntityType,
  /*  */
  PagedResponse,
} from 'src/utils/EntityDefinitions';



/* Note - BillingModels is not used anywhere, but seems to be related to Customizer */

export interface IStore {
  restRoot: string;
  customizer: null | Customizer;
  billingModels: null | BillingModel[] | PagedResponse<BillingModel>;
}

const isDev = document.location.href.startsWith('http://localhost');

export const useCustomizationsStore = defineStore('customizations', {
  state: (): IStore => ({
    restRoot: isDev ? 'http://localhost:8000' : 'https://api.rebillion.io',
    customizer: null,
    billingModels: null,
  }),
  persist: true,
  getters: {
    getCustomizer: (state) => state.customizer,
    getBillingModels: (state) => state.billingModels,
  },
  actions: {
    /* Generics */

    async pullData<T>(which: EntityType) {
      const { data } = await api.get<T>(buildRestPath(this, which));
      // const { data } = await api.get<T>(`/mock/${which}.json`)
      this[which] = data as T;
    },

    /*  */

    uploadLogo(payload: FormData) {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await api.post(
            buildRestPath(this, 'customizer_logo'),
            payload
          )

          this.mergeCustomizerData(data)

          resolve(true)
        } catch (error) {
          reject(error)
        }
      })
    },
    uploadFavicon(payload: FormData) {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await api.post(
            buildRestPath(this, 'customizer_favicon'),
            payload
          )

          this.mergeCustomizerData(data)

          resolve(true)
        } catch (error) {
          reject(error)
        }
      })
    },
    async customizerLinks(payload: { [key: string]: string | boolean }) {
      if (this.customizer) {
        payload = { ...this.customizer, ...payload };
      }
      const { data } = await api.put(
        buildRestPath(this, 'customizer_data'),
        payload
      );
      Object.assign(this.customizer || {}, data);
    },
    async pullCustomizer(live: boolean, shopname: string) {
      const apiKey = live && shopname ? 'public_customizer' : 'customizer_data';
      const url =
        live && shopname
          ? `${buildRestPath(this, apiKey)}${shopname}`
          : buildRestPath(this, apiKey);

      const { data } = await api.get(url)

      this.mergeCustomizerData(data)
    },
    mergeCustomizerData(data: Customizer) {
      const mergedCustomizer = { ...this.customizer, ...data };
      this.customizer = mergedCustomizer;
    },
  },
});
