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
      role: "",
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

    //Devuelve el indice del arreglo allUsers donde el indice sea igual al param id
    userIndex: (state) => (id) => {
      const userAccordingId = state.allUsers.findIndex(
        (user) => user._id === id
      );
      return userAccordingId;
    },

    // userLoggedId: (state) => (id) => {
    //   const userAccordingId = state.usersLogin.find((user) => user._id === id);
    //   return userAccordingId;
    // },

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

    updateUserInAllUsers(state, data) {
      console.log("Recibimos en las mutaciones el siguiente valor");
      console.log(data);
      // if (data.typeEdit === "updatedByAdmin") {
      for (const property in data) {
        if (
          Object.prototype.hasOwnProperty.call(
            state.allUsers[data.index],
            property
          )
        ) {
          state.allUsers[data.index][property] = data[property];
        }
        // }
      }

      // if (data.typeEdit === "deletedByAdmin") {
      //   state.allUsers[data.index].isActive = data.isActive;
      // }

      // if (data.typeEdit === "resetedByAdmin") {
      //   state.allUsers[data.index].password = data.password;
      // }
    },

    setAllUsers(state, users) {
      // state.allUsers = users;
      // state.allUsers = [];
      if (users === null) {
        state.allUsers = [];
      } else {
        if (users.length >= 1) {
          // for (const iterator of users) {
          //   state.allUsers.push(iterator);
          // }
          state.allUsers = users;
        }
        if (users.length === undefined) {
          state.allUsers.push(users);
        }
      }
    },
  },

  actions: {
    async usersAPI({ commit }, obj) {
      try {
        const response = await UserService.allUsers(obj);
        if (response.status === 200) {
          response.flagMsg = "OK";
          commit("setAllUsers", response.data.data);
        } else {
          response.flagMsg = "ERROR";
          commit("setMesagge", response);
          commit("changeSheet");
        }
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
          commit("setAllUsers", response.data.user);
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

    // async deleteUserAPI(context, obj) {
    //   try {
    //     const response = await UserService.updateUser(obj);
    //     if (response.status === 200) {
    //       const indexIdUser = context.getters.userIndex(obj._id);
    //       context.commit("updateUserInAllUsers", {
    //         index: indexIdUser,
    //         isActive: obj.isActive,
    //       });
    //       // response.flagMsg = "OK";
    //     } else {
    //       response.flagMsg = "ERROR";
    //       context.commit("setMesagge", response);
    //       context.commit("changeSheet");
    //     }
    //   } catch (error) {
    //     context.commit("setMesaggeErrorCatch", error);
    //     context.commit("changeSheet");
    //   }
    // },

    async editUserAPI(context, obj) {
      // console.log("recibo la data ",obj)
      // console.log("recibo la data ")
      // console.log(obj.constructor)
      // if(obj.constructor === "FormData() { [native code] }"){
      //   console.log("es un form data")
      // }
      try {
        const response = await UserService.updateUser(obj);
        console.log(response);
        if (response.status === 200) {
          try {
            const object = {};
            obj.forEach((value, key) => {
              object[key] = value;
            });
            const indexIdUser = context.getters.userIndex(obj.get("_id"));
            object.index = indexIdUser;

            // console.log("____________________________");
            // console.log("Enviamos el objeto");
            // console.log(object);
            // console.log("____________________________");
            context.commit("updateUserInAllUsers", object);
          } catch (error) {
            const indexIdUser = context.getters.userIndex(obj._id);
            obj.index = indexIdUser;
            context.commit("updateUserInAllUsers", obj);
          }
          context.commit("updateUserLoggedOk", obj);
          response.flagMsg = "OK";
        } else {
          response.flagMsg = "ERROR";
        }
        context.commit("setMesagge", response);
      } catch (error) {
        context.commit("setMesaggeErrorCatch", error);
      }
      context.commit("changeSheet");
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
