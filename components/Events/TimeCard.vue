<template>
  <client-only>
    <div class="time-card">
      <font-awesome-icon
        class="icon ltr:mr-3 rtl:ml-3"
        :icon="['fas', 'clock']"
      />
      <div>
        <h5>{{ $t('timeCard.title') }}</h5>
        <p v-if="isMultiDayEvent()">{{ from | fullDateWithTimeZone('Asia/Amman', $i18n.locale) }} - {{ to | fullDateWithTimeZone('Asia/Amman', $i18n.locale) }}</p>
        <p v-else>{{ from | fullDateWithTimeZone('Asia/Amman', $i18n.locale) }}</p>
        <p>
          {{ $t('timeCard.from') }}
          {{ from | timeWithTimeZone('Asia/Amman', $i18n.locale) }}
          {{ $t('timeCard.to') }}
          {{ to | timeWithTimeZone('Asia/Amman', $i18n.locale) }} ({{
            $t('timeString.time')
          }})
        </p>
        <div v-if="!isTheSameTimeZone(localTimeZone, 'Asia/Amman')">
          <br />
          <p v-if="isMultiDayEvent()">{{ from | dayFullDate($i18n.locale) }} - {{ to | dayFullDate($i18n.locale) }}</p>
          <p v-else>{{ from | dayFullDate($i18n.locale) }}</p>
          <p>
            {{ $t('timeCard.from') }} {{ from | time($i18n.locale) }}
            {{ $t('timeCard.to') }} {{ to | time($i18n.locale) }} ({{
              $t('timeCard.gmt')
            }}{{ to | timezone($i18n.locale) }})
          </p>
        </div>
        <addToCalendar v-if="isOngoingEvent()" class="mt-4" :event="event" />
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  name: 'TimeCard',
  components: {
    addToCalendar: () => import('~/components/Events/AddToCalendar'),
  },
  props: {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    event: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }
  },
  methods: {
    isOngoingEvent() {
      const endDate = new Date(this.to).getTime()
      const currentDate = new Date().getTime()
      return currentDate < endDate
    },
    isMultiDayEvent() {
      const eventStartsOn = new Date(this.from).getDate();
      const eventEndsOn = new Date(this.to).getDate();
      return eventStartsOn !== eventEndsOn;
    },
    isTheSameTimeZone(timeZoneOne, timeZoneTwo) {
      return timeZoneOne === timeZoneTwo
    },
  },
}
</script>

<style lang="postcss" scoped>
.time-card {
  @apply bg-josa-warm-grey-light p-8 flex align-top;
}
.icon {
  @apply text-josa-warm-grey-dark text-2xl;
}
</style>
