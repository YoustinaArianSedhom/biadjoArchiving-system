import axios from "@/axios.js";
export default {
  GetBranchList(context, ParentId) {
    debugger;
    return new Promise((resolve, reject) => {
      axios
        .post("/Organization/GetBranchList", ParentId)
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

  CreateOrgTreeBranch(context, ParentId) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Organization/CreateOrgTreeBranch", ParentId)
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

  EditOrgTreeBranchName(context, ParentId) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Organization/EditOrgTreeBranchName", ParentId)
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

  CreateFolder(context, ParentId) {
    // "ParentOrgID": "0",
    // "ParentFoldID": "0",
    // "Name": "string"
    return new Promise((resolve, reject) => {
      axios
        .post("/Folders/CreateFolder", ParentId)
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

  EditFolderName(context, ParentId) {
    // "Id": "0",
    // "Name": "string"
    return new Promise((resolve, reject) => {
      axios
        .post("/Folders/EditFolderName", ParentId)
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

  MoveFolder(context, ParentId) {
    // "Id": "0",
    // "NewParentOrgID": "0",
    // "NewParentFoldID": "0",
    // "Name": "string"
    return new Promise((resolve, reject) => {
      axios
        .post("/Folders/MoveFolder", ParentId)
        .then(response => {
          debugger;
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  GetFoldersList(context, ParentId) {
    // "ParentOrgID": "0",
    // "ParentFoldID": "0"
    return new Promise((resolve, reject) => {
      axios
        .post("/Folders/GetFoldersList", ParentId)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }
};
