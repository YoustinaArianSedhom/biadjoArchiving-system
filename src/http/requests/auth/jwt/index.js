import axios from "../../../axios/index.js";
import store from "../../../../store/store.js";
import EncryptionHandler from "@/http/requests/auth/jwt/EncryptionHandler.js";
// Token Refresh
// let isAlreadyFetchingAccessToken = false;
// let subscribers = [];

// function onAccessTokenFetched(access_token) {
//   subscribers = subscribers.filter(callback => callback(access_token));
// }

// function addSubscriber(callback) {
//   subscribers.push(callback);
// }

export default {
  init() {
    axios.interceptors.request.use(
      config => {
        // Do something before request is sent

        if (
          config.method != "get" &&
          config.headers["Content-Type"] != "multipart/form-data"
        ) {
          config.data = EncryptionHandler.encrypt(config.data);
        }

        return config;
      },
      function(error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      response => {
        if (response.status === 200 || response.status === 201) {
          response.data = EncryptionHandler.decrypt(response.data);

          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
      },
      error => {
        if (error.response.status) {
          error.response.data = EncryptionHandler.decrypt(error.response.data);
          switch (error.response.status) {
            case 415:
              console.log("Error 400");
              break;
            case 401:
              store.state.SessionExpired = true;
              store.dispatch("auth/logout");
              break;
            case 403:
              console.log("Error 403");
              break;
            case 404:
              console.log("Error 404");
              break;
            case 502:
              console.log("Error 502");
          }
          return Promise.reject(error);
        }
      }
    );
  },
  login(Email, Password) {
    return axios.post("/UserAccount/Login", {
      Email: Email,
      Password: Password
    });
  },
  registerUser(confPassword, email, pwd) {
    return axios.post("/UserAccount/RegisterUser", {
      confirmPassword: confPassword,
      email: email,
      password: pwd
    });
  }
  // refreshToken() {
  //   return axios.post("/refresh", {
  //     refreshToken: localStorage.getItem("refreshToken")
  //   });
  // }
};
