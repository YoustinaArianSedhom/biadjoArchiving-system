/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
// const UserRole = JSON.parse(localStorage.getItem("userInfo")).accounttype;
export default [
  {
    url: "/",
    name: "Home",
    slug: "home",
    icon: "HomeIcon",
    // show: !UserRole,
    i18n: "Home"
  },

  {
    url: "/tree",
    name: "Tree",
    slug: "Tree",
    // show: !UserRole,
    icon: "HashIcon",
    i18n: "Tree"
  },
  {
    url: "/user/register/register",
    name: "user-register",
    slug: "register",
    // show: !UserRole,
    icon: "HashIcon",
    i18n: "register"
  },
  {
    url: "/user/UserList",
    name: "UserList",
    slug: "UserList",
    // show: !UserRole,
    icon: "HashIcon",
    i18n: "UserList"
  }
];
