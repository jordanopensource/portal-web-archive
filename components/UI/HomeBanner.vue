<template>
  <div>
    <div id="homeBanner" class="bg-josa-warm-grey-light py-24">
      <div class="container">
        <div
          class="
            flex flex-row
            justify-between
            items-center
            flex-wrap
            md:flex-nowrap
            px-6
            md:px-12
            bg-josa-warm-grey-light
          "
        >
          <div
            class="
              my-auto
              w-full
              md:w-1/2
              lg:w-1/2
              flex-shrink-0
              md:ltr:pr-8 md:rtl:pl-8
            "
          >
            <h2>
              {{ $t('meta.we')
              }}<font-awesome-icon
                class="heart"
                :icon="['fas', 'heart']"
              /><br /><typewriter :text-array="typewriterArray" />
            </h2>
            <!-- <h2 v-for="program in programs" :key="program.id">{{ program['title_' + $i18n.locale] }}</h2> -->
            <p class="mt-4 mb-6">
              {{ pageMeta['description_' + $i18n.locale] }}
            </p>
            <nuxt-link
              to="#our-work"
              class="
                button-sharp button-dark-blue-full
                inline-block
                mb-12
                md:mb-0
              "
            >
              {{ $t('button.learnMoreWork') }}</nuxt-link
            >
          </div>
          <appImage
            :image="pageMeta.image"
            class="bot w-full h-full inline object-contain"
            :lazy-load="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appImage from '~/components/UI/appImage'
import typewriter from '~/components/UI/Typewriter'
export default {
  name: 'HomeBanner',
  components: {
    appImage,
    typewriter,
  },
  props: {
    pageMeta: {
      type: Object,
      required: true,
    },
    programs: {
      type: Array,
      required: true,
    },
  },
  computed: {
    typewriterArray() {
      const typewriterArray = this.programs.map(
        (program) => program['title_' + this.$i18n.locale]
      )
      return typewriterArray
    },
  },
}
</script>
<style lang="postcss" scoped>
.button-sharp {
  @apply px-8;
}

.heart {
  @apply ml-4 mr-4;
  color: #db4a14;
}
</style>
