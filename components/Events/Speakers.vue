<template>
  <div>
    <h3>{{ $t('speakers') }}</h3>
    <div v-for="speaker in speakers" :key="speaker.id" class="info">
      <appImage
        class="profilePicture w-12 h-12 flex-shrink-0"
        :image="speaker.picture"
      />
      <div>
        <h4 class="font-medium">{{ speaker['fullName_' + $i18n.locale] }}</h4>
        <p>{{ speaker['title_' + $i18n.locale] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Speakers',
  components: {
    appImage: () => import('~/components/UI/appImage'),
  },
  props: {
    speakers: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="postcss" scoped>
.info {
  @apply flex flex-nowrap mt-4;
}
</style>
