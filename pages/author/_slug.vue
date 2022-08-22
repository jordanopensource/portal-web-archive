<template>
  <div class="author-page">
    <authorProfile :author="author"/>
  </div>
</template>

<script>
export default {
    components: {
        authorProfile: () => import("@/components/Author/AuthorProfile.vue"),
    },
    async asyncData({ $axios, error, params }) {
    const response = await $axios.get(`/api/authors/?id=${params.slug}`);
    if (response) {
      return {
        author: response.data[0],
      }
    } else {
      error({ statusCode: 404, message: 'Not found' })
    }
  },
}
</script>

<style scoped>

</style>