import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

import { buildRestPath } from 'src/utils/rest';

import {
  Dashboard,
  EntityType,
} from 'src/utils/EntityDefinitions';

export interface IStore {
  restRoot: string;
  dashboard: null | Dashboard;
}

const isDev = document.location.href.startsWith('http://localhost');

export const useDashboardStore = defineStore('dashboard', {
  state: (): IStore => ({
    restRoot: isDev ? 'http://localhost:8000' : 'https://api.rebillion.io',
    dashboard: null,
  }),
  persist: true,
  getters: {
    getDashboard: (state) => state.dashboard,
  },
  actions: {
    /* Generics */

    async pullData<T>(which: EntityType) {
      const { data } = await api.get<T>(buildRestPath(this, which));
      // const { data } = await api.get<T>(`/mock/${which}.json`)
      this[which] = data as T;
    },

    /*  */

  },
});
