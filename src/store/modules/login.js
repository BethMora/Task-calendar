import UserService from "@/services/UserService";
import router from "../../router/index";
import { encryptKey } from "@/libs/encrypt";
import { navigationAnyUser } from "@/libs/dataNavigationRole";
export default {
  strict: true,
  state: {
    allUsers: [],
    userLoggedOk: {
      isLogin: false,
      role: "",
      itemsNavigation: navigationAnyUser,
    },
  },

  getters: {
    /**
     * Returns from the array of all users, the user's index according to the ID sent
     * @params {Number} User id
     * @return {Object} Object with user information
     */
    userIndex: (state) => (id) => {
      const userAccordingId = state.allUsers.findIndex(
        (user) => user._id === id
      );
      return userAccordingId;
    },

    /**
     * Returns to the logged user
     * @return {Object} Object with user information
     */
    userLoggedOk(state) {
      return state.userLoggedOk;
    },

    /**
     * Returns all users registered in the API
     * @return {Array} Array of users queried from the API
     */
    allUsers(state) {
      return state.allUsers;
    },
  },

  mutations: {
    /**
     * Set the logged user in the state object
     * @params {Object} user data to be modified
     */
    setUserLoggedOk(state, user) {
      state.userLoggedOk = user;
    },

    /**
     * In the object of the state change the user information
     * @params {Object} user data to be modified
     */
    updateUserLoggedOk(state, user) {
      for (const property in user) {
        if (
          Object.prototype.hasOwnProperty.call(state.userLoggedOk, property)
        ) {
          state.userLoggedOk[property] = user[property];
        }
      }
    },

    /**
     * In the array of users in the state, change to the selected user
     * @params {Object} user data, array index
     */
    updateUserInAllUsers(state, data) {
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

    /**
     * Sets the users value of the API query that gets paginated users
     * @params {Object or Array} the value depends on the number of api users
     */
    setAllUsers(state, users) {
      if (users.length >= 1) {
        state.allUsers = users;
      }
      if (users.length === undefined) {
        state.allUsers.push(users);
      }
    },
  },

  actions: {
    /**
     * Get the paginated users from the API according to the parameters
     * @params {Object} page and sizePage
     */
    async usersAPI({ commit }, obj) {
      try {
        const response = await UserService.allUsers(obj);
        if (response.status === 200) {
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

    /**
     * Register new user in the API
     * @params {FormData} file, email, password, role, ...
     */
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

    /**
     * Validate the user in the API to allow access and generate a token
     * @params {Object} username y psw
     * @see encryptKey method that encrypts with the js-sha256 library
     */
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
          context.commit("setUserLoggedOk", newUserLogged);
          router.replace(`/dashboard/${newUserLogged.userName}`);
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

    /**
     * Edit user information both in the store and in the API
     * @params {Object} data of the user to be modified
     */
    async editUserAPI(context, obj) {
      try {
        const response = await UserService.updateUser(obj);
        if (response.status === 200) {
          try {
            const object = {};
            obj.forEach((value, key) => {
              object[key] = value;
            });
            const indexIdUser = context.getters.userIndex(obj.get("_id"));
            object.index = indexIdUser;
            if (indexIdUser != -1) {
              if (response.data.imageName != null) {
                object.imageName = response.data.imageName;
              }
              context.commit("updateUserInAllUsers", object);
              if (context.getters.userLoggedOk._id === object._id) {
                context.commit("updateUserLoggedOk", object);
              }
            } else {
              if (response.data.imageName != null) {
                obj.imageName = response.data.imageName;
              }
              context.commit("updateUserLoggedOk", obj);
            }
          } catch (error) {
            const indexIdUser = context.getters.userIndex(obj._id);
            obj.index = indexIdUser;
            if (response.data.imageName != null) {
              obj.imageName = response.data.imageName;
            }
            if (indexIdUser != -1) {
              context.commit("updateUserInAllUsers", obj);
              if (context.getters.userLoggedOk._id === obj._id) {
                context.commit("updateUserLoggedOk", obj);
              }
            } else {
              context.commit("updateUserLoggedOk", obj);
            }
          }
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

    /**
     * Close the user session and reset store state
     * @params {Object} page and sizePage
     */
    logoOutUser({ commit }) {
      sessionStorage.removeItem("token");
      commit("setUserLoggedOk", null);
      commit("setUserLoggedOk", { isLogin: false, role: "" });
      commit("setEventsUserId", null, { root: true });
      router.replace("/login");
    },
  },
};
