<template>
    <q-card class="sessions-chart">
      <div class="row justify-between items-center">
        <div>
          <span class="text-weight-medium">Sessions overview</span>
        </div>
  
        <div class="q-gutter-sm">
          <q-checkbox
            class="checkbox"
            v-model="totalEarnings"
            label="Order Rate"
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
        <span class="text-h6 text-weight-semibold">70%</span>
        <span>(Order Rate)</span>
      </div>
      <apexchart
        height="475"
        type="bar"
        :options="options"
        :series="series"
      ></apexchart>
    </q-card>
  </template>
  
  <style>
  .sessions-chart {
    width: 100%;
    padding: 20px 20px 5px 20px;
    border: 1px solid #d6d8ee;
    box-shadow: none;
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
  
  @media (max-width: 1300px) {
    .sessions-chart {
      width: 100%;
      padding: 20px 20px 5px 20px;
      border: 1px solid #d6d8ee;
      box-shadow: none;
    }
  }
  </style>
  
  <script>
  import { defineComponent } from 'vue';
  import { getCssVar } from 'quasar';
  import { ref } from 'vue';
  
  export default defineComponent({
    name: 'ApexColumn',
    setup() {
      return {
        totalEarnings: ref(true),
        subscriptionSales: ref(true),
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
            getCssVar('primary'),
            getCssVar('secondary'),
            getCssVar('negative'),
          ],
          xaxis: {
            categories: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '25%',
              borderRadius: 4,
              barWidth: '80%',
  
              borderRadius: 3,
            },
            stroke: {
              colors: ['transparent'],
              width: 10,
            },
          },
          dataLabels: {
            enabled: false,
          },
          tooltip: {
            x: {
              formatter: function(val) {
                return val.replace(/^Sat|Sun|Mon|Tue|Wed|Thu|Fri\s-/, '');
              }
            },
            y: {
              formatter: function (val) {
                return (val * 100).toFixed(0) + '%';
              }
            },
          }
        },
  
        series: [
          {
            name: 'Order Rate',
            data: [0.3, 0.5, 0.7, 0.6, 0.9, 0.7, 0.4],
          },
          {
            name: 'Subscription Rate',
            data: [0.6, 0.4, 0.5, 0.8, 0.8, 0.5, 0.3],
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
                name: 'Order Rate',
                data: [
                  0.5, 0.72, 0.79, 0.2, 0.41, 0.68, 0.82, 0.12, 0.56, 0.63, 0.43,
                  0.97,
                ],
              },
              {
                name: 'Subscription Rate',
                data: [
                  0.68, 0.82, 0.12, 0.56, 0.63, 0.43, 0.97, 0.5, 0.72, 0.79, 0.2,
                  0.41,
                ],
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
                name: 'Order Rate',
                data: [0.9, 0.4, 1.7, 0.5, 0.4],
              },
              {
                name: 'Subscription Rate',
                data: [0.4, 0.3, 0.8, 0.5, 0.2],
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
                name: 'Order Rate',
                data: [0.3, 0.5, 0.7, 0.6, 0.9, 0.7, 0.4],
              },
              {
                name: 'Subscription Rate',
                data: [0.6, 0.4, 0.5, 0.8, 0.8, 0.5, 0.3],
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
      subscriptionSales(val) {
        if (val) {
          this.series = [
            {
              name: 'Order Rate',
              data: [0.3, 0.5, 0.7, 0.6, 0.9, 0.7, 0.4],
            },
            {
              name: 'Subscription Rate',
              data: [0.6, 0.4, 0.5, 0.8, 0.8, 0.5, 0.3],
            },
          ];
        } else {
          this.series = [
            {
              name: 'Order Rate',
              data: [0.3, 0.5, 0.7, 0.6, 0.9, 0.7, 0.4],
            },
          ];
        }
      },
      totalEarnings(val) {
        if (val) {
          this.series = [
            {
              name: 'Order Rate',
              data: [0.3, 0.5, 0.7, 0.6, 0.9, 0.7, 0.4],
            },
            {
              name: 'Subscription Rate',
              data: [0.6, 0.4, 0.5, 0.8, 0.8, 0.5, 0.3],
            },
          ];
        } else {
          this.series = [
            {
              name: 'Subscription Rate',
              data: [0.6, 0.4, 0.5, 0.8, 0.8, 0.5, 0.3],
            },
          ];
        }
      },
    },
  });
  </script>
  
