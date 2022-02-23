<template>
  <div class="event-page">
    <!-- Banner -->
    <pageBanner :page-meta="eventMeta" />
    <!-- Menu -->
    <div class="bg-josa-black py-8">
      <div class="container">
        <div class="px-6 md:px-12 flex flex-col sm:flex-row">
          <span
            :class="activeCat == 'all' ? 'active' : ''"
            class="cat-link"
            @click="setActiveCat('all')"
            >{{ $t('eventCats.all') }}</span
          >
          <span
            v-for="cat in eventCategories"
            :key="cat.id"
            :class="activeCat == cat.name ? 'active' : ''"
            class="cat-link"
            @click="setActiveCat(cat.name)"
            >{{ cat['title_' + $i18n.locale] }}</span
          >
        </div>
      </div>
    </div>
    <!-- Upcoming Events -->
    <div class="container pb-8 mt-20">
      <div class="px-6 md:px-12">
        <h2 class="mb-8">{{ $t('events.upcoming') }}</h2>
        <eventListUpcoming v-if="activeCat == 'all'" category="all" />
        <template v-for="cat in eventCategories">
          <eventListUpcoming
            v-if="activeCat == cat.name"
            :key="cat.id"
            :category="cat.name"
          />
        </template>
      </div>
    </div>
    <!-- Previous Events -->
    <div class="container pb-8 mt-20">
      <div class="px-6 md:px-12">
        <h2 class="mb-8">{{ $t('events.previous') }}</h2>
        <eventListPrevious v-if="activeCat == 'all'" category="all" />
        <template v-for="cat in eventCategories">
          <eventListPrevious
            v-if="activeCat == cat.name"
            :key="cat.id"
            :category="cat.name"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    eventListUpcoming: () => import('@/components/Events/EventList'),
    eventListPrevious: () => import('@/components/Events/EventListPrevious'),
    pageBanner: () => import('@/components/UI/PageBanner'),
  },
  layout: 'default',
  async asyncData({ $axios }) {
    const pageMeta = await $axios.get('/api/page-metas?pageId=event')
    const cats = await $axios.get('/api/event-categories')
    return {
      eventMeta: pageMeta.data[0],
      eventCategories: cats.data,
    }
  },
  data() {
    return {
      activeCat: 'all',
    }
  },
  head() {
    const i18nSeo = this.$nuxtI18nHead({
      addDirAttribute: true,
      addSeoAttributes: true,
    })
    return {
      title:
        this.eventMeta['title_' + this.$i18n.locale] +
        ' - ' +
        (this.$i18n.locale === 'ar'
          ? 'الجمعية الأردنية للمصدر المفتوح'
          : 'Jordan Open Source Association'),
      meta: [
        {
          name: 'description',
          content: this.eventMeta['metaDescription_' + this.$i18n.locale]
            ? this.eventMeta['metaDescription_' + this.$i18n.locale]
            : this.eventMeta['description_' + this.$i18n.locale],
        },
        ...this.$options.filters.ogTags(
          'page',
          this.eventMeta,
          this.$route.path,
          this.$i18n.locale
        ),
        ...i18nSeo.meta,
      ],
    }
  },
  methods: {
    setActiveCat(cat) {
      this.activeCat = cat
    },
  },
}
</script>
