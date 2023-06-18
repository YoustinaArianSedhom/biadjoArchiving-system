<template>
  <form>
    <div class="h-full pt-12 flex w-full bg-img">
      <div
        class="vx-col sm:w-3/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center"
      >
        <vx-card>
          <div slot="no-body" class="full-page-bg-color">
            <div class="vx-row">
              <div
                class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center"
              >
                <img
                  src="@/assets/images/pages/reset-password.png"
                  alt="login"
                  class="mx-auto"
                />
              </div>
              <div
                class="Min-Height vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg"
              >
                <div class="p-8">
                  <div class="vx-card__title mb-8">
                    <h4 class="mb-4">{{ $t("ResetPassword") }}</h4>
                    <!-- <p>Please enter your new password.</p> -->
                  </div>
                  <!-- <vs-input
                  type="text"
                  label-placeholder="User ID"
                  v-model="Model.Id"
                  class="w-full mb-6"
                  @change="CheckId()"
                /> -->
                  <div class="w-full mb-6">
                    <vs-input
                      @paste="onPaste"
                      name="password"
                      type="password"
                      v-model="Model.NewPass"
                      label-placeholder="New Password"
                      class="w-full mb-1"
                      v-validate.continues="'min:8|max:100'"
                      ref="password"
                    />
                    <!-- <span
                    class="text-danger text-sm"
                    v-show="errors.has('password')"
                    >{{ errors.first("password") }}</span
                  > -->
                    <ul>
                      <li
                        class="text-danger text-sm"
                        v-for="error in errors.collect('password')"
                        :key="error"
                      >
                        {{ error }}
                      </li>
                    </ul>
                  </div>
                  <div class="w-full mb-6">
                    <vs-input
                      @paste="onPaste"
                      type="password"
                      v-validate="'min:8|max:100|confirmed:password'"
                      name="confirm_password"
                      label-placeholder="Confirm Password"
                      v-model="confirm_password"
                      class="w-full mb-1"
                      data-vv-as="password"
                    />
                    <span
                      class="text-danger text-sm"
                      v-show="errors.has('confirm_password')"
                      >{{ errors.first("confirm_password") }}</span
                    >
                  </div>

                  <div
                    class="flex flex-wrap justify-between flex-col-reverse sm:flex-row"
                  >
                    <vs-button
                      type="border"
                      @click="Back()"
                      class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto"
                      >{{ $t("Back") }}</vs-button
                    >
                    <vs-button
                      @click.prevent="confirmResetPasssword"
                      :disabled="!validateForm"
                      class="w-full sm:w-auto"
                      >{{ $t("Reset") }}</vs-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </vx-card>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      Model: {
        NewPass: "",
        Id: ""
      },
      confirm_password: ""
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.Model.NewPass != "";
    }
  },
  methods: {
    onPaste(evt) {
      evt.preventDefault();
    },
    Back() {
      this.$router.go(-1);
    },
    confirmResetPasssword() {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToResetPasssword"),
        accept: this.ResetPassword,
        acceptText: this.$t("Reset"),
        cancelText: this.$t("Cancel"),

        cancel: this.CancelAlert
      });
    },
    ResetPassword() {
      this.$vs.loading();
      //Change Someone else Password trough his Email
      this.$validator.validateAll().then(result => {
        if (result) {
          this.Model.Id = this.$store.state.AppActiveUser.Id;
          this.$store
            .dispatch("auth/resetPasswordByUser", this.Model)
            .then(response => {
              if (response.data == 1) {
                this.$vs.loading.close();
                this.Model = {};
                window.showPasswordChanged();
                this.$router.push("/");
              } else {
                window.showError();
              }
            })
            .catch(() => {
              this.$vs.loading.close();
              window.showError();
            });
        } else {
          this.$vs.loading.close();
        }
      });
      this.$vs.loading.close();
    }
  },
  created() {}
};
</script>
<style scoped>
.Min-Height {
  min-height: 350px;
}
</style>
