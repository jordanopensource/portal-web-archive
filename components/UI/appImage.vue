<template>
  <img
    v-if="lazyLoad"
    loading="lazy"
    width="500"
    height="500"
    :src="imageUrl"
    :alt="image.alternativeText"
  />
  <img
    v-else
    width="500"
    height="500"
    :src="imageUrl"
    :alt="image.alternativeText"
  />
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true,
    },
    size: {
      type: String,
      default: '',
    },
    lazyLoad: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    imageUrl() {
      try {
        return this.format().url
      } catch {
        return this.image.url
      }
    },
  },
  methods: {
    format() {
      const size = this.size
      const format = this.image.formats[size]
      if (format) {
        return format
      } else {
        const formats = this.image.formats
        const first = Object.keys(formats)[0]
        return formats[first]
      }
    },
  },
}
</script>
