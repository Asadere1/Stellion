<template>
  <q-card class="area-chart">
    <div class="row justify-between items-center">
      <div>
        <span class="text-weight-medium">Sales overview</span>
      </div>

      <div class="q-gutter-sm">
        <q-checkbox
          class="checkbox"
          v-model="totalEarnings"
          label="Total Earnings"
          size="xs"
          val="xs"
        />
        <q-checkbox
          class="checkbox"
          v-model="subscriptionSales"
          val="xs"
          size="xs"
          label="Subscription Sales"
          color="secondary"
        />
        <q-checkbox
          class="checkbox"
          v-model="directSales"
          val="xs"
          label="Direct Sales"
          size="xs"
        />
      </div>

      <div>
        <datepicker
          v-model="selectedDate"
          :format="'yyyy-MM-dd'"
          :language="'en'"
          :calendar-button-icon="'fa fa-calendar-alt'"
          :clear-button-icon="'fas fa-times'"
        >
          <!-- <template #input-content>
            {{ formattedDate }}
          </template> -->
        </datepicker>
      </div>
    </div>

    <div>
      <span class="text-weight-bold text-h6">$50,000</span>
      <span> (Total sales)</span>
    </div>

    <!-- Chart -->

    <div id="apexchart-container">
      <apexchart
        height="300"
        type="area"
        :options="options"
        :series="series"
      ></apexchart>
    </div>
  </q-card>
</template>

<style lang="scss">
#apexchart-container .apexcharts-toolbar {
  display: none !important;
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
.checkbox {
  font-size: 12px;
}
.area-chart {
  max-width: 100%;
  padding: 20px 20px;
  border: 1px solid #d6d8ee;
  box-shadow: none;
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
  name: 'SalesChart',
  components: {
    Datepicker,
  },
  setup() {
    const selectedDate = ref(new Date());
    return {
      totalEarnings: ref(true),
      subscriptionSales: ref(false),
      directSales: ref(false),
      model: ref('Monthly'),
      optionsList: ['Weekly', 'Monthly', 'Yearly'],
      selectedDate,
    };
  },

  data() {
    return {
      options: {
        chart: {
          height: 300,
          type: 'area',
        },
        stroke: {
          curve: 'straight',
          width: 1.5,
        },
        colors: [
          getCssVar('primary'),
          getCssVar('secondary'),
          getCssVar('negative'),
        ],
        xaxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'April',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
        },
        yaxis: {
          tickAmount: 7,
          labels: {
            formatter: function (val: number) {
              if (val === 0) {
                return val;
              }
              return val / 1000 + 'k';
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
      },
      series: [
        {
          name: 'Total Earnings',
          data: [
            '15000',
            '2000',
            '15000',
            '2000',
            '4000',
            '42000',
            '41000',
            '41000',
            '41000',
            '41000',
            '51000',
            '41000',
          ],
        },
      ],
    };
  },
  watch: {
    model(newVal) {
      switch (newVal.toLowerCase()) {
        case 'monthly':
          (this.totalEarnings = true),
            (this.subscriptionSales = false),
            (this.directSales = false),
            (this.series = [
              {
                name: 'Total Earnings',
                data: [
                  '15000',
                  '2000',
                  '15000',
                  '2000',
                  '4000',
                  '42000',
                  '41000',
                  '41000',
                  '41000',
                  '41000',
                  '51000',
                  '41000',
                ],
              },
            ]);
          this.options = {
            ...this.options,
            xaxis: {
              categories: [
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
            },
          };
          break;
        case 'weekly':
          (this.totalEarnings = true),
            (this.subscriptionSales = true),
            (this.directSales = false),
            (this.series = [
              {
                name: 'Total Earnings',
                data: [
                  '15000',
                  '2000',
                  '15000',
                  '2000',
                  '24000',
                  '42000',
                  '41000',
                ],
              },
              {
                name: 'Subscription Sales',
                data: [
                  '44000',
                  '53000',
                  '63000',
                  '58000',
                  '63000',
                  '65000',
                  '20000',
                ],
              },
            ]);
          this.options = {
            ...this.options,
            xaxis: {
              categories: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            },
          };
          break;

        case 'yearly':
          (this.totalEarnings = true),
            (this.subscriptionSales = false),
            (this.directSales = false),
            (this.series = [
              {
                name: 'Total Earnings',
                data: ['5000', '13000', '18000', '20000', '40000'],
              },
            ]);
          this.options = {
            ...this.options,
            xaxis: {
              categories: ['2018', '2019', '2020', '2021', '2022'],
            },
          };
          break;
      }
    },
    subscriptionSales(val) {
      if (val) {
        this.series = [
          {
            name: 'Total Earnings',
            data: ['15000', '2000', '15000', '2000', '24000', '42000', '41000'],
          },
          {
            name: 'Subscription Sales',
            data: [
              '24000',
              '33000',
              '43000',
              '58000',
              '33000',
              '25000',
              '42000',
            ],
          },
        ];
      } else {
        this.series = [
          {
            name: 'Total Earnings',
            data: ['15000', '2000', '15000', '2000', '24000', '42000', '41000'],
          },
        ];
      }
    },
    directSales(val) {
      if (val) {
        this.series = [
          {
            name: 'Total Earnings',
            data: ['15000', '2000', '15000', '2000', '24000', '42000', '41000'],
          },
          {
            name: 'Subscription Sales',
            data: [
              '24000',
              '33000',
              '43000',
              '58000',
              '33000',
              '25000',
              '42000',
            ],
          },
          {
            name: 'Direct Sales',
            data: [
              '14000',
              '23000',
              '43000',
              '48000',
              '33000',
              '25000',
              '42000',
            ],
          },
        ];
      } else {
        this.series = [
          {
            name: 'Total Earnings',
            data: ['15000', '2000', '15000', '2000', '24000', '42000', '41000'],
          },
          {
            name: 'Subscription Sales',
            data: [
              '24000',
              '33000',
              '43000',
              '58000',
              '33000',
              '25000',
              '42000',
            ],
          },
        ];
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
