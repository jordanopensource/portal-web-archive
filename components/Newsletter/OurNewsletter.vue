<template>
  <div class="bg-josa-warm-grey">
    <h2 class="title">{{ $t('newsletter.title') }}</h2>
    <div class="pb-8">
      <p>{{ $t('newsletter.text') }}</p>
    </div>
    <NewsletterForm />
  </div>
</template>

<script>
export default {
  name: 'OurNewsletter',
  components: {
    NewsletterForm: () => import('~/components/Newsletter/NewsletterForm.vue'),
  },
}
</script>
