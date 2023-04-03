<template>
    <q-card class="mrr-chart">
      <div class="row justify-between items-center">
        <div>
          <span class="text-weight-medium">Mrr</span>
        </div>
        <div>
          <select v-model="model" class="my-select">
            <option
              v-for="(option, index) in optionsList"
              :value="option"
              :key="index"
            >
              {{ option }}
            </option>
          </select>
        </div>
      </div>
      <div>
        <span class="text-weight-bold text-h6">215,569</span>
        <span>(Cumulative MRR)</span>
      </div>
      <apexchart
        height="475"
        type="bar"
        :options="options"
        :series="series"
      ></apexchart>
    </q-card>
  </template>
  
  <style scoped lang="scss">
  .my-select .q-field__control,
  .my-select .q-field__native {
    height: 30px; /* adjust the height to your preference */
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
  .mrr-chart {
    width: 100%;
    padding: 20px 20px 5px 20px;
    border: 1px solid #d6d8ee;
    box-shadow: none;
  }
  @media (max-width: 1300px) {
    .mrr-chart {
      width: 100%;
      padding: 20px 20px 5px 20px;
      border: 1px solid #d6d8ee;
      box-shadow: none;
    }
  }
  @media (max-width: 768px) {
    #apex-column {
      max-width: 60%;
    }
  }
  </style>
  <script>
  import { defineComponent } from 'vue';
  import { getCssVar } from 'quasar';
  import { ref } from 'vue';
  
  export default defineComponent({
    name: 'MrrChart',
    setup() {
      return {
        totalEarnings: ref(true),
        subscriptionSales: ref(false),
        directSales: ref(false),
        model: ref('Weekly'),
        optionsList: ['Weekly', 'Monthly', 'Yearly'],
      };
    },
    data() {
      return {
        options: {
          chart: {
            id: 'apex-column',
            toolbar: {
              show: false,
            },
          },
          colors: [
            getCssVar('accent'),
            getCssVar('secondary'),
            getCssVar('negative'),
          ],
          xaxis: {
            categories: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return val.toFixed(0);
              },
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded-md',
            },
          },
          stroke: {
            width: 1,
          },
          dataLabels: {
            enabled: false,
          },
        },
        series: [
          {
            data: [115, 220, 145, 277, 110, 154, 52],
          },
        ],
      };
    },
    watch: {
      model(newVal) {
        switch (newVal.toLowerCase()) {
          case 'monthly':
            this.series = [
              {
                data: [50, 72, 79, 20, 41, 68, 82, 12, 56, 63, 43, 97],
              },
            ];
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
          case 'yearly':
            this.series = [
              {
                data: [126, 145, 328, 192, 234],
              },
            ];
            this.options = {
              ...this.options,
              xaxis: {
                categories: ['2018', '2019', '2020', '2021', '2022'],
              },
            };
            break;
          default:
            this.series = [
              {
                data: [115, 220, 145, 277, 110, 154, 52],
              },
            ];
            this.options = {
              ...this.options,
              xaxis: {
                categories: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
              },
            };
            break;
        }
      },
    },
  });
  </script>
  
