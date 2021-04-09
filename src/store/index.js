import Vue from "vue";
import Vuex from "vuex";
import login from './modules/login'
import task from './modules/task'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    login,
    task
  },
  state: {
    message: {
      msg: "",
      color: "",
      status: "",
    },
  },
  getters:{
    message(state) {
      return state.message;
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
        status: "",
      }
    }
  },
  actions: {},
});
