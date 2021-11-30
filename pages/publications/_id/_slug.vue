<template>
  <publicationSingle :publication="publication" />
</template>

<script>
export default {
  components: {
    publicationSingle: () =>
      import('~/components/Publications/PublicationSingle'),
  },
  layout: 'default',
  async asyncData({ params, $axios }) {
    const response = await $axios.get(`/api/publications/${params.id}`)

    return {
      publication: response.data,
    }
  },
  head() {
    const i18nSeo = this.$nuxtI18nSeo()
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
          content: this.publication['excerpt_' + this.$i18n.locale]
            ? this.publication['excerpt' + this.$i18n.locale]
            : '',
        },
        ...this.$options.filters.ogTags(
          'publication',
          this.publication,
          this.$route.path,
          this.$i18n.locale
        ),
        ...i18nSeo.meta,
      ],
    }
  },
  computed: {
    pageTitle() {
      return this.publication['title_' + this.$i18n.locale]
    },
  },
}
</script>
