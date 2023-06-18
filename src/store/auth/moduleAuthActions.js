import axios from "@/axios.js";
import router from "@/router";
import jwt from "../../http/requests/auth/jwt/index.js";
import store from "@/store/store.js";

export default {
  getDriverLocation(context, Driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/GetDriverLocation", Driver)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  // JWT
  loginJWT({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .login(payload.userDetails.Email, payload.userDetails.Password)
        .then(response => {
          // If there's user data in response
          if (response.status == 200) {
            //window.location="/"
            // Set AccessToken
            localStorage.setItem(
              "TokenExpiration",
              response.data.TokenExpiration
            );
            localStorage.setItem("AccessToken", response.data.AccessToken);
            localStorage.setItem("RefreshToken", response.data.RefreshToken);
            // Set bearer token in axios
            commit("SET_BEARER", response.data.AccessToken);

            // Update user details
            commit("UPDATE_USER_INFO", response.data, { root: true });

            //router.push(router.currentRoute.query.to || '/')
            resolve(response);
            store.state.SessionExpired = false;
          } else {
            reject({ message: "Wrong Email or Password" });
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  registerUserJWT(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/UserAccount/RegisterUser", user)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchUserDetails({ commit }, payload) {
    return new Promise((resolve, reject) => {
      var JsonValue = {};
      JsonValue.Email = payload;
      JsonValue.Id = "";
      axios
        .post("/UserAccount/GetUserDetails", JsonValue, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AccessToken")}`
          }
        })
        .then(response => {
          if (response.status == 200) {
            commit("UPDATE_USER_INFO", response.data, { root: true });

            resolve(response);
          }
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  fetchUserDetailsList(context, user) {
    return new Promise(resolve => {
      axios
        .post("/UserAccount/GetUserDetails", user)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(function() {});
    });
  },
  fetchCurrentUserDetailsList({ commit }, user) {
    return new Promise(resolve => {
      axios
        .post("/UserAccount/GetUserDetails", user)
        .then(response => {
          if (response.status == 200) {
            commit("UPDATE_USER_INFO", response.data, { root: true });

            resolve(response);
          }
        })
        .catch(function() {});
    });
  },
  updateUserStatus(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/UserAccount/UpdateUserStatus", user)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateUserAccountType(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/UserAccount/UpdateUserAccountType", user)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  UpdateUserById(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/UserAccount/UpdateUser", user)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  UploadProfilePic(context, image) {
    const formData = new FormData();
    // var jsonObject = image.params.Id;
    formData.append("jsonObject", image.params.Id);
    formData.append("file", image.params.file, image.params.file.name);
    return new Promise((resolve, reject) => {
      axios
        .post("/UserAccount/UploadProfilePic", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  GetUsers(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/UserAccount/GetUsersSearch", user)
        .then(response => {
          // If there's user data in response
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchAccessToken() {
    return new Promise(resolve => {
      jwt
        .RefreshToken()
        .then(response => {
          resolve(response);
        })
        .catch(function() {
          router.push("/pages/login");
        });
    });
  },
  logout({ commit }) {
    localStorage.clear(); // Clear all
    // Update user details

    commit("CLEAR_USER_INFO", null, { root: true });
    store.state.AppActiveUser = {};
    // Set bearer token in axios
    commit("REMOVE_BEARER");
    router.push("/user/login/login");
  },

  resetPasswordByAdmin(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/UserAccount/ResetPasswordByAdmin", user)
        .then(response => {
          if (response.data == 1) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  resetPasswordByUser(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/UserAccount/ResetPasswordByUser", user)
        .then(response => {
          if (response.data == 1) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  refreshCurrentUser({ commit }) {
    return new Promise((resolve, reject) => {
      var JsonValue = {};
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      JsonValue.Email = userInfo.Email;
      JsonValue.Id = "";
      axios
        .post("/UserAccount/GetUserDetails", JsonValue)
        .then(response => {
          if (response.status == 200) {
            commit("UPDATE_USER_INFO", response.data, { root: true });
            resolve(response);
          }
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }
};
