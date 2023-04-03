<template>
  <q-layout view="lHh Lpr lFf" class="full-height">
    <q-header bordered class="bg-white q-px-lg">
      <q-toolbar class="q-px-none">
        <div
          class="row col justify-between"
          v-if="($route.name as string).includes('customizer')"
        >
          <h5 class="row text-dark q-my-md">
            <q-btn
              round
              unelevated
              padding="xs"
              icon="arrow_back_ios_new"
              class="q-mr-md"
              @click="$router.push('/dashboard')"
            />
            {{ $t('customizer.single') }}
          </h5>
          <div class="row items-center gap-sm hidden">
            <q-btn round unelevated padding="xs">
              <img
                src="/customizer/mobile.svg"
                style="height: 36px; width: auto"
              />
            </q-btn>
            <q-btn round unelevated padding="xs">
              <img
                src="/customizer/tablet.svg"
                style="height: 36px; width: auto"
              />
            </q-btn>
            <q-btn round unelevated padding="xs">
              <img
                src="/customizer/desktop.svg"
                style="height: 36px; width: auto"
              />
            </q-btn>
            <ButtonComponent
              level="tertiary"
              :label="$t('generic.save')"
              :stretch="false"
              size="md"
              padding="sm xl"
              @click="save"
            />
            <ButtonComponent
              level="secondary"
              :label="$t('generic.view')"
              :stretch="false"
              size="md"
              padding="sm xl"
              @click="view"
            />
          </div>
        </div>

        <template v-else>
          <p class="q-mb-none" id="welcome-message">
            Welcome to Stellion Dashboard
          </p>
          <InputField
            v-model="search"
            class="q-my-md col-3"
            id="search-bar"
            type="search"
            :placeholder="$t('generic.search')"
            dense
            filled
          />

          <q-space />

          <div class="relative-position hidden">
            <q-btn round unelevated padding="xs">
              <img src="/general/notifications.svg" />
            </q-btn>
            <q-badge
              color="secondary"
              text-color="dark"
              rounded
              class="absolute-top-right"
            >
              3
            </q-badge>
          </div>

          <ButtonComponent
            level="tertiary"
            class="q-ml-md hidden"
            :label="$t('generic.brandShop')"
            :stretch="false"
            dropdown
          >
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>???????</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </ButtonComponent>
        </template>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above class="bg-dark">
      <MainNavigationWrapper :nav-items="navItems" />
    </q-drawer>

    <q-page-container class="full-height" style="padding-left: 240px !important;">
      <CustomizerLayout
        v-if="($route.name as string).includes('customizer') && (($route.name as string) === 'customizer/links' || ($route.name as string) === 'customizer/images' || ($route.name as string) === 'customizer/meta')"
      >
        <template v-slot:page>
          <router-view />
        </template>
        <template v-slot:side>
          <transition mode="out-in" name="slide-fade">
            <SelectTemplate
              v-if="($route.name as string) === 'customizer/template'"
            />
            <BuildTheme
              v-else-if="($route.name as string) === 'customizer/theme'"
            />
            <ChooseDiscounts
              v-else-if="($route.name as string) === 'customizer/discounts'"
            />
            <ChooseLinks
              v-else-if="($route.name as string) === 'customizer/links'"
            />
            <ChooseImages
              v-else-if="($route.name as string) === 'customizer/images'"
            />
            <ChooseMeta
              v-else-if="($route.name as string) === 'customizer/meta'"
            />
          </transition>
        </template>
      </CustomizerLayout>
      <router-view v-else />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import ButtonComponent from 'src/components/Global/ButtonComponent.vue';
import InputField from 'src/components/Global/InputField.vue';
import MainNavigationWrapper from 'src/components/Global/MainNavigationWrapper.vue';
import CustomizerLayout from 'src/layouts/CustomizerLayout.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import SelectTemplate from 'src/components/Customizer/SelectTemplate.vue';
import BuildTheme from 'src/components/Customizer/BuildTheme.vue';
import ChooseDiscounts from 'src/components/Customizer/ChooseDiscounts.vue';
import ChooseImages from 'src/components/Customizer/ChooseImages.vue';
import ChooseLinks from 'src/components/Customizer/ChooseLinks.vue';
import ChooseMeta from 'src/components/Customizer/ChooseMeta.vue';
import { useDataStore } from 'stores/data-store';

const store = useDataStore();
const { t } = useI18n();

const search = computed({
  get: () => {
    return store.getGlobalSearch;
  },
  set: (val) => {
    store.setGlobalSearch(val);
  },
});
const route = useRoute();
const navItems = computed(() => {
  if ((route.name as string)?.includes('admin/')) {
    return [
      {
        title: t('dashboard.single'),
        icon: 'dashboard',
      },
      {
        title: t('generic.rebillion'),
        routeName: 'admin/dashboard/rebillion',
      },
      {
        title: t('orders.customer'),
        routeName: 'admin/dashboard/customer',
      },

      {
        title: t('navigation.admin.Management'),
        icon: 'management',
      },
      {
        title: t('admin.shop'),
        routeName: 'admin/management/shop',
      },
      {
        title: t('admin.client'),
        routeName: 'admin/management/client',
      },

      {
        title: t('navigation.admin.Client'),
        icon: 'client',
      },
      {
        title: t('admin.invitation'),
        routeName: 'admin/client/invitation',
      },
      {
        title: t('admin.accountManage'),
        routeName: 'admin/client/account-manage',
      },

      {
        title: t('navigation.admin.Support'),
        icon: 'support',
        routeName: 'admin/support',
      },

      {
        title: t('navigation.admin.Settings'),
        icon: 'settings',
      },
      {
        title: t('admin.profile'),
        routeName: 'admin/settings/profile',
      },
      {
        title: t('admin.user'),
        routeName: 'admin/settings/user',
      },
    ];
  } else if ((route.name as string)?.includes('customizer')) {
    return [
      /*
      {
        title: t('navigation.customizer.Template'),
        icon: 'template',
        routeName: 'customizer/template'
      },
      {
        title: t('navigation.customizer.Theme'),
        icon: 'theme',
        routeName: 'customizer/theme'
      },
      {
        title: t('navigation.customizer.Discounts'),
        icon: 'discounts',
        routeName: 'customizer/discounts'
      },
      */
      {
        title: t('navigation.customizer.Links'),
        icon: 'links',
        routeName: 'customizer/links',
      },
      {
        title: t('navigation.customizer.Images'),
        icon: 'images',
        routeName: 'customizer/images',
      },
      {
        title: t('navigation.customizer.Meta'),
        icon: 'meta',
        routeName: 'customizer/meta',
      },
    ];
  } else {
    return [
      {
        title: t('dashboard.single'),
        icon: 'dashboard',
        routeName: 'dashboard',
      },
      {
        title: t('product.subscriptions'),
        icon: 'product',
        routeName: 'product',
      },
      {
        title: t('management.single'),
        icon: 'management',
        routeName: 'management',
      },
      {
        title: t('upsells.plural'),
        icon: 'upsells',
        routeName: 'upsells',
      },
      {
        title: t('shipping.single'),
        icon: 'shipping',
        routeName: 'shipping',
      },
      {
        title: t('discounts.plural'),
        icon: 'discounts',
        routeName: 'discounts',
      },
      {
        title: t('orders.plural'),
        icon: 'orders',
        routeName: 'orders',
      },
      {
        title: t('redirections.plural'),
        icon: 'redirections',
        routeName: 'redirections',
      },
      {
        title: t('customCode.single'),
        icon: 'code',
        routeName: 'custom-code',
      },
      {
        title: t('integrations.plural'),
        icon: 'integrations',
        routeName: 'integrations',
      },
      {
        title: t('customizer.single'),
        icon: 'customizer',
        routeName: 'customizer/links',
      },
    ];
  }
});

const save = () => {
  alert('save');
};

const view = () => {
  alert('view');
};
</script>

<style lang="scss">
#welcome-message {
  margin-right: 18px;
  color: #000034;
  font-weight: 500;
  line-height: 26px;
}

#search-bar {
  .q-field .q-field__control {
    border-radius: 8px !important;
  }
}

.q-drawer {
  width: 240px !important;
}

.scroll {
  overflow: unset !important;
}

.q-header {
  left: 240px !important;
  padding-left: 48px;
}
</style>
