import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import Login from "../views/Login.vue";
import SignIn from "@/components/Login/SignIn.vue";
import SignUp from "@/components/Login/SignUp.vue";
import Dashboard from "../views/Dashboard.vue";
import ListUsers from "../views/ListUsers.vue";
import Calendar from "../components/Calendar.vue";
import CreateTask from "../components/Tasks/CreateTask";

// import { Store } from "vuex";
import store from "../store";
// import { Store } from "vuex";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/login",
    name: "Login",
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
  // {
  //   path: "*",
  //   redirect: "/",
  // },

  {
    path: "/users",
    name: "ListUsers",
    component: ListUsers,
    // meta: {
    //   requiresAuth: true,
    // },
  },

  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/createTask",
    name: "createTask",
    component: CreateTask,
  },
  {
    path: "/dashboardAll",
    name: "DashboardAll",
    component: Dashboard,
    children: [
      {
        path: "/dashboard/:id",
        name: "dashboard",
        component: Dashboard,
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
    console.log(store.getters.isLogin)
    if (!store.getters.isLogin) {
      next({ path: "/login" });
      // if (to.name === "Login") {
      //   next({ name: "Index" });
      // } else {
      //   next({ path: "/login" });
      // }
    } else {
      console.log("existe token");
      next();
    }
  } else {
    next();
  }
});

export default router;
