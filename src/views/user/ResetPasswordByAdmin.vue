<template>
  <form>
    <div class="h-screen flex w-full bg-img">
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
                  <vs-input
                    type="text"
                    label-placeholder="User ID"
                    v-model="Model.Id"
                    class="w-full mb-6"
                    @change="CheckId()"
                  />
                  <div
                    class="flex flex-wrap justify-between flex-col-reverse sm:flex-row"
                  >
                    <vs-button
                      type="border"
                      @click="Back()"
                      class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto"
                      >Back</vs-button
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
      SameUser: false
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.Model.Id != "";
    }
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    confirmResetPasssword() {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToResetPassswordByEmail"),
        accept: this.ResetByAdmin,
        acceptText: this.$t("Reset"),
        cancelText: this.$t("Cancel"),

        cancel: this.CancelAlert
      });
    },
    ResetByAdmin() {
      this.$vs.loading();
      let ModelID = {};
      ModelID.Id = this.Model.Id;
      this.$store
        .dispatch("auth/resetPasswordByAdmin", ModelID)
        .then(res => {
          if (res.data == 1) {
            this.$vs.loading.close();
            window.showCheckEmail();
            this.Model = {};
          } else {
            window.showError();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    }
  },
  created() {
    if (this.$route.params.Id == this.$store.state.AppActiveUser.Id) {
      this.$router.push("/user/ResetPasswordByUser");
    } else {
      if (this.$route.params.Id) {
        this.Model.Id = this.$route.params.Id;
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style scoped>
.Min-Height {
  min-height: 250px;
}
</style>
