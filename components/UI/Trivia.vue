<template>
  <div v-if="info['content_' + $i18n.locale]">
    <div
      class="px-6 md:px-12 preview"
      :class="alt ? 'text-center' : 'md:grid md:grid-cols-2 gap-x-8 gap-y-0'"
    >
      <appImage
        v-if="info.image"
        :image="info.image"
        :class="alt ? 'object-contain mx-auto mb-4' : 'thumbnail'"
      />
      <div :class="alt ? 'mx-auto w-full' : 'my-auto'">
        <h3 class="mb-4">{{ info['title_' + $i18n.locale] }}</h3>
        <p>{{ info['content_' + $i18n.locale] }}</p>
      </div>
    </div>
    <div class="block py-8 my-4 mx-12 border-josa-warm-grey-dark">
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    appImage: () => import('~/components/UI/appImage'),
  },
  props: {
    info: {
      type: Object,
      required: true,
    },
    alt: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.preview .thumbnail,
.preview .thumbnail img {
  @apply w-full p-0;
}
</style>
