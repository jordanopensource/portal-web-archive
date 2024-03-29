<template>
  <div class="preview mt-8 md:grid md:grid-cols-2 gap-x-8 gap-y-0">
    <appImage
      v-if="activity.image"
      :image="activity.image"
      size="medium"
      class="thumbnail"
    />
    <img v-else :src="placeholderImage" class="thumbnail" />
    <div class="my-auto">
      <h5 class="display-faded uppercase">{{ date }}</h5>
      <h3 class="mb-4 mt-2">{{ activity['title_' + $i18n.locale] }}</h3>
      <div v-html="activity['description_' + $i18n.locale]"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityPreview',
  components: {
    appImage: () => import('~/components/UI/appImage'),
  },
  props: {
    activity: {
      type: Object,
      required: true,
    },
  },
  data({ $config: { bucketUrl } }) {
    return {
      placeholderImage: `${bucketUrl}/josabots_88f0a93786.jpeg`,
    }
  },

  computed: {
    date() {
      const startDate = new Date(this.activity.startDate)
      const endDate = new Date(this.activity.endDate)

      const startMonth = startDate.getMonth()
      const startYear = startDate.getFullYear()
      const endMonth = endDate.getMonth()
      const endYear = endDate.getFullYear()

      const monthYearDateFilter = this.$options.filters.monthYearDate
      const monthDateFilter = this.$options.filters.monthDate
      const locale = this.$i18n.locale

      // Spans more than one year: May 2021 to January 2022
      if (startYear !== endYear) {
        return `${monthYearDateFilter(startDate, locale)} ${this.$t(
          'meta.to'
        )} ${monthYearDateFilter(endDate, locale)} `
      }

      // Within a single month: May 2021
      if (startMonth === endMonth) {
        return monthYearDateFilter(startDate, locale)
      }

      // Ends the next month within the same year: May and June 2021
      if (endMonth - startMonth === 1) {
        return `${monthDateFilter(startDate, locale)} ${this.$t(
          'meta.and'
        )} ${monthYearDateFilter(endDate, locale)}`
      }

      // Spans more than 2 months but within the same year: May to Augest 2021
      return `${monthDateFilter(startDate, locale)} ${this.$t(
        'meta.to'
      )} ${monthYearDateFilter(endDate, locale)}`
    },
  },
}
</script>

<style lang="postcss" scoped>
[lang='en'] p {
  @apply leading-golden;
}

[lang='ar'] p {
  @apply leading-normal;
}

.preview .thumbnail,
.preview .thumbnail img {
  @apply w-full p-0;
}
</style>
