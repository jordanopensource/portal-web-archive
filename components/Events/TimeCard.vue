<template>
  <client-only>
    <div class="time-card">
      <font-awesome-icon
        class="icon ltr:mr-3 rtl:ml-3"
        :icon="['fas', 'clock']"
      />
      <div>
        <h5>{{ $t('timeCard.title') }}</h5>
        <p>{{ from | fullDateWithTimeZone('Asia/Amman', $i18n.locale) }}</p>
        <p>
          {{ $t('timeCard.from') }}
          {{ from | timeWithTimeZone('Asia/Amman', $i18n.locale) }}
          {{ $t('timeCard.to') }}
          {{ to | timeWithTimeZone('Asia/Amman', $i18n.locale) }} ({{
            $t('timeString.time')
          }})
        </p>
        <div v-if="!isTheSameTimeZone()">
          <br />
          <p>{{ from | dayFullDate($i18n.locale) }}</p>
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
  methods: {
    isOngoingEvent() {
      const endDate = new Date(this.to).getTime()
      const currentDate = new Date().getTime()
      return currentDate < endDate
    },
    isTheSameTimeZone() {
      const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const ammanTimeZone = 'Asia/Amman'

      return localTimeZone === ammanTimeZone
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
