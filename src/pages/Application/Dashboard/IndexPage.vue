<template>
  <div class="column gap-md" style="padding-top: 48px; padding-left: 48px">
    <div class="row gap-md items-start q-mt-md q-mr-lg" v-if="dashboardData">
      <StatContainer>
        <template v-slot:top>
          <StatBlock
            color="primary-light"
            icon="/dashboard/total-mmr.svg"
            :label="`${$t('generic.total')} ${$t('dashboard.mmr')}`"
            :value="`${
              dashboardData.MMR.currency
                ? Currencies[dashboardData.MMR.currency]
                : ''
            }${dashboardData.MMR.total}`"
          />
        </template>
        <template v-slot:bottom>
          <StatBlock
            color="secondary-light"
            icon="/dashboard/total-customers.svg"
            :label="`${$t('generic.total')} ${$t('dashboard.customers')}`"
            :value="`${dashboardData.Customers.total}`"
          />
        </template>
      </StatContainer>

      <StatContainer>
        <template v-slot:top>
          <StatBlock
            color="negative-light"
            icon="/dashboard/total-sales.svg"
            :label="`${$t('generic.total')} ${$t('dashboard.sales')}`"
            :value="`${
              dashboardData.Sales.currency
                ? Currencies[dashboardData.Sales.currency]
                : ''
            }${dashboardData.Sales.total}`"
          />
        </template>
        <template v-slot:bottom>
          <StatBlock
            color="purple-light"
            icon="/dashboard/total-orders.svg"
            :label="`${$t('generic.total')} ${$t('dashboard.orders')}`"
            :value="`${dashboardData.Orders.total}`"
          />
        </template>
      </StatContainer>

      <StatContainer>
        <template v-slot:top>
          <StatBlock
            color="accent-light"
            icon="/dashboard/daily-sales.svg"
            :label="`${$t('generic.daily')} ${$t('dashboard.sales')}`"
            :value="`${
              dashboardData.DailySales.currency
                ? Currencies[dashboardData.DailySales.currency]
                : ''
            }${dashboardData.DailySales.total}`"
          />
        </template>
        <template v-slot:bottom>
          <StatBlock
            color="primary-light"
            icon="/dashboard/daily-orders.svg"
            :label="`${$t('generic.daily')} ${$t('dashboard.orders')}`"
            :value="`${dashboardData.DailyOrders.total}`"
          />
        </template>
      </StatContainer>

      <StatContainer>
        <template v-slot:top>
          <StatBlock
            color="primary-to-white"
            :label="`${$t('dashboard.checkingOut')}`"
            :value="`${dashboardData.CheckingOut.total}`"
          />
        </template>
        <template v-slot:bottom>
          <StatBlock
            color="secondary-to-white"
            :label="`${$t('dashboard.purchased')}`"
            :value="`${dashboardData.Purchased.total}`"
          />
        </template>
      </StatContainer>
    </div>

    <div class="parent-graphs-div">
      <div class="saleschart-parent">
        <SalesChart />
      </div>
      <div class="overviewchart-parent">
        <OverviewChart />
      </div>
    </div>

    <div class="child-graphs-div">
      <div class="sessionchart-parent">
        <SessionsChart />
      </div>
      <div class="mrrchart-parent">
        <MrrChart />
      </div>
    </div>
  </div>
</template>

<style scoped>
.parent-graphs-div {
  display: flex;
  gap: 20px;
  max-width: 1280px;
  margin-right: 30px;
}
.child-graphs-div {
  display: flex;
  gap: 20px;
  max-width: 1280px;
  margin-right: 30px;
  margin-bottom: 40px;
}
.saleschart-parent {
  width: 75%;
}
.overviewchart-parent {
  width: 35%;
}
.sessionchart-parent {
  width: 55%;
}
.mrrchart-parent {
  width: 45%;
}
@media (max-width: 1300px) {
  .saleschart-parent,
  .overviewchart-parent,
  .sessionchart-parent,
  .mrrchart-parent {
    width: auto;
  }
  .parent-graphs-div {
    flex-direction: column;
  }
  .child-graphs-div {
    flex-direction: column;
    margin-bottom: 40px;
  }
}
</style>
<script lang="ts">
import { defineAsyncComponent } from 'vue';
const SalesChart = defineAsyncComponent(
  () => import('../../../components/Dashboard/SalesChart.vue')
);
const OverviewChart = defineAsyncComponent(
  () => import('../../../components/Dashboard/OverviewChart.vue')
);

const MrrChart = defineAsyncComponent(
  () => import('../../../components/Dashboard/MrrChart.vue')
);

const SessionsChart = defineAsyncComponent(
  () => import('../../../components/Dashboard/SessionsChart.vue')
);

export default {
  name: 'DashboardPage',
  components: {
    StatBlock,
    SalesChart,
    OverviewChart,
    SessionsChart,
    MrrChart,
  },
};
</script>

<script lang="ts" setup>
import StatBlock from 'src/components/Dashboard/StatBlock.vue';
import StatContainer from 'src/components/Dashboard/StatContainer.vue';
import { Currencies } from 'src/utils/Models';
import { useDashboardStore } from 'stores/dashboard-store';
import { computed } from 'vue';
const store = useDashboardStore();
const dashboardData = computed(() => store.getDashboard);
store.pullData('dashboard');

</script>
