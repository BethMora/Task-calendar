import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import task from "./modules/task";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    login,
    task
  },
  state: {
    sheet: false,
    message: {
      msg: "",
      color: "",
      status: ""
    }
  },
  getters: {
    message(state) {
      return state.message;
    },
    sheet(state) {
      return state.sheet;
    }
  },
  mutations: {
    setMesagge(state, msg) {
      state.message = msg;
    },

    resetMessage(state) {
      state.message = {
        msg: "",
        color: "",
        status: ""
      };
    },

    changeSheet(state) {
      state.sheet = !state.sheet;
    }
  },
  actions: {}
});
