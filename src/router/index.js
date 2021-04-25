import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/views/Index.vue";
import Login from "@/views/Login.vue";
import SignIn from "@/components/Login/SignIn.vue";
import SignUp from "@/components/Login/SignUp.vue";
import ListUsers from "@/views/ListUsers.vue";

import Dashboard from "@/views/Dashboard.vue";
import EditUser from "@/components/Login/EditUser.vue";
import EditPassword from "@/components/Login/EditPassword.vue";
import EditPictureProfile from "@/components/Login/EditPictureProfile.vue";
import Calendar from "@/components/Tasks/Calendar.vue";
import CreateTask from "@/components/Tasks/CreateTask";

import store from "../store";

Vue.use(VueRouter);
// {
//   path: "*",
//   redirect: "/",
// },

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/login",
    component: Login,
    meta: { requiresAuth: false },
    children: [
      {
        path: "",
        name: "SignIn",
        component: SignIn,
      },
      {
        path: "/signUp",
        name: "SignUp",
        component: SignUp,
      },
    ],
  },
  { 
    path: "/createTask",
    name: "CreateTask",
    component: CreateTask,
  },

  {
    path: "/users",
    name: "ListUsers",
    component: ListUsers,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/dashboard/:id",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "",
        name: "Calendar",
        component: Calendar,
      },
      {
        path: "/editUser",
        name: "EditUser",
        component: EditUser,
      },
      {
        path: "/editPassword",
        name: "EditPassword",
        component: EditPassword,
      },
      {
        path: "/editPictureProfile",
        name: "EditPictureProfile",
        component: EditPictureProfile,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "active",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    console.log(store.getters.isLogin);
    if (!store.getters.isLogin) {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});

export default router;
