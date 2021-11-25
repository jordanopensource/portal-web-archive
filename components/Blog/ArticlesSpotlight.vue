<!-- Fetch and list latest blog articles from all categories-->
<template>
  <div v-if="ifNotEmpty()">
    <div class="flex justify-between items-baseline">
      <h2>{{ title }}</h2>
      <nuxt-link :to="localePath('blog')">
        <h6 class="display-more">
          {{ $t('blog.all') }}
          <font-awesome-icon
            class="ltr:ml-2 rtl:mr-2 align-middle"
            :icon="['fas', arrowIcon]"
          />
        </h6>
      </nuxt-link>
    </div>
    <div class="">
      <articlePreviewAlt
        v-for="article in loadedArticles"
        :id="article.id"
        :key="article.id"
        class="article-preview my-16"
        :article="article"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ArticlesSpotLight',
  components: {
    articlePreviewAlt: () => import('@/components/Blog/ArticlePreviewAlt'),
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    numberOfArticles: {
      type: Number,
      default: 1,
    },
    language: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      sortBy: 'publishDate:DESC',
      loadedArticles: [],
    }
  },
  computed: {
    arrowIcon() {
      if (this.$i18n.locale === 'ar') {
        return 'long-arrow-alt-left'
      } else {
        return 'long-arrow-alt-right'
      }
    },
  },
  created() {
    this.fetchArticles()
  },
  methods: {
    query() {
      const args = []
      let query = ''
      if (this.numberOfArticles) {
        const q = '_limit=' + this.numberOfArticles
        args.push(q)
      }
      if (this.sortBy) {
        const q = '_sort=' + this.sortBy
        args.push(q)
      }
      if (this.language) {
        const q = 'language=' + this.language
        args.push(q)
      }
      if (this.tag) {
        const q = 'tags_contains=' + this.tag
        args.push(q)
      }
      query = args.join('&')
      return query
    },
    async fetchArticles() {
      const query = this.query()
      await axios
        .get(process.env.baseUrl + '/blogs?' + query)
        .then((res) => {
          const articlesArray = []
          for (const key in res.data) {
            articlesArray.push({
              ...res.data[key],
            })
          }
          this.loadedArticles = articlesArray
        })
        .catch((e) => this.context.error(e))
    },
    ifNotEmpty() {
      if (Array.isArray(this.loadedArticles) && this.loadedArticles.length)
        return true
      else return false
    },
  },
}
</script>

<style lang="postcss" scoped>
.button {
  @apply normal-case;
}

.article-preview:first-child {
  @apply flex-row-reverse;
}

.article-preview:last-child {
  @apply mb-0;
}

@screen lg {
  .article-preview:first-child >>> .thumbnail {
    width: 75%;
    height: 400px;
  }

  .article-preview:first-child >>> .thumbnail img {
    @apply w-full h-full;
  }

  [dir='ltr'] .article-preview:first-child >>> .thumbnail {
    @apply pl-6 pr-0;
  }

  [dir='rtl'] .article-preview:first-child >>> .thumbnail {
    @apply pr-6 pl-0;
  }
}
</style>
