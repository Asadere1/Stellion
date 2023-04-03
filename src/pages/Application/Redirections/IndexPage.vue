<template>
  <div class="column q-pa-lg overflow-auto full-height no-wrap">
    <div class="row justify-between items-center q-pa-none">
      <h5 class="q-my-none">
        <div class="row">
          <span class="text-weight-bold row items-center text-capitalize">
            {{ $t('redirections.plural') }}
          </span>
          <small class="text-dark-6 q-ml-md">{{ $t('generic.general') }}</small>
        </div>
      </h5>

      <div class="row gap-md">
        <ButtonComponent
          level="accent"
          :label="$t('generic.readDocu')"
          :stretch="false"
          size="md"
          padding="sm lg"
          @click="$router.push('/documentstion/redirections')"
        />
      </div>
    </div>

    <q-separator class="q-my-lg" />

    <div class="row justify-start">
      <ButtonComponent
        :level="allOrSpecific === 'all' ? 'primary' : 'outline-primary'"
        :label="$t('generic.all')"
        :stretch="false"
        size="md"
        padding="sm lg"
        @click="allOrSpecific = 'all'"
      />
      <ButtonComponent
        :level="allOrSpecific === 'specific' ? 'primary' : 'outline-primary'"
        :label="$t('generic.specific')"
        :stretch="false"
        size="md"
        padding="sm lg"
        class="q-ml-lg"
        @click="allOrSpecific = 'specific'"
      />
    </div>

    <div class="q-pa-lg q-mt-md rounded-1 border-dark-3 q-mb-lg">
      <InputField
        type="search"
        v-model="productSearch"
        :label="$t('redirections.addProduct')"
        class="col-12"
        filled
      />
      <q-list
        bordered
        separator
        class="overflow-auto"
        style="max-height: 400px"
      >
        <q-item v-for="prod in shopifyProducts" :key="prod.id">
          <ProductRow :imgSrc="prod.image.src" :name="prod.title" :count="0" />
        </q-item>
      </q-list>
    </div>

    <div class="q-pa-none row justify-end gap-sm">
      <ButtonComponent
        level="cta"
        :label="$t('generic.save')"
        :stretch="false"
        size="md"
        padding="sm xl"
        @click="save"
      />
      <ButtonComponent
        level="tertiary"
        :label="$t('generic.cancel')"
        :stretch="false"
        size="md"
        padding="sm xl"
        @click="$router.back()"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'RedirectionsPage',
};
</script>

<script lang="ts" setup>
import ButtonComponent from 'src/components/Global/ButtonComponent.vue';
import InputField from 'src/components/Global/InputField.vue';
import { computed, ref } from 'vue';
import { useShopManagementStore } from 'stores/shop-management-store';
import ProductRow from 'src/components/Customizer/ProductRow.vue';

const store = useShopManagementStore();

const allOrSpecific = ref<'all' | 'specific'>('all');

const productSearch = ref('');

function save() {
  alert('save');
}

const shopifyProducts = computed(() => {
  if (!store.shopifyProducts) {
    return [];
  }
  if (productSearch.value.length < 3) {
    return [...store.shopifyProducts].slice(0, 5);
  }
  return store.shopifyProducts.filter((product) => {
    return product.title
      .toLowerCase()
      .includes(productSearch.value.toLowerCase());
  });
});

store.pullShopifyProducts();
</script>
