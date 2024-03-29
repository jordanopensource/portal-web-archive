<template>
  <div id="footer">
    <!-- Primary Footer - Menus -->
    <div
      class="
        container
        flex flex-col
        md:flex-row
        flex-wrap
        md:flex-nowrap
        justify-between
      "
    >
      <!-- About Menu -->
      <section :id="'footer-menu-' + menus.about.menuId">
        <h5>{{ menus.about['menuName_' + $i18n.locale] }}</h5>
        <menuItems :menu="menus.about" />
        <div class="block md:hidden py-8">
          <hr />
        </div>
      </section>
      <!-- Impact Menu -->
      <section :id="'footer-menu-' + menus.impact1.menuId">
        <h5>{{ menus.impact1['menuName_' + $i18n.locale] }}</h5>
        <menuItems :menu="menus.impact2" />
        <div class="block py-4">
          <hr />
        </div>
        <menuItems :menu="menus.impact1" />
        <div class="block md:hidden py-8">
          <hr />
        </div>
      </section>
      <!-- Support Menu -->
      <!-- <section :id="'footer-menu-' + menus.support.menuId">
        <h5>{{ menus.support['menuName_' + $i18n.locale] }}</h5>
        <menuItems :menu="menus.support" />
        <div class="block md:hidden py-8">
          <hr>
        </div>
      </section> -->
      <!-- Connect Menu -->
      <section :id="'footer-menu-' + menus.connect.menuId">
        <h5>{{ menus.connect['menuName_' + $i18n.locale] }}</h5>
        <menuItems :menu="menus.connect" />
        <div class="block py-4">
          <hr />
        </div>
        <!-- Social Media Links -->
        <div class="links en">
          <a
            v-for="link in socialMediaLinks"
            :key="link.id"
            class="whitespace-no-wrap"
            :href="link.path"
            target="_blank"
          >
            <font-awesome-icon
              class="ltr:mr-2 rtl:ml-2"
              :icon="['fab', link.icon]"
            />
            {{ link.id }}</a
          >
        </div>
      </section>
    </div>
    <!-- Secondery Footer -->
    <div id="site-info">
      <div class="container flex flex-col md:flex-row">
        <div class="logo">
          <img
            v-if="$i18n.locale == 'ar'"
            src="~/static/logo/logo-white-ar.svg"
            alt="جوسا"
            loading="lazy"
          />
          <img v-else src="~/static/logo/logo-white-en.svg" alt="JOSA Logo" />
        </div>
        <div class="block md:hidden py-8">
          <hr />
        </div>
        <div id="copyright-info" class="ltr:items-left rtl:items-right flex-col ltr:text-left rtl:text-right">
          <img
            class="cc-logo ltr:pr-4 rtl:pl-4 w-28 pb-1"
            src="~/static/logo/cc-by-sa.svg"
            alt="cc-logo"
            loading="lazy"
          />
          <div>
            <p class="text-xs licenseText">
              {{ $t('copyright.info') }}
              <a
                class="licenseAnchor"
                rel="license"
                href="https://creativecommons.org/licenses/by-sa/3.0/"
                target="_blank"
              >
              {{ $t('copyright.creative') }}
              </a>
              {{ $t('copyright.except') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import menuItems from '~/components/Menu/MenuItems'
export default {
  name: 'Footer',
  components: {
    menuItems,
  },
  data() {
    return {
      socialMediaLinks: [
        {
          icon: 'facebook-square',
          path: 'https://facebook.com/jordanopensource',
          id: '/jordanopensource',
        },
        {
          icon: 'twitter',
          path: 'https://twitter.com/jo_osa',
          id: '@jo_osa',
        },
        {
          icon: 'instagram',
          path: 'https://instagram.com/jordanopensource',
          id: '/jordanopensource',
        },
        {
          icon: 'github',
          path: 'https://github.com/jordanopensource',
          id: '/josa-portal-web',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      menus: 'menu/loadedMenus',
    }),
  },
}
</script>

<style lang="postcss" scoped>
#footer {
  @apply bg-josa-black text-josa-warm-grey-light;
  line-height: 1.6;
}

.container {
  @apply px-6 py-24 !important;
}
@screen md {
  .container {
    @apply px-12 py-24 !important;
  }
}

#site-info {
  background-color: #282e30;
}

#site-info .container {
  @apply py-10 !important;
}

section {
  @apply flex-grow;
}

[dir='ltr'] section:first-child {
  @apply pl-0;
}

[dir='ltr'] section:last-child {
  @apply pr-0;
}

[dir='rtl'] section:first-child {
  @apply pr-0;
}

[dir='rtl'] section:last-child {
  @apply pl-0;
}

h5 {
  @apply uppercase pb-2 text-josa-warm-grey-light;
}

hr {
  @apply border-dotted;
}

img {
  max-width: 240px;
}

/deep/ a {
  @apply block;
}

.licenseText {
  @apply text-josa-warm-grey-dark;
}

.licenseAnchor {
  @apply inline;
}

.logo,
#copyright-info {
  @apply w-full flex align-middle justify-center text-sm;
}

@screen md {
  .logo,
  #copyright-info {
    @apply w-1/2 justify-start;
  }
}

@screen md {
  section {
    @apply px-4;
  }
}

@screen lg {
  .logo {
    @apply w-2/3;
  }

  #copyright-info {
    @apply w-1/3;
  }
}
@screen lg {
  .logo {
    @apply w-2/3;
  }

  #copyright-info {
    @apply w-1/3;
  }
}
</style>
