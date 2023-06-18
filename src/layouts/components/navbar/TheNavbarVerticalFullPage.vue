<template>
  <div class="relative">
    <div class="vx-navbar-wrapper navbar-full p-0">
      <vs-navbar
        class="navbar-custom navbar-skelton"
        :class="navbarClasses"
        :style="navbarStyle"
        :color="navbarColor"
      >
        <feather-icon
          class="sm:inline-flex xl:hidden cursor-pointer mr-1"
          icon="MenuIcon"
          @click.stop="showSidebar"
        ></feather-icon>
        <!-- <bookmarks :navbarColor="navbarColor" v-if="windowWidth >= 992" /> -->

        <router-link
          tag="div"
          to="/"
          class="vx-logo cursor-pointer mx-auto flex items-center"
        >
          <!-- <logo class="w-10 mr-4 fill-current ٍٍtext-primary" />
        <span class="vx-logo-text text-primary">Biajdo Admin Portal</span> -->

          <!-- <logo class="w-10 mr-4 fill-current text-primary" /> -->
          <span class="vx-logo-text text-primary">{{ $t("ArchivingSystem") }}</span>
        </router-link>

        <i18n style="padding-right: 20px; padding-left: 20px;" />

        <!-- <search-bar />

      <cart-drop-down /> -->

        <!-- <notification-drop-down /> -->
      </vs-navbar>
    </div>
  </div>
</template>

<script>
// import Bookmarks            from './components/Bookmarks.vue'
import I18n from "./components/I18n.vue";
// import SearchBar            from './components/SearchBar.vue'
// import CartDropDown         from './components/CartDropDown.vue'
// import NotificationDropDown from "./components/NotificationDropDown.vue";
// import Logo                 from '../Logo.vue'

export default {
  name: "the-navbar-horizontal",
  props: {},
  components: {
    // Logo,
    // Bookmarks,
    I18n
    // SearchBar,
    // CartDropDown,
    // NotificationDropDown,
  },
  computed: {
    navbarColor() {
      let color = "#fff";
      if (this.navbarType === "sticky") color = "#f7f7f7";
      else if (this.navbarType === "static") {
        if (this.scrollY < 50) {
          color = "#f7f7f7";
        }
      }

      if (this.isThemedark === "dark") {
        if (color === "#fff") {
          color = "#10163a";
        } else {
          color = "#262c49";
        }
      }

      return color;
    },
    isThemedark() {
      return this.$store.state.theme;
    },
    navbarStyle() {
      return this.navbarType === "static"
        ? { transition: "all .25s ease-in-out" }
        : {};
    },
    navbarClasses() {
      return this.scrollY > 5 && this.navbarType === "static"
        ? null
        : "d-theme-dark-light-bg shadow-none";
    },
    scrollY() {
      return this.$store.state.scrollY;
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    }
  },
  methods: {
    showSidebar() {
      this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", true);
    }
  }
};
</script>
