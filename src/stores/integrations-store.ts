import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

import { buildRestPath } from 'src/utils/rest';

import {
  Integration,
  IntegrationType,
  Entities,
  EntityType,
  ListEntity,
  WrappedResponse
} from 'src/utils/EntityDefinitions';

export interface IStore {
  restRoot: string;
  integration_facebook: null | Integration;
  integration_klaviyo: null | Integration;
  integration_shopify: null | Integration;
  integration_snapchat: null | Integration;
  integration_tiktok: null | Integration;
  integration: null | Integration[];
}

const isDev = document.location.href.startsWith('http://localhost');

export const useIntegrationsStore = defineStore('integrations', {
  state: (): IStore => ({
    restRoot: isDev ? 'http://localhost:8000' : 'https://api.rebillion.io',
    integration_facebook: null,
    integration_klaviyo: null,
    integration_shopify: null,
    integration_snapchat: null,
    integration_tiktok: null,
    integration: null,
  }),
  persist: true,
  getters: {
    getIntegrations: (state) => state.integration,
  },
  actions: {
    /* Generics */

    async pullData<T>(which: EntityType) {
      const { data } = await api.get<T>(buildRestPath(this, which));
      // const { data } = await api.get<T>(`/mock/${which}.json`)
      this[which] = data as T;
    },

    async deleteItem<T extends Entities>(args: {
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
    async updateItem<T extends ListEntity | WrappedResponse<T>>(args: {
      which: EntityType;
      entity: ListEntity;
      id?: string | number;
      entityName?: string;
    }) {
      const { entity } = args;
      return new Promise(async (resolve, reject) => {
        // this is a shopify update
        try {
          const { data } = await api.put<Integration>(
            buildRestPath(this, 'integration'),
            entity
          )

          this.integration_shopify = data
          resolve(true)
        } catch (error) {
          reject(error)
        }
      })
    },

    /*  */

    async addIntegration(args: {
      type: IntegrationType;
      name: string;
      token: string;
      domain?: string;
    }) {
      let responseData;

      if (args.type === 1) {
        const { data } = await api.post<Integration>(
          buildRestPath(this, 'shopify'),
          {
            store_name: args.name,
            access_token: args.token,
          }
        );

        responseData = data;

        const key = 'integration_shopify';
        this[key] = responseData;
      } else {
        const payload: Integration = {
          id: 0,
          lastModified: 0,
          created: 0,
          name: args.name,
          key: args.token,
          status: 1,
          type: args.type,
          domain: '',
        };

        if (args.domain) {
          payload.domain = args.domain;
        } else {
          payload.domain = undefined;
        }

        api.post<Integration>(buildRestPath(this, 'integration'), payload);
      }
    },
  },
});
