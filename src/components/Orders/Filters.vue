<template>
  <q-form>
    <div class="row q-gutter-md">
      <InputField
        v-model="filtersDupe.startDate"
        type="date"
        :label="$t('generic.startDate')"
        class="q-mb-lg col"
        filled
      />
      <InputField
        v-model="filtersDupe.endDate"
        type="date"
        :label="$t('generic.endDate')"
        class="q-mb-sm col"
        filled
      />
    </div>
    <InputField
      v-model="filtersDupe.orderId"
      :label="$t('generic.id')"
      class="q-mb-sm col"
      filled
    />
    <InputField
      v-model="filtersDupe.customerName"
      :label="$t('generic.customerName')"
      class="q-mb-sm col"
      filled
    />
    <InputField
      v-model="filtersDupe.customerEmail"
      :label="$t('generic.customerEmail')"
      class="q-mb-sm col"
      filled
    />
    <InputField
      :select-options="optionsFromType(OrderFullfilmentStatus)"
      type="select"
      v-model="filtersDupe.fulfillmentStatus"
      :label="`${$t('orders.fulfillment')} ${$t('generic.status')}`"
      class="q-mb-sm col"
      filled
    />
    <InputField
      :select-options="optionsFromType(OrderPaymentStatus)"
      type="select"
      v-model="filtersDupe.paymentStatus"
      :label="`${$t('generic.paid')} ${$t('generic.status')}`"
      class="q-mb-sm col"
      filled
    />
  </q-form>
</template>

<script lang="ts">
export default {
  name: 'OrdersFilterComponent',
};
</script>

<script lang="ts" setup>
import {
  OrderFullfilmentStatus,
  OrderPaymentStatus,
  OrdersFilter,
} from 'src/utils/EntityDefinitions';
import { optionsFromType } from 'src/utils/helpers';
import { PropType, reactive } from 'vue';
import InputField from 'components/Global/InputField.vue';

const props = defineProps({
  filter: {
    type: Object as PropType<OrdersFilter>,
    required: true,
  },
});

const filtersDupe = reactive<OrdersFilter>({ ...props.filter });

defineExpose({
  filtersDupe,
});
</script>
