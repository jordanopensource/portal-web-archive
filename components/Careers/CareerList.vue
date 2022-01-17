<!-- Fetch and list careers based on career types-->
<template>
  <section v-if="ifNotEmpty()">
    <h2 v-if="title">{{ title }}</h2>
    <careerPreview
      v-for="career in loadedCareers"
      :id="'career' + career.id"
      :key="career.id"
      :career="career"
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
  </section>
</template>

<script>
export default {
  name: 'CareerList',
  components: {
    careerPreview: () => import('@/components/Careers/CareerPreview'),
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    careerType: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      sortBy: 'publishDate:DESC',
      loadedCareers: [],
      currentPage: 1,
      start: 0,
      count: 0,
    }
  },
  async fetch() {
    await this.fetchCareers()
    await this.countCareers()
  },
  computed: {
    pageCount() {
      return Math.ceil(this.count / this.limit)
    },
  },
  methods: {
    async fetchCurrentPage(i) {
      this.currentPage = i
      this.start = this.limit * (this.currentPage - 1)
      await this.fetchCareers()
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
      if (this.careerType && this.careerType !== 'all') {
        const q = 'careerType.name=' + this.careerType
        args.push(q)
      }
      query = args.join('&')
      return query
    },
    async fetchCareers() {
      const query = this.query()
      const response = await this.$axios.get(`/api//careers?${query}`)

      const careersArray = []
      for (const key in response.data) {
        careersArray.push({
          ...response.data[key],
        })
      }
      this.loadedCareers = careersArray
    },
    async countCareers() {
      const args = []
      let query = ''
      if (this.careerType && this.careerType !== 'all') {
        const q = 'careerType.name=' + this.careerType
        args.push(q)
      }
      query = args.join('&')
      const response = await this.$axios.get(`/api/careers?${query}`)

      this.count = response.data.length
    },
    ifNotEmpty() {
      if (Array.isArray(this.loadedCareers) && this.loadedCareers.length)
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
