<template>
  <div class="row full-height justify-stretch">
    <div
      :class="shopifyCartData.step === 'done' ? 'col-12' : 'col-8'"
      class="column justify-start items-center q-pa-lg full-height overflow-auto no-wrap"
    >
      <img
        :src="
          customizer?.logo_path
            ? `${store.getRestRoot}/files${customizer.logo_path}`
            : '/customizer/Signature.svg'
        "
        style="width: 10vw; height: auto; min-width: 200px"
        class="q-mb-md q-mt-xl"
      />
      <ul
        class="row gap-md q-mb-lg"
        v-if="
          shopifyCartData.step !== 'done' && shopifyCartData.step !== 'error'
        "
      >
        <li
          :class="[
            shopifyCartData.step === 'information'
              ? 'text-accent'
              : 'text-positive cursor-pointer',
          ]"
          @click="
            shopifyCartData.step === 'information'
              ? null
              : updateProp(
                  {
                    value: 'information',
                    prop: 'step',
                  },
                  'step'
                )
          "
        >
          {{ $t('orders.information') }}
          <q-icon name="arrow_forward_ios" class="q-ml-sm" />
        </li>

        <li
          :class="[
            shopifyCartData.step === 'shipping'
              ? 'text-accent'
              : shopifyCartData.step === 'payment' ||
                shopifyCartData.step === 'done'
              ? 'text-positive cursor-pointer'
              : 'text-dark-5',
          ]"
          @click="
            shopifyCartData.step === 'payment'
              ? updateProp(
                  {
                    value: 'shipping',
                    prop: 'step',
                  },
                  'step'
                )
              : null
          "
        >
          {{ $t('shipping.single') }}
          <q-icon name="arrow_forward_ios" class="q-ml-sm" />
        </li>
        <li
          :class="
            shopifyCartData.step === 'payment'
              ? 'text-accent'
              : shopifyCartData.step === 'done'
              ? 'text-positive cursor-pointer'
              : 'text-dark-5'
          "
        >
          {{ $t('orders.payment') }}
          <q-icon name="arrow_forward_ios" class="q-ml-sm" />
        </li>
      </ul>
      <div
        class="bg-white q-pa-lg full-width rounded-1 column"
        v-if="customizer"
      >
        <InformationForm
          ref="form"
          v-if="shopifyCartData.step === 'information'"
          @save="
            saveAndNext(
              {
                value: 'shipping',
                prop: 'step',
              },
              'step'
            )
          "
          @updateProp="(ev) => updateProp(ev, 'information')"
          :customizer="customizer"
          v-model:shopifyCartData="shopifyCartData"
        />

        <ShippingForm
          ref="form"
          v-if="shopifyCartData.step === 'shipping' && cartPayload"
          @save="
            saveAndNext(
              {
                value: 'payment',
                prop: 'step',
              },
              'step'
            )
          "
          @updateProp="(ev) => updateProp(ev, 'shipping')"
          @back="
            updateProp(
              {
                value: 'information',
                prop: 'step',
              },
              'step'
            )
          "
          v-model:shopifyCartData="shopifyCartData"
          :cart-payload="cartPayload"
          :customizer="customizer"
        />

        <PaymentForm
          ref="form"
          v-if="
            shopifyCartData.step === 'payment' && cartPayload && shippingMethod
          "
          :processingCart="processingCart"
          :cart-payload="cartPayload"
          @save="
            saveAndNext(
              {
                value: 'checkout',
                prop: 'step',
              },
              'step'
            )
          "
          @updateProp="(ev) => updateProp(ev, 'payment')"
          @back="
            updateProp(
              {
                value: 'shipping',
                prop: 'step',
              },
              'step'
            )
          "
          v-model:shopifyCartData="shopifyCartData"
          :customizer="customizer"
          :shipping-method="shippingMethod"
        />

        <div
          v-if="shopifyCartData.step === 'done'"
          class="column justify-center items-center"
        >
          <q-avatar
            icon="check"
            color="positive"
            class="text-white"
            size="160px"
          />
          <h4 class="q-mb-none q-mt-lg">Purchase complete</h4>
        </div>

        <div
          v-if="shopifyCartData.step === 'error'"
          class="column justify-center items-center"
        >
          <q-avatar
            icon="close"
            color="negative"
            class="text-white"
            size="160px"
          />
          <h4 class="q-mb-none q-mt-lg">Purchase failed</h4>
          <p class="q-mb-none q-mt-md">{{ errorMessage }}</p>

          <ButtonComponent
            level="tertiary"
            :label="$t('generic.tryAgain')"
            :stretch="false"
            size="md"
            padding="sm xl"
            class="q-my-lg"
            @click="
              saveAndNext(
                {
                  value: 'payment',
                  prop: 'step',
                },
                'step'
              )
            "
          />
        </div>
      </div>
    </div>

    <div
      class="col q-pa-lg relative-position"
      :class="live ? 'bg-dark-1' : ''"
      v-if="shopifyProducts && shopifyCartData.step !== 'done'"
    >
      <q-separator vertical class="absolute-top-left full-height" />
      <template v-if="cartPayload">
        <ProductRow
          v-for="subscription in stickySubscriptions"
          :key="`offer-product-${subscription.id}`"
          :name="subscription.shopify_product?.title || ''"
          :img-src="
            subscription.shopify_product?.image?.src ||
            '/general/No_image_available.svg'
          "
          :count="1"
          :text="subscription.text"
          :subtext="subscription.subtext"
          class="q-mb-lg"
        />
      </template>
      <ProductRow
        v-for="product in shopifyProducts"
        :key="`shopify-product-${product.value}`"
        :name="product.label"
        :img-src="product.imageSrc || ''"
        :count="product.count"
        :price="product.price"
        class="q-mb-lg"
      />

      <InputField
        v-model="couponCode"
        filled="white"
        :placeholder="$t('customizer.applyCouponCode')"
        :rules="[(val) => !!val || 'Field is required']"
        class="col q-mb-md"
      />
      <ButtonComponent
        level="accent"
        :label="$t('generic.submit')"
        stretch
        size="md"
        padding="sm xl"
        class="q-mb-lg"
        @click="applyCouponCode"
      />

      <p class="row justify-between" v-if="cartPayload">
        <span class="text-capitalize">{{ $t('customizer.subtotal') }}</span>
        <span
          class="text-weight-bold"
          v-currency="{ amount: cartPayload.cart_json.items_subtotal_price }"
        />
      </p>

      <p class="row justify-between">
        <span class="text-capitalize">{{ $t('shipping.single') }}</span>
        <span
          v-if="shippingMethod"
          class="text-weight-bold"
          v-currency="{ amount: shippingMethod.amount_trial }"
        />
        <span v-else class="">{{ $t('customizer.calcNextStep') }}</span>
      </p>

      <p class="row justify-between" v-if="cartPayload">
        <span class="text-capitalize">{{ $t('discounts.single') }}</span>
        <span
          class="text-weight-bold"
          v-currency="{ amount: cartPayload.cart_json.total_discount }"
        />
      </p>

      <q-separator class="col q-mb-lg" />

      <p class="row justify-between q-mb-md" v-if="cartPayload">
        <span>{{ $t('generic.total') }}</span>
        <span class="text-weight-bold" v-currency="{ amount: totalPrice }" />
      </p>

      <!--
      <div
        class="column bg-white rounded-1 q-mb-md"
        v-for="sub in stickySubscriptions"
        :key="`subscription-${sub.id}`"
      >
        <div class="row justify-between q-px-lg q-pb-sm q-pt-md">
          <h5 class="q-my-sm">{{ sub.name }}</h5>
        </div>

        <q-separator class="full-width" />

        <div class="q-px-lg q-pt-sm q-pb-md">
          <p>
            {{ sub.subtext }}
          </p>

          <p>
            {{ sub.text }}
          </p>
        </div>
      </div>
      -->
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CustomizerPage',
};
</script>

<script lang="ts" setup>
import InputField from 'src/components/Global/InputField.vue';
import { computed, ref } from 'vue';

import ButtonComponent from 'src/components/Global/ButtonComponent.vue';
import ProductRow from 'src/components/Customizer/ProductRow.vue';
import InformationForm from 'src/components/Customizer/Checkout/InformationForm.vue';
import ShippingForm from 'src/components/Customizer/Checkout/ShippingForm.vue';
import PaymentForm from 'src/components/Customizer/Checkout/PaymentForm.vue';
import { useDataStore } from 'stores/data-store';
import { useCustomizationsStore } from 'stores/customizations-store';
import { useShopManagementStore } from 'stores/shop-management-store';
import { useRoute, useRouter } from 'vue-router';
import { cloneDeep } from 'lodash';
import {
  CartJsonResponse,
  CartSubscription,
  CheckoutResponseSuccessObject,
  ProductOffering,
  ShopifyCartData,
  Steps,
} from 'src/utils/EntityDefinitions';
import { useQuasar } from 'quasar';
import { CheckoutResponse } from 'src/utils/Models';

const store = useDataStore();
const customizationStore = useCustomizationsStore();
const shopManagementStore = useShopManagementStore();

const route = useRoute();
const router = useRouter();
const $q = useQuasar();
const couponCode = ref('');
const processingCart = ref(false);
const cartPayload = ref<CartJsonResponse>();
const shopifyProducts = ref<ShopifyProductMap[]>();
const stickySubscriptions = ref<CartSubscription[]>();
const shippingMethod = computed(() => {
  if (shopifyCartData.value.shippingId && cartPayload.value?.shipping_methods) {
    return cartPayload.value?.shipping_methods.filter(
      (method) => method.id === shopifyCartData.value.shippingId
    )[0];
  } else {
    return null;
  }
});

const totalPrice = computed(() => {
  const total =
    (cartPayload.value?.cart_json.total_price || 0) -
    (cartPayload.value?.cart_json.total_discount || 0) +
    parseFloat(shippingMethod.value?.amount_trial || '0');
  return total;
});

const shopifyCartData = computed({
  get: () => shopManagementStore.getShopifyCartData,
  set: (newData) => {
    shopManagementStore.updateShopifyCartData(newData);
  },
});

const form = ref<
  typeof InformationForm | typeof ShippingForm | typeof PaymentForm
>();
const live = !route.path.includes('customizer') && route.path.includes('cart');

const applyCouponCode = () => {
  console.log('Apply coupon code');
};

function updateProp(
  args: { prop: string; value: string | number | ProductOffering[] },
  form?: Steps
) {
  const shopifyCartDataDupe = cloneDeep(shopifyCartData.value);
  if (form === 'step') {
    shopifyCartDataDupe.step = args.value as Steps;
    router.push({ hash: `#${args.value}` });
  } else {
    shopifyCartDataDupe[args.prop] = args.value;
  }
  shopifyCartData.value = shopifyCartDataDupe;
}

interface ShopifyProductMap {
  label: string;
  value: string;
  imageSrc: string;
  count: number;
  price: number;
}

const customizer = computed(() => {
  return customizationStore.getCustomizer;
});

const errorMessage = ref<string>();

function handleCheckoutError(
  checkoutResponse: CheckoutResponse | CheckoutResponseSuccessObject
) {
  if (
    ('resp_msg' in checkoutResponse &&
      checkoutResponse.resp_msg === 'Approved') ||
    ('response' in checkoutResponse &&
      checkoutResponse.response?.status === 200)
  ) {
    updateProp(
      {
        value: 'done',
        prop: 'step',
      },
      'step'
    );
  } else if ('response' in checkoutResponse) {
    errorMessage.value = checkoutResponse.message
      ? checkoutResponse.message
      : checkoutResponse.error
      ? checkoutResponse.error
      : `${checkoutResponse.error_message} - (code: ${checkoutResponse.response_code})`;

    updateProp(
      {
        value: 'error',
        prop: 'step',
      },
      'step'
    );
  }

  processingCart.value = false;
}

async function saveAndNext(args: { prop: string; value: string }, step: Steps) {
  if (!form.value) {
    updateProp(args, step);
    return;
  }

  const valid = await form.value.form.validate();

  if (valid) {
    if (args.value === 'payment' && !shopifyCartData.value.shippingId) {
      return;
    }

    if (
      args.value === 'checkout' &&
      // shopifyCartData.value.agree_to_terms
      /* TODO - This should only complete if live!!! */
      shopifyCartData.value.agree_to_terms &&
      live
    ) {
      // set button loading state
      processingCart.value = true;

      // checkout

      try {
        let checkoutResponse = await shopManagementStore.checkout({
          ...shopifyCartData.value,
        } as ShopifyCartData);

        handleCheckoutError(checkoutResponse);
      } catch (err) {
        console.error(err);
        handleCheckoutError(err);
      }
    } else if (
      args.value === 'checkout' &&
      // shopifyCartData.value.agree_to_terms
      /* TODO - This should only complete if live!!! */
      shopifyCartData.value.agree_to_terms &&
      !live
    ) {
      updateProp(
        {
          value: 'done',
          prop: 'step',
        },
        'step'
      );
    } else if (args.value !== 'checkout') {
      updateProp(args, step);
    }
  }
}

function setFavicon() {
  if (
    customizationStore.getCustomizer &&
    customizationStore.getCustomizer.favicon_path
  ) {
    let link = document.getElementById('favicon');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('ref', 'icon');
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.setAttribute(
      'href',
      `${store.getRestRoot}/files${customizationStore.getCustomizer.favicon_path}`
    );
  }
}

function setPageTitle() {
  if (
    customizationStore.getCustomizer &&
    customizationStore.getCustomizer.favicon_title
  ) {
    document.title = customizationStore.getCustomizer.favicon_title;
  }
}

if (!customizationStore.getCustomizer) {
  $q.loading.show();

  customizationStore
    .pullCustomizer(live, route.params.shopname as string)
    .then(() => {
      if (live) {
        setFavicon();
        setPageTitle();
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      $q.loading.hide();
    });
} else {
  if (live) {
    setFavicon();
    setPageTitle();
  }
}

// either get the cart.json from the cart ID if live
// or
// pull shopify products to display them in the template
if (live) {
  $q.loading.show();

  shopManagementStore
    .pullShopifyCartData(route.params.token as string)
    .then((cartJson) => {
      cartPayload.value = cartJson;
      shopifyProducts.value = cartJson.cart_json.items.map((product) => {
        return {
          label: product.title,
          value: product.id,
          imageSrc: product.image,
          count: product.quantity,
          price: product.line_price,
        };
      }) as unknown as ShopifyProductMap[];

      stickySubscriptions.value = cartJson.subscriptions;

      updateProp({
        value: cartJson.campaign_id,
        prop: 'campaignId',
      });

      updateProp({
        value: cartJson.cart_json.currency,
        prop: 'currency',
      });

      updateProp({
        value: cartJson.cart_id,
        prop: 'cartId',
      });

      store.setGlobalCurrency(cartJson.cart_json.currency);

      $q.loading.hide();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      $q.loading.hide();
    });
} else {
  $q.loading.show();

  shopManagementStore
    .pullShopifyProducts()
    .then(() => {
      shopifyProducts.value = [
        ...(shopManagementStore.shopifyProducts
          ?.map((product) => {
            return {
              label: product.title,
              value: product.id,
              imageSrc: product.image?.src || '/general/No_image_available.svg',
              count: Math.ceil(Math.random() * 10),
              price: 9.99,
            };
          })
          .slice(0, 4) || []),
      ] as unknown as ShopifyProductMap[];
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      $q.loading.hide();
    });
}

if (route.hash) {
  updateProp(
    {
      value: route.hash.slice(1),
      prop: 'step',
    },
    'step'
  );
}
</script>
