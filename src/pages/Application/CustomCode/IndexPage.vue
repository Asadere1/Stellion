<template>
  <div class="column q-pa-lg overflow-auto full-height no-wrap">
    <div class="row justify-between items-center q-pa-none">
      <h5 class="q-my-none">
        <div class="row">
          <span class="text-weight-bold row items-center text-capitalize">
            {{ $t('customCode.single') }}
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
          @click="$router.push('/documentstion/custom-code')"
        />
      </div>
    </div>

    <q-separator class="q-my-lg" />

    <div class="row justify-start">
      <ButtonComponent
        :level="allOrSpecific === 'all' ? 'primary' : 'outline-primary'"
        :label="$t('customCode.allPages')"
        :stretch="false"
        size="md"
        padding="sm lg"
        @click="allOrSpecific = 'all'"
      />
      <ButtonComponent
        :level="allOrSpecific === 'checkout' ? 'primary' : 'outline-primary'"
        :label="$t('customCode.checkout')"
        :stretch="false"
        size="md"
        padding="sm lg"
        class="q-ml-lg"
        @click="allOrSpecific = 'checkout'"
      />
      <ButtonComponent
        :level="
          allOrSpecific === 'pastPurchases' ? 'primary' : 'outline-primary'
        "
        :label="$t('customCode.pastPurchase')"
        :stretch="false"
        size="md"
        padding="sm lg"
        class="q-ml-lg"
        @click="allOrSpecific = 'pastPurchases'"
      />
    </div>

    <h5 class="text-weight-bold q-mt-lg q-mb-sm">
      {{ $t('customCode.availableVariables') }}
    </h5>
    <div class="q-pa-lg q-mt-md rounded-1 border-dark-3 q-mb-lg">
      <div class="gap-sm row">
        <p
          class="q-px-md q-py-sm text-primary bg-primary-light rounded-half q-mb-none"
          v-for="variable in variables"
          :key="variable"
        >
          {{ variable }}
        </p>
      </div>
    </div>

    <h5 class="text-weight-bold q-mt-lg q-mb-sm">
      {{ $t('customCode.head') }}
    </h5>
    <div class="q-pa-lg q-mt-md rounded-1 border-dark-3 q-mb-lg">
      <pre><code v-html="javascript" class="hljs flex column" /></pre>
    </div>

    <h5 class="text-weight-bold q-mt-lg q-mb-sm">
      {{ $t('customCode.body') }}
    </h5>
    <div class="q-pa-lg q-mt-md rounded-1 border-dark-3 q-mb-lg">
      <pre><code v-html="javascript" class="hljs flex column" /></pre>
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
  name: 'CustomCodePage',
};
</script>

<script lang="ts" setup>
import ButtonComponent from 'src/components/Global/ButtonComponent.vue';
import hljs from 'highlightjs';
import { ref } from 'vue';

const allOrSpecific = ref<'all' | 'checkout' | 'pastPurchases'>('all');
const sampleJS =
  'function $panel(element, canClose, closeHandler) {this.element = element;this.canClose = canClose;this.closeHandler = function () { if (closeHandler) closeHandler() };';
const javascript = hljs.highlight('javascript', sampleJS).value;

const variables = ['{{ _session_id_ }}', '{{ _cart_total_ }}'];

function save() {
  alert('save');
}
</script>

<style>
/*!
  Theme: Default
  Description: Original highlight.js style
  Author: (c) Ivan Sagalaev <maniac@softwaremaniacs.org>
  Maintainer: @highlightjs/core-team
  Website: https://highlightjs.org/
  License: see project LICENSE
  Touched: 2021
*/
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}

code.hljs {
  padding: 3px 5px;
}

.hljs {
  background: #f3f3f3;
  color: #444;
}

.hljs-comment {
  color: #697070;
}

.hljs-punctuation,
.hljs-tag {
  color: #444a;
}

.hljs-tag .hljs-attr,
.hljs-tag .hljs-name {
  color: #444;
}

.hljs-attribute,
.hljs-doctag,
.hljs-keyword,
.hljs-meta .hljs-keyword,
.hljs-name,
.hljs-selector-tag {
  font-weight: 700;
}

.hljs-deletion,
.hljs-number,
.hljs-quote,
.hljs-selector-class,
.hljs-selector-id,
.hljs-string,
.hljs-template-tag,
.hljs-type {
  color: #800;
}

.hljs-section,
.hljs-title {
  color: #800;
  font-weight: 700;
}

.hljs-link,
.hljs-operator,
.hljs-regexp,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-symbol,
.hljs-template-variable,
.hljs-variable {
  color: #ab5656;
}

.hljs-literal {
  color: #695;
}

.hljs-addition,
.hljs-built_in,
.hljs-bullet,
.hljs-code {
  color: #397300;
}

.hljs-meta {
  color: #1f7199;
}

.hljs-meta .hljs-string {
  color: #38a;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: 700;
}
</style>
