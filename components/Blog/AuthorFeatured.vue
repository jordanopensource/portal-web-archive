<template>
  <div class="flex flex-nowrap items-center mb-2">
    <appImage
      v-if="picture"
      :image="picture"
      size="small"
      class="profilePicture"
    />
    <img
      v-else
      size="small"
      class="profilePicture"
      src="/images/icons/authorimage_default.webp"
    />
    <div class="flex items-center opacity-80">
      <p v-if="translatedBy" class="ltr:mr-1 rtl:ml-1 text-xs uppercase">
        {{ $t('meta.translatedBy') }}
      </p>
      <p class="text-sm">{{ name }}</p>
      <p v-if="bio">{{ bio }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Author',
  components: {
    appImage: () => import('~/components/UI/appImage'),
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    picture: {
      type: Object,
      default() {
        return {}
      },
    },
    bio: {
      type: String,
      default: '',
    },
    writtenBy: {
      type: Boolean,
      default: true,
    },
    translatedBy: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="postcss" scoped>
:dir(ltr).profilePicture {
  @apply w-5 mr-1;
}
:dir(rtl).profilePicture {
  @apply w-5 ml-1;
}
</style>
