<template>
  <div class="partners-page">
    <!-- Banner -->
    <pageBanner :page-meta="partnersMeta" />

    <!-- Lists -->
    <div class="container pb-20">
      <partnersList class="partners-list" :title="$t('partners.title')" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  components: {
    pageBanner: () => import('@/components/UI/PageBanner'),
    partnersList: () => import('@/components/Partners/PartnersList'),
  },
  layout: 'default',
  async asyncData(context) {
    const pageMeta = await axios.get(
      process.env.baseUrl + '/page-metas?pageId=partners'
    )
    return {
      partnersMeta: pageMeta.data[0],
    }
  },
  head() {
    const i18nSeo = this.$nuxtI18nHead({
      addDirAttribute: true,
      addSeoAttributes: true,
    })
    return {
      title:
        this.partnersMeta['title_' + this.$i18n.locale] +
        ' - ' +
        (this.$i18n.locale === 'ar'
          ? 'الجمعية الأردنية للمصدر المفتوح'
          : 'Jordan Open Source Association'),
      meta: [
        {
          name: 'description',
          content: this.partnersMeta['metaDescription_' + this.$i18n.locale]
            ? this.partnersMeta['metaDescription_' + this.$i18n.locale]
            : '',
        },
        ...i18nSeo.meta,
      ],
    }
  },
}
</script>

<style lang="postcss" scoped>
.partners-list {
  @apply px-6 mt-20;
}

@screen md {
  .partners-list {
    @apply px-12;
  }
}
</style>
