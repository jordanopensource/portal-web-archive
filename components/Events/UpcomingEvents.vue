<!-- Fetch and list upcoming events-->
<template>
  <section class="text-center mx-auto">
    <appImage
      v-if="eventsImage"
      :image="eventsImage"
      size="medium"
      class="bot"
    />
    <h2 v-if="title" class="pb-2">{{ title }}</h2>
    <template v-if="ifNotEmpty()">
      <div v-for="(event, index) in loadedEvents" :key="event.id">
        <eventPreviewAlt :id="event.id" :event="event" />
        <div
          class="py-4 px-8"
          :class="index == numberOfEvents - 1 ? 'hidden' : 'block'"
        >
          <hr class="border-josa-warm-grey" />
        </div>
      </div>
    </template>
    <p v-else>{{ $t('events.noUpcoming') }}</p>
    <nuxt-link
      :to="localePath('events')"
      class="button-sharp button-dark-blue-full mt-8 inline-block"
      >{{ $t('events.more') }}</nuxt-link
    >
  </section>
</template>

<script>
import moment from 'moment'
export default {
  components: {
    eventPreviewAlt: () => import('~/components/Events/EventPreviewAlt'),
    appImage: () => import('~/components/UI/appImage'),
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
      sortBy: 'startDate:ASC',
      loadedEvents: [],
      eventsImage: null,
    }
  },
  async fetch() {
    await this.fetchEvents()
    await this.fetchEventsImage()
  },
  methods: {
    query() {
      const args = []
      let query = ''

      let from = moment().subtract(24, 'hours')
      from = from.format(moment.HTML5_FMT.DATETIME_LOCAL_MS)
      const q = 'startDate_gte=' + from
      args.push(q)

      if (this.numberOfEvents) {
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
    async fetchEventsImage() {
      const response = await this.$axios.get(`/api/page-metas?pageId=event`)

      this.eventsImage = response.data[0].image
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
.bot {
  @apply mx-auto mb-8 h-auto;
  width: 300px;
}

.button {
  @apply normal-case;
}
</style>
