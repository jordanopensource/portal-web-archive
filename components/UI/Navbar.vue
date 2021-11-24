<template>
  <nav>
    <!-- Main Menu -->
    <menuItems
      :menu="mainMenu"
      menu-item-class="nav-link"
      class="inline-block"
    />
    <!-- Language Switcher -->
    <languageSwitcher />
  </nav>
</template>

<script>
import menuItems from '@/components/Menu/MenuItems'
import languageSwitcher from '@/components/UI/LanguageSwitcher'
export default {
  name: 'Navbar',
  components: {
    menuItems,
    languageSwitcher,
  },
  computed: {
    mainMenu() {
      return this.$store.getters.loadedMenus.mainMenu
    },
  },
}
</script>

<style lang="postcss" scoped>
.lang {
  @apply text-sm opacity-50;
}
.lang.nuxt-link-active {
  @apply opacity-100;
}
</style>
