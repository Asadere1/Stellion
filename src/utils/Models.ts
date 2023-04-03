import { QTableColumn } from 'quasar';
import {
  EntityStatus,
  OrderFullfilmentStatus,
  OrderPaymentStatus,
} from './EntityDefinitions';

export type ActionValues =
  | 'edit'
  | 'delete'
  | 'view'
  | 'refund'
  | 'fulfill'
  | 'cancel'
  | 'manage';
// export type StatusLookups = EntityStatus | OrderFullfilmentStatus | OrderPaymentStatus
export interface TableColumn extends QTableColumn {
  actions?: ActionValues[];
  statusLookup?:
    | undefined
    | EntityStatus
    | OrderFullfilmentStatus
  | OrderPaymentStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format?: ((val: any, row: any) => any) | undefined;
  currency?: boolean;
  date?: boolean;
  valueMap?: { [key: number]: string } | null;
  image?: boolean;
}

export type ButtonLevels =
  | 'cta'
  | 'primary'
  | 'outline-primary'
  | 'secondary'
  | 'accent'
  | 'negative'
  | 'warning'
  | 'tertiary'
  | 'dark'
  | 'minimal';

export enum Currencies {
  'USD' = '$',
  'EUR' = '€',
  'GBP' = '£',
}
export type CurrencyTypes = 'USD' | 'EUR' | 'GBP';

export enum PaymentType {
  'AMEX' = 1,
}
export interface Enum {
  [key: number]: string;
}

export interface IntegrationCardDefinition {
  name: string;
  logo: string;
  title: string;
  description: string;
  type: number;
  disabled?: boolean;
}

export interface CheckoutResponse {
  error?: string;
  error_found?: string;
  error_message?: string;
  response_code?: number;

  response?: {
    status: number;
  };

  message?: string;
}
