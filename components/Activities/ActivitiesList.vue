<template>
  <div v-if="ifNotEmpty()">
    <h2>{{ title }}</h2>
    <activityPreview
      v-for="activity in orderBy(activities, 'startDate', -1)"
      :id="activity.id"
      :key="activity.id"
      :activity="activity"
    />
  </div>
</template>

<script>
import Vue2Filters from 'vue2-filters'
import activityPreview from '@/components/Activities/ActivityPreview'
export default {
  name: 'ActivitiesList',
  components: {
    activityPreview,
  },
  mixins: [Vue2Filters.mixin],
  props: {
    activities: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    ifNotEmpty() {
      if (Array.isArray(this.activities) && this.activities.length) return true
      else return false
    },
  },
}
</script>
