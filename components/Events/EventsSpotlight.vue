<!-- Show events only if there are upcoming events -->
<template>
  <section v-if="ifNotEmpty()">
      <div class="container">
        <div class="px-6 md:px-12 mt-20">
          <div class="flex flex-wrap md:flex-no-wrap justify-between items-baseline">
            <h2 class="mb-8">{{ $t('events.upcoming') }}</h2>
            <nuxt-link :to="localePath('events')">
              <h6 class="display-more">
                {{ $t('eventCats.all') }}
                <font-awesome-icon
                  class="ltr:ml-2 rtl:mr-2 align-middle"
                  :icon="['fas', arrowIcon ]"
                />
              </h6>
            </nuxt-link>
          </div>
        </div>
        <div v-for="month in months" :key="month" class="mb-20">
          <eventPreview
            class="px-6 md:px-12"
            v-for="event in sortedEvents[month]"
            :id="event.id"
            :key="event.id"
            :event="event"
          />
        </div>
       </div>
  </section>
</template>

<script>
export default {
  components: {
    eventPreview: () => import('@/components/Events/EventPreview'),
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      default: 10,
    }
  },
  data() {
    return {
      sortBy: 'startDate:ASC',
      loadedEvents: [],
      currentPage: 1,
      start: 0,
      count: 0,
    }
  },
  async fetch() {
    await this.fetchEvents()
    await this.countEvents()
  },
  computed: {
    arrowIcon() {
      if (this.$i18n.locale === "ar") {
        return 'long-arrow-alt-left'
      } else {
        return 'long-arrow-alt-right'
      }
    },
    sortedEvents() {
      const data = this.loadedEvents
      const obj = {}
      data.forEach(
        (e, i) => (
          (i = this.$options.filters.monthYearDate(
            e.startDate,
            this.$i18n.locale
            // eslint-disable-next-line no-sequences
          )),
          obj[i] ? obj[i].push(e) : (obj[i] = [e])
        )
      )
      return obj
    },
    months() {
      const data = this.sortedEvents
      let months = {}
      months = Object.keys(data)
      return months
    },
  },
  methods: {
    query() {
      const args = []
      let query = ''

      const fromDateTime = new Date().getTime()
      const fromDateString = new Date(fromDateTime).toISOString()
      const q = 'startDate_gte=' + fromDateString
      args.push(q)
      if (this.start) {
        const q = '_start=' + this.start
        args.push(q)
      }
      if (this.limit) {
        const q = '_limit=' + this.limit
        args.push(q)
      }
      if (this.sortBy) {
        const q = '_sort=' + this.sortBy
        args.push(q)
      }
      if (this.category && this.category !== 'all') {
        const q = 'category.name=' + this.category
        args.push(q)
      }
      query = args.join('&')
      return query
    },
    async fetchEvents() {
      const query = this.query()
      const response = await this.$axios.get(`/api/events?${query}`)
      const eventsArray = []
      for (const key in response.data) {
        eventsArray.push({
          ...response.data[key],
        })
      }
      this.loadedEvents = eventsArray
    },
    async countEvents() {
      const args = []
      let query = ''

      const currentDateTime = new Date().toISOString()
      const q = 'startDate_gte=' + currentDateTime
      args.push(q)
      if (this.category && this.category !== 'all') {
        const q = 'category.name=' + this.category
        args.push(q)
      }
      query = args.join('&')
      const response = await this.$axios.get(`/api/events?${query}`)
      this.count = response.data.length
    },
    ifNotEmpty() {
      if (Array.isArray(this.loadedEvents) && this.loadedEvents.length)
        return true
      else return false
    },
  },
}
</script>

<style lang="postcss" scoped>
.pagination a.active {
  @apply text-josa-blue-veryDark;
}
</style>
