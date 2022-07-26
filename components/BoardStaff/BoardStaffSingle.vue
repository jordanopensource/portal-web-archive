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
  @apply block bg-no-repeat bg-contain bg-bottom w-48 h-40;
  background-image: url('/images/icons/drop.webp');
}

.pb {
  @apply w-32 h-24;
  min-width: 125px;
  min-height: 103px;
}

@screen sm {
  .pb {
    @apply w-48 h-40;
    min-width: 189px;
    min-height: 156px;
  }
}
</style>
