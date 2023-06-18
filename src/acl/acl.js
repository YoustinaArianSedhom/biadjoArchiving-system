import Vue from "vue";
import { AclInstaller, AclCreate, AclRule } from "vue-acl";
import router from "./../router";
Vue.use(AclInstaller);

let initialRole = "Anonymous";
let userInfo = JSON.parse(localStorage.getItem("userInfo"));
if (userInfo && userInfo.accounttype) {
  initialRole = userInfo.accounttype;
}
export default new AclCreate({
  initial: initialRole,
  notfound: "/pages/not-authorized",
  router,
  acceptLocalRules: true,
  globalRules: {
    Settings: new AclRule("Settings")
      .or("AT0")
      .or("AT3")
      .or("AT12")
      .or("AT13")
      .generate(),
    UpdateBiadjo: new AclRule("UpdateBiadjo")
      .or("AT0")
      .or("AT3")
      .or("AT12")
      .or("AT11")
      .or("AT13")
      .generate(),
    UserManagement: new AclRule("UserManagement")
      .or("AT0")
      .or("AT1")
      .or("AT2")
      .or("AT3")
      .generate(),
    Accountant: new AclRule("Accountant")
      .or("AT0")
      .or("AT3")
      .or("AT8")
      .generate(),
    BalanceManagement: new AclRule("BalanceManagement")
      .or("AT0")
      .or("AT3")
      .or("AT5")
      .or("AT6")
      .or("AT8")
      .or("AT11")
      .or("AT12")
      .or("AT13")
      .generate(),
    Anonymous: new AclRule("Anonymous")
      .or("AT0")
      .or("AT1")
      .or("AT2")
      .or("AT3")
      .or("AT4")
      .or("AT5")
      .or("AT6")
      .or("AT7")
      .or("AT8")
      .or("AT9")
      .or("AT10")
      .or("AT11")
      .or("AT12")
      .or("AT13")
      .or("AT14")
      .generate()
  }
});
