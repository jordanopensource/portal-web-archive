export default {
  setBlogs(state, blogs) {
    state.loadedBlogs = blogs
  },
  setCurrentPage(state , count) {
    state.currentPage = count
  },
  setFeaturedBlogs(state, featuredBlogID) {
    state.featuredBlogs.add(featuredBlogID)
  },
}
