<template>
  <div class="blog-page">
    <pageBanner :page-meta="blogMeta" />
    <div class="bg-josa-black py-8">
      <div class="container">
        <div class="px-6 md:px-12 flex flex-col sm:flex-row">
          <span
            :class="activeCat == 'all' ? 'active' : ''"
            class="cat-link"
            @click="setActiveCat('all')"
            >{{ $t('blog.all') }}</span
          >
          <span
            v-for="cat in blogCategories"
            :key="cat.id"
            :class="activeCat == cat.name ? 'active' : ''"
            class="cat-link"
            @click="setActiveCat(cat.name)"
            >{{ cat['title_' + $i18n.locale] }}</span
          >
        </div>
      </div>
    </div>
    <div class="container pb-20">
      <blogList
        v-if="activeCat == 'all'"
        class="blog-list"
        title="featured"
        category="all"
        :language="$i18n.locale"
        :limit="1"
        featured
      />
      <blogList
        v-if="activeCat == 'all'"
        class="blog-list"
        :category="'all'"
        :language="$i18n.locale"
      />
      <template v-for="cat in blogCategories" v-else>
        <blogList
          v-if="activeCat == cat.name"
          :key="cat.id"
          class="blog-list"
          :category="cat.name"
          :language="$i18n.locale"
          :title="cat['title_' + $i18n.locale]"
        />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    blogList: () => import('@/components/Blog/BlogList'),
    pageBanner: () => import('@/components/UI/PageBanner'),
  },
  layout: 'default',
  async asyncData({ $axios, error }) {
    const pageMeta = await $axios.get('/api/page-metas?pageId=blog')
    const cats = await $axios.get('/api/blog-categories')
    if (pageMeta.data && cats.data) {
      return {
        blogMeta: pageMeta.data[0],
        blogCategories: cats.data,
      }
    } else {
      error({ statusCode: 404, message: 'Not found' })
    }
  },
  data() {
    return {
      activeCat: 'all',
    }
  },
  head() {
    const i18nSeo = this.$nuxtI18nHead({
      addDirAttribute: true,
      addSeoAttributes: true,
    })
    return {
      title:
        this.blogMeta['title_' + this.$i18n.locale] +
        ' - ' +
        (this.$i18n.locale === 'ar'
          ? 'الجمعية الأردنية للمصدر المفتوح'
          : 'Jordan Open Source Association'),
      meta: [
        {
          name: 'description',
          content: this.blogMeta['metaDescription_' + this.$i18n.locale]
            ? this.blogMeta['metaDescription_' + this.$i18n.locale]
            : '',
        },
        ...this.$options.filters.ogTags(
          'page',
          this.blogMeta,
          this.$route.path,
          this.$i18n.locale
        ),
        ...i18nSeo.meta,
      ],
    }
  },
  methods: {
    setActiveCat(cat) {
      if (cat) {
        this.activeCat = cat
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.blog-list {
  @apply px-6 mt-20;
}

@screen md {
  .blog-list {
    @apply px-12;
  }
}
</style>
