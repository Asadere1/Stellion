import { IStore } from 'src/stores/data-store';

export enum RestPaths {
  // AUTHENTICATION
  'login' = 'login',
  'logout' = 'logout',
  'dashboard' = 'dashboard',
  'register' = 'register',
  'verify_email' = 'verify_email?', // PUT email={email}&action={action}&activation_code={activation_code}"
  'reset_password' = 'reset_password?', // PUT email={email}
  'change_password' = 'change_password?', // email=email&code=code&password=password&confirmation=confirmation

  // TYPES
  'codePlacementType' = 'codeplacementtypes',
  'entityStatus' = 'entitystatuses',
  'orderStatus' = 'orderstatuses',

  // USER
  'users' = 'users',

  // UPSELLS
  'upsells' = 'upsells', // GET(all), POST<Entity>, GET+PUT+DELETE /{_id}
  'preselectTypes' = 'preselecttypes',
  'upsellTypes' = 'upselltypes',

  // SUBSCRIPTIONS
  'subscriptions' = 'subscriptions', // GET(all), POST<Entity>, GET+PUT+DELETE /{_id}
  'billingModels' = 'billing_models', // GET(all), POST<Entity>, GET+PUT+DELETE /{_id}

  // SHIPPING
  'shipping' = 'shipping_methods', // GET(all), POST<Entity>, GET+PUT+DELETE /{_id}

  // DISCOUNTS
  'discounts' = 'discounts', // GET(all), POST<Entity>, GET+PUT+DELETE /{_id}
  'dicsountTypes' = 'discounttypes',

  'orders' = 'orders',
  'customers' = 'customers',
  'integration' = 'integrations',

  // SHOPIFY
  'shopify' = 'shopify_account', // GET, POST{store_name: string, access_token:string}
  'shopify_products' = 'shopify_products',

  // CUSTOMIZER
  'customizer_logo' = 'customizer/import_logo', // POST (multipart payload)
  'customizer_favicon' = 'customizer/import_favicon', // POST (multipart payload)
  'customizer_data' = 'customizer/data',
  'public_customizer' = 'public_customizer/', // GET +<storeName>

  // CART
  'cart' = 'cart', // POST is open, will be accessed from Shopify page to push cart.json to our side.
  // GET will be used on the /cart route to pull in the cart contents
  'checkout' = 'checkout',
}

export function buildRestPath(
  store: IStore,
  name: keyof typeof RestPaths,
  root?: undefined | string
) {
  if (!root) {
    root = store.restRoot;
  }
  return `${root}/${RestPaths[name]}`;
}
