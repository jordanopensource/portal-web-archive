<template>
  <div class="career-page">
    <!-- Banner -->
    <pageBanner :page-meta="careerMeta" />
    <!-- Menu -->
    <div class="bg-josa-black py-8">
      <div class="container">
        <div class="px-6 md:px-12 flex flex-col sm:flex-row">
          <span
            :class="activeCat == 'all' ? 'active' : ''"
            class="cat-link"
            @click="setActiveCat('all')"
            >{{ $t('careers.all') }}</span
          >
          <span
            v-for="cat in careerCategories"
            :key="cat.id"
            :class="activeCat == cat.name ? 'active' : ''"
            class="cat-link"
            @click="setActiveCat(cat.name)"
            >{{ cat['title_' + $i18n.locale] }}</span
          >
        </div>
      </div>
    </div>
    <!-- Preview -->
    <div class="container pb-20">
      <div v-for="cat in careerCategories" :key="cat.id">
        <careerList
          v-if="activeCat == 'all' || activeCat == cat.name"
          class="career-list"
          :career-type="cat.name"
          :title="cat['title_' + $i18n.locale]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  components: {
    careerList: () => import('@/components/Careers/CareerList'),
    pageBanner: () => import('@/components/UI/PageBanner'),
  },
  layout: 'default',
  async asyncData(context) {
    const pageMeta = await axios.get(
      process.env.baseUrl + '/page-metas?pageId=careers'
    )
    const cats = await axios.get(process.env.baseUrl + '/career-types')
    return {
      careerMeta: pageMeta.data[0],
      careerCategories: cats.data,
    }
  },
  data() {
    return {
      title: "JOSA's Careers",
      activeCat: 'all',
    }
  },
  head() {
    const i18nSeo = this.$nuxtI18nSeo()
    return {
      title:
        this.careerMeta['title_' + this.$i18n.locale] +
        ' - ' +
        (this.$i18n.locale === 'ar'
          ? 'الجمعية الأردنية للمصدر المفتوح'
          : 'Jordan Open Source Association'),
      meta: [
        {
          hid: 'careers',
          name: 'careers',
        },
        {
          name: 'description',
          content: this.careerMeta['metaDescription_' + this.$i18n.locale]
            ? this.careerMeta['metaDescription_' + this.$i18n.locale]
            : '',
        },
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

<style lang="postcss" scoped>
.career-list {
  @apply px-6 mt-20;
}

@screen md {
  .career-list {
    @apply px-12;
  }
}
</style>
