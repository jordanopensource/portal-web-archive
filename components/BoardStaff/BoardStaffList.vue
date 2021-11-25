<!-- Fetch and list board and staff personnels based on role-->
<template>
  <section>
    <h2>{{ title }}</h2>
    <div v-if="compact" class="mt-8">
      <div
        v-for="personnel in loadedPersonnels"
        :id="personnel.id"
        :key="personnel.id"
      >
        {{ personnel['fullName_' + $i18n.locale] }}
      </div>
    </div>
    <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      <boardStaffSingle
        v-for="personnel in loadedPersonnels"
        :id="personnel.id"
        :key="personnel.id"
        :personnel="personnel"
      />
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'BoardStaffList',
  components: {
    BoardStaffSingle: () => import('@/components/BoardStaff/BoardStaffSingle'),
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    compact: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sortBy: 'created_at:ASC',
      loadedPersonnels: [],
    }
  },

  created() {
    this.fetchPersonnels()
  },
  methods: {
    query() {
      const args = []
      let query = ''
      if (this.sortBy) {
        const q = '_sort=' + this.sortBy
        args.push(q)
      }
      if (this.role && this.role !== 'all') {
        const q = 'role=' + this.role
        args.push(q)
      }
      query = args.join('&')
      return query
    },
    async fetchPersonnels() {
      const query = this.query()
      await axios
        .get(process.env.baseUrl + '/board-and-staffs?' + query)
        .then((res) => {
          const personnelsArray = []
          for (const key in res.data) {
            personnelsArray.push({
              ...res.data[key],
            })
          }
          this.loadedPersonnels = personnelsArray
        })
        .catch((e) => this.context.error(e))
    },
  },
}
</script>
