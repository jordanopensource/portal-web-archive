<template>
  <div class="flex flex-nowrap items-center mb-2">
    <nuxt-link :to="authorLink">
      <appImage
        v-if="picture"
        :image="picture"
        size="small"
        class="profilePicture"
      />
      <img
        v-else
        size="small"
        class="profilePicture"
        src="/images/icons/authorimage_default.webp"
      />
    </nuxt-link>
    <div class="flex items-center opacity-80">
      <p v-if="translatedBy" class="ltr:mr-1 rtl:ml-1 text-xs uppercase">
        {{ $t('meta.translatedBy') }}
      </p>
      <nuxt-link :to="authorLink">
        <p class="text-sm author-name">{{ name }}</p>
      </nuxt-link>
      <p v-if="bio">{{ bio }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Author',
  components: {
    appImage: () => import('~/components/UI/appImage'),
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    picture: {
      type: Object,
      default() {
        return {}
      },
    },
    bio: {
      type: String,
      default: '',
    },
    writtenBy: {
      type: Boolean,
      default: true,
    },
    translatedBy: {
      type: Boolean,
      default: false,
    },
    authorId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
     authorLink() {
      return this.localePath('/authors/' + this.authorId);
    },
  },
}
</script>
<style lang="postcss" scoped>
:dir(ltr).profilePicture {
  @apply w-5 mr-1;
}
:dir(rtl).profilePicture {
  @apply w-5 ml-1;
}
.author-name {
  @apply text-josa-black;
  transition: color 0.25s linear;
  -webkit-transition: color 0.25s linear;
}
.author-name:hover{
  @apply text-josa-blue;
}
</style>
