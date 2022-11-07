<template>
  <EventSingle :event="event" />
</template>

<script>
export default {
  components: {
    EventSingle: () => import('~/components/Events/EventSingle'),
  },
  layout: 'default',
  async asyncData({ params, $axios, error }) {
    try {
      const response = await $axios.get(`/api/events/${params.id}`)
      return {
        event: response.data,
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
    const descriptionContent = this.event[
      'metaDescription_' + this.$i18n.locale
    ]
      ? this.event['metaDescription_' + this.$i18n.locale]
      : this.event['description_' + this.$i18n.locale]

    if (descriptionContent) {
      descriptionContent.replace(/(<([^>]+)>)/gi, '')
    }

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
          content: descriptionContent,
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
