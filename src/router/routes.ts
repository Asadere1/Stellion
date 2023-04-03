import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  /* Registration */
  {
    path: '/',
    name: 'login',
    component: () => import('layouts/SplitLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Registration/LoginPage.vue'),
        name: 'login',
      },
    ],
  },
  {
    path: '/reset_password',
    component: () => import('layouts/SplitLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Registration/ResetPasswordPage.vue'),
      },
    ],
  },
  {
    path: '/change_password/:email/:code',
    component: () => import('layouts/SplitLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Registration/ChangePasswordPage.vue'),
      },
    ],
  },
  {
    path: '/verification',
    name: 'verficaition',
    component: () => import('layouts/SplitLayout.vue'),
    children: [
      {
        path: '',
        name: 'verification',
        component: () => import('pages/Registration/VerificationPage.vue'),
      },
    ],
  },

  /* Acquisition */
  {
    path: '/offer',
    component: () => import('layouts/AnonymousLayout.vue'),
    name: 'offer',
    children: [
      {
        path: '',
        name: 'offer',
        component: () => import('pages/Acquisition/OfferPage.vue'),
      },
    ],
  },
  {
    path: '/checkout',
    component: () => import('layouts/AnonymousLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Acquisition/CheckoutPage.vue'),
      },
    ],
  },
  {
    path: '/success',
    component: () => import('layouts/AnonymousLayout.vue'),
    name: 'success',
    children: [
      {
        path: '',
        name: 'success',
        component: () => import('pages/Acquisition/SuccessPage.vue'),
      },
    ],
  },

  /* Application */
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('pages/Application/Dashboard/IndexPage.vue'),
      },
    ],
  },

  {
    path: '/product',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'product',
        component: () => import('pages/Application/Product/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/product/add',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'product-add',
        component: () => import('src/pages/Application/Product/AddPage.vue'),
      },
    ],
  },

  {
    path: '/management',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'management',
        component: () => import('pages/Application/Management/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/management/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'managementSubscription',
        component: () =>
          import('src/pages/Application/Management/ManagePage.vue'),
      },
    ],
  },

  /* Upsells */
  {
    path: '/upsells/:id?',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'upsells',
        component: () => import('pages/Application/Upsells/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/upsells/edit',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'upsells-edit',
        component: () => import('pages/Application/Upsells/EditUpsell.vue'),
      },
    ],
  },
  {
    path: '/upsells/add',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'upsells-add',
        component: () => import('pages/Application/Upsells/addPage.vue'),
      },
    ],
  },

  /* Shipping */
  {
    path: '/shipping/:id?',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'shipping',
        component: () => import('pages/Application/Shipping/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/shipping/add',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'shipping-add',
        component: () => import('pages/Application/Shipping/addPage.vue'),
      },
    ],
  },

  /* Discounts */
  {
    path: '/discounts/:id?',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'discounts',
        component: () => import('pages/Application/Discounts/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/discounts/add',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'discounts-add',
        component: () => import('pages/Application/Discounts/AddPage.vue'),
      },
    ],
  },

  /* Orders */
  {
    path: '/orders',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'orders',
        component: () => import('pages/Application/Orders/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/orders/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'orders-edit',
        component: () => import('pages/Application/Orders/DetailPage.vue'),
      },
    ],
  },
  {
    path: '/orders/add',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'orders-add',
        component: () => import('pages/Application/Orders/addPage.vue'),
      },
    ],
  },

  /* Redirections */
  {
    path: '/redirections',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'redirections',
        component: () => import('pages/Application/Redirections/IndexPage.vue'),
      },
    ],
  },

  /* Custom Code */
  {
    path: '/custom-code/:section?',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'custom-code',
        component: () => import('pages/Application/CustomCode/IndexPage.vue'),
      },
    ],
  },

  /* Integrations */
  {
    path: '/integrations',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'integrations',
        component: () => import('pages/Application/Integrations/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/integrations/add/:integtationType/:name',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'integrations-add',
        component: () => import('pages/Application/Integrations/AddPage.vue'),
      },
    ],
  },

  /* Customizer */
  {
    path: '/customizer/template',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'customizer/template',
        component: () =>
          import('src/pages/Application/Customizer/TemplatePage.vue'),
      },
    ],
  },
  {
    path: '/customizer/theme',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'customizer/theme',
        component: () =>
          import('pages/Application/Customizer/TemplatePage.vue'),
      },
    ],
  },
  {
    path: '/customizer/discounts',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'customizer/discounts',
        component: () =>
          import('pages/Application/Customizer/TemplatePage.vue'),
      },
    ],
  },
  {
    path: '/customizer/links',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'customizer/links',
        component: () =>
          import('pages/Application/Customizer/TemplatePage.vue'),
      },
    ],
  },
  {
    path: '/customizer/images',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'customizer/images',
        component: () =>
          import('pages/Application/Customizer/TemplatePage.vue'),
      },
    ],
  },
  {
    path: '/customizer/meta',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'customizer/meta',
        component: () =>
          import('pages/Application/Customizer/TemplatePage.vue'),
      },
    ],
  },

  /* Profile */
  {
    path: '/profile/:section?',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'profile',
        component: () => import('src/pages/Application/ProfilePage.vue'),
      },
    ],
  },

  /* Settings */
  {
    path: '/settings/:section?',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'settings',
        component: () => import('src/pages/Application/SettingsPage.vue'),
      },
    ],
  },

  /* checkout */
  /* {
    path: '/cart/:token/:shopname',
    component: () => import('src/layouts/CheckoutLayout.vue'),
    children: [
      {
        path: '',
        name: 'embed',
        component: () =>
          import('src/pages/Application/Customizer/TemplatePage.vue'),
      },
    ],
  }, */

  /* New Checkout */

  {
    path: '/cart/:token/:shopname',
    name: 'checkout',
    component: () => import('layouts/NewCheckoutLayout.vue'),
    children: [
      {
        path: '',
        name: 'checkout',
        component: () => import('pages/Checkout/Checkout.vue'),
      },
      {
        path: 'extra',
        name: 'checkout-upsell',
        component: () => import('pages/Checkout/Upsell.vue'),
      },
      {
        path: 'thank-you',
        name: 'checkout-done',
        component: () => import('pages/Checkout/ThankYou.vue'),
      },
    ],
  },

  /* ADMIN */
  {
    path: '/admin/dashboard/rebillion',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'admin/dashboard/rebillion',
        component: () =>
          import('src/pages/Application/Admin/Dashboard/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/admin/dashboard/customer',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'admin/dashboard/customer',
        component: () =>
          import('src/pages/Application/Admin/Dashboard/CustomerPage.vue'),
      },
    ],
  },

  {
    path: '/admin/management/shop',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'admin/management/shop',
        component: () =>
          import('src/pages/Application/Admin/Management/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/admin/management/client',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'admin/management/client',
        component: () =>
          import('src/pages/Application/Admin/Management/ClientPage.vue'),
      },
    ],
  },
  {
    path: '/admin/management/client/details',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'admin/management/client/details',
        component: () =>
          import(
            'src/pages/Application/Admin/Management/ManagementClientEntityForm.vue'
          ),
      },
    ],
  },
  {
    path: '/admin/management/client/add',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'admin/management/client/add',
        component: () =>
          import('src/pages/Application/Admin/Management/AddNewForm.vue'),
      },
    ],
  },
  {
    path: '/admin/client/invitation',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'admin/client/invitation',
        component: () =>
          import('src/pages/Application/Admin/Client/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/admin/client/account-manage',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'admin/client/account-manage',
        component: () =>
          import('src/pages/Application/Admin/Client/AccountManagePage.vue'),
      },
    ],
  },

  {
    path: '/admin/support',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'admin/support',
        component: () =>
          import('src/pages/Application/Admin/Support/IndexPage.vue'),
      },
    ],
  },

  {
    path: '/admin/settings/profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'admin/settings/profile',
        component: () =>
          import('src/pages/Application/Admin/Settings/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/admin/settings/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'admin/settings/user',
        component: () =>
          import('src/pages/Application/Admin/Settings/UserPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
