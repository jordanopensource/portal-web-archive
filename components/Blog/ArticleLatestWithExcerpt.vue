<template>
  <div class="preview mt-8">
    <nuxt-link tag="a" :to="articleLink" class="thumbnail">
      <appImage
        v-if="article.thumbnail"
        :image="article.thumbnail"
        size="medium"
      />
      <img v-else :src="placeholderImage" />
    </nuxt-link>
    <div>
      <nuxt-link :to="articleLink">
        <h3 class="mb-4">{{ article.title }}</h3>
      </nuxt-link>
      <p v-if="article.excerpt">{{ article.excerpt }}</p>
      <p v-else>{{ article.body | truncate(200) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogPreview',
  components: {
    appImage: () => import('~/components/UI/appImage'),
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      placeholderImage: process.env.bucketUrl + '/josabots_88f0a93786.jpeg',
    }
  },
  computed: {
    articleLink() {
      const slug = this.$options.filters.stringToSlug(this.article.title)
      return this.localePath('/blog/' + this.article.id + '/' + slug)
    },
    arrowIcon() {
      if (this.$i18n.locale === 'ar') {
        return 'long-arrow-alt-left'
      } else {
        return 'long-arrow-alt-right'
      }
    },
  },
}
</script>

<style scoped>
.preview .thumbnail,
.preview .thumbnail img {
  width: 100%;
}
</style>
