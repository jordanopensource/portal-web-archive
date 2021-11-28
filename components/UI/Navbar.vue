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
import menuItems from '~/components/Menu/MenuItems'
import languageSwitcher from '@/components/UI/LanguageSwitcher'
export default {
  name: 'Navbar',
  components: {
    menuItems,
    languageSwitcher,
  },
  async fetch() {
    const response = await this.$axios.get('/api/menus')
    const menuArray = response.data
    this.$store.commit('menu/setMenus', menuArray)
  },
  computed: {
    mainMenu() {
      return this.$store.state.menu.loadedMenus.mainMenu
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
