<template>
  <div v-if="ifNotEmpty()">
    <h2>{{ title }}</h2>
    <div class="md:grid md:grid-cols-2 col-gap-8 row-gap-0">
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
import articleLatest from '~/components/Blog/ArticleLatestWithExcerpt'

export default {
  components: {
    articleLatest,
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
