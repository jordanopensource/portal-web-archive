<template>
  <div class="preview my-8 flex flex-wrap lg:flex-nowrap">
    <appImage
      v-if="partner.logo"
      :image="partner.logo"
      size="medium"
      class="thumbnail "
    />
    <img v-else :src="placeholderImage" class="thumbnail" />
    <div class="flex-grow">
      <h3 class="mb-4">{{ partner['title_' + $i18n.locale] }}</h3>
      <p v-if="partner['description_' + $i18n.locale]">
        {{ partner['description_' + $i18n.locale] }}
      </p>
      <p v-else>{{ partner['description_' + $i18n.locale] }}</p>
      <a :href="partner.websiteUrl" target="_blank" class="py-4 display-more">
        {{ $t('meta.visitWebsite') }}
        <font-awesome-icon
          class="ltr:ml-2 rtl:mr-2 align-middle"
          :icon="['fas', arrowIcon]"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PartnerPreview',
  components: {
    appImage: () => import('~/components/UI/appImage'),
  },
  props: {
    partner: {
      type: Object,
      required: true,
    },
  },
  data({ $config: { bucketUrl } }) {
    return {
      placeholderImage: `${bucketUrl}/josabots_88f0a93786.jpeg`,
    }
  },
  computed: {
    arrowIcon() {
      if (this.$i18n.locale === 'ar') {
        return 'long-arrow-alt-left'
      } else {
        return 'long-arrow-alt-right'
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.preview .thumbnail {
  @apply object-contain bg-josa-warm-grey-light;
}
[dir='ltr'] .preview .thumbnail {
  @apply pr-0 lg:mr-6;
}

[dir='rtl'] .preview .thumbnail {
  @apply pl-0 lg:ml-6;
}
</style>
