<template>
  <div>
    <div class="mt-6 mb-4 pb-4">
      <vs-input
        v-validate="'required|email|min:3'"
        name="Email"
        icon-no-border
        icon="icon icon-user"
        icon-pack="feather"
        :label-placeholder="$t('Email')"
        v-model="Email"
        class="w-full"
        v-on:keyup.enter="loginJWT"
      />
      <span class="text-danger text-sm">{{ errors.first("Email") }}</span>
    </div>
    <div class="mt-6 mb-4">
      <vs-input
        v-validate="'required|min:8|max:100'"
        type="Password"
        name="Password"
        icon-no-border
        icon="icon icon-lock"
        icon-pack="feather"
        :label-placeholder="$t('Password')"
        v-model="Password"
        class="w-full"
        v-on:keyup.enter="loginJWT"
      />
      <span class="text-danger text-sm">{{ errors.first("Password") }}</span>
    </div>
    <div class="flex flex-wrap justify-between my-5">
      <vs-checkbox v-model="checkbox_remember_me" class="mb-3">{{
        $t("RememberMe")
      }}</vs-checkbox>
    </div>
    <div class="flex flex-wrap justify-between mb-3">
      <vs-button :disabled="!validateForm" @click="loginJWT">{{
        $t("Login")
      }}</vs-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkbox_remember_me: false,
      Email: "",
      Password: ""
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.Email != "" && this.Password != "";
    }
  },
  methods: {
    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {
        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: this.$t("LoginAttempt"),
          text: this.$t("Youarealreadyloggedin"),
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning"
        });
        this.$router.push("/");

        return false;
      }
      return true;
    },
    loginJWT() {
      if (!this.checkLogin()) {
        return;
      }
      if (!this.validateForm) {
        window.showFillData();
        return;
      }
      this.$vs.loading();

      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          Email: this.Email,
          Password: this.Password
        }
      };
      this.$store
        .dispatch("auth/loginJWT", payload)
        .then(() => {
          this.$store
            .dispatch("auth/fetchUserDetails", payload.userDetails.Email)
            .then(response => {
              if (response.status == 200) {
                if (response.data.status == "AS1") {
                  this.$vs.loading.close();
                  // this.$acl.change(response.data.accounttype);
                  this.$store.state.SessionExpired = false;
                  this.$router
                    .push(this.$router.currentRoute.query.to || "/")
                    .then(() => {
                      location.reload("/");
                    });
                }
              }
            })
            .catch(() => {
              this.$vs.loading.close();
              window.showError();
            });
        })
        .catch(error => {
          this.$vs.loading.close();
          debugger;
          if (error.response) {
            if (error.response.status == 400) {
              if (error.response.data.Error == "Password") {
                this.$vs.notify({
                  title: this.$t("Error"),
                  text: this.$t("InvalidPasswordPleasetryagain"),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "danger"
                });
              }
              if (error.response.data.Error == "Email") {
                this.$vs.notify({
                  title: this.$t("Error"),
                  text: this.$t("InvalidEmailPleasetryagain"),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "danger"
                });
              }
              if (error.response.data.Error == "Account is Not Active") {
                this.$vs.notify({
                  title: this.$t("Error"),
                  text: this.$t("SorryYouAccountisNotActive"),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "danger"
                });
              }
            } else {
              this.$vs.notify({
                title: this.$t("Error"),
                text: this.$t("somethingwentwrong"),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "warning"
              });
            }
          } else {
            this.$vs.notify({
              title: this.$t("Error"),
              text: this.$t("somethingwentwrong"),
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "danger"
            });
          }
        });
    },
    registerUser() {
      if (!this.checkLogin()) {
        return;
      }
      this.$router.push("/User/register/register").catch(() => {});
    }
  },
  created() {
    // localStorage.clear();
    this.checkLogin();
  }
};
</script>
