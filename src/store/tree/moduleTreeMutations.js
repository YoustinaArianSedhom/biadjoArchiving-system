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
  },
  UpdateNodeId(state, NodeId) {
    state.NodeId = NodeId;
  },
  UpdateListOfFolders(state, ListOfFolders) {
    state.ListOfFolders = ListOfFolders;
  },
  UpdateListOfParents(state, ListOfParents) {
    state.ListOfParents = ListOfParents;
    // state.ListOfParents.push(ListOfParents);
  },
  UpdateOpenNode(state, OpenNode) {
    state.OpenNode = OpenNode;
  },
  UpdateOpenComponent(state, OpenComponent) {
    state.OpenComponent = OpenComponent;
  },
  UpdateMoveFolders(state, MoveFolders) {
    state.MoveFolders = MoveFolders;
  },
  UpdateSelectedFolderToMove(state, SelectedFolderToMove) {
    state.SelectedFolderToMove = SelectedFolderToMove;
  }
};
