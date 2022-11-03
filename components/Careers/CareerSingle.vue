<template>
  <section>
    <div class="container">
      <div class="py-12 px-6 md:px-12">
        <div class="">
          <span
            v-for="type in career.career_types"
            :key="type.id"
            class="text-josa-blue mb-2"
          >
            {{
              type.id === lastCareerType[0].id
                ? `${type['title_' + $i18n.locale]}`
                : `${type['title_' + $i18n.locale]} / `
            }}
          </span>
        </div>
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
            <div
              v-if="career['description_' + $i18n.locale]"
              class="description py-8"
              v-html="career['description_' + $i18n.locale]"
            ></div>
          </div>
          <div class="w-full md:w-2/5 mb-8">
            <infoCard class="mb-8" :career="career" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CareerSingle',
  components: {
    appImage: () => import('~/components/UI/appImage'),
    infoCard: () => import('~/components/Careers/InfoCard'),
  },
  props: {
    career: {
      type: Object,
      required: true,
    },
  },
  data({ $config: { bucketUrl } }) {
    return {
      placeholderImage: `${bucketUrl}/josabots_88f0a93786.jpeg`,
      lastCareerType: this.career.career_types.slice(-1),
    }
  },
}
</script>

<style lang="postcss" scoped>
section {
  @apply bg-white;
}

.thumbnail {
  @apply w-full;
}

.description >>> p,
.description >>> h3 {
  @apply mb-4;
}
</style>
