<template>
  <div class="bg-josa-warm-grey-light">
    <div class="container">
      <div
        class="px-6 md:px-12 p-20 flex flex-wrap md:flex-nowrap justify-between"
      >
        <div
          class="
            w-full
            sm:ltr:pr-12
            md:ltr:pr-20
            lg:ltr:pr-32
            sm:rtl:pl-12
            md:rtl:pl-20
            lg:rtl:pl-32
          "
        >
          <h1 class="my-8">{{ $t('meta.knowMoreAboutUs') }}</h1>
        </div>
        <div>
          <preview
            v-for="page in loadedPages"
            :id="page.id"
            :key="page.id"
            :page="page"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KnowMore',
  components: {
    preview: () => import('~/components/KnowMore/Preview'),
  },
  data() {
    return {
      loadedPages: [],
    }
  },
  async fetch() {
    const pageArray1 = await this.$axios.get(
      '/api/page-metas?pageId=boardandstaff&pageId=partners'
    )
    const pageArray2 = await this.$axios.get(
      '/api/info-pages?pageId=code-of-conduct'
    )
    const pagesArray = []
    for (const key in pageArray1.data) {
      pagesArray.push({
        ...pageArray1.data[key],
      })
    }
    pagesArray.push({
      ...pageArray2.data[0],
    })
    this.loadedPages = pagesArray
  },
}
</script>
