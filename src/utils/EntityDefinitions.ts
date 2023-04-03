import { CurrencyTypes } from 'src/utils/Models';

export class Base {
  id: number | string;
  created: number;
  lastModified: number;

  constructor() {
    this.id = 0;
    this.created = 0;
    this.lastModified = 0;
  }
}

export type ListEntity =
  | Upsell
  | Shipping
  | Discount
  | Order
  | Customer
  | Integration
  | ManagementSubscription
  | Subscription
  | Integration
  | ManagementClient;

export type Entities = (ListEntity & Dashboard) | UpsellType | User;

export type EntityType =
  | 'dashboard'
  | 'upsells'
  | 'shipping'
  | 'discounts'
  | 'orders'
  | 'customers'
  | 'integration'
  | 'subscriptions'
  | 'managementSubscriptions'
  | 'managementClients'
  | 'upsellTypes'
  | 'preselectTypes'
  | 'billingModels'
  | 'users';

export enum UpsellType {
  'Pre-Purchase' = 1,
  Unknown,
  'Pre-Order',
  Regular,
  Discount,
  Bundle,
}
export enum EntityStatus {
  'ACTIVE' = 1,
  'DEACTIVATED',
  'IN-PROGRESS',
}

export enum PreSelectType {
  yes = 1,
  no,
}
export enum DiscountType {
  fixed = 1,
  percentage,
}
export enum OrderFullfilmentStatus {
  Fulfill = 1,
  Unfulfilled,
  Cancel,
}
export enum OrderPaymentStatus {
  Paid = 1,
  Refunded = 3,
}

export enum CodePlacementType {
  'All Pages' = 1,
  'Checkout',
  'Post Purchase',
}

export enum IntegrationType {
  'Shopify' = 1,
  'Facebook Pixel',
  'Klaviyo',
  'Snapchat',
  'TikTok',
  'GA4',
  'GA - UA',
}

export type IntegrationKeys = 'shopify'; // | 'facebook' | 'klaviyo' | 'snapchat' | 'tiktok' | 'ga4' | 'ga-ua'

export interface DashboardStat {
  total: number;
  currency?: CurrencyTypes;
}
export interface Dashboard extends Base {
  MMR: DashboardStat;
  Sales: DashboardStat;
  DailySales: DashboardStat;
  Customers: DashboardStat;
  Orders: DashboardStat;
  DailyOrders: DashboardStat;
  CheckingOut: DashboardStat;
  Purchased: DashboardStat;
}

export class Upsell extends Base {
  active: true;
  name: string;
  status: EntityStatus;
  type: UpsellType;
  templateName: string;
  title: string;
  subtitle: string;
  descriptions: string;
  preSelect: PreSelectType;

  constructor() {
    super();
    this.active = true;
    this.name = '';
    this.status = 1;
    this.type = 1;
    this.templateName = '';
    this.title = '';
    this.subtitle = '';
    this.descriptions = '';
    this.preSelect = 1;
  }
}

export class DateEntity {
  date: string;
  timezone_type: number;
  timezone: string;

  /* HACK - DUMMY DATA HERE!!! */
  constructor() {
    this.date = '2022-11-19 14:06:07';
    this.timezone_type = 3;
    this.timezone = 'America/New_York';
  }
}

export class ShippingType {
  id: number;
  name: string;
  code: string;
  created_at: DateEntity;
  updated_at: DateEntity;

  constructor() {
    this.id = 1;
    this.name = '';
    this.code = '';
    this.created_at = new DateEntity();
    this.updated_at = new DateEntity();
  }
}

export class Shipping extends Base {
  freight_code: string;
  threshold_amount: number;
  threshold_charge_amount: number;
  id: number;
  name: string;
  description: string;
  amount_trial: number;
  amount_recurring: number;
  type: ShippingType;
  service_code: string;
  created_at: DateEntity;
  updated_at: DateEntity;

  constructor() {
    super();

    this.freight_code = '';
    this.threshold_amount = 0;
    this.threshold_charge_amount = 0;
    this.id = 0;
    this.name = '';
    this.description = 'Shipping method';
    this.amount_trial = 0;
    this.amount_recurring = 0;
    this.type = new ShippingType();
    this.service_code = 'SHIP';
    this.created_at = new DateEntity();
    this.updated_at = new DateEntity();
  }
}

export class Discount extends Base {
  name: string;
  code: string | number;
  type: DiscountType;
  value: number;
  usage: number;
  maxUsage: number;

  constructor() {
    super();
    this.name = '';
    this.code = 0;
    this.type = 1;
    this.value = 0;
    this.usage = 0;
    this.maxUsage = 10;
  }
}

export class Order extends Base {
  orderId: string;
  price: number;
  fulfillmentStatus: OrderFullfilmentStatus;
  paymentStatus: number;
  items: number;
  customer: number;
  shipping: number;

  constructor() {
    super();
    this.orderId = '';
    this.price = 0;
    this.fulfillmentStatus = 1;
    this.paymentStatus = 0;
    this.items = 1;
    this.customer = 1;
    this.shipping = 1;
  }
}

export class Integration extends Base {
  name: string;
  status?: EntityStatus;
  type: IntegrationType;
  key: string;
  domain?: string;

  constructor(args: { type?: IntegrationType }) {
    super();
    const { type } = args;
    this.name = '';
    this.status = 1;
    this.type = type || 1;
    this.key = '';
    this.domain = type === 8 ? '' : undefined;
  }
}

export interface OrdersFilter {
  // filter?:string
  startDate?: string;
  endDate?: string;
  orderId?: string;
  customerName?: string;
  customerEmail?: string;
  fulfillmentStatus?: '' | OrderFullfilmentStatus;
  paymentStatus?: '' | OrderPaymentStatus;
}

export interface CustomCode {
  placement: CodePlacementType;
  availableVariables: string[];
  head: string;
  body: string;
}

export class Integrations extends Base {
  name: string;
  price: number;
  fulfillmentStatus: OrderFullfilmentStatus;
  paymentStatus: number;
  items: number;
  customer: number;

  constructor() {
    super();
    this.name = '';
    this.price = 0;
    this.fulfillmentStatus = 1;
    this.paymentStatus = 0;
    this.items = 1;
    this.customer = 1;
  }
}

export class Customer extends Base {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;

  constructor() {
    super();
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.phone = '';
    this.address1 = '';
    this.address2 = '';
    this.city = '';
    this.state = '';
    this.zip = '';
  }
}

export class Product extends Base {
  name: string;
  img: string;
  price: number;

  constructor() {
    super();
    this.name = '';
    this.img = '';
    this.price = 0;
  }
}

export class Subscription extends Base {
  name: string;
  rebillPeriod: number;
  trialPeriod: number;
  termsLink: string;
  shopifyProduct: number;
  text: string;
  subtext: string;
  price: number;

  constructor() {
    super();
    this.name = '';
    this.rebillPeriod = 1;
    this.trialPeriod = 1;
    this.termsLink = '';
    this.shopifyProduct = 0;
    this.text = '';
    this.subtext = '';
    this.price = 0;
  }
}

export type ManagementSubscriptionStatus =
  | 'NEW'
  | 'TRIAL'
  | 'RUNNING'
  | 'DECLINED';

export class ManagementSubscription extends Base {
  id: string;
  subscription: string;
  customer: number;
  order: string;
  value: number;
  processed: number;
  status: ManagementSubscriptionStatus;
  subscriptionPrice: number;
  trialPeriod: number;
  billingScheduled: number;
  totalTransactions: number;
  processedRevenue: number;

  constructor() {
    super();
    this.id = '';
    this.subscription = '';
    this.customer = 1;
    this.order = '';
    this.value = 1;
    this.processed = 1;
    this.status = 'NEW';
    this.subscriptionPrice = 1;
    this.trialPeriod = 0;
    this.billingScheduled = 0;
    this.totalTransactions = 0;
    this.processedRevenue = 0;
  }
}
export enum ProfileRole {
  SUPERADMIN = 1,
  ADMIN,
  AGENT,
}
export enum ProfileStatus {
  ENABLED = 1,
  DISABLED,
}
export enum ProfileDepartment {
  MARKETING = 1,
  SALES,
  SUPPORT,
}
export enum CitiesFrance {
  Paris = 1,
  Nice,
  Toulouse,
  Marseille,
  Rennes,
  Grenoble,
  Nantes,
  Montpellier,
}
export interface User extends Base {
  firstName: string;
  lastName: string;
  role: string;
  username: string;
  status: string;
  email: string;
  department: string;
  address: string;
  city: string;
  password: string;
  repeatPassword: string;
  telephone: string;
  mobile: string;
  website: string;
  languages: string;
  twitter: string;
  instagram: string;
  facebook: string;
  pinterest: string;
}

export interface ShopifyVariant {
  id: number;
  product_id: number;
  title: string;
  price: string;
  sku: string;
  position: number;
  inventory_policy: string;
  compare_at_price: string;
  fulfillment_service: string;
  inventory_management: string;
  option1: string;
  option2: string;
  option3?: string;
  created_at: Date;
  updated_at: Date;
  taxable: boolean;
  barcode: string;
  grams: number;
  image_id?: number;
  weight: number;
  weight_unit: string;
  inventory_item_id: number;
  inventory_quantity: number;
  old_inventory_quantity: number;
  requires_shipping: boolean;
  admin_graphql_api_id: string;
}

export interface ShopifyOption {
  id: number;
  product_id: number;
  name: string;
  position: number;
  values: string[];
}
export interface ShopifyImage {
  id: number;
  product_id: number;
  position: number;
  created_at: Date;
  updated_at: Date;
  alt?: string;
  width: number;
  height: number;
  src: string;
  variant_ids: (number | string)[];
  admin_graphql_api_id: string;
}

export interface ShopifyProduct {
  id: number | string;
  product_id: number | string;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: Date;
  handle: string;
  updated_at: Date;
  published_at?: Date;
  template_suffix: string;
  status: string;
  published_scope: string;
  tags: string;
  admin_graphql_api_id: string;
  variants: ShopifyVariant[];
  options: ShopifyOption[];
  images: ShopifyImage[];
  image: ShopifyImage;
}

export class Invoice extends Base {
  customer: number;
  amount: number;
  status: number;

  constructor() {
    super();
    this.customer = 1;
    this.amount = 1;
    this.status = 0;
  }
}

export interface Customizer {
  logo_path: string;
  favicon_path: string;
  favicon_title: string;
  tc_link: string;
  tc_link_checked: boolean;
  privacy_policy_link: string;
  return_policy_link: string;
  shipping_policy_link: string;
  refund_policy_link: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmation: string;
}

export interface Properties {
  [key: string]: string | number | boolean;
}

export interface FeaturedImage {
  alt: string;
  url: string;
  width: number;
  height: number;
  aspect_ratio: number;
}

export interface OptionsWithValue {
  name: string;
  value: string;
}

export interface Item {
  id: number;
  key: string;
  sku: string;
  url: string;
  grams: number;
  image: string;
  price: number;
  title: string;
  handle: string;
  vendor: string;
  taxable: boolean;
  quantity: number;
  discounts: unknown[];
  gift_card: boolean;
  line_price: number;
  product_id: number;
  properties: Properties;
  variant_id: number;
  final_price: number;
  product_type: string;
  product_title: string;
  variant_title: string;
  featured_image: FeaturedImage;
  original_price: number;
  total_discount: number;
  variant_options: string[];
  discounted_price: number;
  final_line_price: number;
  requires_shipping: boolean;
  options_with_values: OptionsWithValue[];
  original_line_price: number;
  product_description: string;
  line_level_total_discount: number;
  line_level_discount_allocations: unknown[];
  product_has_only_default_variant: boolean;
}

export interface Attributes {
  [key: string]: string | number | boolean;
}

export interface CartJson {
  note?: string;
  items: Item[];
  currency: CurrencyTypes;
  attributes: Attributes;
  item_count: number;
  total_price: number;
  total_weight: number;
  total_discount: number;
  requires_shipping: boolean;
  items_subtotal_price: number;
  original_total_price: number;
  cart_level_discount_applications: unknown[];
}
export interface Offer {
  offer_id: number;
  quantity: number;
  product_id: number;
  billing_model_id: number;
}
export interface CartSubscription extends Base {
  campaign_id: number;
  name: string;
  termsLink: string;
  shopify_product: ShopifyProduct;
  sticky_offer: number;
  text: string;
  subtext: string;
}
export interface NameIdMap {
  name: string;
  id: number;
}
export interface ShippingMethod {
  freight_code: string;
  threshold_amount: number;
  threshold_charge_amount: number;
  id: number;
  name: string;
  description: string;
  amount_trial: string;
  amount_recurring: string;
  type: {
    id: number;
    name: string;
    code: string;
    created_at: {
      date: string;
      timezone_type: number;
      timezone: string;
    };
    updated_at: number;
  };
  service_code: string;
  created_at: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  updated_at: number;
}
export interface CartJsonResponse {
  cart_id: string;
  shop_name: string;
  cart_json: CartJson;
  subscriptions: CartSubscription[];
  campaign_id: number;
  shipping_methods: ShippingMethod[];
  billing_models: NameIdMap[];
}

export class ProductOffering {
  offer_id: number;
  product_id: number;
  billing_model_id: number;
  quantity: number;

  constructor() {
    this.offer_id = 0;
    this.product_id = 0;
    this.billing_model_id = 0;
    this.quantity = 0;
  }
}

export type Steps =
  | 'step'
  | 'information'
  | 'shipping'
  | 'payment'
  | 'checkout'
  | 'done'
  | 'error';

export interface ShopifyCartData {
  step?: Steps;
  agree_to_terms?: boolean;
  gift_order?: boolean;
  tranType?: string;
  ipAddress?: string;
  forceGatewayId?: string;
  preserve_force_gateway?: string;
  creditCardType?: string;
  freeShipping?: boolean;
  firstName: string;
  lastName: string;
  currency: string;
  billingFirstName: string;
  billingLastName: string;
  billingAddress1: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;
  phone: string;
  email: string;
  creditCardNumber: string;
  expirationDate: string;
  CVV: string;
  shippingId?: number;
  campaignId?: number;
  billingSameAsShipping: string;
  shippingAddress1: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
  cartId: string;
}

export interface BillingModel {
  id: number;
  name: string;
  created_at: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  updated_at: null;
  is_archived: number;
  is_preserve_quantity: number;
  is_default: number;
  description: string;
  type: null;
  frequency: 0;
  frequency_type_id: number;
  creator: {
    department_id: number;
    timezone: string;
    id: number;
    is_active: number;
    name: string;
    email: string;
    call_center_provider_id: number;
  };
  updator: null;
}

export interface PagedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  status: 'SUCCESS';
  to: number;
  total: number;
}

export interface WrappedResponse<T> {
  data: T;
  status: 'SUCCESS' | 'FAIL';
}

export interface LineItem {
  product_id: string;
  variant_id: string;
  quantity: string;
  subscription_id: string;
}

export interface SubscriptionId {
  [key: number]: string;
}

export interface CheckoutResponseSuccessObject {
  gateway_id: string;
  response_code: string;
  error_found: string;
  order_id: string;
  transactionID: string;
  customerId: string;
  authId: string;
  orderTotal: string;
  orderSalesTaxPercent: string;
  orderSalesTaxAmount: string;
  test: string;
  prepaid_match: string;
  line_items: LineItem[];
  subscription_id: SubscriptionId;
  resp_msg: string;
}

/*  */

export interface CountryOption {
  name: string,
  code: string,
  iso: string,
  flag: string,
  mask: string
}

export interface CartItem {
  id: number,
  name: string,
  qty: number,
  price: number,
  image: string
}

export interface CheckoutData {
  currentStep: number
}

export interface ManagementClient {
  name: string;
  date: string;
  type_subs: string;
  account_status: string;
  accounca: string;
}
