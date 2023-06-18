<!-- =========================================================================================
	File Name: App.vue
	Description: Main vue file - APP
	----------------------------------------------------------------------------------------
	Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
	Author: Pixinvent
	Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import themeConfig from "@/../themeConfig.js";
import jwt from "@/http/requests/auth/jwt/index.js";

export default {
  data() {
    return {
      CurrentStatus: null
    };
  },
  watch: {
    "$store.state.theme"(val) {
      this.toggleClassInBody(val);
    },
    "$vs.rtl"(val) {
      document.documentElement.setAttribute("dir", val ? "rtl" : "ltr");
    }
  },

  methods: {
    /* eslint-disable */
    showError() {
      this.$vs.notify({
        color: "red",
        position: "right-bottom",
        title: this.$t("Error"),
        text: this.$t("showError")
      });
    },
    showSuccessCreate() {
      this.$vs.notify({
        color: "#27ABBE",
        position: "top-center",
        title: this.$t("Create"),
        text: this.$t("RegisterCreatedSuccessfuly")
      });
    },
    showAlreadyExist() {
      this.$vs.notify({
        color: "#27ABBE",
        position: "bottom-center",
        title: this.$t("AlreadyExist"),
        text: this.$t("ThisUserAlreadyExist")
      });
    },
    showAddDriverToBiadjoSuccess() {
      this.$vs.notify({
        color: "#27ABBE",
        position: "top-center",
        title: this.$t("AssignToDriver"),
        text: this.$t("Assign")
      });
    },
    showSuccess() {
      this.$vs.notify({
        color: "#27ABBE",
        position: "top-center",
        title: this.$t("Update"),
        text: this.$t("showUpdate")
      });
    },
    showSuccessAddNote() {
      this.$vs.notify({
        color: "#27ABBE",
        position: "top-center",
        title: this.$t("Update"),
        text: this.$t("SuccessAddNote")
      });
    },
    showDriverAddeddSuccessfuly() {
      this.$vs.notify({
        color: "#27ABBE",
        position: "top-center",
        title: this.$t("Success"),
        text: this.$t("DriverAddeddSuccessfuly")
      });
    },
    showFillData() {
      this.$vs.notify({
        color: "red",
        position: "right-bottom",
        text: "Please fill all required data..."
      });
    },
    showNoRecords() {
      this.$vs.notify({
        color: "#27ABBE",
        position: "bottom-center",
        title: this.$t("Search"),
        text: this.$t("showNoDataAvailable")
      });
    },
    showCheckEmail() {
      this.$vs.notify({
        color: "#27ABBE",
        position: "top-center",
        title: this.$t("ResetPassword"),
        text: this.$t("showCheckEmail")
      });
    },
    showPasswordChanged() {
      this.$vs.notify({
        color: "#27ABBE",
        position: "top-center",
        title: this.$t("ResetPassword"),
        text: this.$t("showPasswordChanged")
      });
    },
    notAllowedToAccessCurrentPage(CurrentStatus) {
      if (
        CurrentStatus == "BS11" ||
        CurrentStatus == "BS13" ||
        CurrentStatus == "BS14" ||
        CurrentStatus == "SO3" ||
        CurrentStatus == "SO4" ||
        CurrentStatus == "CS2" ||
        CurrentStatus == "CS3" ||
        CurrentStatus == "PS1" ||
        CurrentStatus == "DPS1"
      ) {
        this.$router.go(-1);
      }
    },
    toggleClassInBody(className) {
      if (className == "dark") {
        if (document.body.className.match("theme-semi-dark")) {
          document.body.classList.remove("theme-semi-dark");
        }
        document.body.classList.add("theme-dark");
      } else if (className == "semi-dark") {
        if (document.body.className.match("theme-dark")) {
          document.body.classList.remove("theme-dark");
        }
        document.body.classList.add("theme-semi-dark");
      } else {
        if (document.body.className.match("theme-dark")) {
          document.body.classList.remove("theme-dark");
        }
        if (document.body.className.match("theme-semi-dark")) {
          document.body.classList.remove("theme-semi-dark");
        }
      }
    },
    handleWindowResize() {
      this.$store.commit("UPDATE_WINDOW_WIDTH", window.innerWidth);
    },
    handleScroll() {
      this.$store.commit("UPDATE_WINDOW_SCROLL_Y", window.scrollY);
    }
  },
  mounted() {
    this.toggleClassInBody(themeConfig.theme);
    this.$store.commit("UPDATE_WINDOW_WIDTH", window.innerWidth);
  },
  async created() {
    // this.$store.state.SessionExpired = false;

    // jwt
    jwt.init();

    if (localStorage.getItem("SaveLang") === "ar") {
      this.$vs.rtl = true;
    }
    window.showError = this.showError;
    window.showSuccess = this.showSuccess;
    window.showAddDriverToBiadjoSuccess = this.showAddDriverToBiadjoSuccess;
    window.showNoRecords = this.showNoRecords;
    window.showCheckEmail = this.showCheckEmail;
    window.showFillData = this.showFillData;
    window.showPasswordChanged = this.showPasswordChanged;
    window.notAllowedToAccessCurrentPage = this.notAllowedToAccessCurrentPage;
    window.showSuccessCreate = this.showSuccessCreate;
    window.showAlreadyExist = this.showAlreadyExist;
    window.showDriverAddeddSuccessfuly = this.showDriverAddeddSuccessfuly;
    window.showSuccessAddNote = this.showSuccessAddNote;

    let dir = this.$vs.rtl ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);

    window.addEventListener("resize", this.handleWindowResize);
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style scoped>
#loading-bg {
  width: 100%;
  height: 100%;
  background: #fff;
  display: block;
  position: absolute;
}

.loading-logo {
  position: absolute;
  left: calc(50% - 45px);
  top: 35%;
}

.loading {
  position: absolute;
  left: calc(50% - 35px);
  top: 50%;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 3px solid transparent;
}

.loading .effect-1,
.loading .effect-2 {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-left: 3px solid rgba(121, 97, 249, 1);
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.loading .effect-1 {
  animation: rotate 1s ease infinite;
}

.loading .effect-2 {
  animation: rotateOpacity 1s ease infinite 0.1s;
}

.loading .effect-3 {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-left: 3px solid rgba(121, 97, 249, 1);
  -webkit-animation: rotateOpacity 1s ease infinite 0.2s;
  animation: rotateOpacity 1s ease infinite 0.2s;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.loading .effects {
  transition: all 0.3s ease;
}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}

@keyframes rotateOpacity {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 0.1;
  }
  100% {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
    opacity: 1;
  }
}
</style>
