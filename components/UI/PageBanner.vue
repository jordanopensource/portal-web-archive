<template>
  <div id="banner" class="bg-josa-warm-grey-light">
    <div class="container">
      <div
        class="
          flex flex-row
          justify-between
          align-middle
          flex-wrap
          sm:flex-nowrap
          py-12
          md:py-6
          px-6
          md:px-12
          bg-josa-warm-grey-light
        "
      >
        <div class="my-auto sm:max-w-1/2 lg:max-w-1/3">
          <h1 class="mb-16">{{ pageMeta['title_' + $i18n.locale] }}</h1>
          <p
            v-if="pageMeta['description_' + $i18n.locale]"
            class="ltr:leading-normal rtl:leading-relaxed"
          >
            {{ pageMeta['description_' + $i18n.locale] }}
          </p>
        </div>
        <appImage
          v-if="pageMeta.image"
          :image="pageMeta.image"
          class="bot mt-8 md:ltr:pl-8 md:rtl:pr-8 md:py-8"
          :lazy-load="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageBanner',
  components: {
    appImage: () => import('~/components/UI/appImage'),
  },
  props: {
    pageMeta: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="postcss" scoped>
.bot {
  @apply h-auto;
  width: 320px;
}

@screen lg {
  .bot {
    width: 350px;
  }
}
</style>
