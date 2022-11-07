<template>
  <careerSingle :career="career" />
</template>

<script>
export default {
  components: {
    careerSingle: () => import('~/components/Careers/CareerSingle'),
  },
  layout: 'default',
  async asyncData({ params, $axios, error }) {
    try {
      const response = await $axios.get(`/api/careers/${params.id}`)
      return {
        career: response.data,
      }
    } catch (err) {
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
          content: this.career['metaDescription_' + this.$i18n.locale]
            ? this.career['metaDescription_' + this.$i18n.locale]
            : '',
        },
        ...this.$options.filters.ogTags(
          'career',
          this.career,
          this.$route.path,
          this.$i18n.locale
        ),
        ...i18nSeo.meta,
      ],
    }
  },
  computed: {
    pageTitle() {
      return this.career['title_' + this.$i18n.locale]
    },
  },
}
</script>
