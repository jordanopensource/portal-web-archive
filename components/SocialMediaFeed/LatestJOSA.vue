<template>
  <div class="bg-josa-warm-grey">
    <h2 class="title">{{ $t('socialFeed.title') }}</h2>
    <socialFeed
      v-for="post in loadedPosts"
      :id="post.id"
      :key="post.id"
      :src="post.src"
      :text="post.text"
      :image-url="post.imageUrl"
      :time="post.time"
    />
  </div>
</template>

<script>
export default {
  name: 'LatestJOSA',
  components: {
    socialFeed: () => import('@/components/SocialMediaFeed/SocialFeed'),
  },
  computed: {
    loadedPosts() {
      const locale = this.$i18n.locale
      const posts = this.$store.getters.loadedPosts
      const localizedPosts = posts.filter((element) => element.lang === locale)
      const fbPosts = localizedPosts
        .filter((element) => element.src === 'fb')
        .slice(0, 2)
      const twPosts = localizedPosts
        .filter((element) => element.src === 'tw')
        .slice(0, 2)
      const finalPosts = fbPosts.concat(twPosts)
      return finalPosts
    },
  },
}
</script>
