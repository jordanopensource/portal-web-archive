<template>
  <div class="join-form-card">
    <div>
      <div class="w-full lg:ltr:ml-2 lg:rtl:mr-2 mt-4">
        <p class="live text-xs uppercase mb-2">{{ $t('events.happening') }}</p>
        <p>{{ $t('events.joinCall') }}</p>
      </div>
      <div v-if="event.onlineMeeting.password" class="block py-4">
        <hr />
      </div>
      <p v-if="event.onlineMeeting.password" class="text-xs">
        {{ $t('events.notRegistered') }}
        <span
          class="text-josa-blue cursor-pointer"
          @click="$store.dispatch('setShowModal', false)"
        >
          {{ $t('events.here') }}</span
        >.
      </p>
      <div class="join-form w-full lg:ltr:ml-2 lg:rtl:mr-2 mt-4">
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
            <font-awesome-icon
              class="buttonicon"
              :icon="['fas', 'sign-in-alt']"
            />
          </appButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JoinFormCard',
  components: {
    appControlInput: () =>
      import('@/components/FormComponents/AppControlInput'),
    appButton: () => import('@/components/FormComponents/AppButton'),
  },
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        fullName: '',
        password: '',
      },
    }
  },
  methods: {
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
.join-form-card {
  @apply bg-josa-warm-grey-light p-8 flex align-top;
}

.icon {
  @apply text-josa-warm-grey-dark text-2xl;
}

.buttonicon {
  @apply ml-2;
}

.join-form {
  @apply bg-josa-warm-grey-light align-top;
}

hr {
  @apply border-josa-warm-grey-dark;
}

[dir='rtl'] .icon {
  transform: rotate(180deg);
}

@keyframes live {
  0% {
    @apply bg-red-300;
  }

  100% {
    background-color: #dd4814;
  }
}

.live::before {
  @apply h-3 w-3 inline-block mr-1 ml-0;
  content: '';
  border-radius: 50%;
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
  @apply ml-1 mr-0;
}
</style>
