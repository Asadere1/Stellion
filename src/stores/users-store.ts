import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

import { buildRestPath } from 'src/utils/rest';

import {
  User,
  Entities,
  EntityType,
} from 'src/utils/EntityDefinitions';

export interface IStore {
  restRoot: string;
  userProfile: null | User;
  isLoggedIn: null | boolean;
  loggedInUsername: null | string;
}

const isDev = document.location.href.startsWith('http://localhost');

export const useUsersStore = defineStore('users', {
  state: (): IStore => ({
    restRoot: isDev ? 'http://localhost:8000' : 'https://api.rebillion.io',
    userProfile: null,
    isLoggedIn: false,
    loggedInUsername: null,
  }),
  persist: true,
  getters: {
    getUserProfile: (state) => state.userProfile,
  },
  actions: {
    /* Generics */

    async pullData<T>(which: EntityType) {
      const { data } = await api.get<T>(buildRestPath(this, which));
      // const { data } = await api.get<T>(`/mock/${which}.json`)
      this[which] = data as T;
    },

    async getItem<T extends Entities>(args: {
      which: EntityType;
      id: string | number;
    }) {
      // Needs converting to a back end request
      // The calls below will go in the success handler
      const { which, id } = args;
      const url = `${buildRestPath(this, which)}/${id}`;
      const { data } = await api.get<T>(url);
      return data;
    },

    /*  */

    async login(creds: { username: string; password: string }) {
      try {
        await api.post<{ message: string }>(
          buildRestPath(this, 'login'),
          creds
        );
        this.loggedInUsername = creds.username;
        const loggedInUser = await this.getItem<User>({
          which: 'users',
          id: this.loggedInUsername,
        });
        loggedInUser.password = '';
        loggedInUser.repeatPassword = '';

        Object.keys(loggedInUser).forEach((key) => {
          if (loggedInUser[key as keyof User] === null) {
            loggedInUser[key as keyof User] = '';
          }
        });
        this.userProfile = loggedInUser;
        this.isLoggedIn = true;
        return {
          success: true,
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        return {
          success: false,
          error: err.response.data
        };
      }
    },
    async resetPassword(creds: { email: string }) {
      try {
        const url = `${buildRestPath(this, 'reset_password')}email=${
          creds.email
        }`;
        const { data } = await api.put<{ message: string }>(url);
        return data.message === 'Reset Password Successful!';
      } catch (err) {
        console.error(err);
      }
    },
    async changePassword(creds: {
      email: string;
      code: string;
      repeatPassword: string;
      password: string;
    }) {
      try {
        const { data } = await api.put<{ message: string }>(
          buildRestPath(this, 'change_password'),
          creds
        );
        return data.message === 'Login Successful!';
      } catch (err) {
        console.error(err);
      }
    },
    async logout() {
      const { data } = await api.post<{ message: string }>(
        buildRestPath(this, 'logout')
      );
      this.isLoggedIn = false;
      return data.message === 'Logout Successful!';
    },
    async updateUserProfile(newProfile: User) {
      this.userProfile = newProfile;
    },
  },
});
