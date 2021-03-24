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
  state: {},
  mutations: {},
  actions: {},
});
