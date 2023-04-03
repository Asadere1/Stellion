<template>
  <div>
    <q-form greedy ref="form" class="add-upsell-form">
      <div class="row">
        <div class="col">
          <InputField
            v-model="upsell.name"
            :label="$t('generic.name')"
            placeholder="Hiconic Rewards"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <InputField
            v-model="upsell.linked_product"
            :label="$t('generic.linkedProduct')"
            placeholder="Hiconic Rewards"
            type="select"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <InputField
            v-model="upsell.template_name"
            :label="$t('generic.templateName')"
            :select-options="templateNames"
            type="select"
            style="margin-right: 13px"
            class="bottom-radial"
          />
        </div>
        <div class="col">
          <InputField
            v-model="upsell.name"
            :label="$t('generic.type')"
            placeholder="Pre purchase"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import InputField from 'components/Global/InputField.vue';

const upsell = ref({
  name: '',
  linked_product: '',
  template_name: '',
  type: '',
});

const templateNames = ref([
  { label: 'Cross sell', value: '1' },
  { label: 'One clic Upsell', value: '2' },
  { label: 'Cross sell Subscription', value: '3' },
]);
</script>

<style lang="scss">
.add-upsell-form {
  .row {
    .q-field {
      margin-bottom: 15px;
    }
  }

  .form-btn {
    display: flex;
    justify-content: flex-end;
    button {
      width: 136px !important;
    }
  }
}
</style>
