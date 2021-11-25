<template>
  <div class="flex flex-nowrap items-center">
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
      src="/images/icons/authorimage_default.png"
    />
    <div class="opacity-90">
      <p v-if="writtenBy" class="block ltr:text-xs rtl:text-sm uppercase">
        {{ $t('meta.writtenBy') }}
      </p>
      <p
        v-else-if="translatedBy"
        class="block ltr:text-xs rtl:text-sm uppercase"
      >
        {{ $t('meta.translatedBy') }}
      </p>
      <h4>{{ name }}</h4>
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
