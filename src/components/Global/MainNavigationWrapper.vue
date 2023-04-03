<template>
  <q-list
    separator
    dark
    class="bg-dark column no-wrap full-height overflow-x-hidden"
    style="background: #050824 !important"
  >
    <q-item-label
      header
      style="
        margin-top: 24px;
        margin-left: 24px;
        margin-right: 64px;
        margin-bottom: 23px;
        padding: 0px;
      "
    >
      <img
        src="~/assets/logowhite.jpeg"
        style="width: 152px; height: auto"
      />
    </q-item-label>

    <div class="overflow-y-hidden overflow-x-hidden side-nav">
      <TransitionGroup mode="out-in" name="slide-fade">
        <template v-for="(nav, n) in navItems" :key="`nav-${nav}`">
          <q-item
            v-if="showNavItem(nav)"
            class="q-py-md"
            :class="isNavSelected(nav)"
            clickable
            v-ripple
            :disable="
              nav.routeName === 'customizer/links' &&
              !integrationsStore.integration_shopify &&
              integrationsStore.integration?.filter((int) => int.type === 1).length === 0
            "
            @click="
              nav.routeName
                ? $router.push(`/${nav.routeName}`)
                : $router.push(`/${navItems[n + 1].routeName}`)
            "
          >
            <q-item-section
              avatar
              v-if="nav.icon"
              class="q-pr-none q-mr-sm"
              style="width: 25px; min-width: 0"
            >
              <img :src="navIcon(nav)" />
            </q-item-section>
            <q-item-section
              class="text-capitalize"
              :class="nav.icon ? '' : 'q-ml-xl'"
            >
              <q-tooltip
                v-if="
                  nav.routeName === 'customizer/links' &&
                  !integrationsStore.integration_shopify &&
                  integrationsStore.integration?.filter((int) => int.type === 1).length ===
                    0
                "
                class="bg-white shadow-6 text-black text-body2"
                :offset="[10, 10]"
              >
                {{ $t('integrations.firstConnectShopify') }}
              </q-tooltip>
              {{ nav.title }}
            </q-item-section>
          </q-item>
        </template>
      </TransitionGroup>
    </div>

    <q-space />

    <div
      v-if="!($route.name as string)?.includes('admin/')"
      style="
        width: 201px;
        margin-top: 2px;
        margin-left: 21px;
        margin-right: 18px;
        margin-bottom: 22px;
      "
    >
      <q-expansion-item
        expand-separator
        ref="profileSection"
        style="background: rgba(75, 78, 104, 0.3); border-radius: 16px"
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar class="" size="36px">
              <img src="/profile/profile-photo.jpg" class="border-white" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-h7">
            {{
              `${userProfile?.firstName || 'No'} ${
                userProfile?.lastName || 'name'
              }`
            }}
          </q-item-section>
        </template>

        <q-separator class="col" />

        <q-card
          class="rounded-1 overflow-hidden"
          style="
            border-top-left-radius: 0px !important;
            border-top-right-radius: 0px !important;
            background: rgba(75, 78, 104, 0.3);
          "
        >
          <q-card-section class="q-pa-none">
            <q-list separator dark class="bg-dark-7 column no-wrap full-height">
              <q-item
                class="q-py-md"
                style="background: rgba(75, 78, 104, 0.3); !important"
                clickable
                v-ripple
                @click="$router.push('/profile/basic-info')"
              >
                <q-item-section avatar class="expansion-icon">
                  <img src="/nav/profile.svg" />
                </q-item-section>
                <q-item-section>
                  {{ $t('navigation.viewProfile') }}
                </q-item-section>
              </q-item>

              <q-item
                class="q-py-md expansion-icon"
                :class="
                  $route.path.includes('settings')
                    ? 'text-white bg-dark'
                    : 'text-primary-light'
                "
                clickable
                v-ripple
                @click="$router.push('/settings/payment')"
              >
                <q-item-section avatar class="expansion-icon">
                  <img src="/nav/settings.svg" />
                </q-item-section>
                <q-item-section>
                  {{ $t('navigation.settings') }}
                </q-item-section>
              </q-item>

              <q-item
                class="q-py-md text-negative"
                clickable
                v-ripple
                @click="showLogoutPopup = true"
              >
                <q-item-section avatar class="expansion-icon">
                  <img src="/nav/logout.svg" />
                </q-item-section>
                <q-item-section>
                  {{ $t('navigation.logout') }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
    <Teleport to="body">
      <DialogComponent
        v-model="showLogoutPopup"
        :title="`${$t('generic.doYouReally')} ${$t('navigation.logout')}?`"
        size="small"
        :confirmButtonLabel="$t('navigation.logout')"
        confirmButtonLevel="negative"
        @confirm="logout"
      />
    </Teleport>
  </q-list>
</template>

<script lang="ts">
export default {
  name: 'MainNavWrapper',
};
</script>

<script lang="ts" setup>
import { computed, onMounted, PropType, ref } from 'vue';
import { useUsersStore } from 'stores/users-store';
import { useIntegrationsStore } from 'stores/integrations-store';
import { useRouter, useRoute } from 'vue-router';
import DialogComponent from './DialogComponent.vue';
import { QExpansionItem } from 'quasar';
const usersStore = useUsersStore();
const integrationsStore = useIntegrationsStore();
const router = useRouter();
const route = useRoute();
const showLogoutPopup = ref(false);
const profileSection = ref<QExpansionItem>();

interface NavItem {
  title: string;
  routeName?: string;
  icon?: string;
}
defineProps({
  navItems: {
    type: Array as PropType<NavItem[]>,
    required: true,
  },
});

function showNavItem(nav: NavItem) {
  if (nav.icon) {
    return true;
  } else {
    const splitRoute = nav.routeName?.split('/');
    const routeBase = splitRoute?.slice(0, 2).join('/');
    const show = routeBase && (route.name as string).startsWith(routeBase);
    return show;
  }
}

function isNavSelected(nav: NavItem) {
  if (
    ((route.name === 'admin/dashboard/rebillion' ||
      route.name === 'admin/dashboard/customer') &&
      nav.icon === 'dashboard') ||
    ((route.name === 'admin/management/shop' ||
      route.name === 'admin/management/client') &&
      nav.icon === 'management') ||
    ((route.name === 'admin/client/invitation' ||
      route.name === 'admin/client/account-manage') &&
      nav.icon === 'client') ||
    ((route.name === 'admin/settings/profile' ||
      route.name === 'admin/settings/user') &&
      nav.icon === 'settings')
  ) {
    return 'bg-primary-gradient text-dark';
  } else {
    if (
      (route.name === 'admin/dashboard/rebillion' &&
        nav.routeName === 'admin/dashboard/rebillion') ||
      (route.name === 'admin/dashboard/customer' &&
        nav.routeName === 'admin/dashboard/customer') ||
      (route.name === 'admin/management/shop' &&
        nav.routeName === 'admin/management/shop') ||
      (route.name === 'admin/management/client' &&
        nav.routeName === 'admin/management/client') ||
      (route.name === 'admin/client/invitation' &&
        nav.routeName === 'admin/client/invitation') ||
      (route.name === 'admin/client/account-manage' &&
        nav.routeName === 'admin/client/account-manage') ||
      (route.name === 'admin/settings/profile' &&
        nav.routeName === 'admin/settings/profile') ||
      (route.name === 'admin/settings/user' &&
        nav.routeName === 'admin/settings/user')
    ) {
      return 'text-secondary';
    } else {
      return nav.routeName && (route.name as string).startsWith(nav.routeName)
        ? 'bg-primary-gradient text-dark'
        : 'text-primary-light';
    }
  }
}

function navIcon(nav: NavItem) {
  if (
    (route.name === 'admin/dashboard/rebillion' ||
      route.name === 'admin/dashboard/customer') &&
    nav.icon === 'dashboard'
  ) {
    return '/nav/dashboard-dark.svg';
  }

  if (
    (route.name === 'admin/management/shop' ||
      route.name === 'admin/management/client') &&
    nav.icon === 'management'
  ) {
    return '/nav/management-dark.svg';
  }

  if (
    (route.name === 'admin/client/invitation' ||
      route.name === 'admin/client/account-manage') &&
    nav.icon === 'client'
  ) {
    return '/nav/client-dark.svg';
  }

  if (
    (route.name === 'admin/settings/profile' ||
      route.name === 'admin/settings/user') &&
    nav.icon === 'settings'
  ) {
    return '/nav/settings-dark.svg';
  }

  return (
    nav.routeName &&
    `/nav/${nav.icon}${
      (route.name as string).startsWith(nav.routeName) ? '-dark' : ''
    }.svg`
  );
}

const userProfile = computed(() => usersStore.getUserProfile);

onMounted(() => {
  // open the profile draw if on a relevant route
  if (
    (profileSection.value && route.path.includes('profile')) ||
    route.path.includes('settings')
  ) {
    profileSection.value?.show();
  }
});

const logout = async () => {
  const out = await usersStore.logout();
  if (out === false) {
    router.push('/login');
  }
};
</script>

<style lang="scss">
.side-nav {
  .q-link {
    width: 240px;
    height: 48px;
  }

  .q-item-type {
    padding: 16px 24px;
  }
}

.q-expansion-item {
  font-size: 14px;
}

.q-list--separator > .q-item-type + .q-item-type {
  border-top: none !important;
}

.expansion-icon {
  min-width: 0 !important;
  padding-right: 11px;
}

.q-item__section--side {
  padding-right: 12px !important;
}
</style>
