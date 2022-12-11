<template>
  <div class="board-staff-page">
    <!-- Banner -->
    <pageBanner :page-meta="boardStaffMeta" />
    <!-- Lists -->
    <div class="container pb-20">
      <boardStaffList
        class="board-staff-list"
        role="board"
        sort-by="weight:ASC"
        :title="$t('boardStaff.board')"
      />
      <boardStaffList
        class="board-staff-list"
        role="staff"
        sort-by="weight:ASC"
        :title="$t('boardStaff.staff')"
      />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    pageBanner: () => import('@/components/UI/PageBanner'),
    boardStaffList: () => import('@/components/BoardStaff/BoardStaffList'),
  },
  layout: 'default',
  async asyncData({ $axios }) {
    const pageMeta = await $axios.get('/api/page-metas?pageId=boardandstaff')
    return {
      boardStaffMeta: pageMeta.data[0],
    }
  },
  head() {
    const i18nSeo = this.$nuxtI18nHead({
      addDirAttribute: true,
      addSeoAttributes: true,
    })
    return {
      title:
        this.boardStaffMeta['title_' + this.$i18n.locale] +
        ' - ' +
        (this.$i18n.locale === 'ar'
          ? 'الجمعية الأردنية للمصدر المفتوح'
          : 'Jordan Open Source Association'),
      meta: [
        {
          name: 'description',
          content: this.boardStaffMeta['metaDescription_' + this.$i18n.locale]
            ? this.boardStaffMeta['metaDescription_' + this.$i18n.locale]
            : '',
        },
        ...this.$options.filters.ogTags(
          'page',
          this.boardStaffMeta,
          this.$route.path,
          this.$i18n.locale
        ),
        ...i18nSeo.meta,
      ],
    }
  },
}
</script>

<style lang="postcss" scoped>
.board-staff-list {
  @apply px-6 mt-20;
}

@screen md {
  .board-staff-list {
    @apply px-12;
  }
}
</style>
