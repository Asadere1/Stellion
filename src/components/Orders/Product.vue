<template>
  <div class="row border-dark-3" style="height: 120px">
    <img :src="product.img" class="row" style="width: 120px" />

    <p class="col q-px-md column q-mb-none justify-center">
      {{ product.name }}
    </p>

    <h5
      class="row q-my-none column justify-center"
      style="width: 120px"
      v-currency="{ amount: product.price }"
    />
  </div>
</template>
<style>
.border-dark-3{
  border: 1px solid gainsboro ;
}
</style>
<script lang="ts">
export default {
  name: 'ProductComponent',
};
</script>

<script lang="ts" setup>
import { Product } from 'src/utils/EntityDefinitions';
import { PropType } from 'vue';

defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
});
</script>
