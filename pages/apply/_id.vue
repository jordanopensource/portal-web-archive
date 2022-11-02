<template>
  <div>
    <section>
      <div class="container">
        <div class="py-12 px-6 md:px-12">
          <h4 class="text-josa-blue mb-2">
            You are applying for
            {{ career.careerType['title_' + $i18n.locale] }}
          </h4>
          <div>
            <h2>{{ career['title_' + $i18n.locale] }}</h2>
            <p v-if="career.status == false" class="closed">
              {{ $t('meta.closed') }}
            </p>
          </div>
          <div class="content flex flex-wrap md:flex-nowrap mt-12">
            <div class="w-full md:w-3/5 md:ltr:mr-8 md:rtl:ml-8 mb-8">
              <appImage
                v-if="career.thumbnail"
                :image="career.thumbnail"
                size="large"
                class="thumbnail"
              />
              <img
                v-else
                class="thumbnail md:ltr:mr-6 md:rtl:ml-6 w-full"
                :src="placeholderImage"
              />
              <div class="my-4">
                <ApplyForm :career-object="career"></ApplyForm>
              </div>
            </div>
            <div class="w-full md:w-2/5 mb-8">
              <infoCard class="mb-8" :career="career" :with-button="false" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  components: {
    ApplyForm: () => import('~/components/Careers/ApplyForm'),
    appImage: () => import('~/components/UI/appImage'),
    infoCard: () => import('~/components/Careers/InfoCard'),
  },
  async asyncData({ params, $axios, error }) {
    try {
      const response = await $axios.get(`/api/careers/${params.id}`)
      return { career: response.data }
    } catch (err) {
      error({ statusCode: 404, message: 'Not found' })
    }
  },
  head() {
    const i18nSeo = this.$nuxtI18nHead({
      addDirAttribute: true,
      addSeoAttributes: true,
    })
    return {
      title:
        this.pageTitle +
        ' - ' +
        (this.$i18n.locale === 'ar'
          ? 'الجمعية الأردنية للمصدر المفتوح'
          : 'Jordan Open Source Association'),
      meta: [
        {
          name: 'description',
          content: this.career['metaDescription_' + this.$i18n.locale]
            ? this.career['metaDescription_' + this.$i18n.locale]
            : '',
        },
        ...this.$options.filters.ogTags(
          'career',
          this.career,
          this.$route.path,
          this.$i18n.locale
        ),
        ...i18nSeo.meta,
      ],
    }
  },
  computed: {
    pageTitle() {
      return `Apply for ${this.career['title_' + this.$i18n.locale]}`
    },
  },
}
</script>

<style lang="postcss">
.thumbnail {
  @apply w-full;
}

.description >>> p,
.description >>> h3 {
  @apply mb-4;
}
</style>
