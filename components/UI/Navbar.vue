<template>
  <nav>
    <!-- Main Menu -->
    <menuItems
      :menu="loadedMenus.mainMenu"
      menu-item-class="nav-link"
      class="inline-block"
    />
    <!-- Language Switcher -->
    <languageSwitcher />
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters({
      loadedMenus: 'menu/loadedMenus',
    }),
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
