<template>
  <div>
    <template v-for="article in articles">
      <articlePreview
        v-if="$i18n.locale == 'ar' && article.language == 'ar'"
        :id="article.id"
        :key="article.id"
        :article="article"
      />
      <articlePreview
        v-else-if="$i18n.locale == 'en' && article.language == 'en'"
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