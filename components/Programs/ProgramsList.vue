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
    programPreview: () => import('~/components/Programs/ProgramPrevie'),
  },
  props: {
    programs: {
      type: Array,
      required: true,
    },
  },
}
</script>
