<template>
  <div id="page-client-view">
    <vs-alert
      color="danger"
      title="client Not Found"
      :active.sync="user_not_found"
    >
      <span>user record with id: {{ $route.params.Id }} not found. </span>
      <span>
        <span>Check </span
        ><router-link
          :to="{ name: 'ClientProfile' }"
          class="text-inherit underline"
          >All Clients</router-link
        >
      </span>
    </vs-alert>
    <div id="user-data" v-if="user_data != undefined">
      <vx-card v-bind:title="$t('UserInfo')" class="mb-base" id="account-info">
        <div class="vx-row">
          <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img :src="user_data.ProfilePic" class="rounded w-full" />
            </div>
          </div>

          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("FullName") }}</td>
                <td>{{ user_data.firstName }} {{ user_data.lastName }}</td>
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
                <td class="font-semibold">{{ $t("Country") }}</td>
                <td>{{ user_data.country }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CountryCode") }}</td>
                <td>{{ user_data.countrycode }}</td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("AccountType") }}</td>
                <td>{{ $t(user_data.accounttype) }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Status") }}</td>
                <td>{{ $t(user_data.status) }}</td>
              </tr>
            </table>
          </div>
          <input type="file" name="" id="" @click="decrypt" />
          <div class="vx-col w-full flex" id="account-manage-buttons">
            <div>
              <input
                type="file"
                class="hidden"
                ref="updateImgInput"
                @change="updateCurrImg"
                accept="image/*"
              />
              <vs-button
                icon-pack="feather"
                icon="icon-user"
                class="mr-4"
                @click="$refs.updateImgInput.click()"
              >
                {{ $t("UpdateImage") }}</vs-button
              >
            </div>
            <div>
              <vs-button
                icon-pack="feather"
                icon="icon-lock"
                class="mr-4"
                :to="{
                  name: 'ResetPasswordByUser',
                  params: { Id: user_data.Id }
                }"
              >
                {{ $t("ResetPassword") }}</vs-button
              >
            </div>
            <div>
              <vs-button
                type="border"
                color="warning"
                icon-pack="feather"
                @click="Back"
              >
                {{ $t("Back") }}</vs-button
              >
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import moduleAuth from "@/store/auth/moduleAuth.js";
import AccountStatus_JSON from "./../driver/json/accountStatus";
import AccountType_JSON from "./../driver/json/accountType";
/* eslint-disable */
let CryptoJS = require("crypto-js");

export default {
  AccountStatusJson: AccountStatus_JSON,
  AccountTypeJSON: AccountType_JSON,

  data() {
    return {
      user_data: {},
      user_not_found: false
    };
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    convertWordArrayToUint8Array(wordArray) {
      var arrayOfWords = wordArray.hasOwnProperty("words")
        ? wordArray.words
        : [];
      var length = wordArray.hasOwnProperty("sigBytes")
        ? wordArray.sigBytes
        : arrayOfWords.length * 4;
      var uInt8Array = new Uint8Array(length),
        index = 0,
        word,
        i;
      for (i = 0; i < length; i++) {
        word = arrayOfWords[i];
        uInt8Array[index++] = word >> 24;
        uInt8Array[index++] = (word >> 16) & 0xff;
        uInt8Array[index++] = (word >> 8) & 0xff;
        uInt8Array[index++] = word & 0xff;
      }
      return uInt8Array;
    },
    updateCurrImg(input) {
      const file = event.target.files[0];

      var reader = new FileReader();
      reader.onload = () => {
        var key = "1234567887654321";
        var wordArray = CryptoJS.lib.WordArray.create(reader.result); // Convert: ArrayBuffer -> WordArray
        var encrypted = CryptoJS.AES.encrypt(wordArray, key).toString(); // Encryption: I: WordArray -> O: -> Base64 encoded string (OpenSSL-format)

        var fileEnc = new Blob([encrypted]); // Create blob from string

        var a = document.createElement("a");
        var url = window.URL.createObjectURL(fileEnc);
        var filename = file.name + ".enc";
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      };
      reader.readAsArrayBuffer(file);
    },
    decrypt(input) {
      const file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = () => {
        var key = "1234567887654321";

        var decrypted = CryptoJS.AES.decrypt(reader.result, key); // Decryption: I: Base64 encoded string (OpenSSL-format) -> O: WordArray
        var typedArray = this.convertWordArrayToUint8Array(decrypted); // Convert: WordArray -> typed array

        var fileDec = new Blob([typedArray]); // Create blob from typed array

        var a = document.createElement("a");
        var url = window.URL.createObjectURL(fileDec);
        var filename = file.name.substr(0, file.name.length - 4);
        // + ".dec";
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      };
      reader.readAsText(file);
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
        this.user_data = res.data;

        this.$vs.loading.close();
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.$vs.loading.close();
          this.user_not_found = true;
          return;
        }
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
