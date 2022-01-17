<template>
  <div
    class="
      preview
      grid grid-cols-1 grid-rows-2
      md:grid-cols-2 md:grid-rows-1
      col-gap-8
      row-gap-4
    "
  >
    <div>
      <nuxt-link :to="publicationLink">
        <h3 class="mb-4">{{ publication['title_' + $i18n.locale] }}</h3>
      </nuxt-link>
      <p v-if="publication['excerpt_' + $i18n.locale]">
        {{ publication['excerpt_' + $i18n.locale] }}
      </p>
    </div>
    <nuxt-link :to="publicationLink">
      <div role="link">
        <appImage
          v-if="publication.thumbnail"
          :image="publication.thumbnail"
          size="medium"
          class="preview-image"
        />
        <img v-else :src="placeholderImage" class="preview-image" />
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'PublicationFeatured',
  components: {
    appImage: () => import('~/components/UI/appImage'),
  },
  props: {
    publication: {
      type: Object,
      required: true,
    },
  },
  data({ $config: { bucketUrl } }) {
    return {
      placeholderImage: `${bucketUrl}/josabots_88f0a93786.jpeg`,
    }
  },
  computed: {
    publicationLink() {
      let title = ''
      if (this.publication['title_' + this.$i18n.locale]) {
        title = this.publication['title_' + this.$i18n.locale]
      } else {
        title = this.publication.title_en
      }
      const slug = this.$options.filters.stringToSlug(title)
      return this.localePath(
        '/publications/' + this.publication.id + '/' + slug
      )
    },
  },
}
</script>

<style lang="postcss" scoped>
[lang='en'] p {
  @apply leading-golden;
}

[lang='ar'] p {
  @apply leading-normal;
}

.preview-image {
  @apply w-full object-cover object-center;
  height: 200px;
}
</style>
