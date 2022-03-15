<template>
  <div class="card-background">
    <div class="recorded-card">
      <font-awesome-icon
        class="icon ltr:mr-3 rtl:ml-3"
        :icon="['fas', 'video']"
      />
      <h5>{{ $t('events.recordedEvent') }}</h5>
    </div>
    <div class="watch-button">
      <AppButton btn-style="button-flat">
        <a :href="videoURL" target="_blank">
          {{ $t('events.watchRecording') }}</a
        >
      </AppButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecordedEvent',
  components: {
    AppButton: () => import('@/components/FormComponents/AppButton'),
  },
  props: {
    videoURL: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="postcss" scoped>
.card-background {
  @apply bg-josa-warm-grey-light mt-4 p-8;
}

.recorded-card {
  @apply flex flex-row align-top;
}

.watch-button {
  padding-left: 2.35rem;
  padding-right: 2.3rem;
  @apply pt-3;
}

.icon {
  @apply text-josa-warm-grey-dark text-2xl;
}

a,
a:hover,
a:focus,
a:active {
  text-decoration: none;
  color: inherit;
}
</style>
