export default {
  setBlogs(state, blogs) {
    state.loadedBlogs = blogs
  },
  setFeaturedBlogs(state, featuredBlogID) {
    state.featuredBlogs.add(featuredBlogID)
  },
}
