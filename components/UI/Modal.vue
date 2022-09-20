<template>
  <transition name="modal">
    <div class="modal-mask">
      <div
        class="modal-wrapper"
        @click.self="$store.dispatch('modal/setShowModal', false)"
      >
        <div class="container">
          <div class="md:px-12 py-12">
            <div class="modal-container absolute md:relative top-12 md:top-0">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-mask {
  @apply fixed top-0 left-0 w-full h-full bg-black table py-0 px-12;
  z-index: 9998;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  @apply table-cell align-middle relative;
}

.modal-container {
  @apply bg-white max-h-full overflow-y-auto my-0 mx-auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-enter, 
.modal-leave-active {
  @apply opacity-0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
