<template>
  <div class="fields">
    <div>
      <label class="input-label">Country of Origin</label>
      <q-select
        :modelValue="address.country"
        outlined
        placeholder="Select your country"
        use-input
        fill-input
        map-options
        emit-value
        hide-selected
        lazy-rules
        no-error-icon
        hide-bottom-space
        input-debounce="50"
        :dropdown-icon="`img:${require('assets/icons/arrow_down.svg')}`"
        :options="filteredCountryList"
        option-value="iso"
        option-label="name"
        :rules="[(v) => !!v || 'Country is required']"
        @filter="countryFilterFn"
        @update:model-value="
          (value) => $emit('update:address', { ...address, country: value })
        "
        @popup-show="country_popup_open = true"
        @popup-hide="country_popup_open = false"
      >
        <template v-slot:prepend>
          <!-- <q-icon
            :name="`img:${require('assets/icons/map.svg')}`"
            size="18px"
          /> -->
          <q-img :src="countryList.find(x => x.iso == address.country).flag" no-spinner width="25px" />
        </template>
        <template v-slot:option="{ itemProps, opt }">
          <q-item v-bind="itemProps">
            <q-item-section avatar>
              <q-img v-if="renderCountryFlags" :src="opt.flag" no-spinner width="25px" />
            </q-item-section>
            <q-item-section>{{ opt.name }}</q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
  <div class="fields">
    <div>
      <label class="input-label">
        First Name <span class="required-field">*</span>
      </label>
      <q-input
        :modelValue="address.first_name"
        outlined
        placeholder="Enter your first name"
        lazy-rules
        no-error-icon
        hide-bottom-space
        :rules="[(v) => !!v || 'First name is required']"
        @update:model-value="
          (value) => $emit('update:address', { ...address, first_name: value })
        "
      >
        <template v-slot:prepend>
          <q-icon
            :name="`img:${require('assets/icons/user.svg')}`"
            size="18px"
          />
        </template>
      </q-input>
    </div>
    <div>
      <label class="input-label">Last Name</label>
      <q-input
        :modelValue="address.last_name"
        outlined
        placeholder="Enter your last name"
        lazy-rules
        no-error-icon
        hide-bottom-space
        :rules="[(v) => !!v || 'Last name is required']"
        @update:model-value="
          (value) => $emit('update:address', { ...address, last_name: value })
        "
      >
        <template v-slot:prepend>
          <q-icon
            :name="`img:${require('assets/icons/user.svg')}`"
            size="18px"
          />
        </template>
      </q-input>
    </div>
  </div>

  <div class="address-fields">
    <div class="fields">
      <div>
        <label class="input-label">
          Address <span class="required-field">*</span>
        </label>
        <q-select
          :modelValue="address.address"
          outlined
          popup-content-class="checkout-address-popup"
          :placeholder="address.address ? '' : 'Enter your address'"
          use-input
          fill-input
          hide-selected
          emit-value
          lazy-rules
          no-error-icon
          hide-bottom-space
          hide-dropdown-icon
          input-debounce="50"
          :options="filteredAddressList"
          option-label="description"
          :rules="[(v) => !!v || 'Enter a valid address']"
          :loading="false"
          @filter="addressFilterFn"
          @update:model-value="
            (value) =>
              $emit('update:address', {
                ...address,
                address: value.description || value,
              })
          "
          @popup-hide="handleAddressInput"
        >
          <template v-slot:prepend>
            <q-icon
              :name="`img:${require('assets/icons/map.svg')}`"
              size="18px"
            />
          </template>
          <template v-slot:option="{ itemProps, opt }">
            <q-item v-bind="itemProps">
              <q-item-section>
                <v-clamp :max-lines="1" :text="opt.description" />
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <div class="custom-address-btn-wrapper">
          <div
            class="custom-address-btn"
            @click="custom_address_enabled = !custom_address_enabled"
          >
            {{ custom_address_enabled ? '-' : '+' }} Address details
          </div>
        </div>
      </div>
    </div>

    <q-slide-transition>
      <div v-show="custom_address_enabled" class="custom-address-wrapper">
        <div class="fields">
          <div>
            <label class="input-label">
              Apartment <span class="optional-field">(optional)</span>
            </label>
            <q-input
              :modelValue="address.apartment"
              outlined
              placeholder="Enter your apartment"
              @update:model-value="
                (value) =>
                  $emit('update:address', { ...address, apartment: value })
              "
            >
              <template v-slot:prepend>
                <q-icon
                  :name="`img:${require('assets/icons/building.svg')}`"
                  size="18px"
                />
              </template>
            </q-input>
          </div>
          <div>
            <label class="input-label">
              Suit <span class="optional-field">(optional)</span>
            </label>
            <q-input
              :modelValue="address.suit"
              outlined
              placeholder="Enter your suit"
              @update:model-value="
                (value) => $emit('update:address', { ...address, suit: value })
              "
            >
              <template v-slot:prepend>
                <q-icon
                  :name="`img:${require('assets/icons/building.svg')}`"
                  size="18px"
                />
              </template>
            </q-input>
          </div>
        </div>
      </div>
    </q-slide-transition>
  </div>

  <div class="fields">
    <div>
      <label class="input-label">Post Code</label>
      <q-input
        :modelValue="address.post_code"
        outlined
        placeholder="Enter your post code"
        lazy-rules
        no-error-icon
        hide-bottom-space
        :rules="[(v) => !!v || 'Post code is required']"
        @update:model-value="
          (value) => $emit('update:address', { ...address, post_code: value })
        "
      >
        <template v-slot:prepend>
          <q-icon
            :name="`img:${require('assets/icons/location_ex_1.svg')}`"
            size="18px"
          />
        </template>
      </q-input>
    </div>
    <div>
      <label class="input-label">City</label>
        <q-input
          :modelValue="address.city"
          outlined
          placeholder="Select your city"
          lazy-rules
          no-error-icon
          hide-bottom-space
          :rules="[(v) => !!v || 'City is required']"
          @update:model-value="
            (value) => $emit('update:address', { ...address, city: value })
          "
        >
          <template v-slot:prepend>
            <q-icon
              :name="`img:${require('assets/icons/location_ex_2.svg')}`"
              size="18px"
            />
          </template>
        </q-input>

      <!-- Normally we would get real cities list from an API like Google's -->
      <!-- <q-select
        :modelValue="address.city"
        outlined
        placeholder="Select your city"
        use-input
        fill-input
        hide-selected
        emit-value
        lazy-rules
        no-error-icon
        hide-bottom-space
        input-debounce="50"
        :options="filteredCitiesList"
        :rules="[(v) => !!v || 'City is required']"
        @filter="citiesFilterFn"
        @update:model-value="
          (value) => $emit('update:address', { ...address, city: value })
        "
      >
        <template v-slot:prepend>
          <q-icon
            :name="`img:${require('assets/icons/location_ex_2.svg')}`"
            size="18px"
          />
        </template>
      </q-select> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useConstantsStore } from 'stores/constants-store';

import { createMetaMixin } from 'quasar';

import VClamp from 'vue3-text-clamp';

const metaData = {
  script: [
    {
      id: 'google-api',
      src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBujiJ0n6tzvNag5L0aYi8lz2tzHByfm9s&libraries=places&callback=Function.prototype',
      async: true,
    },
  ],
};

export default {
  components: {
    VClamp
  },
  mixins: [createMetaMixin(metaData)],
  props: {
    address: {
      type: Object,
      default: () => {
        return {
          first_name: '',
          last_name: '',
          country: '',
          address: '',
          apartment: '',
          suit: '',
          post_code: '',
          city: '',
        };
      },
    },
  },
  emits: ['update:address'],
  data() {
    return {
      custom_address_enabled: false,
      country_popup_open: false,
      renderCountryFlags: false,
      filteredAddressList: [],
      filteredCountryList: [],
      filteredCitiesList: [],
      autocompletedPlacesDetails: {},
    };
  },
  computed: {
    ...mapState(useConstantsStore, ['countryList']),
  },
  watch: {
    /* A little hack to improve percieved performance */
    /* Delays <q-img/> render, making dropdown open much faster */
    /* nextTick() is not enough here */
    country_popup_open(val) {
      if (val) {
        setTimeout(() => {
          this.renderCountryFlags = true
        }, 50)
      } else {
        this.renderCountryFlags = false
      }
    },
  },
  methods: {
    addressFilterFn(val, update) {
      this.$emit('update:address', { ...this.address, address: val });

      if (!val)
        return update(() => {
          this.filteredAddressList = [];
        });

      const autocomplete = new google.maps.places.AutocompleteService();

      autocomplete.getPlacePredictions(
        {
          input: val,
          componentRestrictions: { country: this.address.country },
        },
        async (predictions, status) => {
          if (status != google.maps.places.PlacesServiceStatus.OK) {
            console.error(status);
            return;
          }

          this.autocompletedPlacesDetails = predictions;

          update(() => {
            this.filteredAddressList = predictions;
          });
        }
      );
    },
    async handleAddressInput() {
      let place = this.autocompletedPlacesDetails.find(
        (place) => place.description === this.address.address
      );

      if (!place) return;

      const place_id = place.place_id;
      const placeService = new google.maps.places.PlacesService(
        document.createElement('div')
      );

      const getPredictionDetails = (placeId) => {
        let promise = new Promise((resolve, reject) => {
          placeService.getDetails(
            {
              placeId: placeId,
              fields: ['address_components'],
            },
            function (result, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                resolve(result);
              } else {
                reject(status);
              }
            }
          );
        });

        return promise;
      };

      try {
        let complete_address_info = await getPredictionDetails(place_id);

        let postal_code = complete_address_info.address_components.find(
          (component) => component.types.includes('postal_code')
        );

        let city = complete_address_info.address_components.find(
          (component) =>
            component.types.includes('locality') ||
            component.types.includes('administrative_area_level_3') ||
            component.types.includes('administrative_area_level_2')
        );

        this.$emit('update:address', {
          ...this.address,
          post_code: postal_code?.long_name,
          city: city?.long_name,
        });
      } catch (error) {
        console.error(error);
      }
    },

    countryFilterFn(val, update) {
      update(() => {
        const needle = val.toLowerCase();

        this.filteredCountryList = this.countryList.filter(
          (v) => v.name.toLowerCase().slice(0, val.length) == needle
        );
      });
    },
    /* citiesFilterFn(val, update) {
      this.$emit('update:address', { ...this.address, city: val });

      if (!val)
        return update(() => {
          this.filteredCitiesList = [];
        });

      const autocomplete = new google.maps.places.AutocompleteService();

      autocomplete.getPlacePredictions(
        {
          input: val,
          types: ['(cities)'],
          componentRestrictions: { country: this.address.country },
        },
        async (predictions, status) => {
          if (status != google.maps.places.PlacesServiceStatus.OK) {
            console.error(status);
            return;
          }

          this.autocompletedPlacesDetails = predictions;

          update(() => {
            this.filteredCitiesList = predictions.map(
              (x) => x.structured_formatting.main_text
            );
          });
        }
      );
    }, */
  },
  mounted() {
    this.filteredCountryList = this.countryList;
  },
};
</script>

<style lang="scss">
.checkout-address-popup {
  max-width: 540px !important;

  @include tablet-down() {
    max-width: 100% !important;
  }
}
</style>

<style scoped lang="scss">
.custom-address-btn-wrapper {
  display: flex;
  justify-content: flex-end;

  margin-top: 8px;

  & > div {
    @include font(16px, 18px, 400);

    color: $dark-4;

    cursor: pointer;
  }
}

.custom-address-wrapper {
  .fields {
    padding-top: 20px;
  }
}
</style>
