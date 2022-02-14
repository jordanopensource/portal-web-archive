<template>
  <div class="flex flex-wrap">
    <div v-if="running == true" class="w-full md:w-3/5 p-8">
      <h3>{{ event['title_' + $i18n.locale] }}</h3>
      <p class="">
        {{ $t('events.hostedBy') }}{{ event['organizers_' + $i18n.locale] }}
      </p>
      <div class="flex flex-col lg:flex-row mt-8 mb-4">
        <appImage
          v-if="event.thumbnail"
          :image="event.thumbnail"
          size="small"
          class="thumbnail w-full lg:w-1/2 lg:ltr:mr-2 lg:rtl:ml-2"
        />
        <img
          v-else
          class="thumbnail md:ltr:mr-6 md:rtl:ml-6 w-full"
          :src="placeholderImage"
        />
        <div class="w-full lg:w-1/2 lg:ltr:ml-2 lg:rtl:mr-2 mt-4">
          <p class="live text-xs uppercase mb-2">
            {{ $t('events.happening') }}
          </p>
          <p>{{ $t('events.joinCall') }}</p>
        </div>
      </div>
      <div v-if="event.onlineMeeting.password" class="block py-4">
        <hr />
      </div>
      <p v-if="event.onlineMeeting.password" class="text-xs">
        {{ $t('events.notRegistered') }}
        <span
          class="text-josa-blue cursor-pointer"
          @click="$store.dispatch('modal/setShowModal', false)"
        >
          {{ $t('events.here') }}</span
        >.
      </p>
    </div>
    <div
      v-if="running == true"
      class="join-form w-full md:w-2/5 flex-shrink-0 p-8 mb-8 md:mb-0"
    >
      <h3>{{ $t('events.join') }}</h3>
      <div class="block py-4">
        <hr />
      </div>
      <form @submit.prevent="joinMeeting">
        <appControlInput
          id="firstName"
          v-model="form.fullName"
          control-type="input"
          required
        >
          {{ $t('meta.fullName') }}
        </appControlInput>
        <appControlInput
          v-if="event.onlineMeeting.password"
          v-model="form.password"
          control-type="password"
          required
          >{{ $t('meta.password') }}
        </appControlInput>
        <appButton
          btn-style="button-sharp button-dark-blue-full"
          class="mt-4 text-xl md:text-2xl"
        >
          {{ $t('button.join') }}
          <font-awesome-icon class="icon" :icon="['fas', 'sign-in-alt']" />
        </appButton>
      </form>
    </div>
    <div v-else-if="isFinishedEvent()" class="w-full p-8">
      <h3>{{ event['title_' + $i18n.locale] }}</h3>
      <p class="">
        {{ $t('events.hostedBy') }}{{ event['organizers_' + $i18n.locale] }}
      </p>
      <div class="flex flex-col lg:flex-row mt-8 mb-4">
        <appImage
          v-if="event.thumbnail"
          :image="event.thumbnail"
          size="small"
          class="thumbnail w-full lg:w-1/2 lg:ltr:mr-2 lg:rtl:ml-2"
        />
        <img
          v-else
          class="thumbnail md:ltr:mr-6 md:rtl:ml-6 w-full"
          :src="placeholderImage"
        />
        <div class="w-full lg:w-1/2 lg:ltr:ml-2 lg:rtl:mr-2 mt-4">
          <div class="flex items-center mb-4">
            <font-awesome-icon
              class="flex ltr:mr-2 rtl:ml-2"
              :icon="['fas', 'exclamation-triangle']"
            />
            <h6 class="text-lg uppercase">{{ $t('events.hasFinished') }}</h6>
          </div>
          <p>{{ $t('events.finishedMessage') }}</p>
        </div>
      </div>
    </div>
    <div v-else class="w-full p-8">
      <h3>{{ event['title_' + $i18n.locale] }}</h3>
      <p class="">
        {{ $t('events.hostedBy') }}{{ event['organizers_' + $i18n.locale] }}
      </p>
      <div class="flex flex-col lg:flex-row mt-8 mb-4">
        <appImage
          v-if="event.thumbnail"
          :image="event.thumbnail"
          size="small"
          class="thumbnail w-full lg:w-1/2 lg:ltr:mr-2 lg:rtl:ml-2"
        />
        <img
          v-else
          class="thumbnail md:ltr:mr-6 md:rtl:ml-6 w-full"
          :src="placeholderImage"
        />
        <div class="w-full lg:w-1/2 lg:ltr:ml-2 lg:rtl:mr-2 mt-4">
          <div class="flex items-center mb-4">
            <font-awesome-icon
              class="flex ltr:mr-2 rtl:ml-2"
              :icon="['fas', 'exclamation-triangle']"
            />
            <h6 class="text-lg uppercase">{{ $t('events.notStarted') }}</h6>
          </div>
          <p>{{ $t('events.waitMessage') }}</p>
          <p class="font-bold">{{ from | dayFullDate($i18n.locale) }}</p>
          <p class="font-bold">
            {{ $t('timeCard.from') }} {{ from | time($i18n.locale) }}
            {{ $t('timeCard.to') }} {{ to | time($i18n.locale) }} ({{
              $t('timeCard.gmt')
            }}{{ to | timezone($i18n.locale) }})
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventJoinForm',
  components: {
    appControlInput: () =>
      import('@/components/FormComponents/AppControlInput'),
    appButton: () => import('@/components/FormComponents/AppButton'),
    appImage: () => import('~/components/UI/appImage'),
  },
  props: {
    event: {
      type: Object,
      required: true,
    },
    running: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  data({ $config: { bucketUrl } }) {
    return {
      form: {
        fullName: '',
        password: '',
      },
      placeholderImage: `${bucketUrl}/josabots_88f0a93786.jpeg`,
    }
  },
  methods: {
    isFinishedEvent() {
      const endDate = new Date(this.to).getTime()
      const currentDate = new Date().getTime()
      return currentDate > endDate
    },
    removeJoin() {
      this.$route.query.join = 'false'
    },
    createHash(data) {
      const crypto = require('crypto')
      const hash = crypto.createHash('sha1')
      hash.update(data)
      return hash.digest('hex')
    },
    joinMeeting() {
      const fullName = this.form.fullName.replaceAll(' ', '+')
      const meetingID = this.event.onlineMeeting.meetingID
      const attendeePW = this.event.onlineMeeting.attendeePW
      const url = this.$config.bbbAPIUrl
      const secret = this.$config.bbbAPISecret
      let call
      if (this.event.onlineMeeting.password) {
        const password = this.form.password
        call = `meetingID=${meetingID}&password=${password}&fullName=${fullName}`
      } else {
        call = `meetingID=${meetingID}&password=${attendeePW}&fullName=${fullName}`
      }
      const data = `join${call}${secret}`
      const encoded = encodeURI(data)
      const checksum = this.createHash(encoded)
      const redirect = `${url}join?${call}&checksum=${checksum}`
      window.open(redirect, '_blank')
    },
  },
}
</script>

<style lang="postcss" scoped>
.join-form {
  @apply bg-josa-warm-grey-light align-top;
}

.thumbnail {
  @apply object-cover object-center;
}

hr {
  @apply border-josa-warm-grey-dark;
}

.icon {
  @apply ml-2;
}

[dir='rtl'] .icon {
  transform: rotate(180deg);
}

@keyframes live {
  0% {
    background-color: #f8c0ac;
  }

  100% {
    background-color: #dd4814;
  }
}

.live::before {
  content: '';
  height: 14px;
  width: 14px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
  margin-left: 0px;
  vertical-align: sub;
  animation-name: live;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-fill-mode: none;
  animation-play-state: running;
}

[dir='rtl'] .live::before {
  margin-left: 6px;
  margin-right: 0;
}
</style>
