/*=========================================================================================
  File Name: moduleAuthMutations.js
  Description: Auth Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from "../../http/axios/index.js";

export default {
  UPDATE_USER_INFO(state, user) {
    state.user = user;
  },
  SET_BEARER(state, AccessToken) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + AccessToken;
  },
  REMOVE_BEARER() {
    delete axios.defaults.headers.common["Authorization"];
  }
};
