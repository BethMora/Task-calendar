import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import Login from "../views/Login.vue";
import SignUp from "../components/Login/SignUp.vue";
import Dashboard from "../views/Dashboard.vue";
import ListUsers from "../views/ListUsers.vue";
import Calendar from "../components/Calendar.vue";
import CreateTask from "../components/Tasks/CreateTask";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    children : [
      {
        path: "/register",
        name: "Register",
        component: SignUp
      },
    ]
  },
  {
    path: "*",
    redirect: "/"
  },
  {
    path: "/users",
    name: "ListUsers",
    component: ListUsers
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar
  },
  {
    path: "/createTask",
    name: "createTask",
    component: CreateTask
  },
  {
    path: "/dashboardAll",
    name: "DashboardAll",
    component: Dashboard,
    children : [
      {
        path: "/dashboard/:id",
        name: "dashboard",
        component: Dashboard
      },
    ]
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
  routes  
});

export default router;
