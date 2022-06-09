<template>
  <form class="bg-josa-warm-grey p-8" @submit.prevent="onSubmit">
    <AppControlInput v-model="form.subject" required>{{
      $t('feedback.form.subject')
    }}</AppControlInput>
    <AppControlInput v-model="form.description" control-type="textarea" required
      >{{ $t('feedback.form.inquiry') }}
    </AppControlInput>
    <AppControlInput v-model="form.name">{{
      $t('feedback.form.name')
    }}</AppControlInput>
    <AppControlInput v-model="form.email" control-type="email">{{
      $t('feedback.form.email')
    }}</AppControlInput>
    <div class="ltr:text-right rtl:text-left">
      <AppButton btn-style="button-flat" type="submit">{{
        $t('feedback.form.submit')
      }}</AppButton>
    </div>
    <client-only>
      <notifications classes="my-style" group="feedback" />
    </client-only>
  </form>
</template>

<script>
export default {
  name: 'FeedbackForm',
  components: {
    AppControlInput: () =>
      import('@/components/FormComponents/AppControlInput'),
    AppButton: () => import('@/components/FormComponents/AppButton'),
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        description: '',
      },
    }
  },
  methods: {
    async onSubmit() {
      await this.$axios
        .post(
          '/ots/tickets',
          {
            title: `${this.form.subject}`,
            group: `${this.$config.otsFormGroup}`,
            customer_id: `guess:${this.form.email}`,
            article: {
              from: `${this.form.email}`,
              subject: `${this.form.subject}`,
              internal: false,
              sender: 'Customer',
              type: 'web',
              body: `${this.form.description}`,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${this.$config.otsToken}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            this.$notify({
              group: 'feedback',
              type: 'success',
              title: 'Your inquiry has been sent',
              text: 'We will get back to you as soon as possible.',
              width: '35%',
            })
          } else {
            this.$notify({
              group: 'feedback',
              type: 'error',
              text: 'There was an error while sending your inquiry, please try again later.',
              width: '35%',
            })
          }
        })
    },
  },
}
</script>

<style lang="scss">
.my-style {
  padding: 10px;
  margin: 0 5px 5px;
  font-size: 12px;
  color: #ffffff;
  background: #44a4fc;
  border-left: 5px solid #187fe7;
  .notification-title {
    font-size: 1.1rem;
  }
  .notification-content {
    font-size: 1rem;
  }
  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }
  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }
  &.success {
    background: #68cd86;
    border-left-color: #42a85f;
  }
}
</style>
