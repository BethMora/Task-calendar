import UserService from "@/services/UserService";
import router from "../../router/index";
import { encryptKey } from "@/libs/encrypt";

export default {
  strict: true,
  state: {
    allUsers: [],
    userLoggedOk: {
      isLogin: false,
      role: "",
    },
  },

  getters: {
    userIndex: (state) => (id) => {
      const userAccordingId = state.allUsers.findIndex(
        (user) => user._id === id
      );
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
      }
    },

    setAllUsers(state, users) {
      if (users === null) {
        state.allUsers = [];
      } else {
        if (users.length >= 1) {
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
          router.replace(`/dashboard/${newUserLogged.userName}`);
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
      commit("setUserLoggedOk", { isLogin: false, role: "" });
      commit("setEventsUserId", null, { root: true });
      router.replace("/login");
    },

    async editUserAPI(context, obj) {
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
            context.commit("updateUserInAllUsers", object);
          } catch (error) {
            const indexIdUser = context.getters.userIndex(obj._id);
            obj.index = indexIdUser;
            context.commit("updateUserInAllUsers", obj);
          }
          context.commit("updateUserLoggedOk", obj);
          response.flagMsg = "OK";
          context.commit("setMesagge", response);
        } else {
          response.flagMsg = "ERROR";
          context.commit("setMesagge", response);
        }
      } catch (error) {
        context.commit("setMesaggeErrorCatch", error);
      }
      context.commit("changeSheet");
    },

    // async editImageProfileAPI({ commit }, obj) {
    //   try {
    //     const response = await UserService.updateUser(obj);
    //     if (response.status === 200) {
    //       response.flagMsg = "OK";
    //       commit("updateUserLoggedOk", obj);
    //     } else {
    //       response.flagMsg = "ERROR";
    //     }
    //     commit("setMesagge", response);
    //   } catch (error) {
    //     commit("setMesaggeErrorCatch", error);
    //   }
    //   commit("changeSheet");
    // },
  },
};
