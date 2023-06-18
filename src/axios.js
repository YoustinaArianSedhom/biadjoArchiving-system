import axios from "axios";

// const domain = "https://testportal.biadjo.com:5003/";
// const domain = "https://localhost:5003/";
const domain = "https://archiveapi.biadjo.com:5005/";

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("AccessToken");

export default axios.create({
  baseURL: domain
  // You can add your headers here
  // headers: {
  //     Authorization: "Bearer " + localStorage.getItem("AccessToken")
  //   }
});
