<template>
  <div>
    <div class="the-navbar__user-meta flex items-center" v-if="activeUserInfo">
      <div class="text-right leading-tight hidden sm:block">
        <p class="font-semibold">{{ firstName }} {{ lastName }}</p>
        <small>{{ $t(accounttype) }}</small>
      </div>

      <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
        <div class="con-img ml-3">
          <img
            v-if="ProfilePic"
            key="onlineImg"
            :src="ProfilePic"
            alt="user-img"
            width="40"
            height="40"
            class="rounded-full shadow-md cursor-pointer block"
          />
          <img
            v-else
            key="Default"
            src="@/assets/images/pages/DefaultProfilePic.png"
            alt="Default-user-img"
            width="40"
            height="40"
            class="rounded-full shadow-md cursor-pointer block"
          />
        </div>

        <vs-dropdown-menu class="vx-navbar-dropdown">
          <ul style="min-width: 12rem;">

            <router-link
              :to="{
                name: 'UserPersonalDetails',
                params: { Id: this.$store.state.AppActiveUser.Id }
              }"
            >
              <li
                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
              >
                <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
                <span class="ml-2">{{ $t("Profile") }}</span>
              </li>

            </router-link>



            <router-link 
            :to="{
                name: 'ResetPasswordByUser',
                params: { Id: this.$store.state.AppActiveUser.Id }
              }">
              <li
                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
              >
                <feather-icon icon="LockIcon" svgClasses="w-4 h-4" />
                <span class="ml-2">{{ $t("ResetPassword") }}</span>
              </li>
            </router-link>

            <vs-divider class="m-1" />

            <li
              class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
              @click="logout"
            >
              <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
              <span class="ml-2">{{ $t("Logout") }}</span>
            </li>
          </ul>
        </vs-dropdown-menu>
      </vs-dropdown>
    </div>

    <div class="the-navbar__user-meta flex items-center" v-else>
      <div class="text-right leading-tight hidden sm:block">
        <p class="font-semibold">{{ $t("LOGIN") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
    firstName() {
      return this.$store.state.AppActiveUser.firstName;
    },
    lastName() {
      return this.$store.state.AppActiveUser.lastName;
    },
    accounttype() {
      return this.$store.state.AppActiveUser.accounttype;
    },
    ProfilePic() {
      return this.$store.state.AppActiveUser.ProfilePic;
    }
  },
  methods: {
    logout() {
      this.$store.state.AppActiveUser = {};
      this.$store.dispatch("auth/logout");
      // This is just for demo Purpose. If user clicks on logout ->
      this.$router.push("/user/login/login").catch(() => {});
    },

    mounted() {
      if (!this.activeUserInfo) {
        this.$router.push("user/login/login");
      }
    }
  }
};
</script>
<style>
.routerLink {
  text-decoration: none;
}
</style>
