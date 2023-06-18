import Vue from "vue";
import Router from "vue-router";
// import auth from "@/auth/authService";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: "",
      component: () => import("./layouts/main/Main.vue"),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: "/",
          name: "home",
          component: () => import("./views/Home.vue"),
          meta: {
            rule: "Anonymous"
          }
        },
        {
          path: "/tree",
          name: "Tree",
          component: () => import("@/views/tree/Tree.vue"),
          meta: {
            rule: "Anonymous"
          }
        },
        {
          path: "/SecureFolder",
          name: "SecureFolder",
          component: () => import("@/views/tree/SecureFolder.vue"),
          meta: {
            rule: "Anonymous"
          }
        },
        {
          path: "/user/UserList",
          name: "UserList",
          component: () => import("@/views/user/UserList.vue"),
          meta: {
            pageTitle: "UserList"
          }
        },
        {
          path: "/user/UserDetails/:Id?",
          name: "UserDetails",
          component: () => import("@/views/user/UserDetails.vue"),
          meta: {
            pageTitle: "UserDetails"
          }
        },
        {
          path: "/user/User-Edit/:Id?",
          name: "User-Edit",
          component: () => import("@/views/user/User-Edit.vue"),
          meta: {
            pageTitle: "User-Edit"
          }
        },
        {
          path: "/user/ResetPasswordByUser/:Id?",
          name: "ResetPasswordByUser",
          component: () => import("@/views/user/ResetPasswordByUser.vue"),
          meta: {
            pageTitle: "ResetPasswordByUser"
          }
        }

        // =============================================================================
        // Application Routes
        // =============================================================================
        // {
        //     path: '/apps/todo',
        //     redirect: '/apps/todo/all'
        // },

        // =============================================================================
        // COMPONENT ROUTES
        // =============================================================================
        // {
        //     path: '/components/alert',
        //     name: 'component-alert',
        //     component: () => import('@/views/components/vuesax/alert/Alert.vue'),
        //     meta: {
        //         breadcrumb: [
        //             { title: 'Home', url: '/' },
        //             { title: 'Components' },
        //             { title: 'Alert', active: true },
        //         ],
        //         pageTitle: 'Alert',
        //         rule: 'User'
        //     },
        // },
        // {
        //     path: '/components/upload',
        //     name: 'component-upload',
        //     component: () => import('@/views/components/vuesax/upload/Upload.vue'),
        //     meta: {
        //         breadcrumb: [
        //             { title: 'Home', url: '/' },
        //             { title: 'Components' },
        //             { title: 'Upload', active: true },
        //         ],
        //         pageTitle: 'Upload',
        //         rule: 'User'
        //     },
        // },

        // =============================================================================
        // FORMS
        // =============================================================================
        // =============================================================================
        // FORM ELEMENTS
        // =============================================================================
        // {
        //     path: '/forms/form-elements/select',
        //     name: 'form-element-select',
        //     component: () => import('./views/forms/form-elements/select/Select.vue'),
        //     meta: {
        //         breadcrumb: [
        //             { title: 'Home', url: '/' },
        //             { title: 'Form Elements' },
        //             { title: 'Select', active: true },
        //         ],
        //         pageTitle: 'Select',
        //         rule: 'User'
        //     },
        // },
        // {
        //     path: '/forms/form-elements/textarea',
        //     name: 'form-element-textarea',
        //     component: () => import('./views/forms/form-elements/textarea/Textarea.vue'),
        //     meta: {
        //         breadcrumb: [
        //             { title: 'Home', url: '/' },
        //             { title: 'Form Elements' },
        //             { title: 'Textarea', active: true },
        //         ],
        //         pageTitle: 'Textarea',
        //         rule: 'User'
        //     },
        // },
        // -------------------------------------------------------------------------------------------------------------------------------------------
        // {
        //     path: '/forms/form-layouts',
        //     name: 'forms-form-layouts',
        //     component: () => import('@/views/forms/FormLayouts.vue'),
        //     meta: {
        //         breadcrumb: [
        //             { title: 'Home', url: '/' },
        //             { title: 'Forms' },
        //             { title: 'Form Layouts', active: true },
        //         ],
        //         pageTitle: 'Form Layouts',
        //         rule: 'User'
        //     },
        // },
        // =============================================================================
        // Pages Routes
        // =============================================================================
        // {
        //     path: '/pages/profile',
        //     name: 'page-profile',
        //     component: () => import('@/views/pages/Profile.vue'),
        //     meta: {
        //         breadcrumb: [
        //             { title: 'Home', url: '/' },
        //             { title: 'Pages' },
        //             { title: 'Profile', active: true },
        //         ],
        //         pageTitle: 'Profile',
        //         rule: 'User'
        //     },
        // },
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: "",
      component: () => import("@/layouts/full-page/FullPage.vue"),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================

        {
          path: "/user/IdleSessionLogout",
          name: "Session-Expired",
          component: () => import("@/views/user/IdleSessionLogout.vue"),
          meta: {
            pageTitle: "IdleSessionLogout"
          }
        },
        {
          path: "/user/login/login",
          name: "user-login",
          component: () => import("@/views/user/login/Login.vue"),
          meta: {
            pageTitle: "Login"
          }
        },
        {
          path: "/user/register/register",
          name: "user-register",
          component: () => import("@/views/user/register/Register.vue"),
          meta: {
            pageTitle: "register"
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: "*",
      redirect: "/pages/error-404"
    }
  ]
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});
router.beforeEach((to, from, next) => {
  const publicPages = ["/user/login/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("userInfo");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/user/login/login");
  } else {
    next();
  }
});

// });

export default router;
