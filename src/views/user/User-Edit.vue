<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter justify-center">
    <vx-card>
      <div slot="no-body" class="full-page-bg-color">
        <div class="vx-row no-gutter">
          <div
            class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg"
          >
            <template>
              <div
                class="img-container w-64 mx-auto flex items-center justify-center"
              >
                <img :src="Model.ProfilePic" alt="img" class="responsive" />
              </div>
              <div class="modify-img flex justify-between mt-5">
                <input
                  type="file"
                  class="hidden"
                  ref="updateImgInput"
                  @change="updateCurrImg"
                  accept="image/*"
                />
                <vs-button
                  @click="$refs.updateImgInput.click()"
                  class="m-auto text-xl"
                  >{{ $t("UpdateImage") }}</vs-button
                >
              </div>
            </template>
          </div>
          <div
            class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg"
          >
            <div class="px-8 pt-8 register-tabs-container">
              <div class="vx-card__title mb-4">
                <h4 class="mb-4">{{ $t("EditUser") }}</h4>
              </div>
              <div class="clearfix">
                <div class="LayoutCssPadding mt-1 w-full">
                  <label class="text-sm opacity-75">{{
                    $t("FirstName")
                  }}</label>
                  <vs-input
                    v-validate="'required|min:3'"
                    name="firstName"
                    placeholder="First Name"
                    v-model="Model.firstName"
                    class="w-full"
                  />
                  <span class="text-danger text-sm">{{
                    errors.first("firstName")
                  }}</span>
                </div>
                <div class="LayoutCssPadding mt-1 w-full">
                  <label class="text-sm opacity-75">{{ $t("LastName") }}</label>
                  <vs-input
                    v-validate="'required|min:3'"
                    name="lastName"
                    placeholder="Last Name"
                    v-model="Model.lastName"
                    class="w-full"
                  />
                  <span class="text-danger text-sm">{{
                    errors.first("lastName")
                  }}</span>
                </div>
                <div class="LayoutCssPadding  mt-1 w-full">
                  <label class="text-sm opacity-75">{{ $t("Email") }}</label>
                  <vs-input
                    v-validate="'required|email'"
                    name="Email"
                    type="email"
                    placeholder="Email"
                    v-model="Model.Email"
                    class="w-full"
                  />
                  <span class="text-danger text-sm">{{
                    errors.first("Email")
                  }}</span>
                </div>
                <div class="LayoutCssPadding mt-1 w-full">
                  <label class="text-sm opacity-75">{{
                    $t("PhoneNumber")
                  }}</label>
                  <vue-tel-input
                    @change="onChange($event)"
                    @onInput="onInput"
                    v-bind="bindProps"
                    name="Phone Number"
                    :dir="CheckRTL"
                    class="mt-1 w-full"
                    v-model="Model.PhoneNumber"
                  ></vue-tel-input>
                  <span v-if="!isValid" class="text-danger text-sm"
                    >Phone Number Is Not Valid</span
                  >
                </div>
            
                <label class="text-sm opacity-75">{{
                  $t("AccountType")
                }}</label>
                <v-select
                  v-model="Model.accounttype"
                  :reduce="Code => Code.Code"
                  placeholder="Account Type"
                  class="mt-1 w-full"
                  :options="this.$options.AccountTypeJSON"
                  :dir="$vs.rtl ? 'rtl' : 'ltr'"
                  :get-option-label="option => $t(option.Code)"
                ></v-select>

                <label class="text-sm opacity-75">{{
                  $t("Status")
                }}</label>
                <v-select
                  :reduce="Code => Code.Code"
                  class="mt-1 w-full"
                  :options="this.$options.AccountStatusJson"
                  :dir="$vs.rtl ? 'rtl' : 'ltr'"
                  :get-option-label="option => $t(option.Code)"
                  v-model="Model.status"
                ></v-select>

                <!-- <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6">I accept the terms & conditions.</vs-checkbox> -->
                <!-- <vs-button type="border" to="/user/login/login" class="mt-6">Login</vs-button> -->
                <div class="vx-col w-full flex" id="account-manage-buttons">
                  <!-- <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Save Changes</vs-button> -->
                  <div style="padding:10px;">
                    <vs-button
                      class="ml-auto mt-2"
                      :disabled="!validateForm"
                      @click="confirmSave"
                      >{{ $t("SaveChanges") }}</vs-button
                    >
                  </div>
                  <div style="padding:10px;">
                    <vs-button
                      class="ml-auto mt-2"
                      type="border"
                      color="warning"
                      icon-pack="feather"
                      @click="Back"
                      >{{ $t("Back") }}</vs-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>

import moduleAuth from "@/store/auth/moduleAuth.js";
import AccountStatus_JSON from "./json/accountStatus";
import AccountType_JSON from "./json/accountType";

export default {
  AccountTypeJSON: AccountType_JSON,
  AccountStatusJson: AccountStatus_JSON,

  data() {
    return {
      isMounted: false,
      isTermsConditionAccepted: true,
      Model: {
        ProfilePic: "",
        firstName: "",
        lastName: "",
        Email: "",
        PhoneNumber: "",
        accountType: "",
        status:""
      },
      isValid: true,
      bindProps: {
        mode: "international",
        defaultCountry: "",
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,
        placeholder: "",
        required: true,
        enabledCountryCode: true,
        enabledFlags: true,
        preferredCountries: ["EG", "US"],
        onlyCountries: [],
        ignoredCountries: [],
        autocomplete: "on",
        name: "telephone",
        maxLen: 20,
        wrapperClasses: "",
        inputClasses: "",
        dropdownOptions: {
          disabledDialCode: true
        },
        inputOptions: {
          showDialCode: false,
          tabindex: 0
        }
      }
    };
  },
  computed: {
    CheckRTL() {
      if (this.$vs.rtl == true) {
        return "rtl";
      } else {
        return "ltr";
      }
    },
    validateForm() {
      return (
        !this.errors.any() &&
        this.Model.firstName !== "" &&
        this.Model.lastName !== "" &&
        this.Model.Email !== "" &&
        // this.Model.CountryCode !== "" &&
        this.Model.PhoneNumber !== "" //&&
        //this.Model.AccountType !== ""
      );
    }
  },
  methods: {
    onInput({ number, isValid}) {
      this.bindProps.number = number;
      this.isValid = isValid;
      // this.bindProps.country = country;
    },
    Back() {
      this.$router.go(-1);
    },
    save_changes() {
      if (!this.validateForm) {
        window.showFillData();
        return;
      }
      
      let UpdateModel = {};

      UpdateModel.Id = this.$route.params.Id;
      UpdateModel.UserName = this.Model.Email;
      UpdateModel.firstName = this.Model.firstName;
      UpdateModel.lastName = this.Model.lastName;
      UpdateModel.PhoneNumber = this.Model.PhoneNumber;
      UpdateModel.Email = this.Model.Email;
      

      // UpdateModel.country = this.Country.find(
      //   Country => Country.CountryCode == this.Model.countrycode
      // ).Country;

      // UpdateModel.countrycode = this.Model.countrycode;

      UpdateModel.ProfilePic = this.Model.ProfilePic;
      UpdateModel.accounttype = this.Model.accounttype;
      UpdateModel.status = this.Model.status;
      this.$vs.loading();
      // if(!this.validateForm) return
      // this.Model.Id = this.$route.params.Id;
      this.$store
        .dispatch("UserList/UpdateUserById", UpdateModel)
        .then(res => {
          if (res.status == 200) {
            this.$vs.loading.close();
            window.showSuccess();
          } else {
            this.$vs.loading.close();
            window.showError();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    confirmSave() {
       if (!this.validateForm) {
        window.showFillData();
        return;
      }
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToChangeUserData"),
        accept: this.save_changes,
        acceptText: this.$t("Save"),
        cancelText: this.$t("Cancel")
      });
    },
    updateCurrImg(input) {
      this.$vs.loading();
      if (input.target.files && input.target.files[0]) {
        // const data = new FormData();
        const file = event.target.files[0];
        //  data.append({"Id": Id})
        //  let user={"Id": Id, data};
        //  {params: { jsonObject: this.Id , file:this.data}}
        this.$store
          .dispatch("UserList/UploadProfilePic", {
            params: {
              Id: this.$route.params.Id,
              file: file
            }
          })
          .then(() => {
            // this.Model.ProfilePic = response.data[0];
            this.$store
              .dispatch("UserList/fetchUserDetailsList", this.Model)
              .then(response => {
                this.Model = response.data;
                this.$vs.loading.close();
              });
          });
      }
    }
  },
  created() {
    this.$vs.loading();
    if (!moduleAuth.isRegistered) {
      this.$store.registerModule("UserList", moduleAuth);
      moduleAuth.isRegistered = true;
    }
    var user = {};
    user.Id = this.$route.params.Id;
    user.Email = "";
    this.$store
      .dispatch("UserList/fetchUserDetailsList", user)
      .then(res => {
        this.Model = res.data;
        this.$vs.loading.close();
        window.notAllowedToAccessCurrentPage(this.Model.status);
      })
      .catch(() => {
        window.showError();

        this.$vs.loading.close();
      });
  },

  mounted() {
    this.isMounted = true;
  }
};
</script>

<style lang="scss">
.register-tabs-container {
  min-height: 597px;

  .con-tab {
    padding-bottom: 23px;
  }
}
</style>
<style scoped>
.LayoutCss {
  height: 40px;
  margin-bottom: 20px;
}
.LayoutCssPadding {
  padding-bottom: 20px;
}
</style>
