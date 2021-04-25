import axios from "axios";
import UserService from "@/services/UserService";

import { encryptKey } from "@/libs/encrypt";

export default {
  strict: true,
  state: {
    // users: [],
    // loginStatus: {
    //   username: "",
    //   token: "",
    //   status: false,
    // },
    // userLog: {},

    creatingUsers: [],

    //datos de usuarios logueados
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

    // validarNombreUnico: state => nombre => {
    //   for (let i of state.arrayTDC) {
    //     if (i.nombre.toLowerCase().trim() === nombre.toLowerCase().trim()) {
    //       return state.bandNombreUnico = false
    //     }
    //   }
    //   return state.bandNombreUnico = true
    // },

    creatingUsers(state) {
      return state.creatingUsers;
    },

    allUsers(state) {
      return state.users;
    },

    userId: (state) => (id) => {
      const userExist = state.users.find((user) => user.id === id);
      return userExist;
    },

    loginStatus(state) {
      return state.loginStatus;
    },

    userLog(state) {
      return state.userLog;
    },

    getId: (state) => (userNameSent) => {
      const userExist = state.users.find(
        (user) => user.username.trim() === userNameSent.trim()
      );
      if (userExist != undefined) {
        return userExist.id;
      } else {
        return -1;
      }
    },

    userNameMatch: (state) => (userNameSent) => {
      const userExist = state.users.find(
        (user) => user.username.trim() === userNameSent.trim()
      );
      if (userExist != undefined) {
        return 1;
      } else {
        return -1;
      }
    },

    pswMatch: (state) => (pswSent, userNameSent) => {
      const pswExist = state.users.find(
        (user) =>
          user.address.zipcode.trim() === pswSent.trim() &&
          user.username.trim() === userNameSent.trim()
      );
      if (pswExist != undefined) {
        return 1;
      } else {
        return -1;
      }
    },
  },

  mutations: {
    setIsLogin(state, value) {
      state.isLogin = value;
    },

    setUsersLogin(state, value) {
      state.usersLogin.push(value);
    },

    setApiUsers(state, users) {
      state.users = users;
    },

    setloginStatus(state, isValidLogin) {
      state.loginStatus = isValidLogin;
    },

    setUserId(state, userExist) {
      // console.log("Recibo al usuario del id");
      // console.log(typeof userExist);
      // console.log(typeof state.userLog);
      state.userLog = userExist;
    },

    setCheckIn(state, newUser) {
      state.creatingUsers.push(newUser);
    },

    setUserLoggedOk(state, user) {
      // console.log(state.userLoggedOk);
      state.userLoggedOk = user;
      // console.log(state.userLoggedOk);
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

    // setArrayTDC(state, obj) {
    //   state.arrayTDC.push(obj);
    // },

    // setSelectTDC(state, tdc) {
    //   state.selectTDC = tdc;
    // },

    // modificarTDC(state, data) {
    //   const index = state.arrayTDC.findIndex(
    //     (tdc) => tdc.id === state.selectTDC.id
    //   );

    //   // Componer el producto en base a las propiedades cambiadas

    //   const tdc = Object.assign({}, state.arrayTDC[index], data);

    //   // **************** Validar que el nombre no se repita **************
    //   let contRep = 0;
    //   for (let i of state.arrayTDC) {
    //     if (contRep != index) {
    //       console.log("comparando " + contRep);
    //       if (
    //         i.nombre.toLowerCase().trim() === tdc.nombre.toLowerCase().trim()
    //       ) {
    //         console.log("nombre repetido no se puede guardar");
    //         return (state.bandNombreUnico = false);
    //       }
    //     }
    //     contRep++;
    //   }
    //   // **************** Validar que el nombre no se repita **************

    //   // Actualizar activando la reactividad
    //   state.selectTDC = tdc;
    //   state.arrayTDC[index] = tdc;
    //   state.bandNombreUnico = true;
    // },

    // eliminarTDC(state, indice) {
    //   state.arrayTDC.splice(indice, 1);
    // },

    // validateLogin(obj) {
    //   const userNameSent = obj.username;
    //   const pswSent = obj.psw;

    //   // console.log("Recibo")
    //   // console.log(username)
    //   // console.log("Recibo")
    //   // console.log(psw)
    //   const usernameFind = this.usersr.find(
    //     (user) => user.username === userNameSent
    //   );
    //   const pswFind = this.usersr.find(
    //     (user) => user.address.zipcode === pswSent
    //   );
    //   console.log("userName", usernameFind);
    //   console.log("pswFind", pswFind);
    //   // this.loginStatusValid=
    // },
  },

  actions: {
    async bringUserAPI({ commit }) {
      let data;
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        data = response.data;
      } catch (error) {
        console.error(error);
      }
      commit("setApiUsers", data);
    },

    loginUser(context, obj) {
      // context.actions.bringUserAPI();
      // console.log("objeto ==> ", context);

      const userNameSent = context.getters.userNameMatch(obj.username);
      const pswSent = context.getters.pswMatch(obj.psw, obj.username);
      // const idSent = context.getters.getId(obj.username);

      const userValidated = {
        username: userNameSent,
        psw: pswSent,
        // id: idSent,
        status: false,
      };

      if (userNameSent != "-1" && pswSent != "-1") {
        userValidated.status = true;
      }

      context.commit("setloginStatus", userValidated);
    },

    getUserId(context, id) {
      const userExist = context.getters.userId(id);
      // console.log("tengo el user")
      // console.log(userExist)
      context.commit("setUserId", userExist);
    },

    // *******************************************
    // *******************************************

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

    // validateToken(context, keyUnique) {
    //   console.log("Validando el token ");
    //   // if (sessionStorage.getItem("token") === context.getters.loginStatus.token) {
    //   const userExistLogged  = context.getters.newUserLoggedIn(keyUnique)
    //   console.log(userExistLogged)
    //   //   if(userExistLogged && userExistLogged.lenght>0){

    //   //   }else{

    //   //   }
    //   // if (sessionStorage.getItem("token") === ) {
    //   // context.commit("setIsLogin", true);
    //   // } else {
    //   //   context.commit("setIsLogin", false);
    //   // }
    // },

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
        console.log(response)
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
          console.log(message)
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
      context.commit("setUserLoggedOk", {});
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
