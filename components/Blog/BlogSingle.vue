<template>
  <article>
    <!-- Image -->
    <appImage
      v-if="article.thumbnail"
      :image="article.thumbnail"
      size="large"
      class="thumbnail"
      :lazy-load="false"
    />
    <img
      v-else
      class="thumbnail md:ltr:mr-6 md:rtl:ml-6 w-full"
      :src="placeholderImage"
    />
    <div ref="content" class="container content">
      <!-- title -->
      <h2
        ref="title"
        :dir="article.language == 'ar' ? 'rtl' : 'ltr'"
        :lang="article.language"
      >
        {{ article.title }}
      </h2>
      <p
        v-if="article.excerpt"
        class="display-lead my-8"
        :class="article.language"
        :dir="article.language == 'ar' ? 'rtl' : 'ltr'"
        :lang="article.language"
      >
        {{ article.excerpt }}
      </p>
      <!-- authors and translators -->
      <div
        v-if="article.authors.length || article.translators.length"
        class="flex flex-wrap flex-row mb-t mb-4"
      >
        <template v-if="article.authors.length">
          <author
            v-for="author in article.authors"
            :key="author.id"
            class="mb-4 ltr:mr-8 rtl:ml-8 flex-shrink-0"
            :name="author['name_' + $i18n.locale]"
            :picture="author.picture"
          />
        </template>
        <template v-if="article.translators.length">
          <author
            v-for="translator in article.translators"
            :key="translator.id"
            class="mb-4 ltr:mr-8 rtl:ml-8 flex-shrink-0"
            :name="translator['name_' + $i18n.locale]"
            :picture="translator.picture"
            :translated-by="true"
            :written-by="false"
          />
        </template>
      </div>
      <!-- Publish date and share buttons -->
      <div
        class="flex flex-row flex-wrap justify-between items-center mb-8 mt-4"
      >
        <h6 class="display-faded my-2">
          {{
            article.publishDate
              ? article.publishDate
              : article.created_at | fullDate($i18n.locale)
          }}
        </h6>
        <shareButtons v-if="url" :url="url" class="my-2" />
      </div>
      <!-- Translation -->
      <div v-if="article.translations.length" class="my-4">
        <a
          v-for="translation in article.translations"
          :key="translation.language"
          :href="translationLink(translation)"
          :class="translation.language"
          >{{ translationText(translation.language) }}</a
        >
      </div>
      <!-- Article body -->
      <div
        class="article-body"
        :dir="article.language == 'ar' ? 'rtl' : 'ltr'"
        :lang="article.language"
        v-html="article.body"
      ></div>
      <hr class="mt-12 mb-6 border-solid border-josa-warm-grey-dark" />
      <!-- share buttons  -->
      <shareButtons v-if="url" class="mb-4 w-full justify-end" :url="url" />
      <!-- authors and translators -->
      <div
        v-if="article.authors.length || article.translators.length"
        class="my-8"
      >
        <template v-if="article.authors.length">
          <h5 class="pb-2 rtl:pr-4 ltr:pl-4 written-by font-medium uppercase">
            {{ $t('meta.writtenBy') }}
          </h5>
          <author
            v-for="author in article.authors"
            :key="author.id"
            class="mb-4 bio"
            :name="author['name_' + $i18n.locale]"
            :picture="author.picture"
            :bio="author['bio_' + $i18n.locale]"
            :written-by="false"
          />
        </template>
        <template v-if="article.translators.length">
          <h5 class="pb-2 rtl:pr-4 ltr:pl-4 written-by font-medium uppercase">
            {{ $t('meta.translatedBy') }}
          </h5>
          <author
            v-for="translator in article.translators"
            :key="translator.id"
            class="mb-4"
            :name="translator['name_' + $i18n.locale]"
            :picture="translator.picture"
            :bio="translator['bio_' + $i18n.locale]"
            :written-by="false"
          />
        </template>
      </div>
      <!--  disclaimer  -->
      <div v-if="showDisclaimer" class="my-8 display-faded">
        <hr class="mb-2 border-solid border-josa-warm-grey-dark opacity-50" />
        <p>{{ $t('blog.disclaimer') }}</p>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'BlogSingle',
  components: {
    appImage: () => import('~/components/UI/appImage'),
    author: () => import('~/components/Blog/Author'),
    shareButtons: () => import('~/components/ShareButtons/ShareButtons'),
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data({ $config: { bucketUrl } }) {
    return {
      url: '',
      placeholderImage: `${bucketUrl}/josabots_88f0a93786.jpeg`,
    }
  },
  computed: {
    showDisclaimer() {
      return this.article.category.name !== 'statements'
    },
  },
  mounted() {
    this.url = window.location.href
    const w = window.innerWidth
    if (w > 640) {
      this.setContentNegMargin()
    }
  },
  methods: {
    setContentNegMargin() {
      const rem = this.getRem()
      const element = this.$refs.title
      const height = element.offsetHeight
      const value = parseInt(height) / rem + 3
      const content = this.$refs.content
      content.style.marginTop = '-' + value + 'rem'
    },
    getRem() {
      const html = document.getElementsByTagName('html')[0]
      return parseInt(window.getComputedStyle(html).fontSize)
    },
    translationLink(translation) {
      const slug = this.$options.filters.stringToSlug(translation.title)
      return this.localePath(
        '/blog/' + translation.id + '/' + slug,
        translation.language
      )
    },
    translationText(lang) {
      switch (lang) {
        case 'en':
          return 'Read this post in English'
        case 'ar':
          return 'اقرأ هذه المقالة باللغة العربية'
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
article {
  @apply bg-white;
}

.thumbnail {
  @apply w-full object-cover;
  max-height: 50vh;
}

.content {
  @apply bg-white py-8 px-6 relative z-50 mx-auto;
  max-width: 766px;
}

@screen md {
  .content {
    @apply px-8;
  }
}

/* article-body */

.article-body >>> blockquote {
  border: 1rem;
}

.article-body[dir='ltr'] >>> blockquote {
  @apply pl-10 my-5 border-r-0 border-t-0 border-b-0 border-solid border-josa-warm-grey-light;
}

.article-body[dir='rtl'] >>> blockquote {
  @apply pr-10 my-5 border-l-0 border-t-0 border-b-0 border-solid border-josa-warm-grey-light;
}

.article-body >>> p {
  @apply mb-4;
}

.article-body >>> a {
  @apply underline;
}

.article-body >>> a:hover {
  @apply text-josa-blue-dark;
}

article .article-body /deep/ {
  @apply text-lg font-normal leading-18;
}

@screen md {
  article .article-body /deep/ {
    @apply text-xl;
  }
}

/* article-body */

/* share buttons */
article[dir='ltr'] >>> .share-button {
  @apply ml-4 mr-0;
}

article[dir='rtl'] >>> .share-button {
  @apply mr-4 ml-0;
}

article >>> .share-button:first-child {
  @apply mx-0;
}

article[dir='ltr'] >>> .copy-tooltip-text {
  right: -75px;
  left: unset;
}

article[dir='rtl'] >>> .copy-tooltip-text {
  left: -75px;
  right: unset;
}

/* share buttons */

/* Authors */
[dir='ltr'] .written-by {
  @apply ml-12;
}

[dir='rtl'] .written-by {
  @apply mr-12;
}

/* Authors */
</style>
