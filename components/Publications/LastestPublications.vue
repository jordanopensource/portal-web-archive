<!-- Fetch and list publications based on publication categories-->
<template>
  <section v-if="ifNotEmpty()">
    <div class="flex flex-wrap md:flex-nowrap justify-between items-baseline">
      <h2>{{ title }}</h2>
      <nuxt-link :to="localePath('publications')">
        <h6 class="display-more">
          {{ $t('publication.all') }}
          <font-awesome-icon
            class="ltr:ml-2 rtl:mr-2 align-middle"
            :icon="['fas', arrowIcon]"
          />
        </h6>
      </nuxt-link>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-20">
      <publicationCompact
        v-for="publication in loadedPublications"
        :id="publication.id"
        :key="publication.id"
        class="mt-8 md:my-12"
        :publication="publication"
      />
    </div>
  </section>
</template>

<script>
export default {
  components: {
    publicationCompact: () =>
      import('@/components/Publications/PublicationCompact'),
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    numberOfPublications: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      default: 'all',
    },
  },
  data() {
    return {
      sortBy: 'publishDate:DESC',
      loadedPublications: [],
    }
  },
  async fetch() {
    const query = this.query()
    const response = await this.$axios.get(`/api/publications?${query}`)

    const publicationsArray = []
    for (const key in response.data) {
      publicationsArray.push({
        ...response.data[key],
      })
    }
    this.loadedPublications = publicationsArray
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
  methods: {
    query() {
      const args = []
      let query = ''
      if (this.numberOfPublications > 0) {
        const q = '_limit=' + this.numberOfPublications
        args.push(q)
      }
      if (this.sortBy) {
        const q = '_sort=' + this.sortBy
        args.push(q)
      }
      if (this.category && this.category !== 'all') {
        const q = 'category.name=' + this.category
        args.push(q)
      }
      query = args.join('&')
      return query
    },
    ifNotEmpty() {
      if (
        Array.isArray(this.loadedPublications) &&
        this.loadedPublications.length
      ) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>
