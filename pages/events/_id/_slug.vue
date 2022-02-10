<template>
  <EventSingle :event="event" />
</template>

<script>
export default {
  components: {
    EventSingle: () => import('~/components/Events/EventSingle'),
  },
  layout: 'default',
  async asyncData({ params, $axios }) {
    const response = await $axios.get(`/api/events/${params.id}`)

    return {
      event: response.data,
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
          content: this.event['description_' + this.$i18n.locale]
            ? this.event['description_' + this.$i18n.locale]
            : '',
        },
        ...this.$options.filters.ogTags(
          'event',
          this.event,
          this.$route.path,
          this.$i18n.locale
        ),
        ...i18nSeo.meta,
      ],
    }
  },
  computed: {
    pageTitle() {
      return this.event['title_' + this.$i18n.locale]
    },
  },
}
</script>
