<template>
  <div :dir="$dir()">
    <buildInfoBanner v-if="this.$config.TARGET_ENV==='development'"/>
    <mainHeader />
    <nuxt class="content-wrapper md:px-0 bg-white" />
    <back-to-top />
    <mainFooter />
  </div>
</template>

<script>
export default {
  components: {
    mainHeader: () => import('~/components/UI/Header'),
    mainFooter: () => import('~/components/UI/Footer'),
    BackToTop: () => import('~/components/UI/BackToTop'),
  },
  head() {
    return {
      title:
        this.$i18n.locale === 'ar'
          ? 'الجمعية الأردنية للمصدر المفتوح'
          : 'Jordan Open Source Association',
    }
  },
}
</script>
