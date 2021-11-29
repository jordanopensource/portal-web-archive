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
import axios from 'axios'
import pageBanner from '~/components/UI/PageBanner'
import addressCard from '~/components/Contact/AddressCard'
import feedback from '~/components/Contact/Feedback'
import locationMap from '~/components/Map/LocationMap'

export default {
  components: {
    pageBanner,
    addressCard,
    feedback,
    locationMap,
  },
  layout: 'default',
  async asyncData(context) {
    const pageMeta = await axios.get(
      process.env.baseUrl + '/page-metas?pageId=contact-us'
    )
    const contactData = await axios.get(process.env.baseUrl + '/contact-info')
    return {
      contactUsMeta: pageMeta.data[0],
      contactInfo: contactData.data,
    }
  },
  head() {
    const i18nSeo = this.$nuxtI18nSeo()
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
