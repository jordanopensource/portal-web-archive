<template>
  <transition name="back-to-top-fade">
    <div v-show="visible" class="back-to-top" @click="backToTop">
      <slot>
        <div class="default">
          <span v-if="text">
            {{ text }}
          </span>
          <span v-else>
            <svg
              class="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm1 10h3l-4-4-4 4h3v4h2v-4z"
              />
            </svg>
          </span>
        </div>
      </slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BackToTop',
  props: {
    text: {
      type: String,
      default: null,
    },
    visibleOffset: {
      type: [String, Number],
      default: 760,
    },
    visibleOffsetBottom: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      visible: false,
    }
  },
  mounted() {
    window.smoothscroll = () => {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        window.requestAnimationFrame(window.smoothscroll)
        window.scrollTo(0, Math.floor(currentScroll - currentScroll / 5))
      }
    }
    window.addEventListener('scroll', this.catchScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.catchScroll)
  },
  methods: {
    catchScroll() {
      const pastTopOffset = window.pageYOffset > parseInt(this.visibleOffset)
      const pastBottomOffset =
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - parseInt(this.visibleOffsetBottom)
      this.visible =
        parseInt(this.visibleOffsetBottom) > 0
          ? pastTopOffset && !pastBottomOffset
          : pastTopOffset
    },
    backToTop() {
      window.smoothscroll()
      this.$emit('scrolled')
    },
  },
}
</script>

<style scoped>
.back-to-top-fade-enter-active,
.back-to-top-fade-leave-active {
  transition: opacity 0.7s;
}

.back-to-top-fade-enter,
.back-to-top-fade-leave-to {
  @apply opacity-0;
}

.back-to-top {
  @apply cursor-pointer fixed text-center;
  z-index: 1000;
  bottom: 2rem;
}

[dir='ltr'] .back-to-top {
  right: 2rem;
}

[dir='rtl'] .back-to-top {
  left: 2rem;
}

.back-to-top .default {
  @apply fill-current;
  color: #3897c0;
}

.back-to-top:hover .default {
  color: #1a485b;
}

.back-to-top .icon {
  @apply w-12 h-12 text-5xl;
  border-radius: 50%;
}
</style>
