<template>
  <section v-if="ifNotEmpty()">
    <div class="px-6 md:px-12">
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
    <div>
      <eventList :showMonth="false" />
    </div>
  </section>
</template>

<script>
export default {
  components: {
    eventList: () => import('@/components/Events/EventList'),
  },
  computed: {
    arrowIcon() {
      if (this.$i18n.locale === "ar") {
        return 'long-arrow-alt-left'
      } else {
        return 'long-arrow-alt-right'
      }
    },
  },
  methods: {
    ifNotEmpty() {
      if (Array.isArray(this.loadedEvents) && this.loadedEvents.length)
        return true
      else return false
    },
  },
}
</script>
