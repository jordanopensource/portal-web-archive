<template>
  <div>
    <programPreview
      v-for="program in programs"
      :id="'program-' + program.id"
      :key="program.id"
      :program="program"
      class="my-8 last:mb-0"
    />
  </div>
</template>

<script>
export default {
  name: 'ProgramsList',
  components: {
    programPreview: () => import('~/components/Programs/ProgramPreview'),
  },
  props: {
    programs: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>
