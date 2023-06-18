<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    class="h-auto flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-1/2">
              <img
                src="@/assets/images/pages/login.png"
                alt="login"
                class="mx-auto"
              />
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="px-8 pt-8 login-tabs-container">
                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">{{ $t("Login") }}</h4>
                  <p v-if="!SessionExpired" class="mb-4">
                    {{ $t("WelcomeMsg") }}
                  </p>
                  <vs-alert v-if="SessionExpired" color="danger" active="true">
                    <p class="mb-4">
                      {{ $t("SessionExpired") }}
                    </p>
                  </vs-alert>
                </div>
                <login-jwt class="pt-4"></login-jwt>
                <!-- <vs-tabs>
                  <vs-tab label="JWT">
                   
                  </vs-tab>

                   <vs-tab label="Firebase">
                    <login-firebase></login-firebase>
                  </vs-tab> 

                   <vs-tab label="Auth0">
                    <login-auth0></login-auth0>
                  </vs-tab> 
                </vs-tabs> -->
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import LoginJwt from "./LoginJWT.vue";
//import LoginFirebase from "./LoginFirebase.vue"
//import LoginAuth0 from "./LoginAuth0.vue"

export default {
  components: {
    LoginJwt
    //LoginFirebase,
    //LoginAuth0
  },
  computed: {
    SessionExpired() {
      return this.$store.state.SessionExpired;
    }
  }
};
</script>

<style lang="scss">
.login-tabs-container {
  min-height: 455px;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}
</style>
