import axios from "axios";
// const instanceRehister = axios.create({
//   baseURL: 'http://localhost:300s0/api/user/register',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });

export default {
  strict: true,
  state: {
    users: [],
    loginStatus: {},
    userLog: {},

    creatingUsers: [],
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

    setMesagge(state, msg) {
      state.message = msg;
    },

    resetMessage(state) {
      state.message = {
        msg: "",
        color: "",
        status: "",
      };
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
    checkInAPI(context, obj) {
      console.log("Vamos a guardar el siguente usuario");
      console.log(obj);
      try {
        axios
          .post("http://localhost:300s0/api/user/register", obj)
          .then((response) => {
            console.log(response);
            console.log(response.status);
            const message = {
              msg: response.data.message,
              color: "success",
              status: response.request.status,
            };
            context.commit("setCheckIn", obj);
            context.commit("setMesagge", message);
            
          });
      } catch (error) {
        console.error(error);
        console.log("Hubo un error el siguiente")
        alert(error)
        const message = {
          msg: error,
          color: "danger",
          status: error,
        };
        context.commit("setMesagge", message);
      }
      // this.$router.push(-1);
    },

    loginUserAPI(context, obj) {
      try {
        axios
          .post("http://localhost:3000/api/user/login", {
            email: obj.username,
            password: obj.psw,
          })
          .then((response) => {
            console.log(response);
            console.log(response.config.data);
            const message = {
              msg: "User logged in",
              color: "danger",
              status: response.data.message,
            };
            context.commit("setMesagge", message);
            
          });
        // context.commit("setCheckIn", obj);
      } catch (error) {
        console.error(error);
        const message = {
          msg: error,
          color: "danger",
          status: error,
        };
        context.commit("resetMessage", message);
      }

      // try {
      //   const response = axios.get(
      //     "http://localhost:3000/api/user/register"
      //   );
      //   const data = response.data;
      //   console.log(data);
      // } catch (error) {
      //   console.error(error);
      // }
    },

    editUserAPI(){
      console.log("Editando user en API")
    }

    // agregarTDCStore(context, obj) {
    //   const id = obj.id;
    //   const nombre = obj.nombre;
    //   if (
    //     context.getters.validarIdUnico(id) &&
    //     context.getters.validarNombreUnico(nombre)
    //   ) {
    //     console.log("Si vamos a guardar");
    //     context.commit("setArrayTDC", obj);
    //   } else {
    //     console.log("no vamos a guardar");
    //     return 0; //el id no es unico asi que no se registra
    //   }
    // },
  },
};
