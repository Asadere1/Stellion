<template>
  <IndexPageWrapper
    ref="wrapper"
    :selected-row="selectedRow"
    entity="managementClients"
    @updateSelectedRow="($ev) => (selectedRow = $ev)"
    @setLoading="($ev) => (loading = $ev)"
    id="management-list-wrapper"
  >
    <template v-slot:header>
      <Header
        :title="$t('admin.client')"
        :tertiaryBtnLabel="$t('Add')"
        tertiaryBtnIcon="/general/add-dark.svg"
        @add="$router.push('/admin/management/client/add')"
        @export="($ev) => (showExportPopup = $ev)"
        show-export
      />
    </template>
    <template v-slot:table>
      <TableComponent
        v-if="rows"
        :rows="rows"
        :columns="columns"
        id="manage-list-table"
        :hide-pagination="true"
        @view="$router.push('/admin/management/client/details')"
      />
      <div
        v-else
        class="text-center self-center q-mt-xl"
        style="max-width: 20vw"
      >
        <img src="/no-data/no-upsells.svg" class="full-width" />
        <h6>{{ $t('management.no-data') }}</h6>
      </div>
      <a-pagination
        style="margin-top: 64px"
        v-model:current="query.page"
        :total="500"
        :showSizeChanger="false"
        :show-total="
          (total, range) =>
            `Showing ${range[0]} to ${range[1]} of ${total} entries`
        "
      />
    </template>
  </IndexPageWrapper>
</template>

<script lang="ts">
export default {
  name: 'ManagementsPage',
};
</script>

<script lang="ts" setup>
import TableComponent from 'src/components/Global/TableComponent.vue';
import Header from 'src/components/Layout/Header.vue';
import { computed, ref, reactive } from 'vue';
import { useDataStore } from 'stores/data-store';
import { ManagementClient } from 'src/utils/EntityDefinitions';
import { TableColumn } from 'src/utils/Models';
import IndexPageWrapper from 'src/components/Global/IndexPageWrapper.vue';
import { Pagination as APagination } from 'ant-design-vue';

const store = useDataStore();

const query = reactive({
  // sortBy: 'desc',
  // descending: false,
  page: 1,
  rowsPerPage: 10,
});

const rows = computed(() => {
  // return store.getManagementClients;
  return [
    {
      name: 'David',
      date: '14 Sep, 22',
      type_subs: 'Master',
      account_status: 'live',
      accounca: '50,000',
    },
    {
      name: 'David',
      date: '14 Sep, 22',
      type_subs: 'Master',
      account_status: 'live',
      accounca: '50,000',
    },
    {
      name: 'David',
      date: '14 Sep, 22',
      type_subs: 'Master',
      account_status: 'live',
      accounca: '50,000',
    },
    {
      name: 'David',
      date: '14 Sep, 22',
      type_subs: 'Master',
      account_status: 'live',
      accounca: '50,000',
    },
  ];
});

const wrapper = ref<typeof IndexPageWrapper>();
const showExportPopup = ref(false);
// const showAddNewClient = ref(false);
const loading = ref(false);

const columns: TableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row: ManagementClient) => row.name,
    sortable: true,
  },
  {
    name: 'date',
    required: true,
    label: 'Date',
    align: 'left',
    field: (row: ManagementClient) => row.date,
    sortable: true,
  },
  {
    name: 'type_subs',
    required: true,
    label: 'Type Subs',
    align: 'left',
    field: (row: ManagementClient) => row.type_subs,
    sortable: true,
  },
  {
    name: 'account_status',
    required: true,
    label: 'Account Status',
    align: 'left',
    field: (row: ManagementClient) => row.account_status,
    sortable: true,
  },
  {
    name: 'accounca',
    required: true,
    label: 'Accounca',
    align: 'left',
    field: (row: ManagementClient) => row.accounca,
    sortable: true,
  },
  {
    name: 'actions',
    required: true,
    label: 'Actions',
    align: 'right',
    field: () => null,
    actions: ['enable', 'disable', 'view'],
  },
];

const selectedRow = ref<ManagementClient>();

if (!rows.value) {
  store.pullData<ManagementClient[]>('managementClients');
}
</script>

<style lang="scss">
#management-list-wrapper {
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
    content: " ";
    position: absolute;
    bottom: 96%;
    left: 80%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #FFF transparent;
  }
  .actions {
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    border-radius: 0px;
    .text-primary {
      color: #7782f1 !important;
    }
  }
}

#manage-list-table {
  color: #000034 !important;
  border-bottom: 1px solid #d6d8ea !important;
  border-radius: 0;

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

      .account-status {
        .q-chip {
          font-weight: 500;
          font-size: 14px;
          line-height: 18px;
          width: 57px;
          height: 20px;

          .q-chip__content {
            justify-content: center;
            align-content: center;
          }
        }

        .q-chip.live {
          color: #219fff;
          background: rgba(33, 159, 255, 0.1);
        }
      }

      .accounca {
        .wrap {
          display: flex;
        }

        p {
          margin-right: 41px;
          margin-bottom: 0;
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
