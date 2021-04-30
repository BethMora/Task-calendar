import UserService from "@/services/UserService";

import { encryptKey } from "@/libs/encrypt";

export default {
  strict: true,
  // namespaced: true,
  state: {
    isLogin: false,

    usersLogin: [],
    userLoggedOk: {},
  },

  getters: {
    isLogin(state) {
      return state.isLogin;
    },

    usersLogin(state) {
      return state.usersLogin;
    },

    newUserLoggedIn: (state) => (keyUnique) => {
      const userLogged = state.usersLogin.find(
        (user) => user._id === keyUnique
      );

      if (userLogged != undefined) {
        if (userLogged.token === sessionStorage.getItem("token")) {
          userLogged.isLogin = true;
        } else {
          userLogged.isLogin = false;
        }
      }
      return userLogged;
    },

    userLoggedId: (state) => (id) => {
      const userAccordingId = state.usersLogin.find((user) => user._id === id);
      return userAccordingId;
    },

    userLoggedOk(state) {
      return state.userLoggedOk;
    },
  },

  mutations: {
    setIsLogin(state, value) {
      state.isLogin = value;
    },

    setUsersLogin(state, value) {
      state.usersLogin.push(value);
    },

    setUserLoggedOk(state, user) {
      state.userLoggedOk = user;
    },

    updateUserLoggedOk(state, user) {
      for (const property in user) {
        if (
          Object.prototype.hasOwnProperty.call(state.userLoggedOk, property)
        ) {
          state.userLoggedOk[property] = user[property];
        }
      }
    },
  },

  actions: {
    async checkInAPI(context, obj) {
      let message = {};
      try {
        const response = await UserService.registerUser(obj);

        if (response.status === 200) {
          message = {
            msg: response.data.message,
            color: "success",
            status: response.request.status,
          };
          context.commit("setCheckIn", obj);
          // context.commit("setMesagge", message);
        } else {
          alert("There was an error the following \n" + response);
          message = {
            msg: response.data.error.message,
            color: "error",
            status: response.status,
          };
          // context.commit("setMesagge", message);
        }
      } catch (error) {
        alert("There was an error the following \n" + error);
        message = {
          msg: error,
          color: "danger",
          status: error,
        };
        // context.commit("setMesagge", message);
      }
      context.commit("setMesagge", message);
      context.commit("changeSheet");
    },

    async loginUserAPI(context, obj) {
      let message = {};
      const email = obj.username;
      const psw = encryptKey(obj.psw);
      const dataLogin = {
        email: email,
        password: psw,
      };
      try {
        const response = await UserService.loginUser(dataLogin);
        if (response.status === 200) {
          sessionStorage.setItem("token", response.data.token);
          const newUserLogged = response.data.user;
          newUserLogged.token = response.data.token;
          const keyUnique = newUserLogged._id;
          context.commit("setUsersLogin", newUserLogged);
          context.commit("setIsLogin", true);

          if (context.getters.newUserLoggedIn(keyUnique) != null) {
            context.commit(
              "setUserLoggedOk",
              context.getters.userLoggedId(keyUnique)
            );
          } else {
            console.log("No esta logueado, esta es la lista de usuarios");
            console.log(context.getters.usersLogin);
          }
        } else {
          message = {
            msg: response.data.message,
            color: "error",
            status: response.status,
          };
          context.commit("setMesagge", message);
          context.commit("changeSheet");
        }
      } catch (error) {
        alert("There was an error the following \n" + error);
        message = {
          msg: error,
          color: "danger",
          status: error,
        };
        context.commit("setMesagge", message);
        context.commit("changeSheet");
      }
    },

    logoOutUser(context) {
      sessionStorage.removeItem("token");
      context.commit("setUserLoggedOk", null);
      context.commit("setUserLoggedOk", {isLogin : false});
      context.commit('setEventsUserId', null, {root: true})
    },

    async editUserAPI(context, obj) {
      let message = {};
      try {
        const response = await UserService.updateUser(obj);
        if (response.status === 200) {
          message = {
            msg: response.data.message,
            color: "success",
            status: response.request.status,
          };
          // context.commit("setCheckIn", obj);
          context.commit("updateUserLoggedOk", obj);
        } else {
          alert("There was an error the following \n" + response);
          message = {
            msg: response.data.error.message,
            color: "error",
            status: response.status,
          };
        }
      } catch (error) {
        alert("There was an error the following \n" + error);
        message = {
          msg: error,
          color: "danger",
          status: error,
        };
        // context.commit("setMesagge", message);
      }
      context.commit("setMesagge", message);
      context.commit("changeSheet");
    },

    async editImageProfileAPI(context, obj) {
      let message = {};
      try {
        const response = await UserService.updateUser(obj);
        if (response.status === 200) {
          message = {
            msg: response.data.message,
            color: "success",
            status: response.request.status,
          };
          // context.commit("setCheckIn", obj);
          context.commit("updateUserLoggedOk", obj);
        } else {
          alert("There was an error the following \n" + response);
          message = {
            msg: response.data.error.message,
            color: "error",
            status: response.status,
          };
        }
      } catch (error) {
        alert("There was an error the following \n" + error);
        message = {
          msg: error,
          color: "danger",
          status: error,
        };
        // context.commit("setMesagge", message);
      }
      context.commit("setMesagge", message);
      context.commit("changeSheet");
    },
  },
};
