<template>
  <div class="registration-form">
    <h3>{{ $t('events.register') }}</h3>
    <p>{{ $t('events.registerDesc') }}</p>
    <div class="block py-4">
      <hr />
    </div>
    <p v-if="status === 'success'" class="success mb-4">
      {{ $t('events.registerSuccess') }}
    </p>
    <p v-if="status === 'fail'" class="fail mb-4">
      {{ $t('events.registerFail') }}
    </p>
    <p v-if="status === 'exist'" class="success mb-4">
      {{ $t('events.registerExist') }}
    </p>
    <form @submit.prevent="register">
      <appControlInput
        id="firstName"
        v-model="form.firstName"
        control-type="input"
        required
      >
        {{ $t('meta.firstName') }}
      </appControlInput>
      <appControlInput
        id="lastName"
        v-model="form.lastName"
        control-type="input"
        required
      >
        {{ $t('meta.lastName') }}
      </appControlInput>
      <appControlInput
        id="email"
        v-model="form.email"
        control-type="email"
        required
        >{{ $t('meta.email') }}
      </appControlInput>
      <appButton btn-style="button-sharp button-dark-blue-full" class="mt-4"
        >{{ $t('button.register') }}
      </appButton>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EventRegisterationForm',
  components: {
    appControlInput: () =>
      import('@/components/FormComponents/AppControlInput'),
    appButton: () => import('@/components/FormComponents/AppButton'),
  },
  props: {
    eventId: {
      type: Number,
      required: true,
    },
    registrants: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      status: null,
      form: {
        email: '',
        firstName: '',
        lastName: '',
      },
      registrantsArray: this.registrants,
    }
  },
  computed: {
    ifRegisterd() {
      return this.registrants.some((r) => r.email === this.form.email)
    },
  },
  methods: {
    async register() {
      if (this.ifRegisterd) {
        this.status = 'exist'
      } else {
        const registrant = {
          firstName: this.form.firstName,
          LastName: this.form.lastName,
          email: this.form.email,
        }
        const response = await this.$axios.put(
          `/api/events/${this.eventId}/register`,
          registrant
        )

        this.status = 'success'
        this.registrantsArray = response.data.registrants
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.registration-form {
  @apply bg-josa-warm-grey-light p-8 align-top;
}

hr {
  @apply border-josa-warm-grey-dark;
}

/deep/ label {
  @apply mb-1;
}
</style>
