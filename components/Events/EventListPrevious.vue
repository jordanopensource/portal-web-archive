<!-- Fetch and list events based on event categories-->
<template>
  <section>
    <div v-if="ifNotEmpty()">
      <div v-for="month in months" :key="month" class="mb-20">
        <h3>{{ month }}</h3>
        <eventPreview
          v-for="event in displayedEvents[month]"
          :id="event.id"
          :key="event.id"
          :event="event"
        />
      </div>
      <div class="pagination pt-6 text-center border-t border-dotted">
        <ul>
          <span class="px-3"
            ><a
              :class="currentPage == 1 ? 'disabled' : ''"
              @click="calculateCurrentPage(currentPage - 1)"
            >
              <font-awesome-icon
                :icon="$i18n.locale == 'ar' ? 'chevron-right' : 'chevron-left'"
              ></font-awesome-icon> </a
          ></span>
          <span v-for="i in calculatePages()" :key="i">
            <li
              v-if="
                i == calculatePages() ||
                Math.abs(i - currentPage) < 3 ||
                i == 1 ||
                Math.abs(i - calculatePages()) < 1
              "
            >
              <a
                :class="{
                  current: currentPage === i,
                  last: i == calculatePages() && Math.abs(i - currentPage) > 3,
                  first: i == 1 && Math.abs(i - currentPage) > 3,
                }"
                @click="currentPage = i"
              >
                {{ i }}</a
              >
            </li>
          </span>
          <span class="px-3">
            <a
              :class="currentPage == calculatePages() ? 'disabled' : ''"
              @click="calculateCurrentPage(currentPage + 1)"
            >
              <font-awesome-icon
                :icon="$i18n.locale == 'ar' ? 'chevron-left' : 'chevron-right'"
              ></font-awesome-icon>
            </a>
          </span>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>{{ $t('events.noPrevious') }}</p>
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
    numberOfEvents: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      sortBy: 'startDate:DESC',
      loadedEvents: [],
      numberPerPage: 3,
      currentPage: 1,
    }
  },
  async fetch() {
    await this.fetchEvents()
  },
  computed: {
    sortedEvents() {
      const data = this.loadedEvents
      const sorted = {}
      data.forEach(
        (e, i) => (
          (i = this.$options.filters.monthYearDate(
            e.startDate,
            this.$i18n.locale
            // eslint-disable-next-line no-sequences
          )),
          sorted[i] ? sorted[i].push(e) : (sorted[i] = [e])
        )
      )
      return sorted
    },
    displayedEvents() {
      const tempArray = this.chunkObject(this.sortedEvents, this.numberPerPage)
      return tempArray[this.currentPage - 1]
    },
    months() {
      const data = this.displayedEvents
      let months = {}
      months = Object.keys(data)
      return months
    },
  },
  methods: {
    query() {
      const args = []
      let query = ''

      let from = moment().subtract(24, 'hours')
      from = from.format(moment.HTML5_FMT.DATETIME_LOCAL_MS)
      const q = 'startDate_lt=' + from
      args.push(q)

      if (this.numberOfEvents > 0) {
        const q = '_limit=' + this.numberOfEvents
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
    ifNotEmpty() {
      if (Array.isArray(this.loadedEvents) && this.loadedEvents.length)
        return true
      else return false
    },
    calculatePages() {
      return Math.ceil(
        Object.keys(this.sortedEvents).length / this.numberPerPage
      )
    },
    calculateCurrentPage(num) {
      this.currentPage = this.limitNumberWithinRange(
        num,
        1,
        this.calculatePages()
      )
      return this.currentPage
    },
    limitNumberWithinRange(num, min, max) {
      return Math.min(Math.max(parseInt(num), min), max)
    },
    chunkObject(object, chunkSize) {
      const values = Object.values(object)
      const final = []
      let counter = 0
      let portion = {}

      for (const key in object) {
        if (counter !== 0 && counter % chunkSize === 0) {
          final.push(portion)
          portion = {}
        }
        portion[key] = values[counter]
        counter++
      }
      final.push(portion)
      return final
    },
  },
}
</script>

<style lang="postcss" scoped>
a.disabled {
  @apply cursor-default text-josa-warm-grey;
}

a.disabled:hover {
  @apply text-josa-warm-grey;
}

a {
  @apply text-josa-warm-grey-dark;
}

.current {
  @apply bg-josa-blue-dark rounded-sm px-1 py-0 text-white;
}

ul {
  @apply p-0 list-none;
}

li {
  @apply inline m-1;
}

a.first::after {
  content: '  ...';
}

a.last::before {
  content: '... ';
}
</style>
