<template>
  <BlogSingle :article="blog" />
</template>

<script>
export default {
  components: {
    BlogSingle: () => import('~/components/Blog/BlogSingle'),
  },
  layout: 'default',
  async asyncData({ params, $axios, error }) {
    const response = await $axios.get(`/api/blogs/${params.id}`)
    if (response.data) {
      return {
        blog: response.data,
      }
    } else {
      error({ statusCode: 404, message: 'Not found' })
    }
  },
  head() {
    const i18nSeo = this.$nuxtI18nHead({
      addDirAttribute: true,
      addSeoAttributes: true,
    })
    return {
      title:
        this.pageTitle +
        ' - ' +
        (this.$i18n.locale === 'ar'
          ? 'الجمعية الأردنية للمصدر المفتوح'
          : 'Jordan Open Source Association'),
      meta: [
        {
          name: 'description',
          content: this.blog.excerpt ? this.blog.excerpt : '',
        },
        {
          name: 'keywords',
          content: this.blog.tags ? this.blog.tags : '',
        },
        ...this.$options.filters.ogTags(
          'article',
          this.blog,
          this.$route.path,
          this.$i18n.locale
        ),
        ...i18nSeo.meta,
      ],
    }
  },
  computed: {
    pageTitle() {
      return this.blog.title
    },
  },
}
</script>
