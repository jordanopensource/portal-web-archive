<!-- Fetch and list events based on event categories-->
<template>
  <section>
    <div v-if="ifNotEmpty()">
      <div v-for="month in months" :key="month" class="mb-20">
        <h3>{{ month }}</h3>
        <eventPreview
          v-for="event in sortedEvents[month]"
          :id="event.id"
          :key="event.id"
          :event="event"
        />
        <div
          v-if="pageCount > 1"
          class="pagination pt-6 text-center border-t border-dotted"
        >
          <span v-if="currentPage > 1" class="py-2"
            ><a @click="fetchCurrentPage(currentPage - 1)">{{
              $t('pagination.prev')
            }}</a></span
          >
          <span class="py-2 inline-flex ltr:text-left rtl:text-right"
            ><a
              v-for="i in pageCount"
              :key="i"
              class="p-2"
              :class="i == currentPage ? 'active' : ''"
              @click="fetchCurrentPage(i)"
              >{{ $t(i) }}</a
            ></span
          >
          <span v-if="currentPage < pageCount" class="py-2"
            ><a @click="fetchCurrentPage(currentPage + 1)">{{
              $t('pagination.next')
            }}</a></span
          >
        </div>
      </div>
    </div>
    <div v-else>
      <p>{{ $t('events.noUpcoming') }}</p>
    </div>
  </section>
</template>

<script>
import moment from 'moment'
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
    },
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
    pageCount() {
      return Math.ceil(this.count / this.limit)
    },
  },
  methods: {
    async fetchCurrentPage(i) {
      this.currentPage = i
      this.start = this.limit * (this.currentPage - 1)
      await this.fetchEvents()
    },
    query() {
      const args = []
      let query = ''

      let from = moment().subtract(24, 'hours')
      from = from.format(moment.HTML5_FMT.DATETIME_LOCAL_MS)
      const q = 'startDate_gte=' + from
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
      let from = moment().subtract(24, 'hours')
      from = from.format(moment.HTML5_FMT.DATETIME_LOCAL_MS)
      const q = 'startDate_gte=' + from
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
    limitNumberWithinRange(num, min, max) {
      return Math.min(Math.max(parseInt(num), min), max)
    },
    calculateCurrentPage(num) {
      this.currentPage = this.limitNumberWithinRange(num, 1, this.pageCount())
      return this.currentPage
    },
  },
}
</script>

<style lang="postcss" scoped>
.pagination a.active {
  @apply text-josa-blue-veryDark;
}
</style>
