<template>
  <div
    class="fullscreen bg-white text-white text-center flex flex-center"
    style="width: 540px; margin: 0 auto"
  >
    <div>
      <img src="~/assets/404.svg" style="width: 540px; height: auto" />
      <h4
        class="text-center text-weight-bold text-dark-1"
        style="
          font-size: 30px;
          margin: 24px;
          line-height: 40px;
          margin-top: 48px;
        "
      >
        {{ $t('generic.notFoundHeader') }}
      </h4>

      <p class="text-center text-dark-3" id="info-verbiage">
        {{ $t('generic.notFoundVerbiage') }}
      </p>

      <q-btn
        unelevated
        label="Go Back Now"
        class="bg-primary text-white"
        id="go-back-btn"
        @click="$router.back()"
      >
        <q-icon :left="true">
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8333 4.16732H2.5L5.24167 1.42566C5.31977 1.34819 5.38177 1.25602 5.42408 1.15447C5.46638 1.05292 5.48816 0.944002 5.48816 0.833993C5.48816 0.723983 5.46638 0.615062 5.42408 0.513512C5.38177 0.411963 5.31977 0.319796 5.24167 0.242327C5.08553 0.0871178 4.87432 0 4.65417 0C4.43401 0 4.2228 0.0871178 4.06667 0.242327L0.491667 3.82566C0.178677 4.13678 0.00186066 4.55934 0 5.00065C0.00405549 5.43907 0.180704 5.85824 0.491667 6.16732L4.06667 9.75065C4.14437 9.8278 4.2365 9.88889 4.33781 9.93044C4.43912 9.97198 4.54762 9.99317 4.65711 9.99278C4.76661 9.99239 4.87496 9.97044 4.97597 9.92818C5.07698 9.88592 5.16868 9.82418 5.24583 9.74648C5.32298 9.66878 5.38408 9.57665 5.42562 9.47534C5.46717 9.37403 5.48835 9.26553 5.48796 9.15604C5.48758 9.04654 5.46563 8.93819 5.42337 8.83718C5.38111 8.73617 5.31937 8.64447 5.24167 8.56732L2.5 5.83399H10.8333C11.0543 5.83399 11.2663 5.74619 11.4226 5.58991C11.5789 5.43363 11.6667 5.22167 11.6667 5.00065C11.6667 4.77964 11.5789 4.56768 11.4226 4.4114C11.2663 4.25512 11.0543 4.16732 10.8333 4.16732Z"
              fill="white"
            />
          </svg>
        </q-icon>
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
#info-verbiage {
  font-size: 18px;
  line-height: 28px;
  font-weight: 400;
}

#go-back-btn {
  margin-top: 30px;
  text-transform: capitalize !important;
  border-radius: 16px;
  height: 56px;
  width: 213px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;

  .q-btn__content {
    flex-direction: row-reverse !important;
  }
}

.q-btn .q-icon {
  font-size: 16px !important;
}
</style>
