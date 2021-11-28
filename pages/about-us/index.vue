/* eslint-disable vue/no-v-html */
<template>
  <div :id="meta.pageId">
    <pageBanner :page-meta="meta" />
    <!-- HTML Content -->
    <div
      v-if="meta.htmlContent['content_' + $i18n.locale]"
      id="content"
      class="container py-20"
    >
      <div
        class="px-6 md:px-12"
        v-html="meta.htmlContent['content_' + $i18n.locale]"
      ></div>
    </div>
    <!-- Know More -->
    <list />
  </div>
</template>

<script>
export default {
  components: {
    pageBanner: () => import('~/components/UI/PageBanner'),
    list: () => import('~/components/KnowMore/List'),
  },
  layout: 'default',
  async asyncData({ $axios }) {
    const pageMeta = await $axios.get('/api/page-metas?pageId=about')
    return {
      meta: pageMeta.data[0],
    }
  },
  head() {
    const i18nSeo = this.$nuxtI18nHead({
      addDirAttribute: true,
      addSeoAttributes: true,
    })
    return {
      title:
        this.meta['title_' + this.$i18n.locale] +
        ' - ' +
        (this.$i18n.locale === 'ar'
          ? 'الجمعية الأردنية للمصدر المفتوح'
          : 'Jordan Open Source Association'),
      meta: [
        {
          name: 'description',
          content: this.meta['metaDescription_' + this.$i18n.locale]
            ? this.meta['metaDescription_' + this.$i18n.locale]
            : '',
        },
        ...i18nSeo.meta,
      ],
    }
  },
}
</script>

<style lang="postcss" scoped>
#content /deep/ p,
#content /deep/ h3 {
  @apply mb-4;
}
</style>
