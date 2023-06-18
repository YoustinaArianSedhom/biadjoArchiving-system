<template>
  <div>
    <!-- USER PROFILE CARD - SCORE -->
    <div
      class="vx-col w-full lg:w-1/3 sm:w-1/2 mb-base"
      v-for="(item, index) in UsersList"
      :key="index"
    >
      <vx-card class="p-2" v-if="!ManageCurrentUserPermessions">
        <vs-avatar
          class="mx-auto mb-6 block"
          size="80px"
          :src="item.ProfilePic"
        />
        <div class="text-center">
          <h4>{{ item.firstName }} {{ item.lastName }}</h4>
          <p class="text-grey">{{ item.PhoneNumber }}</p>
        </div>
        <div class="flex justify-center">
          <vs-button
            class="mt-4 mr-2 shadow-lg"
            type="gradient"
            color="#3B6077"
            gradient-color-secondary="#27ABBE"
            @click="ManageUserPermessions(item.Id)"
            >{{ $t("ManageFolderPermessions") }}</vs-button
          >
        </div>
        <div class="flex justify-between">
          <small class="font-semibold">{{ $t(item.accounttype) }}</small>
          <vs-chip
            :color="getOrderStatusColor(item.status)"
            class="font-semibold"
            >{{ $t(item.status) }}</vs-chip
          >
          <!-- <small class="font-semibold">{{ $t(item.status) }}</small> -->
        </div>
      </vx-card>
      <vx-card class="p-2" v-if="ManageCurrentUserPermessions">
        <!-- ADD -->
        <div class="vx-row w-full mb-2">
          <div class="vx-col w-1/3">
            <span class="font-semibold">ADD</span>
          </div>
          <div class="vx-col w-2/3">
            <ul class="centerx vx-row mr-2 ml-2">
              <li>
                <vs-radio
                  v-model="item.AddPermession"
                  vs-name="AddPermession"
                  vs-value="true"
                  class="ml-4 mr-4  text-primary font-semibold"
                  >Allow</vs-radio
                >
              </li>
              <li>
                <vs-radio
                  v-model="item.AddPermession"
                  vs-name="AddPermession"
                  vs-value="false"
                  class="text-danger font-semibold"
                  >Deny</vs-radio
                >
              </li>
            </ul>
          </div>
        </div>
        <!-- ADD End -->
        <vs-divider />

        <!-- VIEW -->
        <div class="vx-row w-full mb-2">
          <div class="vx-col w-1/3">
            <span class="font-semibold">VIEW</span>
          </div>
          <div class="vx-col w-2/3">
            <ul class="centerx vx-row mr-2 ml-2">
              <li>
                <vs-radio
                  v-model="item.ViewPermession"
                  vs-name="ViewPermession"
                  vs-value="true"
                  class="ml-4 mr-4  text-primary font-semibold"
                  >Allow</vs-radio
                >
              </li>
              <li>
                <vs-radio
                  v-model="item.ViewPermession"
                  vs-name="ViewPermession"
                  vs-value="false"
                  class="text-danger font-semibold"
                  >Deny</vs-radio
                >
              </li>
            </ul>
          </div>
        </div>
        <!-- VIEW END -->
        <vs-divider />

        <!-- EDIT -->
        <div class="vx-row w-full mb-2">
          <div class="vx-col w-1/3">
            <span class="font-semibold">EDIT</span>
          </div>
          <div class="vx-col w-2/3">
            <ul class="centerx vx-row mr-2 ml-2">
              <li>
                <vs-radio
                  v-model="item.EditPermession"
                  vs-name="EditPermession"
                  vs-value="true"
                  class="ml-4 mr-4  text-primary font-semibold"
                  >Allow</vs-radio
                >
              </li>
              <li>
                <vs-radio
                  v-model="item.EditPermession"
                  vs-name="EditPermession"
                  vs-value="false"
                  class="text-danger font-semibold"
                  >Deny</vs-radio
                >
              </li>
            </ul>
          </div>
        </div>
        <!-- EDIT END -->
        <vs-divider />

        <!-- DELETE -->
        <div class="vx-row w-full mb-2">
          <div class="vx-col w-1/3">
            <span class="font-semibold">DELETE</span>
          </div>

          <div class="vx-col w-2/3">
            <ul class="centerx vx-row mr-2 ml-2">
              <li>
                <vs-radio
                  v-model="item.DeletePermession"
                  vs-name="DeletePermession"
                  vs-value="true"
                  class="ml-4 mr-4  text-primary font-semibold"
                  >Allow</vs-radio
                >
              </li>
              <li>
                <vs-radio
                  v-model="item.DeletePermession"
                  vs-name="DeletePermession"
                  vs-value="false"
                  class="text-danger font-semibold"
                  >Deny</vs-radio
                >
              </li>
            </ul>
          </div>
        </div>
        <!-- DELETE END -->
        <vs-divider />
        <!-- MOVE -->

        <div class="vx-row w-full mb-2">
          <div class="vx-col w-1/3">
            <span class="font-semibold">MOVE</span>
          </div>
          <div class="vx-col w-2/3">
            <ul class="centerx vx-row mr-2 ml-2">
              <li>
                <vs-radio
                  v-model="item.MovePermession"
                  vs-name="MovePermession"
                  vs-value="true"
                  class="ml-4 mr-4 text-primary font-semibold"
                  >Allow</vs-radio
                >
              </li>
              <li>
                <vs-radio
                  v-model="item.MovePermession"
                  vs-name="MovePermession"
                  vs-value="false"
                  class="text-danger font-semibold"
                  >Deny</vs-radio
                >
              </li>
            </ul>
          </div>
        </div>
        <!-- MOVE END -->
        <vs-button
          class="mt-4 mr-2 shadow-lg"
          type="gradient"
          color="#3B6077"
          gradient-color-secondary="#27ABBE"
          @click="ManageCurrentUserPermessions = false"
          >{{ $t("Cancel") }}</vs-button
        >
        <vs-button
          class="mt-4 mr-2 shadow-lg"
          type="gradient"
          color="#3B6077"
          gradient-color-secondary="#27ABBE"
          @click="UpdateCurrentUserPermessions(item)"
          >{{ $t("Submit") }}</vs-button
        >
      </vx-card>
    </div>
  </div>
</template>

<script>
import JsonFile from "@/http/requests/auth/jwt/JsonFile.json";
var CryptoJS = require("crypto-js");

export default {
  data() {
    return {
      UserModel: {
        Email: "",
        AccountType: "",
        Status: "",
        PhoneNumber: ""
      },
      CurrentUserPermessions: {
        AddPermession: false,
        DeletePermession: true,
        ViewPermession: false,
        EditPermession: true,
        MovePermession: false
      },

      UsersList: null,
      ManageCurrentUserPermessions: false
    };
  },
  methods: {
    UpdateCurrentUserPermessions(item) {
      console.log(item);
    },
    ManageUserPermessions(item) {
      console.log(item);
      item.AddPermession = this.ManageCurrentUserPermessions = true;
    },
    getOrderStatusColor(status) {
      if (status == "AS1") {
        return "#039BE5";
      }
      if (status == "AS2" || status == "AS3" || status == "AS4") {
        return "#EA5455";
      }
      if (status == "AS5" || status == "AS6") {
        return "#FF9F43";
      }
      // return "primary";
    },
    decrypt(input) {
      let fileExtension = input.fileName.substr(0, input.fileName.length - 4);
      input = JSON.parse(input.fileData);
      var iv = CryptoJS.enc.Base64.parse(input.iv).toString(CryptoJS.enc.Hex);
      iv = CryptoJS.enc.Hex.parse(iv);

      var Pass = CryptoJS.enc.Utf8.parse(JsonFile.EncryptionPassword);
      var Salt = CryptoJS.enc.Base64.parse(input.salt);

      var key = CryptoJS.PBKDF2(Pass.toString(CryptoJS.enc.Utf8), Salt, {
        keySize: JsonFile.keySize,
        iterations: JsonFile.Iterations
      });

      var decrypted = CryptoJS.AES.decrypt(input.cipherText, key, {
        mode: CryptoJS.mode.CBC,
        iv: iv,
        padding: CryptoJS.pad.Pkcs7
      });

      let StringDecrypt = decrypted.toString(CryptoJS.enc.Utf8);

      fileExtension = fileExtension.split(".").pop();

      var Image = `data:image/${fileExtension};base64,` + StringDecrypt;
      return Image;
    },
    GetUsersList() {
      this.UsersList = [];
      this.$store
        .dispatch("auth/GetUsers", this.UserModel)
        .then(response => {
          if (response.status == 200) {
            if (response.data.length > 0) {
              for (let i = 0; i < response.data.length; i++) {
                response.data[i] = {
                  ...response.data[i],
                  ...this.CurrentUserPermessions
                };

                if (
                  response.data[i].ProfilePic &&
                  response.data[i].ProfilePic.split(".").pop() == "txt"
                ) {
                  response.data[i].ProfilePic = this.decrypt(
                    response.data[i].ProfilePic
                  );
                } else {
                  response.data[
                    i
                  ].ProfilePic = require("@/assets/images/pages/DefaultProfilePic.png");
                }
              }
              this.UsersList = response.data;
              console.log(this.UsersList);
              this.$vs.loading.close();
            }
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    }
  },

  created() {
    this.GetUsersList();
  }
};
</script>
