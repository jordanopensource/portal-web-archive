<template>
  <div v-if="ifNotEmpty()">
    <h2>{{ title }}</h2>
    <div class="md:grid md:grid-cols-2 gap-x-8 gap-y-0">
      <articleLatest
        v-for="article in limitBy(
          orderBy(articles, 'publishDate', -1),
          numberOfArticles
        )"
        :id="article.id"
        :key="article.id"
        :article="article"
      />
    </div>
  </div>
</template>

<script>
import Vue2Filters from 'vue2-filters'
export default {
  components: {
    articleLatest: () => import('~/components/Blog/ArticleLatestWithExcerpt'),
  },
  mixins: [Vue2Filters.mixin],
  props: {
    articles: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    numberOfArticles: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      loadedArticles: [],
    }
  },

  methods: {
    ifNotEmpty() {
      if (Array.isArray(this.articles) && this.articles.length) return true
      else return false
    },
  },
}
</script>
<style lang="postcss" scoped>
.button {
  @apply normal-case;
}
</style>
