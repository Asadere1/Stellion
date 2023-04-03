<template>
  <div class="column justify-center items-center">
    <h5 class="q-mb-md q-mt-lg">{{ $t('customizer.selectTemplate') }}</h5>

    <div class="q-pa-lg border-dark-4 rounded-half">
      <img src="/customizer/template-1.svg" />
    </div>
    <h6 class="q-mt-sm q-mb-lg">
      {{ $t('navigation.customizer.Template') }} 1
    </h6>

    <div class="q-pa-lg border-dark-4 rounded-half">
      <img src="/customizer/template-2.png" />
    </div>
    <h6 class="q-mt-sm q-mb-lg">
      {{ $t('navigation.customizer.Template') }} 2
    </h6>

    <p class="q-pa-md text-center">{{ $t('customizer.latestTemplates') }}</p>
  </div>
</template>
