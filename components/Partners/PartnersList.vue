<!-- Fetch and list partner based on partner categories-->
<template>
  <div v-if="ifNotEmpty()">
    <h2>{{ title }}</h2>
    <partnerPreview
      v-for="partner in loadedPartners"
      :id="partner.id"
      :key="partner.id"
      :partner="partner"
    />
  </div>
</template>

<script>
export default {
  components: {
    partnerPreview: () => import('@/components/Partners/PartnerPreview'),
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      sortBy: 'created_at:DESC',
      loadedPartners: [],
    }
  },
  async fetch() {
    await this.fetchPartners()
  },
  methods: {
    query() {
      const args = []
      let query = ''
      if (this.sortBy) {
        const q = '_sort=' + this.sortBy
        args.push(q)
      }
      query = args.join('&')
      return query
    },
    async fetchPartners() {
      const query = this.query()
      const response = await this.$axios.get(`/api/partners?${query}`)
      const partnersArray = []
      for (const key in response.data) {
        partnersArray.push({
          ...response.data[key],
        })
      }
      this.loadedPartners = partnersArray
    },
    ifNotEmpty() {
      if (Array.isArray(this.loadedPartners) && this.loadedPartners.length)
        return true
      else return false
    },
  },
}
</script>
