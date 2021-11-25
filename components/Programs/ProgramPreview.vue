<template>
  <div>
    <nuxt-link :to="programLink">
      <appImage
        v-if="program.picture"
        class="mb-4 image"
        :image="program.picture"
      />
      <h3>
        {{
          program['title_' + $i18n.locale]
            ? program['title_' + $i18n.locale]
            : program['title_en']
        }}
      </h3>
    </nuxt-link>
    <p class="my-4">
      {{
        program['description_' + $i18n.locale]
          ? program['description_' + $i18n.locale]
          : program['description_en']
      }}
    </p>
    <nuxt-link :to="programLink" class="display-more">
      {{ $t('meta.readMore') }}
      <font-awesome-icon
        class="ltr:ml-2 rtl:mr-2 align-middle"
        :icon="['fas', arrowIcon]"
      />
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'ProgramPreview',
  components: {
    appImage: () => import('~/components/UI/appImage'),
  },
  props: {
    program: {
      type: Object,
      required: true,
    },
  },
  computed: {
    arrowIcon() {
      if (this.$i18n.locale === 'ar') {
        return 'long-arrow-alt-left'
      } else {
        return 'long-arrow-alt-right'
      }
    },
    programLink() {
      let title = ''
      if (this.program['title_' + this.$i18n.locale]) {
        title = this.program['title_' + this.$i18n.locale]
      } else {
        title = this.program.title_en
      }
      const slug = this.$options.filters.stringToSlug(title)
      return this.localePath('/programs/' + this.program.id + '/' + slug)
    },
  },
}
</script>

<style scoped>
.image {
  width: 125px;
}
</style>
