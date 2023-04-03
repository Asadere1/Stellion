<template>
  <q-form class="column" ref="form" greedy>
    <q-toggle
      v-if="contained"
      v-model="entityDupe.active"
      color="positive"
      class="q-mb-md"
      :label="$t('generic.active')"
    />

    <div :class="contained ? '' : 'q-pa-lg q-mt-md rounded-1 border-dark-3'">
      <div class="row q-col-gutter-md">
        <InputField
          v-model="entityDupe.name"
          :label="$t('generic.name')"
          :class="contained ? 'col-6 q-mb-lg' : 'col-4'"
          filled
          :rules="[(val) => !!val || 'Field is required']"
        />
        <InputField
          type="select"
          v-if="UpsellType"
          v-model="entityDupe.type"
          :select-options="optionsFromType(UpsellType)"
          :label="$t('generic.type')"
          :class="contained ? 'col-6 q-mb-lg' : 'col-4'"
          filled
        />
        <InputField
          v-model="entityDupe.templateName"
          :label="$t('generic.template')"
          :class="contained ? 'col-12' : 'col-4'"
          filled
          :rules="[(val) => !!val || 'Field is required']"
        />
      </div>
    </div>

    <q-separator class="row q-my-lg" v-if="contained" />

    <h5
      class="q-mt-none text-weight-bold"
      :class="contained ? 'q-mb-md' : 'q-mb-none q-mt-lg'"
    >
      {{ $t('generic.template') }} - London
    </h5>

    <div :class="contained ? '' : 'q-pa-lg q-mt-md rounded-1 border-dark-3'">
      <div class="row q-gutter-md">
        <InputField
          v-model="entityDupe.title"
          :label="$t('generic.name')"
          class="q-mb-lg col"
          filled
          :rules="[(val) => !!val || 'Field is required']"
        />
        <InputField
          v-model="entityDupe.subtitle"
          :label="$t('generic.subtitle')"
          class="q-mb-sm col"
          filled
          :rules="[(val) => !!val || 'Field is required']"
        />
      </div>
      <InputField
        v-model="entityDupe.descriptions"
        type="textarea"
        :label="$t('generic.descriptions')"
        class="q-mb-md"
        filled
        :rules="[(val) => !!val || 'Field is required']"
      />
      <div class="row q-gutter-md" v-if="contained">
        <InputField
          type="select"
          v-if="PreSelectType"
          :select-options="optionsFromType(PreSelectType)"
          v-model="entityDupe.preSelect"
          :label="$t('generic.preselect')"
          class="col"
          :class="contained ? 'q-mb-md' : 'q-mb-none'"
          filled
        />
        <InputField
          v-model="entityDupe.subtitle"
          :label="$t('generic.subtitle')"
          class="col"
          :class="contained ? 'q-mb-md' : 'q-mb-none'"
          filled
          :rules="[(val) => !!val || 'Field is required']"
        />
      </div>
    </div>
  </q-form>
</template>

<script lang="ts">
export default {
  name: 'UpsellEntityFormComponent',
};
</script>

<script lang="ts" setup>
import { QForm } from 'quasar';
import InputField from 'src/components/Global/InputField.vue';
import { Upsell } from 'src/utils/EntityDefinitions';
import { computed, PropType, reactive, ref, watch } from 'vue';
import { useDataStore } from 'stores/data-store';
import { optionsFromType } from 'src/utils/helpers';
const store = useDataStore();

const props = defineProps({
  selectedRow: {
    type: Object as PropType<Upsell>,
    required: true,
  },
  contained: {
    type: Boolean,
  },
});

const emit = defineEmits(['update']);

const entityDupe = reactive<Upsell>({ ...props.selectedRow });

const UpsellType = computed(() => store.upsellTypes);
const PreSelectType = computed(() => store.preselectTypes);

watch(
  entityDupe,
  (newVal) => {
    emit('update', newVal);
  },
  {
    deep: true,
  }
);

const form = ref<QForm>();

defineExpose({
  form,
});
</script>
