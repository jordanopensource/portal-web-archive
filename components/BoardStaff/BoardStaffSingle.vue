<template>
  <div class="flex flex-nowrap mt-12">
    <appImage
      v-if="personnel.picture"
      class="picture-background pb"
      :image="personnel.picture"
    />
    <div v-else class="picture-background pb"></div>
    <div class="px-4 pt-4 md:pt-8 relative">
      <h4 class="font-medium">{{ personnel['fullName_' + $i18n.locale] }}</h4>
      <p class="uppercase text-sm">
        {{ personnel['position_' + $i18n.locale] }}
      </p>
      <socialAccounts
        v-if="personnel.socialAccounts"
        class="mt-0 md:mt-6 bottom-0 relative sm:absolute"
        :accounts="personnel.socialAccounts"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardStaffSingle',
  components: {
    appImage: () => import('~/components/UI/appImage'),
    socialAccounts: () => import('~/components/BoardStaff/SocialAccounts'),
  },
  props: {
    personnel: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="postcss" scoped>
.picture-background {
  display: block;
  background-image: url('/images/icons/drop.webp');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
  width: 189px;
  height: 156px;
}

.pb {
  width: 125px;
  height: 103px;
  min-width: 125px;
  min-height: 103px;
}

@screen sm {
  .pb {
    width: 189px;
    height: 156px;
    min-width: 189px;
    min-height: 156px;
  }
}
</style>
