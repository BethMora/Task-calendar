import UserService from "@/services/UserService";

import { encryptKey } from "@/libs/encrypt";

export default {
  strict: true,
  // namespaced: true,
  state: {
    isLogin: false,
    rol: "",

    // usersLogin: [],
    allUsers: [],
    userLoggedOk: {
      isLogin: false,
      // rol : '',
    },
  },

  getters: {
    isLogin(state) {
      return state.isLogin;
    },
    rol(state) {
      return state.rol;
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

    allUsers(state) {
      return state.allUsers;
    },
  },

  mutations: {
    setIsLogin(state, value) {
      state.isLogin = value;
    },
    setRol(state, value) {
      state.rol = value;
    },

    // setUsersLogin(state, value) {
    //   state.usersLogin.push(value);
    // },

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

    setAllUsers(state, users) {
      state.allUsers = users;
      console.log(state.allUsers);
    },
  },

  actions: {
    async usersAPI({ commit }, obj) {
      try {
        const response = await UserService.allUsers(obj);
        // console.log(response);
        // console.log(arrayUsers);
        if (response.status === 200) {
          response.flagMsg = "OK";
          const arrayUsers = response.data.data;
          commit("setAllUsers", arrayUsers);
        } else {
          response.flagMsg = "ERROR";
        }
        commit("setMesagge", response);
        commit("changeSheet");
      } catch (error) {
        commit("setMesaggeErrorCatch", error);
        commit("changeSheet");
      }
    },

    async checkInAPI({ commit }, obj) {
      try {
        const response = await UserService.registerUser(obj);
        if (response.status === 200) {
          response.flagMsg = "OK";
        } else {
          response.flagMsg = "ERROR";
        }
        commit("setMesagge", response);
      } catch (error) {
        commit("setMesaggeErrorCatch", error);
      }
      commit("changeSheet");
    },

    async loginUserAPI(context, obj) {
      const dataLogin = {
        email: obj.username,
        password: encryptKey(obj.psw),
      };
      try {
        const response = await UserService.loginUser(dataLogin);
        if (response.status === 200) {
          sessionStorage.setItem("token", response.data.token);
          const newUserLogged = response.data.user;
          newUserLogged.token = response.data.token;
          newUserLogged.isLogin = true;
          // console.log(newUserLogged)
          // const keyUnique = newUserLogged._id;
          // context.commit("setUsersLogin", newUserLogged);

          context.commit("setUserLoggedOk", newUserLogged);
          // context.commit("setIsLogin", true);
          // context.commit("setRol", newUserLogged.role);

          // if (context.getters.newUserLoggedIn(keyUnique) != null) {
          //   context.commit(
          //     "setUserLoggedOk",
          //     context.getters.userLoggedId(keyUnique)
          //   );
          // } else {
          //   console.log("No esta logueado, esta es la lista de usuarios");
          //   console.log(context.getters.usersLogin);
          // }
        } else {
          response.flagMsg = "ERROR";
          context.commit("setMesagge", response);
          context.commit("changeSheet");
        }
      } catch (error) {
        context.commit("setMesaggeErrorCatch", error);
        context.commit("changeSheet");
      }
    },

    logoOutUser({ commit }) {
      sessionStorage.removeItem("token");
      commit("setUserLoggedOk", null);
      commit("setUserLoggedOk", { isLogin: false });
      commit("setEventsUserId", null, { root: true });
      commit("setIsLogin", false);
      commit("setRol", "");
    },

    async editUserAPI({ commit }, obj) {
      try {
        const response = await UserService.updateUser(obj);
        if (response.status === 200) {
          response.flagMsg = "OK";
          commit("updateUserLoggedOk", obj);
        } else {
          response.flagMsg = "ERROR";
        }
        commit("setMesagge", response);
      } catch (error) {
        commit("setMesaggeErrorCatch", error);
      }
      commit("changeSheet");
    },

    async editImageProfileAPI({ commit }, obj) {
      try {
        const response = await UserService.updateUser(obj);
        if (response.status === 200) {
          response.flagMsg = "OK";
          commit("updateUserLoggedOk", obj);
        } else {
          response.flagMsg = "ERROR";
        }
        commit("setMesagge", response);
      } catch (error) {
        commit("setMesaggeErrorCatch", error);
      }
      commit("changeSheet");
    },
  },
};
