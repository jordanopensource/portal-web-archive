<!-- Fetch and list publications based on publication categories-->
<template>
  <section v-if="ifNotEmpty()">
    <div v-if="featured">
      <h5 class="py-2 lg:pt-0 text-josa-blue">{{ title }}</h5>
      <publicationFeatured
        v-for="publication in loadedPublications"
        :id="publication.id"
        :key="publication.id"
        :publication="publication"
      />
    </div>
    <div v-else>
      <h2>{{ title }}</h2>
      <publicationPreview
        v-for="publication in loadedPublications"
        :id="publication.id"
        :key="publication.id"
        :publication="publication"
      />
      <!-- Pagination -->
      <div
        v-if="pageCount > 1"
        class="pagination pt-6 text-center border-t border-dotted"
      >
        <span v-if="currentPage > 1" class="py-2"
          ><a @click="fetchCurrentPage(currentPage - 1)">{{
            $t('pagination.prev')
          }}</a></span
        >
        <span class="py-2 inline-flex ltr:text-left rtl:text-right"
          ><a
            v-for="i in pageCount"
            :key="i"
            class="p-2"
            :class="i == currentPage ? 'active' : ''"
            @click="fetchCurrentPage(i)"
            >{{ $t(i) }}</a
          ></span
        >
        <span v-if="currentPage < pageCount" class="py-2"
          ><a @click="fetchCurrentPage(currentPage + 1)">{{
            $t('pagination.next')
          }}</a></span
        >
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import publicationPreview from '@/components/Publications/PublicationPreview'
import publicationFeatured from '@/components/Publications/PublicationFeatured'
export default {
  name: 'PublicationList',
  components: {
    publicationPreview,
    publicationFeatured,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      default: 10,
    },
    category: {
      type: String,
      default: 'all',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sortBy: 'publishDate:DESC',
      loadedPublications: [],
      currentPage: 1,
      start: 0,
      count: 0,
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.count / this.limit)
    },
  },
  created() {
    this.fetchPublications()
    this.countPublications()
  },
  methods: {
    fetchCurrentPage(i) {
      this.currentPage = i
      this.start = this.limit * (this.currentPage - 1)
      this.fetchPublications()
    },
    query() {
      const args = []
      let query = ''
      if (this.start) {
        const q = '_start=' + this.start
        args.push(q)
      }
      if (this.limit) {
        const q = '_limit=' + this.limit
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
      if (this.featured) {
        const q = 'tags_contains=featured'
        args.push(q)
      }
      query = args.join('&')
      return query
    },
    async fetchPublications() {
      const query = this.query()
      await axios
        .get(process.env.baseUrl + '/publications?' + query)
        .then((res) => {
          const publicationsArray = []
          for (const key in res.data) {
            publicationsArray.push({
              ...res.data[key],
            })
          }
          this.loadedPublications = publicationsArray
        })
        .catch((e) => this.context.error(e))
    },
    async countPublications() {
      const args = []
      let query = ''
      if (this.category && this.category !== 'all') {
        const q = 'category.name=' + this.category
        args.push(q)
      }
      query = args.join('&')
      await axios
        .get(process.env.baseUrl + '/publications?' + query)
        .then((res) => {
          this.count = res.data.length
        })
    },
    ifNotEmpty() {
      if (
        Array.isArray(this.loadedPublications) &&
        this.loadedPublications.length
      )
        return true
      else return false
    },
    limitNumberWithinRange(num, min, max) {
      return Math.min(Math.max(parseInt(num), min), max)
    },
    calculateCurrentPage(num) {
      this.currentPage = this.limitNumberWithinRange(num, 1, this.pageCount())
      return this.currentPage
    },
  },
}
</script>

<style lang="postcss" scoped>
.pagination a.active {
  @apply text-josa-blue-veryDark;
}
</style>
