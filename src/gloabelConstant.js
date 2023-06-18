// export const domain = 'https://localhost:44388/api/values'
// const domain = "https://testportal.biadjo.com:5003/";
const domain = "https://archiveapi.biadjo.com:5005/";
// export const domain = ''

export const mainSetting = {
  UploadRequestHeader: {
    Authorization: "Bearer " + localStorage.getItem("AccessToken")
  }
};
