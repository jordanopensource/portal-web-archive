<template>
  <div class="download-card">
    <font-awesome-icon
      class="icon ltr:mr-3 rtl:ml-3"
      :icon="['fas', 'download']"
    />
    <div>
      <h5 class="leading-none mb-1">{{ $t('meta.readTheReport') }}</h5>
      <a :href="fileLink" target="_blank">{{ $t('meta.download') }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DownloadCard',
  props: {
    fileLink: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="postcss" scoped>
.download-card {
  @apply bg-josa-warm-grey-light p-8 flex align-top;
}

.icon {
  @apply text-josa-warm-grey-dark text-2xl;
}

a {
  @apply text-josa-blue;
}
</style>
