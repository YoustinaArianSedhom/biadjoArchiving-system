<!-- =========================================================================================
  File Name: clientView.vue
  Description: client View page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/client/pixinvent
========================================================================================== -->
<template>
  <div id="page-client-view">
    <vs-alert
      color="danger"
      title="client Not Found"
      :active.sync="user_not_found"
    >
      <span>user record with id: {{ $route.params.Id }} not found.</span>
      <span>
        <span>Check</span>
        <router-link :to="{ name: 'UserList' }" class="text-inherit underline"
          >All Clients</router-link
        >
      </span>
    </vs-alert>
    <div id="user-data" v-if="user_data != undefined">
      <vx-card v-bind:title="$t('UserInfo')" class="mb-base" id="account-info">
        <!-- Avatar -->
        <div class="vx-row">
          <!-- Avatar Col -->
          <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img :src="user_data.ProfilePic" class="rounded w-full" />
            </div>
          </div>
          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <!-- <vx-card> -->
            <table>
              <tr>
                <td class="font-semibold">{{ $t("FullName") }}</td>
                <td>{{ user_data.firstName }} {{ user_data.lastName }}</td>

                <!-- <td class="font-semibold">Last Name</td>
                <td>{{ user_data.lastName }}</td>-->
              </tr>
            </table>

            <table>
              <tr>
                <td class="font-semibold">{{ $t("PhoneNumber") }}</td>
                <td>{{ user_data.PhoneNumber }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("UserID") }}</td>
                <td>{{ user_data.Id }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Email") }}</td>
                <td>{{ user_data.Email }}</td>
              </tr>
            </table>
          </div>
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("AccountType") }}</td>
                <!-- <td>{{ $t(user_data.accounttype) }}</td> -->
                <td style="width:200px">
                  <v-select
                    :reduce="Code => Code.Code"
                    class="mt-1 w-full p-0"
                    :options="this.$options.AccountTypeJSON"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    :get-option-label="option => $t(option.Code)"
                    v-model="user_data.accounttype"
                    @input="confirmChangeAccountType"
                  >
                  </v-select>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Status") }}</td>
                <!-- <td>{{ $t(user_data.status) }}</td> -->
                <td style="width:200px">
                  <v-select
                    :reduce="Code => Code.Code"
                    class="mt-1 w-full p-0"
                    :options="this.$options.AccountStatusJson"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    :get-option-label="option => $t(option.Code)"
                    v-model="user_data.status"
                    @input="confirmChangeStatus"
                  ></v-select>
                </td>
              </tr>
            </table>
          </div>
          <div class="vx-row p-5">
            <input
              type="file"
              class="hidden"
              ref="updateImgInput"
              @change="updateCurrImg"
              accept="image/*"
            />
            <vs-button
              class="mr-4 mb-4"
              icon-pack="feather"
              @click="$refs.updateImgInput.click()"
              >{{ $t("UpdateImage") }}</vs-button
            >
            <vs-button
              icon-pack="feather"
              icon="icon-lock"
              class="mr-4 mb-4"
              @click="confirmResetPasssword"
              >{{ $t("ResetPassword") }}</vs-button
            >
            <vs-button
              icon-pack="feather"
              icon="icon-edit"
              class="mr-4 mb-4"
              :to="{ name: 'User-Edit', params: { Id: user_data.Id } }"
              >{{ $t("Edit") }}</vs-button
            >
            <vs-button
              type="border"
              color="warning"
              icon-pack="feather"
              class="mr-4 mb-4"
              @click="Back"
              >{{ $t("Back") }}</vs-button
            >
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import moduleAuth from "@/store/auth/moduleAuth.js";
import AccountStatus_JSON from "./json/accountStatus";
import AccountType_JSON from "./json/accountType.json";

export default {
  AccountStatusJson: AccountStatus_JSON,
  AccountTypeJSON: AccountType_JSON,

  data() {
    return {
      user_data: {},
      user_not_found: false,
      oldAccountStatus: "",
      oldAccountType: ""
    };
  },
  computed: {},
  methods: {
    Back() {
      this.$router.go(-1);
    },
    confirmChangeStatus() {
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToChangeUserStatus"),
        accept: this.ChangeRecord,
        acceptText: this.$t("Save"),
        cancelText: this.$t("Cancel"),

        cancel: this.CancelAlert
      });
    },
    confirmChangeAccountType() {
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToChangeThisUserAccountType"),
        accept: this.updateUserAccountType,
        acceptText: this.$t("Save"),
        cancelText: this.$t("Cancel"),

        cancel: this.CancelUpdateAccontType
      });
    },

    confirmResetPasssword() {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToResetPassswordByEmail"),
        accept: this.ResetPasssword,
        acceptText: this.$t("Reset"),
        cancelText: this.$t("Cancel"),
        cancel: this.CancelAlert
      });
    },
    ResetPasssword() {
      let ModelID = {};
      ModelID.Id = this.user_data.Id;
      this.$store
        .dispatch("auth/resetPasswordByAdmin", ModelID)
        .then(response => {
          if (response.data == 1) {
            this.$vs.loading.close();
            window.showCheckEmail();
          } else {
            window.showError();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    CancelAlert() {
      this.user_data.status = this.oldAccountStatus;
    },
    CancelUpdateAccontType() {
      this.user_data.accounttype = this.oldAccountType;
    },
    ChangeRecord() {
      if (this.user_data.status == null) {
        this.user_data.status = this.oldAccountStatus;
        return;
      }
      this.$vs.loading();
      this.user_data.Id = this.$route.params.Id;
      let Model = {};
      Model.Id = this.$route.params.Id;
      Model.Status = this.user_data.status;
      this.$store
        .dispatch("UserList/updateUserStatus", Model)
        .then(response => {
          if (response.status === 200) {
            this.oldAccountStatus = this.user_data.status;
            this.$vs.loading.close();
            window.showSuccess();
          }
        })
        .catch(() => {
          window.showError();
          this.$vs.loading.close();
        });
    },

    updateUserAccountType() {
      if (this.user_data.accounttype == null) {
        this.user_data.accounttype = this.oldAccountType;
        return;
      }
      this.$vs.loading();
      this.user_data.Id = this.$route.params.Id;
      let Model = {};
      Model.Id = this.$route.params.Id;
      Model.AccountType = this.user_data.accounttype;
      this.$store
        .dispatch("UserList/updateUserAccountType", Model)
        .then(response => {
          if (response.status === 200) {
            this.oldAccountType = this.user_data.accounttype;
            this.$vs.loading.close();
            window.showSuccess();
          }
        })
        .catch(() => {
          window.showError();
          this.$vs.loading.close();
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
              .dispatch("UserList/fetchUserDetailsList", this.user_data)
              .then(response => {
                this.user_data = response.data;
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
      .then(response => {
        this.user_data = response.data;
        this.oldAccountStatus = response.data.status;
        this.oldAccountType = response.data.accounttype;
        this.accounttype = response.data.accounttype;
        this.$vs.loading.close();
      })
      .catch(() => {
        window.showError();
        this.$vs.loading.close();
      });
  }
};
</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-client-view {
  table {
    td {
      vertical-align: baseline !important;
      min-width: 140px;
      padding-bottom: 0.8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width: 370px) {
          display: block;
        }
      }
    }
  }
}

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }
}
</style>
