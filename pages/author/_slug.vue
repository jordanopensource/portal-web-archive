<template>
  <div class="author-page">
    <authorProfile :author="author" />
      <blogList
        class="blog-list"
        :category="'all'"
        :language="$i18n.locale"
        :author-id="author.id"
      />
  </div>
</template>

<script>
export default {
    components: {
      authorProfile: () => import("@/components/Author/AuthorProfile.vue"),
    },
    async asyncData({ $axios, error, params }) {
    const response = await $axios.get(`/api/authors/?id=${params.slug}`);
    if (response.data[0]) {
      return {
        author: response.data[0],
      }
    } else {
      error({ statusCode: 404, message: 'Not found' })
    }
  },
}
</script>

<style lang="postcss" scoped>
.blog-list {
  @apply px-6 mt-20;
}

@screen md {
  .blog-list {
    @apply px-12;
  }
}
</style>
