import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import Login from "../views/Login.vue";
import SignUp from "../components/Login/SignUp.vue";
import Dashboard from "../views/Dashboard.vue";
import ListUsers from "../views/ListUsers.vue";
import Calendar from "../components/Calendar.vue";
import CreateTask from "../components/Tasks/CreateTask";
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
    children: [
      {
        path: "/register",
        name: "Register",
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
  // {
  //   path: "/register",
  //   name: "Register",
  //   component: Login,
  //   children : [
  //     {
  //       path: "/Register",
  //       name: "Register",
  //       component: SignUp
  //     },
  //   ]
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "active",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    // if(!Store.state.loginStatus.status){
    // console.log(localStorage.getItem("token"))
    if (localStorage.getItem("token") === null) {
      console.log("token vacio");
      if (to.name === "Login") {
        next({ name: "Index" });
      } else {
        next({ name: "Login" });
      }
      // next("/login");
    } else {
      console.log("existe token");
      // next();
    }
  } else {
    next();
  }
  // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // else next()
});

export default router;
