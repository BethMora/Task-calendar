import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import task from "./modules/task";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    login,
    task,
  },
  state: {
    sheet: false,
    message: {
      msg: "",
      color: "",
      status: "",
    },
  },
  getters: {
    message(state) {
      return state.message;
    },
    sheet(state) {
      return state.sheet;
    },
  },
  mutations: {
    setMesagge(state, response) {
      const message = {
        status: response.status,
      };

      if (response.flagMsg === "OK") {
        (message.msg = response.data.message), (message.color = "success");
      } else {
        (message.msg = response.data.error.message), (message.color = "error");
      }
      state.message = message;
    },

    // setMesaggeOk(state, response) {
    //   const message = {
    //     // msg: response.data.message,
    //     // color: "success",
    //     status: response.status,
    //   };

    //   if(response.flagMsg === "OK"){
    //     message.msg = response.data.message,
    //     message.color = "success"
    //   }else{
    //     message.msg = response.data.error.message,
    //     message.color = "error"
    //   }
    //   state.message = message;
    // },

    // setMesaggeError(state, response) {
    //   const message = {
    //     msg: response.data.error.message,
    //     color: "error",
    //     status: response.status,
    //   };
    //   state.message = message;
    // },

    setMesaggeErrorCatch(state, error) {
      const message = {
        msg:
          "Sorry, there was the following error with the API connection " +
          error,
        color: "error",
        status: "NO CONNECTION",
      };
      state.message = message;
    },

    resetMessage(state) {
      state.message = {
        msg: "",
        color: "",
        status: "",
      };
    },

    changeSheet(state) {
      state.sheet = !state.sheet;
    },
  },
  actions: {},
});
