<template>
  <div class="q-pa-lg overflow-auto full-height">
    <h4 class="text-weight-bold q-my-lg">{{ $t('profile.profile') }}</h4>

    <div class="column relative-position">
      <div class="full-width cover rounded-half" />
      <div
        class="full-width bg-dark-2 rounded-half row justify-between items-center q-pa-lg"
      >
        <h5 class="q-my-none text-weight-bold" style="margin-left: 140px">
          {{ userProfileDupe.name }}
        </h5>
        <ul class="row q-my-none">
          <li
            class="q-pxmd q-py-md"
            :class="
              $route.params.section === 'basic-info'
                ? 'text-primary'
                : 'cursor-pointer text-dark-6'
            "
            @click="$router.push('/profile/basic-info')"
          >
            {{ $t('profile.basicInfo') }}
          </li>
          <li
            class="q-px-md q-py-md"
            :class="
              $route.params.section === 'contact'
                ? 'text-primary'
                : 'cursor-pointer text-dark-6'
            "
            @click="$router.push('/profile/contact')"
          >
            {{ $t('profile.contact') }}
          </li>
          <li
            class="q-px-md q-py-md"
            :class="
              $route.params.section === 'social'
                ? 'text-primary'
                : 'cursor-pointer text-dark-6'
            "
            @click="$router.push('/profile/social')"
          >
            {{ $t('profile.social') }}
          </li>
          <li
            class="q-px-md q-py-md"
            :class="
              $route.params.section === 'password-and-security'
                ? 'text-primary'
                : 'cursor-pointer text-dark-6'
            "
            @click="$router.push('/profile/password-and-security')"
          >
            {{ $t('profile.pwAndSecurity') }}
          </li>
        </ul>
      </div>
      <ButtonComponent
        level="accent"
        :label="$t('profile.changeCover')"
        class="absolute-top-right q-mt-md q-mr-md hidden"
        :stretch="false"
        size="sm"
        padding="sm"
      />
      <q-avatar
        class="absolute-bottom-left q-mb-lg q-ml-lg shadow-10"
        size="120px"
      >
        <img src="/profile/profile-photo.jpg" class="border-white" />
        <q-btn
          round
          color="accent"
          class="absolute-bottom-right hidden"
          padding="sm"
          unelevated
        >
          <img src="/general/edit-white.svg" />
        </q-btn>
      </q-avatar>
    </div>

    <q-form ref="form" class="row col q-pa-lg q-mt-md rounded-1 border-dark-3">
      <BasicInfo
        v-if="$route.params.section === 'basic-info'"
        :userProfile="userProfileDupe"
        @update="update"
      />

      <ContactInfo
        v-else-if="$route.params.section === 'contact'"
        :userProfile="userProfileDupe"
        @update="update"
      />

      <SocialInfo
        v-else-if="$route.params.section === 'social'"
        :userProfile="userProfileDupe"
        @update="update"
      />

      <SecurityInfo
        v-else-if="$route.params.section === 'password-and-security'"
        :userProfile="userProfileDupe"
        @update="update"
      />
    </q-form>

    <div class="q-pa-none row justify-end gap-sm q-mt-lg">
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
  name: 'ProfilePage',
};
</script>

<script lang="ts" setup>
import ButtonComponent from 'src/components/Global/ButtonComponent.vue';
import { reactive, ref } from 'vue';
import { useDataStore } from 'stores/data-store';
import { User } from 'src/utils/EntityDefinitions';
import BasicInfo from 'src/components/profile/BasicInfo.vue';
import ContactInfo from 'src/components/profile/ContactInfo.vue';
import SocialInfo from 'src/components/profile/SocialInfo.vue';
import SecurityInfo from 'src/components/profile/SecurityInfo.vue';
import { QForm } from 'quasar';

const store = useDataStore();
const form = ref<QForm>();
const userProfileDupe = reactive<User>({ ...store.userProfile });

async function save() {
  if (form.value) {
    const valid = await form.value.validate();

    if (valid) {
      await store.updateItem<User>({
        which: 'users',
        entity: userProfileDupe,
        id: userProfileDupe.username,
        entityName: 'userProfile',
      });
    }
  }
}
function update(newProfile: User) {
  Object.assign(userProfileDupe, newProfile);
}

if (!store.userProfile) {
  store.pullData<User>('users');
}
</script>

<style lang="scss" scoped>
.cover {
  background-color: $dark-2;
  background-image: url('/profile/cover.png');
  background-size: cover;
  background-repeat: no-repeat;
  height: 230px;
  display: block;
}
</style>
