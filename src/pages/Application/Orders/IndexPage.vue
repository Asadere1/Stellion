<template>
  <IndexPageWrapper
    ref="wrapper"
    :selected-row="selectedRow"
    :show-edit-popup="showEditPopup"
    :show-delete-popup="showDeletePopup"
    entity="orders"
    @updateSelectedRow="($ev) => (selectedRow = $ev)"
    @updateShowEditPopup="($ev) => (showEditPopup = $ev)"
    @updateShowDeletePopup="($ev) => (showDeletePopup = $ev)"
    @setLoading="($ev) => (loading = $ev)"
    id="order-list-wrapper"
  >
    <template v-slot:header>
      <Header
        title="Orders"
        :tertiaryBtnLabel="$t('orders.massFulfillment')"
        @add="($ev) => (showMassFulfillmentPopup = $ev)"
        @export="($ev) => (showExportPopup = $ev)"
        @filters="($ev) => (showFiltersPopup = $ev)"
        @clearFilters="clearFilters"
        filters
        :show-export="true"
        :appliedFilterCount="appliedFilters.length"
      />
    </template>
    <template v-slot:table>
      <TableComponent
        v-if="rows"
        :rows="rows"
        :columns="columns"
        @view="($ev) => $router.push(`/orders/${$ev.orderId}`)"
        @refund="refund"
        @fulfill="fulfill"
        @cancel="cancel"
        @delete="wrapper?.deleteRow"
        id="order-list-table"
        hide-pagination
      />

      <div
        v-else
        class="text-center self-center q-mt-xl"
        style="max-width: 20vw"
      >
        <div class="relative-position q-mt-xl">
          <img src="/no-data/no-shipping-a.svg" class="full-width" />
          <img
            src="/no-data/no-shipping-b.svg"
            class="absolute"
            style="
              width: 50%;
              top: -40px;
              position: absolute;
              left: 0;
              right: 0;
              margin-left: auto;
              margin-right: auto;
            "
          />
        </div>

        <h6 class="q-mt-md q-mb-none">{{ $t('orders.no-data') }}</h6>

        <ButtonComponent
          :label="$t('registration.login.loginCTA')"
          level="primary"
          class="q-mt-lg"
          stretch
          @click="$router.push('/dashboard')"
        />
      </div>
    </template>

    <template v-slot:dialogs>
      <a-pagination
        class="pagination-div"
        v-model:current="query.page"
        :total="500"
        :showSizeChanger="false"
      />
      <DialogComponent
        v-if="selectedRow"
        v-model="showDeletePopup"
        :title="`${$t('generic.doYouReally')} ${$t('generic.delete')} \'${
          selectedRow.name
        }\' ${$t('generic.listing')}?`"
        size="small"
        :confirmButtonLabel="$t('generic.delete')"
        :loading="loading"
        confirmButtonLevel="negative"
      />

      <DialogComponent
        v-if="selectedRow"
        v-model="showEditPopup"
        :title="`<div class='row'><span class='text-weight-bold row items-center'><img src='/general/edit-light.svg' class='q-mr-sm' />${$t(
          'generic.edit'
        )} ${$t(
          'upsells.plural'
        )}</span><small class='text-dark-6 q-ml-md'>${$t(
          'generic.general'
        )}</small></div>`"
        documentationRoute="/documentation/orders"
        :loading="loading"
        size="large"
        :confirmButtonLabel="$t('generic.update')"
      >
        <q-form class="column"> </q-form>
      </DialogComponent>

      <DialogComponent
        v-model="showFiltersPopup"
        :title="`<div class='row'><span class='text-weight-bold row items-center'><img src='/general/filter.svg' class='q-mr-sm' />${$t(
          'generic.filters'
        )}</span></div>`"
        size="large"
        :confirmButtonLabel="$t('generic.search')"
        confirmButtonLevel="cta"
        :loading="loading"
        @confirm="updateFilter"
      >
        <Filters :filter="filter" ref="filterForm" />
      </DialogComponent>

      <DialogComponent
        v-model="showMassFulfillmentPopup"
        :title="$t('orders.massFulfillment')"
        size="large"
        :confirmButtonLabel="$t('generic.upload-csv')"
        :loading="loading"
        confirmButtonLevel="cta"
      >
        <div class="column justify-center items-center">
          <img src="/general/mass-fulfillment.svg" />
          <p>{{ $t('orders.exportOrders') }}</p>
        </div>
      </DialogComponent>
      <DialogComponent
        v-model="showExportPopup"
        :title="$t('generic.export')"
        size="large"
        :confirmButtonLabel="$t('generic.export')"
        :loading="loading"
        confirmButtonLevel="cta"
      >
        <div class="column justify-center items-center">
          <img src="/general/export.svg" />
          <div class="column q-mt-lg justify-start full-width">
            <q-checkbox
              v-model="exportOneTimeProds"
              class="items-start"
              color="positive"
              :label="$t('orders.exportOneTimeProds')"
            />
            <q-checkbox
              v-model="exportSubscriptionProds"
              class="items-start"
              color="positive"
              :label="$t('orders.exportSubscriptionProds')"
            />
          </div>
        </div>
      </DialogComponent>
    </template>
  </IndexPageWrapper>
</template>
<script lang="ts">
export default {
  name: 'OrdersPage',
};
</script>

<script lang="ts" setup>
import TableComponent from 'src/components/Global/TableComponent.vue';
import Header from 'src/components/Layout/Header.vue';
import { computed, ref, reactive } from 'vue';
import {
  // Customer,
  Order,
  OrderFullfilmentStatus,
  OrderPaymentStatus,
  OrdersFilter,
} from 'src/utils/EntityDefinitions';
import { TableColumn } from 'src/utils/Models';
import DialogComponent from 'src/components/Global/DialogComponent.vue';
import ButtonComponent from 'src/components/Global/ButtonComponent.vue';
import IndexPageWrapper from 'src/components/Global/IndexPageWrapper.vue';
import { Pagination as APagination } from 'ant-design-vue';
import Filters from 'src/components/Orders/Filters.vue';

const query = reactive({
  page: 1,
  rowsPerPage: 10,
});

const loading = ref(false);

const rows = computed(() => {
  return [
    {
      orderId: 'MV-1052',
      price: 70,
      items: '2 items',
      paymentStatus: 1,
      fulfillmentStatus: 1,
      customer: 'Ellie Marklew',
      created: '21 November, 2022',
    },
    {
      orderId: 'MV-1052',
      price: 240,
      items: '2 items',
      paymentStatus: 3,
      fulfillmentStatus: 2,
      created: '13 November, 2022',
      customer: 'Philippe Fischer',
    },
    {
      orderId: 'MV-1052',
      price: 340,
      items: '2 items',
      paymentStatus: 3,
      fulfillmentStatus: 3,
      created: '09 November, 2022',
      customer: 'Virginie Guyon',
    },
    {
      orderId: 'MV-1062',
      price: 40,
      items: '2 items',
      paymentStatus: 1,
      fulfillmentStatus: 1,
      created: '07 November, 2022',
      customer: 'Philippe Fischer',
    },
    {
      orderId: 'MV-1022',
      price: 65,
      items: '1 items',
      paymentStatus: 1,
      fulfillmentStatus: 1,
      created: '03 November, 2022',
      customer: 'Ellie Marklew',
    },
    {
      orderId: 'MV-1082',
      price: 40,
      items: '2 items',
      paymentStatus: 3,
      fulfillmentStatus: 2,
      created: '03 November, 2022',
      customer: 'Philippe Fischer',
    },
  ];
});

const filterForm = ref<typeof Filters>();

const exportOneTimeProds = ref(false);
const exportSubscriptionProds = ref(false);

const filter = ref<OrdersFilter>();
clearFilters();

const appliedFilters = computed(() => {
  const appliedFilters = filter.value
    ? Object.keys(filter.value).filter((key) => {
        const value = filter.value?.[key as keyof OrdersFilter] as
          | string
          | number;
        value !== '' && value !== null && value !== undefined;
        return value;
      })
    : [];
  return appliedFilters;
});

const selectedRow = ref<Order>();
const showDeletePopup = ref(false);
const showEditPopup = ref(false);
const showFiltersPopup = ref(false);
const showMassFulfillmentPopup = ref(false);
const showExportPopup = ref(false);

const wrapper = ref<typeof IndexPageWrapper>();

const columns: TableColumn[] = [
  {
    name: 'price',
    required: true,
    label: 'Price',
    align: 'left',
    field: (row: Order) => row.price,
    sortable: true,
    currency: true,
  },
  {
    name: 'created',
    required: true,
    label: 'Date/Time',
    align: 'left',
    field: (row: Order) => row.created,
    sortable: true,
  },
  {
    name: 'status',
    required: true,
    label: 'Fulfillment status',
    align: 'left',
    field: (row: Order) => row.fulfillmentStatus,
    format: (val) => {
      return {
        label: OrderFullfilmentStatus[val],
        val,
      };
    },
    sortable: true,
  },
  {
    name: 'status',
    required: true,
    label: 'Payment status',
    align: 'left',
    field: (row: Order) => row.paymentStatus,
    format: (val) => {
      return {
        label: OrderPaymentStatus[val],
        val,
      };
    },
    sortable: true,
  },
  {
    name: 'items',
    required: true,
    label: 'Items',
    align: 'left',
    field: (row: Order) => `${row.paymentStatus} items`,
    sortable: true,
  },
  {
    name: 'customer',
    required: true,
    label: 'Customer',
    align: 'left',
    field: (row: Order) => row.customer,
    // {
    //   let customer = customers.value?.filter(
    //     (customer) => customer.id === row.customer
    //   )[0];
    //   if (!customer) {
    //     customer = new Customer();
    //   }
    //   return `${customer.firstname} ${customer.lastname}`;
    // },
    sortable: true,
  },
  {
    name: 'actions',
    required: true,
    label: 'Actions',
    align: 'right',
    field: () => null,
    actions: ['view', 'refund', 'fulfill', 'cancel'],
  },
];

const updateFilter = () => {
  filter.value = filterForm.value?.filtersDupe as OrdersFilter;
  showFiltersPopup.value = false;
};

function clearFilters() {
  filter.value = {
    startDate: '', // DateTime.now().toFormat('LL/dd/yyyy'),
    endDate: '', // DateTime.now().plus({ days: 1 }).toFormat('LL/dd/yyyy'),
    orderId: '',
    customerName: '',
    customerEmail: '',
    fulfillmentStatus: '',
    paymentStatus: '',
  };
}

const refund = () => {
  alert('refund');
};
const fulfill = () => {
  alert('fulfill');
};
const cancel = () => {
  alert('cancel');
};

// if (!rows.value) {
//   store.pullData<Order[]>('orders');
// }
// if (!customers.value) {
//   store.pullData<Customer[]>('customers');
// }
</script>

<style lang="scss">
.q-chip__icon {
  display: none;
}
.pagination-div {
  margin-right: 20px;
}
#order-list-wrapper {
  h4 {
    font-size: 30px !important;
    font-weight: 600;
    line-height: 40px;
  }
  .filter-btn {
    margin-left: 40px !important;
    width: 138px;
    height: 42px;
    justify-content: center;
    align-items: center;
    .row {
      text-transform: capitalize;
      flex-wrap: nowrap;
    }
  }
}

.actions-menu {
  border-radius: 4px !important;
  .q-card__section::after {
    content: ' ';
    position: absolute;
    bottom: 100%; /* At the top of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }
  .actions {
    .text-danger {
      color: #f53d6b !important;
      font-weight: 600;
      font-size: 12px;
      line-height: 18px;
      border-radius: 0px;
    }
  }
}

#order-list-table {
  color: #000034 !important;

  .bg-secondary {
    background-color: #d7fffb !important;
  }

  .text-h6 {
    font-size: 16px !important;
  }

  .q-tr {
    .q-td {
      font-size: 14px !important;
      font-weight: 400;
      border: 0 !important;
      &:first-child {
        border-left: 1px solid #d6d8ea !important;
      }

      &:last-child {
        border-right: 1px solid #d6d8ea !important;
        .q-btn {
          color: #979ab8 !important;
        }
      }

      .order-status {
        .q-chip {
          font-weight: 500 ;
          font-size: 14px;
          line-height: 18px;
        }

        
        .q-chip.fulfill {
          background: #e5f0fe !important;
          color: #006BF1 !important;
        }

        .q-chip.unfulfilled {
          background: #e9eaf8;
          color: #7782F1;
        }

        .q-chip.cancel {
          background: #f7c1ba;
          color: #f53d6b;
        }
      }
    }
    &:last-child {
      border-bottom: 1px solid #d6d8ea !important;
    }
    &:nth-child(even) {
      background-color: #f4f5f9 !important;
    }
  }
}
</style>
