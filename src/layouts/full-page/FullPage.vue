<!-- =========================================================================================
    File Name: Main.vue
    Description: Main layout
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    class="layout--main"
    :class="[
      layoutTypeClass,
      navbarClasses,
      footerClasses,
      { 'no-scroll': isAppPage }
    ]"
  >
    <div
      id="content-area"
      :class="[contentAreaClass, { 'show-overlay': bodyOverlay }]"
    >
      <div id="content-overlay" />
      <!-- Navbar -->
      <template>
        <the-navbar-vertical
          :navbarColor="navbarColor"
          :class="[
            { 'text-white': isNavbarDark && !isThemeDark },
            { 'text-base': !isNavbarDark && isThemeDark }
          ]"
        />
      </template>
      <!-- /Navbar -->

      <div class="content-wrapper">
        <div class="router-view">
          <div class="router-content">
            <router-view></router-view>
          </div>
        </div>
      </div>
      <the-footer />
    </div>
  </div>
</template>

<script>
// import TheCustomizer       from '@/layouts/components/customizer/TheCustomizer.vue'
import TheNavbarVertical from "@/layouts/components/navbar/TheNavbarVerticalFullPage.vue";
import TheFooter from "@/layouts/components/TheFooter.vue";
import themeConfig from "@/../themeConfig.js";

export default {
  components: {
    // TheCustomizer,
    TheFooter,
    TheNavbarVertical
  },
  data() {
    return {
      disableCustomizer: themeConfig.disableCustomizer,
      disableThemeTour: themeConfig.disableThemeTour,
      dynamicWatchers: {},
      footerType: themeConfig.footerType || "static",
      hideScrollToTop: themeConfig.hideScrollToTop,
      isNavbarDark: false,
      navbarColor: themeConfig.navbarColor || "#fff",
      navbarType: themeConfig.navbarType || "floating",
      routerTransition: themeConfig.routerTransition || "none",
      routeTitle: this.$route.meta.pageTitle
    };
  },
  watch: {
    $route() {
      this.routeTitle = this.$route.meta.pageTitle;
    },
    isThemeDark(val) {
      const color = this.navbarColor === "#fff" && val ? "#10163a" : "#fff";
      this.updateNavbarColor(color);
    },
    "$store.state.mainLayoutType"(val) {
      this.setNavMenuVisibility(val);
      this.disableThemeTour = true;
    }
  },
  computed: {
    navMenuLogo() {
      return require(`@/assets/images/logo/${this.$i18n.locale}.png`);
    },
    isIdle() {
      return this.$store.state.idleVue.isIdle;
    },
    bodyOverlay() {
      return this.$store.state.bodyOverlay;
    },
    contentAreaClass() {
      if (this.mainLayoutType === "vertical") {
        if (this.verticalNavMenuWidth === "default")
          return "content-area-reduced";
        else if (this.verticalNavMenuWidth === "reduced")
          return "content-area-lg";
        else return "content-area-full";
      } else return "content-area-full";
    },
    footerClasses() {
      return {
        "footer-hidden": this.footerType === "hidden",
        "footer-sticky": this.footerType === "sticky",
        "footer-static": this.footerType === "static"
      };
    },
    isAppPage() {
      return this.$route.meta.no_scroll;
    },
    isThemeDark() {
      return this.$store.state.theme === "dark";
    },
    layoutTypeClass() {
      return `main-${this.mainLayoutType}`;
    },
    // mainLayoutType() {
    //   return this.$store.state.mainLayoutType;
    // },
    navbarClasses() {
      return {
        "navbar-hidden": this.navbarType === "hidden",
        "navbar-sticky": this.navbarType === "sticky",
        "navbar-static": this.navbarType === "static",
        "navbar-floating": this.navbarType === "floating"
      };
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    }
  },
  methods: {
    changeRouteTitle(title) {
      this.routeTitle = title;
    },
    updateNavbar(val) {
      if (val === "static")
        this.updateNavbarColor(this.isThemeDark ? "#10163a" : "#fff");
      this.navbarType = val;
    },
    updateNavbarColor(val) {
      this.navbarColor = val;
      if (val === "#fff") this.isNavbarDark = false;
      else this.isNavbarDark = true;
    },
    setNavMenuVisibility(layoutType) {
      if (
        (layoutType === "horizontal" && this.windowWidth >= 1200) ||
        (layoutType === "vertical" && this.windowWidth < 1200)
      ) {
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", false);
        this.$store.dispatch("updateVerticalNavMenuWidth", "no-nav-menu");
      } else {
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", false);
        this.$store.dispatch("updateVerticalNavMenuWidth", "no-nav-menu");
      }
    }
  },
  created() {
    // const color =
    //   this.navbarColor === "#fff" && this.isThemeDark
    //     ? "#10163a"
    //     : this.navbarColor;
    // this.updateNavbarColor(color);
    // this.setNavMenuVisibility(this.$store.state.mainLayoutType);
    // Dynamic Watchers for tour
    // Reason: Once tour is disabled it is not required to enable it.
  },
  beforeDestroy() {
    Object.keys(this.dynamicWatchers).map(i => {
      this.dynamicWatchers[i]();
      delete this.dynamicWatchers[i];
    });
  }
};
</script>
