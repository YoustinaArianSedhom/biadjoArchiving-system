<!-- =========================================================================================
File Name: RegisterJWT.vue
Description: Register Page for JWT
----------------------------------------------------------------------------------------
Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="clearfix">
    <vs-input
      v-validate="'required|min:3'"
      name="FirstName"
      :placeholder="$t('FirstName')"
      v-model="Model.FirstName"
      class="LayoutCssPadding mt-1 w-full"
    />
    <span class="text-danger text-sm">{{ errors.first("FirstName") }}</span>

    <vs-input
      v-validate="'required|min:3'"
      name="LastName"
      :placeholder="$t('LastName')"
      v-model="Model.LastName"
      class="LayoutCssPadding mt-1 w-full"
    />
    <span class="text-danger text-sm">{{ errors.first("LastName") }}</span>

    <vs-input
      v-validate="'required|email'"
      name="Email"
      type="email"
      :placeholder="$t('Email')"
      v-model="Model.Email"
      class="LayoutCssPadding mt-1 w-full"
    />
    <span class="text-danger text-sm">{{ errors.first("Email") }}</span>

    <vue-tel-input
      @change="onChange($event)"
      @onInput="onInput"
      v-bind="bindProps"
      name="PhoneNo"
      class="LayoutCss mt-1 w-full"
      v-model="Model.PhoneNo"
    >
    </vue-tel-input>
    <span v-if="!isValid" class="text-danger text-sm"
      >Phone Number Is Not Valid</span
    >
     <v-select
      v-model="Model.AccountType"
      :reduce="Code => Code.Code"
      :placeholder="$t('AccountType')"
      class="mt-1 w-full"
      :options="this.$options.AccountTypeJSON"
      :dir="$vs.rtl ? 'rtl' : 'ltr'"
      :get-option-label="option => $t(option.Code)"
    ></v-select>
    <vs-button
      class="float-right mt-6"
      @click="registerUserJWt"
      :disabled="!validateForm"
      >{{ $t("Create") }}</vs-button
    >
  </div>
</template>

<script>
import AccountTypeJSON_JSON from "./../json/accountType.json";
export default {
   AccountTypeJSON: AccountTypeJSON_JSON,
  props: {
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isMounted: false,
      isTermsConditionAccepted: true,
      placement: "top",
      Model: {
        FirstName: "",
        LastName: "",
        Email: "",
        PhoneNo: "",
        AccountType: ""
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
    validateForm() {
      return (
        !this.errors.any() &&
        this.Model.FirstName !== "" &&
        this.Model.LasttName !== "" &&
        this.Model.Email !== "" &&
        this.Model.PhoneNo !== "" &&
        this.Model.AccountType !== ""
      );
    }
  },
  methods: {
    onInput({ number, isValid, country }) {
      this.bindProps.number = number;
      this.isValid = isValid;
      this.bindProps.country = country;
    },
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

        return false;
      }
      return true;
    },
    registerUserJWt() {
      this.$vs.loading();
       if (!this.validateForm) {
        window.showFillData();
        return;
      }
      this.Model.PhoneNo = this.Model.PhoneNo.replace(/\s/g, "");

      // If form is not validated or user is already login return
      // if (!this.validateForm || this.checkLogin()) {
      //   return;
      // }
      this.$store
        .dispatch("auth/registerUserJWT", this.Model)
        .then(res => {
          if (res.status == 200) {
            this.$vs.loading.close();
            window.showSuccessCreate();
          }
        })
        .catch(err => {
          if (err.response.status == 400) {
            if (err.response.data == 0) {
              this.$vs.loading.close();
              window.showAlreadyExist();
            }
            if (err.response.data == -1) {
              this.$vs.loading.close();
              window.showError();
            }
          }
        });
    }
  },
  created() {},
  mounted() {
    this.isMounted = true;
  }
};
</script>

<style scoped>
.LayoutCss {
  margin-bottom: 20px;
}
.LayoutCssPadding {
  padding-bottom: 20px;
}
</style>
