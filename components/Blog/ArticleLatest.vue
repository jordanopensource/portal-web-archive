<template>
  <div class="preview mt-8">
    <nuxt-link :to="articleLink" class="thumbnail">
      <appImage
        v-if="article.thumbnail"
        :image="article.thumbnail"
        size="medium"
      />
      <img v-else :src="placeholderImage" />
    </nuxt-link>
    <div class="flex-grow">
      <h4 class="py-2 lg:pt-0 text-josa-blue">
        <span v-for="(topic, index) in article.topics" :key="topic.id">
          {{ topic['title_' + $i18n.locale]
          }}{{ index != Object.keys(article.topics).length - 1 ? ', ' : '' }}
        </span>
      </h4>
      <nuxt-link :to="articleLink">
        <h3 class="mb-4">{{ article.title }}</h3>
      </nuxt-link>
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
  data({ $config: { bucketUrl } }) {
    return {
      placeholderImage: `${bucketUrl}/josabots_88f0a93786.jpeg`,
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

<style lang="postcss" scoped>
[lang='en'] p {
  @apply leading-golden;
}

[lang='ar'] p {
  @apply leading-normal;
}
.preview .thumbnail,
.preview .thumbnail img {
  @apply w-full;
}
</style>
