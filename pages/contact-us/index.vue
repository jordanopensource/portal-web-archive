<template>
  <div id="contact-us">
    <pageBanner :page-meta="contactUsMeta" />
    <locationMap
      :latitude="contactInfo.address.latitude"
      :longitude="contactInfo.address.longitude"
      :m-longitude="contactInfo.address.markerLongitude"
      :m-latitude="contactInfo.address.markerLatitude"
      map-height="500px"
    />
    <addressCard :info="contactInfo" />
    <feedback />
  </div>
</template>

<script>
export default {
  components: {
    pageBanner: () => import('~/components/UI/PageBanner'),
    addressCard: () => import('~/components/Contact/AddressCard'),
    feedback: () => import('~/components/Contact/Feedback'),
    locationMap: () => import('~/components/Map/LocationMap'),
  },
  layout: 'default',
  async asyncData({ $axios }) {
    const pageMeta = await $axios.get('/api/page-metas?pageId=contact-us')
    const contactData = await $axios.get('/api/contact-info')
    return {
      contactUsMeta: pageMeta.data[0],
      contactInfo: contactData.data,
    }
  },
  head() {
    const i18nSeo = this.$nuxtI18nHead({
      addDirAttribute: true,
      addSeoAttributes: true,
    })
    return {
      title:
        this.contactUsMeta['title_' + this.$i18n.locale] +
        ' - ' +
        (this.$i18n.locale === 'ar'
          ? 'الجمعية الأردنية للمصدر المفتوح'
          : 'Jordan Open Source Association'),
      meta: [
        {
          name: 'description',
          content: this.contactUsMeta['metaDescription_' + this.$i18n.locale]
            ? this.contactUsMeta['metaDescription_' + this.$i18n.locale]
            : '',
        },
        ...i18nSeo.meta,
      ],
    }
  },
}
</script>

<style></style>
