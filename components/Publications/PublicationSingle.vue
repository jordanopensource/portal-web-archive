<template>
  <section>
    <div class="container">
      <div class="py-12 px-6 md:px-12">
        <div class="text-josa-blue text-xl mb-2 uppercase">
          <span v-for="(topic, index) in publication.topics" :key="topic.id">
            {{ topic['title_' + $i18n.locale]
            }}{{
              index != Object.keys(publication.topics).length - 1 ? ', ' : ''
            }}
          </span>
        </div>
        <h2>{{ publication['title_' + $i18n.locale] }}</h2>
        <h3 class="mt-2">
          {{ $t('meta.by') }} {{ publication['author_' + $i18n.locale] }}
        </h3>
        <div class="content flex flex-wrap md:flex-nowrap mt-12">
          <div class="w-full md:w-3/5 md:ltr:mr-8 rtl:ml-8 mb-8">
            <shareButtons
              v-if="url"
              :url="url"
              class="mb-4 w-full justify-end"
            />
            <div
              v-if="publication['description_' + $i18n.locale]"
              class="description pb-8"
              v-html="publication['description_' + $i18n.locale]"
            ></div>
          </div>
          <div class="w-full md:w-2/5 mb-8">
            <publishDateCard class="mb-8" :date="publication.publishDate" />
            <downloadCard class="mb-8" :file-link="fileUrl" />
            <a :href="fileUrl" target="_blank"><appImage
              v-if="publication.thumbnail"
              :image="publication.thumbnail"
              size="large"
              class="thumbnail"
            />
            <img
              v-else
              class="thumbnail md:ltr:mr-6 md:rtl:ml-6 w-full"
              :src="placeholderImage"
            /></a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PublicationSingle',
  components: {
    appImage: () => import('~/components/UI/appImage'),
    publishDateCard: () => import('~/components/Publications/PublishDateCard'),
    downloadCard: () => import('~/components/Publications/DownloadCard'),
    shareButtons: () => import('~/components/ShareButtons/ShareButtons'),
  },
  props: {
    publication: {
      type: Object,
      required: true,
    },
  },
  data({ $config: { bucketUrl } }) {
    return {
      placeholderImage: `${bucketUrl}/josabots_88f0a93786.jpeg`,
      url: null,
    }
  },
  mounted() {
    this.url = window.location.href
  },
  computed: {
    fileUrl() {
      return /^https/.test(this.publication.report.url) ? this.publication.report.url : `https://${this.publication.report.url}`
    },
  },
}
</script>

<style lang="postcss" scoped>
section {
  @apply bg-white;
}

.thumbnail {
  @apply w-full border border-solid border-gray-500;
}

.description >>> p,
.description >>> h3 {
  @apply mb-4;
}
</style>
