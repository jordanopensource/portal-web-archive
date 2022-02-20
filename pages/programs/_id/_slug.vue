<template>
  <programSingle :id="'program-' + program.id" :program="program" />
</template>

<script>
export default {
  components: {
    programSingle: () => import('~/components/Programs/ProgramSingle'),
  },
  layout: 'default',
  async asyncData({ params, $axios }) {
    const response = await $axios.get(`/api/programs/${params.id}`)
    return {
      program: response.data,
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
          content: this.program['metaDescription_' + this.$i18n.locale]
            ? this.program['metaDescription_' + this.$i18n.locale]
            : this.program['description_' + this.$i18n.locale] || '',
        },
        ...this.$options.filters.ogTags(
          'page',
          this.program,
          this.$route.path,
          this.$i18n.locale
        ),
        ...i18nSeo.meta,
      ],
    }
  },
  computed: {
    pageTitle() {
      try {
        return this.program['title_' + this.$i18n.locale]
      } catch {
        return this.program.title_en
      }
    },
  },
}
</script>
