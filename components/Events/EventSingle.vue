<template>
  <section>
    <div class="container">
      <div class="p-6 md:p-12">
        <h4 class="text-josa-blue mb-2">
          {{ event.startDate | dayDate($i18n.locale) }}
        </h4>
        <h2>{{ event['title_' + $i18n.locale] }}</h2>
        <div class="content flex flex-wrap md:flex-nowrap mt-12">
          <div class="w-full md:w-3/5 md:ltr:mr-8 md:rtl:ml-8 mb-8">
            <appImage
              v-if="event.thumbnail"
              :image="event.thumbnail"
              size="large"
              class="thumbnail"
              :lazy-load="false"
            />
            <img
              v-else
              class="thumbnail md:ltr:mr-6 md:rtl:ml-6 w-full"
              :src="placeholderImage"
            />
            <shareButtons
              v-if="url"
              :url="url"
              class="mt-8 w-full justify-end"
            />
            <div
              v-if="event['description_' + $i18n.locale]"
              class="description py-4 mb-4"
              v-html="event['description_' + $i18n.locale]"
            ></div>
            <speakers
              v-if="event.speakers.length > 0"
              :speakers="event.speakers"
            />
          </div>
          <div class="w-full md:w-2/5 mb-8">
            <modal
              v-if="showModal && event.onlineEvent"
              @close="showModal = false"
            >
              <slot>
                <joinForm
                  v-if="event.startDate"
                  :event="event"
                  :running="running"
                  :from="event.startDate"
                  :to="event.endDate"
                />
              </slot>
            </modal>
            <registerationForm
              v-if="!isEventFinished() && event.showRegisterationForm"
              class="mb-8"
              :event-id="event.id"
              :registrants="event.registrants"
            />
            <div v-if="event.onlineEvent && running == true" class="mb-8">
              <joinFormCard :event="event" />
            </div>
            <timeCard
              v-if="event.startDate"
              class="mb-8"
              :from="event.startDate"
              :to="event.endDate"
              :event="event"
            />
            <locationCard v-if="event.address" :address="event.address" />
            <onlineEventCard v-if="event.onlineEvent" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import speakers from '~/components/Events/Speakers.vue'
export default {
  name: 'EventSingle',
  components: {
    appImage: () => import('~/components/UI/appImage'),
    timeCard: () => import('~/components/Events/TimeCard.vue'),
    locationCard: () => import('~/components/Events/LocationCard.vue'),
    registerationForm: () => import('~/components/Events/RegisterationForm'),
    joinForm: () => import('~/components/Events/JoinForm'),
    modal: () => import('~/components/UI/Modal'),
    onlineEventCard: () => import('~/components/Events/OnlineEventCard'),
    shareButtons: () => import('~/components/ShareButtons/ShareButtons'),
    joinFormCard: () => import('~/components/Events/JoinFormCard'),
    speakers,
  },
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  data({ $config: { bucketUrl } }) {
    return {
      placeholderImage: `${bucketUrl}/josabots_88f0a93786.jpeg`,
      url: null,
      running: 'true',
    }
  },
  async fetch() {
    if (this.event.onlineMeeting.meetingID) {
      const url = this.$config.bbbAPIUrl
      const secret = this.$config.bbbAPISecret
      const meetingID = this.event.onlineMeeting.meetingID
      const data = `isMeetingRunningmeetingID=${meetingID}${secret}`
      const encoded = encodeURI(data)
      const checksum = this.createHash(encoded)
      const redirect = `${url}isMeetingRunning?meetingID=${meetingID}&checksum=${checksum}`
      const response = await this.$axios.get(redirect)
      const parser = new DOMParser()
      const xmlDOM = parser.parseFromString(response.data, 'text/xml')
      const value = xmlDOM.getElementsByTagName('running')[0]
      if (value.childNodes[0].nodeValue === 'false') {
        this.running = false
      } else {
        this.running = true
      }
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'modal/getShowModal',
    }),
  },
  mounted() {
    this.url = window.location.href
    if ('join' in this.$route.query) {
      this.$store.dispatch('modal/setShowModal', true)
    } else {
      this.$store.dispatch('modal/setShowModal', false)
    }
  },
  methods: {
    createHash(data) {
      const crypto = require('crypto')
      const hash = crypto.createHash('sha1')
      hash.update(data)
      return hash.digest('hex')
    },
    isEventFinished() {
      const currentDate = new Date()
      const endDate = new Date(this.event.endDate)

      return currentDate >= endDate
    },
  },
  fetchOnServer: false,
}
</script>

<style lang="postcss" scoped>
section {
  @apply bg-white;
}

.thumbnail {
  @apply w-full;
}

.description >>> p,
.description >>> h3 {
  @apply mb-4;
}
</style>
