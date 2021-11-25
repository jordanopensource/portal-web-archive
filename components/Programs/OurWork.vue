<template>
  <div id="our-work">
    <h2 v-if="title" class="pb-2">{{ title }}</h2>
    <programsList
      class="grid grid-cols-1 md:grid-cols-2 gap-x-20"
      :programs="programs"
    />
  </div>
</template>

<script>
export default {
  name: 'OurWork',
  components: {
    programsList: () => import('~/components/Programs/ProgramsList'),
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    programs: {
      type: Array,
      required: true,
    },
  },
}
</script>
