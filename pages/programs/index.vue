<template>
  <div class="programs-page">
    <!-- Banner -->
    <pageBanner :page-meta="programsMeta" />
    <!-- Lists -->
    <div class="container pb-20">
      <programsList class="programs-list" />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    pageBanner: () => import('~/components/UI/PageBanner'),
    programsList: () => import('~/components/Programs/ProgramsList'),
  },
  layout: 'default',
  async asyncData({ $axios }) {
    const pageMeta = await $axios.get('/api/page-metas?pageId=programs')
    return {
      programsMeta: pageMeta.data[0],
    }
  },
  head() {
    const i18nSeo = this.$nuxtI18nHead({
      addDirAttribute: true,
      addSeoAttributes: true,
    })
    return {
      title:
        this.programsMeta['title_' + this.$i18n.locale] +
        ' - ' +
        (this.$i18n.locale === 'ar'
          ? 'الجمعية الأردنية للمصدر المفتوح'
          : 'Jordan Open Source Association'),
      meta: [
        {
          name: 'description',
          content: this.programsMeta['metaDescription_' + this.$i18n.locale]
            ? this.programsMeta['metaDescription_' + this.$i18n.locale]
            : '',
        },
        ...this.$options.filters.ogTags(
          'page',
          this.programsMeta,
          this.$route.path,
          this.$i18n.locale
        ),
        ...i18nSeo.meta,
      ],
    }
  },
}
</script>

<style lang="postcss" scoped>
.programs-list {
  @apply px-6 mt-20;
}

@screen md {
  .programs-list {
    @apply px-12;
  }
}
</style>
