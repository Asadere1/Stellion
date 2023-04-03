<template>
  <q-card class="overview-chart">
    <div class="row justify-between items-center">
      <div>
        <span class="text-weight-medium">Over overview</span>
      </div>

      <div class="">
        <datepicker
          v-model="selectedDate"
          :format="'yyyy-MM-dd'"
          :language="'en'"
          :calendar-button-icon="'fa fa-calendar-alt'"
          :clear-button-icon="'fas fa-times'"
          class="custom-datepicker"
        >
        </datepicker>
      </div>
    </div>

    <div class="tags-parent">
      <div>
        <q-img
          src="~assets/decline-overview.svg"
          width="15px"
          height="4px"
          no-spinner
        />
        <span class="q-pl-sm text-sm">Declined</span>
      </div>

      <div>
        <q-img
          src="~assets/accept-overview.svg"
          width="15px"
          height="4px"
          no-spinner
        />
        <span class="q-pl-sm text-sm">Accepted</span>
      </div>
    </div>

    <div class="charts-container q-my-lg">
      <apexchart
        type="donut"
        height="100"
        width="100"
        :options="options1"
        :series="series1"
      />
      <apexchart
        type="donut"
        height="100"
        width="100"
        :options="options2"
        :series="series2"
      />
    </div>

    <hr />

    <div>
      <span class="text-sm">Do not honor</span>
      <q-linear-progress
        rounded
        size="10px"
        :value="progress"
        color="primary"
        class="q-mt-xs"
      >
        <q-tooltip
          :offset="[5, 5]"
          anchor="top middle"
          self="bottom middle"
          class="bg-white text-dark text-h6"
        >
          {{ Math.round(progress * 100) }}%
        </q-tooltip>
      </q-linear-progress>
    </div>

    <div>
      <span class="text-sm">Fraudulent</span>
      <q-linear-progress
        rounded
        size="10px"
        :value="progress2"
        color="secondary"
        class="q-mt-xs"
      >
        <q-tooltip
          :offset="[10, 10]"
          anchor="top middle"
          self="bottom middle"
          class="bg-white text-dark text-h6"
        >
          {{ Math.round(progress2 * 100) }}%
        </q-tooltip>
      </q-linear-progress>
    </div>

    <div>
      <span class="text-sm">Insufficient funds</span>
      <q-linear-progress
        rounded
        size="10px"
        :value="progress3"
        color="accent"
        class="q-mt-xs"
      >
        <q-tooltip
          :offset="[10, 10]"
          anchor="top middle"
          self="bottom middle"
          class="bg-white text-dark text-h6"
        >
          {{ Math.round(progress3 * 100) }}%
        </q-tooltip>
      </q-linear-progress>
    </div>

    <hr class="q-my-md" />

    <span class="q-mt-md">Total transaction: </span>
    <span class="text-weight-bold">17 400</span>
  </q-card>
</template>

<style scoped lang="scss">
#apexchart-container .apexcharts-toolbar {
  display: none !important;
}
.custom-datepicker {
  max-width: 00px; /* adjust the width as needed */
}
.my-select {
  width: 100px;
  border-radius: 4px;
  padding: 2px 6px;
  text-align: center;
  border: 1.5px solid #d6d8ee;
  font-size: 12px;
  height: 30px;
  color: #4b4e68;
}
.charts-container {
  display: flex;
  gap: 90px;
  justify-content: center;
}
.tags-parent {
  display: flex;
  gap: 20px;
}
.text-sm {
  font-size: 12px;
}
.overview-chart {
  width: auto;
  padding: 17px 15px;
  border: 1px solid #d6d8ee;
  box-shadow: none;
}
.overview-parent {
  display: flex;
  justify-content: space-between;
}
.apexcharts-tooltip {
  background-color: white;
  color: black;
  border-radius: 4px;
  padding: 6px;
}
.apexcharts-tooltip-title {
  background-color: #fff !important;
}

.apexcharts-tooltip-marker {
  display: none;
}
.apexcharts-legend {
  display: none !important;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { getCssVar } from 'quasar';
import { ref } from 'vue';
import Datepicker from 'vue3-datepicker';
export default defineComponent({
  name: 'OverviewChart',
  components: {
    Datepicker,
  },
  setup() {
    const selectedDate = ref(new Date());
    return {
      progress: 0.4,
      progress2: 0.6,
      progress3: 0.75,
      totalEarnings: ref(true),
      subscriptionSales: ref(false),
      directSales: ref(false),
      model: ref('Jan'),
      selectedDate,
      optionsList: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    };
  },
  data() {
    return {
      options1: {
        chart: {
          type: 'donut',
          width: '30%',
          height: '100%',
          sparkline: {
            enabled: true,
          },
        },
        colors: [getCssVar('primary'), getCssVar('secondary')],
        series: [35, 65],
        labels: ['Declined', 'Accepted'],
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            donut: {
              size: '85%',
            },
          },
        },
      },
      series1: [40, 60],
      options2: {
        chart: {
          type: 'donut',
          width: '100%',
          height: '100%',
          sparkline: {
            enabled: true,
          },
        },
        colors: [getCssVar('primary'), getCssVar('secondary')],
        labels: ['Declined', 'Accepted'],
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            donut: {
              size: '85%',
            },
          },
        },
      },
      series2: [37, 63],
    };
  },
  watch: {
    model(newVal) {
      switch (newVal) {
        case 'Jan':
          this.series2 = [28, 72];
          this.series1 = [82, 18];
          (this.progress = 0.4),
            (this.progress2 = 0.6),
            (this.progress3 = 0.75);
          break;
        case 'Feb':
          this.series2 = [42, 58];
          this.series1 = [68, 32];
          (this.progress = 0.2),
            (this.progress2 = 0.4),
            (this.progress3 = 0.95);
          break;
        case 'Mar':
          this.series2 = [32, 68];
          this.series1 = [98, 2];
          (this.progress = 0.7),
            (this.progress2 = 0.3),
            (this.progress3 = 0.55);
          break;
        case 'Apr':
          this.series2 = [12, 88];
          this.series1 = [48, 52];
          (this.progress = 0.82),
            (this.progress2 = 0.34),
            (this.progress3 = 0.25);
          break;
        case 'May':
          this.series2 = [42, 58];
          this.series1 = [68, 32];
          (this.progress = 0.77),
            (this.progress2 = 0.64),
            (this.progress3 = 0.55);
          break;
        case 'Jun':
          this.series2 = [32, 68];
          this.series1 = [56, 44];
          (this.progress = 0.5),
            (this.progress2 = 0.34),
            (this.progress3 = 0.75);
          break;
        case 'Jul':
          this.series2 = [42, 58];
          this.series1 = [68, 32];
          (this.progress = 0.42),
            (this.progress2 = 0.64),
            (this.progress3 = 0.35);
          break;
        case 'Aug':
          this.series2 = [42, 58];
          this.series1 = [68, 32];
          (this.progress = 0.72),
            (this.progress2 = 0.54),
            (this.progress3 = 0.15);
          break;
        case 'Sep':
          this.series2 = [42, 58];
          this.series1 = [68, 32];
          (this.progress = 0.42),
            (this.progress2 = 0.64),
            (this.progress3 = 0.75);
          break;
        case 'Oct':
          this.series2 = [42, 58];
          this.series1 = [68, 32];
          (this.progress = 0.42),
            (this.progress2 = 0.74),
            (this.progress3 = 0.25);
          break;
        default:
          this.series2 = [50, 50];
          this.series1 = [28, 72];
          (this.progress = 0.12),
            (this.progress2 = 0.44),
            (this.progress3 = 0.35);
          break;
      }
    },
    selectedDate(value) {
      if (typeof value === 'string') {
        this.selectedDate = new Date(value);
      }
    },
  },
});
</script>
