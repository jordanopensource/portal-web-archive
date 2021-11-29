<template>
  <div>
    <AppButton btn-style="button-flat" @click="openMenu()">
      <p calss="text">
        {{ $t('addToCalendar.add') }}
      </p>
    </AppButton>
    <div v-if="opened" class="list">
      <div class="py-1">
        <div class="flex">
          <img class="icon" src="~/static/images/icons/apple.svg" />
          <a
            id="download"
            class="list-text"
            download="JOSAEvent.ics"
            @click="makeIcsFile(appleId)"
            >{{ $t('addToCalendar.apple') }}</a
          >
        </div>
        <div class="flex">
          <img class="icon" src="~/static/images/icons/outlook.svg" />
          <a class="list-text" @click="outlookEncode(outlookLink)">{{
            $t('addToCalendar.outlook')
          }}</a>
        </div>
        <div class="flex">
          <img class="icon" src="~/static/images/icons/search.svg" />
          <a class="list-text" @click="googleEncode(googleLink)">{{
            $t('addToCalendar.google')
          }}</a>
        </div>
        <div class="flex">
          <img class="icon" src="~/static/images/icons/office.svg" />
          <a class="list-text" @click="outlookEncode(officeLink)">{{
            $t('addToCalendar.office')
          }}</a>
        </div>
        <div class="flex">
          <img class="icon" src="~/static/images/icons/android.svg" />
          <a
            id="download2"
            download="JOSAEvent.ics"
            class="list-text"
            @click="makeIcsFile(androidId)"
            >{{ $t('addToCalendar.android') }}</a
          >
        </div>
        <div class="flex">
          <img class="icon" src="~/static/images/icons/download.svg" />
          <a
            id="download1"
            download="JOSAEvent.ics"
            class="list-text"
            @click="makeIcsFile(otherId)"
            >{{ $t('addToCalendar.others') }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddToCalender',
  components: {
    AppButton: () => import('@/components/FormComponents/AppButton'),
  },
  props: {
    event: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      opened: false,
      googleLink: 'https://calendar.google.com/calendar/render?',
      outlookLink: 'https://outlook.live.com/calendar/0/deeplink/compose?',
      officeLink: 'https://outlook.office.com/calendar/0/deeplink/compose?',
      appleId: '#download',
      otherId: '#download1',
      androidId: '#download2',
    }
  },
  mounted() {
    document.addEventListener('click', this.closeMenu)
  },
  methods: {
    openMenu() {
      this.opened = !this.opened
    },
    closeMenu(e) {
      if (!this.$el.contains(e.target)) {
        this.opened = false
      }
    },
    convertDate(date) {
      let event = new Date(date).toISOString()
      event = event.replaceAll(':', '')
      event = event.replaceAll('-', '')
      // Remove milliseconds in the time value
      event = event.replace(
        event.substring(event.length - 5, event.length - 1),
        ''
      )
      return event
    },
    googleEncode(Url) {
      const div = document.createElement('div')
      div.innerHTML = this.event['description_' + this.$i18n.locale]
      let desc = div.textContent || div.innerText || ''
      desc = desc.substring(0, 1200) + '...'
      const URL =
        `${Url}action=TEMPLATE&text=${
          this.event['title_' + this.$i18n.locale]
        }` +
        `&dates=${this.convertDate(this.event.startDate)}/${this.convertDate(
          this.event.endDate
        )}` +
        `&details=${desc}&sf=true&output=xml`
      const encoded = encodeURI(URL)
      window.open(encoded, '_blank')
    },
    outlookDate(date) {
      let event = new Date(date)
      event.setMinutes(event.getMinutes() - event.getTimezoneOffset())
      event = event.toISOString()
      event = event.replaceAll('Z', '')
      return event
    },
    outlookEncode(Url) {
      const div = document.createElement('div')
      div.innerHTML = this.event['description_' + this.$i18n.locale]
      let desc = div.textContent || div.innerText || ''
      desc = desc.substring(0, 1200) + '...'
      const title = this.event['title_' + this.$i18n.locale]
      const URL =
        `${Url}rru=addevent&subject=${title}&startdt=${this.outlookDate(
          this.event.startDate
        )}` + `&enddt=${this.outlookDate(this.event.endDate)}&body=${desc}`
      let encoded = URL
      encoded = encodeURI(encoded)
      window.open(encoded, '_blank')
    },
    makeIcsFile(id) {
      const div = document.createElement('div')
      div.innerHTML = this.event['description_' + this.$i18n.locale]
      let desc = div.textContent || div.innerText || ''
      // Keep newlines by not escaping them
      desc = desc.replaceAll('\n', '\\' + 'n')
      // \u000D\u000A is Unicode for CRLF, split lines should start with a
      // space
      desc = desc.replace(/(.{62})/, '$1\u000D\u000A ')
      desc = desc.replace(/(.{74})/g, '$1\u000D\u000A ')
      let icsFile = null
      const test =
        'BEGIN:VCALENDAR\u000D\u000A' +
        'CALSCALE:GREGORIAN\u000D\u000A' +
        'METHOD:PUBLISH\u000D\u000A' +
        'PRODID:JOSA\u000D\u000A' +
        'VERSION:2.0\u000D\u000A' +
        'BEGIN:VEVENT\u000D\u000A' +
        'UID:event-' +
        this.event.id +
        '\u000D\u000A' +
        'DTSTAMP:' +
        this.convertDate(this.event.published_at) +
        '\u000D\u000A' +
        'DTSTART:' +
        this.convertDate(this.event.startDate) +
        '\u000D\u000A' +
        'DTEND:' +
        this.convertDate(this.event.endDate) +
        '\u000D\u000A' +
        'SUMMARY:' +
        this.event['title_' + this.$i18n.locale] +
        '\u000D\u000A' +
        'DESCRIPTION:' +
        desc +
        '\u000D\u000A' +
        'END:VEVENT\u000D\u000A' +
        'END:VCALENDAR'
      const data = new Blob([test], {
        type: 'text/calendar',
      })
      if (icsFile !== null) {
        window.URL.revokeObjectURL(icsFile)
      }
      icsFile = window.URL.createObjectURL(data)
      const link = document.querySelector(id)
      link.href = icsFile
      link.download()
    },
  },
}
</script>

<style lang="postcss" scoped>
.text {
  @apply text-lg text-center;
}

.list {
  @apply origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white;
  z-index: 999;
}

.list-text:hover {
  @apply text-josa-blue;
}

.list-text {
  @apply text-josa-black block px-4 py-2 text-lg;
}

[dir='ltr'] .icon {
  @apply w-5 ml-2 mr-0;
}

[dir='rtl'] .icon {
  @apply w-5 mr-2 ml-0;
}
</style>
