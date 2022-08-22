<template>
  <div>
    <template v-for="article in articles">
      <articlePreview
        :id="article.id"
        :key="article.id"
        :article="article"
      />
    </template>
  </div>
</template>

<script>
export default {
  components: {
    articlePreview: () => import("@/components/Blog/ArticlePreview.vue"),
  },
  props: {
    articles: {
      type: Array,
      required: true
    }
  },
}
</script>

<style scoped>

</style>