<template>
  <div class="flex flex-wrap items-stretch text-xl">
    <a
      class="share-button"
      :href="'https://twitter.com/share?url=' + url"
      target="_blank"
    >
      <font-awesome-icon :icon="['fab', 'twitter']" :size="faSize" />
    </a>
    <a
      class="share-button"
      :href="'https://www.linkedin.com/shareArticle?url=' + url"
      target="_blank"
    >
      <font-awesome-icon :icon="['fab', 'linkedin']" :size="faSize" />
    </a>
    <a
      class="share-button"
      :href="'https://www.facebook.com/sharer.php?u=' + url"
      target="_blank"
    >
      <font-awesome-icon :icon="['fab', 'facebook-square']" :size="faSize" />
    </a>
    <span class="share-button tooltip" @click="copyToClipboard(url)">
      <font-awesome-icon icon="link" :size="faSize" />
      <span ref="copyButton" class="copy-tooltip-text invisible"></span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ShareButtons',
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      faSize: 'lg',
    }
  },
  methods: {
    copyToClipboard(str) {
      const copyTooltip = this.$refs.copyButton
      const e = this.$options.filters.copyString(str)
      if (e) {
        copyTooltip.classList.toggle('invisible')
        copyTooltip.innerText = this.$t('tooltip.copied')
        setTimeout(() => {
          copyTooltip.classList.toggle('invisible')
          copyTooltip.innerText = ''
        }, 1000)
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.share-button {
  @apply text-josa-warm-grey-dark cursor-pointer;
}

.share-button:hover {
  @apply text-josa-blue;
}

[dir='ltr'] .share-button {
  @apply ml-4 mr-0;
}

[dir='rtl'] .share-button {
  @apply mr-4 ml-0;
}
</style>
