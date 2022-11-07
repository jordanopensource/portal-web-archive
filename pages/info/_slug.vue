<template>
  <div>
    <pageBanner :page-meta="pageContent" />
    <div class="container py-20">
      <div
        v-if="ifNotEmpty()"
        class="px-6 md:px-12 flex flex-wrap md:flex-nowrap"
      >
        <!-- Sections Menu -->
        <div
          class="sections-menu md:ltr:pr-12 md:rtl:pl-12 pb-8 md:pb-0 w-full md:w-1/4 flex-shrink-0"
        >
          <div
            v-for="section in pageContent.section"
            :key="section.sectionId"
            @click="
              setActiveSection(section.sectionId)
              sectionDepth++
            "
          >
            <nuxt-link
              event=""
              :to="'#' + section.sectionId"
              class="section-link"
              :class="activeSection == section.sectionId ? 'active' : ''"
            >
              <span v-if="section['title_' + $i18n.locale]">{{
                section['title_' + $i18n.locale]
              }}</span>
              <span v-else></span>
            </nuxt-link>
          </div>
        </div>
        <!-- Section Content -->
        <template v-for="section in pageContent.section">
          <div
            v-if="activeSection == section.sectionId"
            :key="section.sectionId"
            class="section-content flex-grow"
          >
            <span
              v-if="section['description_' + $i18n.locale]"
              v-html="section['description_' + $i18n.locale]"
            ></span>
            <span v-else></span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    pageBanner: () => import('~/components/UI/PageBanner'),
  },
  layout: 'default',
  async asyncData({ params, error, $axios }) {
    try {
      const response = await $axios.get(`/api/info-pages?pageId=${params.slug}`)

      const ifSections = !!(
        Array.isArray(response.data[0].section) &&
        response.data[0].section.length
      )
      const activeSec = ifSections ? response.data[0].section[0].sectionId : ''
      return {
        pageContent: response.data[0],
        activeSection: activeSec,
      }
    } catch (err) {
      error({ statusCode: 404, message: 'Not found' })
    }
  },
  data() {
    return {
      sectionDepth: 0,
    }
  },
  head() {
    const i18nSeo = this.$nuxtI18nHead({
      addDirAttribute: true,
      addSeoAttributes: true,
    })
    return {
      title:
        this.pageContent['title_' + this.$i18n.locale] +
        ' - ' +
        (this.$i18n.locale === 'ar'
          ? 'الجمعية الأردنية للمصدر المفتوح'
          : 'Jordan Open Source Association'),
      meta: [
        {
          name: 'description',
          content: this.pageContent['description_' + this.$i18n.locale]
            ? this.pageContent['description_' + this.$i18n.locale]
            : '',
        },
        ...this.$options.filters.ogTags(
          'info',
          this.pageContent,
          this.$route.path,
          this.$i18n.locale
        ),
        ...i18nSeo.meta,
      ],
    }
  },
  mounted() {
    this.getSection()
    window.onpopstate = (event) => {
      this.getSection(event)
    }
  },
  methods: {
    setActiveSection(section, isBack) {
      // this makes sure that clicking on the browser's back
      // button won't create another history entry
      if (!isBack) {
        if (this.sectionDepth !== 0) {
          window.history.pushState(
            {},
            window.title,
            this.$route.path + '#' + section
          )
        } else {
          window.history.replaceState(
            {},
            window.title,
            this.$route.path + '#' + section
          )
          this.sectionDepth++
        }
      }
      this.activeSection = section
    },
    getSection(event) {
      const urlFragmentId = this.$route.hash
      if (urlFragmentId !== '') {
        this.setActiveSection(urlFragmentId.replace('#', ''), event)
      } else {
        this.setActiveSection(this.activeSection, event)
      }
    },
    ifNotEmpty() {
      if (
        Array.isArray(this.pageContent.section) &&
        this.pageContent.section.length
      )
        return true
      else return false
    },
  },
}
</script>

<style lang="postcss" scoped>
.section-link {
  @apply text-josa-warm-grey-dark cursor-pointer relative mb-3 leading-relaxed;
}

.section-link:hover,
.section-link.active {
  @apply text-black;
}

.section-link:hover:before,
.section-link.active:before {
  @apply bg-blue-300 h-full w-2 block absolute;
  content: '';
}

[dir='ltr'] .section-link:hover:before,
[dir='ltr'] .section-link.active:before {
  left: -8px;
}

[dir='rtl'] .section-link:hover:before,
[dir='rtl'] .section-link.active:before {
  right: -8px;
}

[dir='ltr'] .section-link {
  @apply pl-2;
}

[dir='rtl'] .section-link {
  @apply pr-2;
}

.section-content >>> p {
  @apply mb-4;
}
</style>
