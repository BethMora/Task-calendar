import EventService from "@/services/EventService";
// registerEvent
// updateEvent
// deleteEvent

export default {
  strict: true,
  state: {
    tasks: [],
    // counter: 1,
  },

  getters: {
    tasks(state) {
      return state.tasks;
    },
  },

  mutations: {
    setTask(state, task) {
      state.tasks.push(task);
      // state.counter++;
    },
  },

  actions: {
    
    async addNewTask({ commit, rootState }, task) {
      console.log(task)
      let message = {};
      const event = {
        idUser: rootState.login.userLoggedOk._id,
        name: task.name,
        description: task.description,
        startDate: task.start,
        isVisible: false,
        color: task.color,
        endDate: task.end,
        done: task.timed,
        creationDate : new Date(),
      };
      console.log("Vamos a guardar la siguiente tarea")
      console.log(event)
      const response = await EventService.registerEvent(event);
      console.log(response)
      try {
        if (response.status === 200) {
          commit("setTask", task);
        } else {
          message = {
            msg: response.data.message,
            color: "error",
            status: response.status,
          };
          commit("setMesagge", message);
          commit("changeSheet");
        }
      } catch (error) {
        alert("There was an error the following \n" + error);
        message = {
          msg: error,
          color: "danger",
          status: error,
        };
        commit("setMesagge", message);
        commit("changeSheet");
      }
    },

    async editTaskAPI({ commit, rootState }, task) {
      console.log("vamos a editar tasj del API")
      console.log(task)
      let message = {};
      const event = {
        name: task.name,
        description: task.description,
        startDate: task.start,
        endDate: task.end,
        done: task.timed,
        idUser: rootState.login.userLoggedOk._id,
      };
      const response = await EventService.registerEvent(event);
      try {
        if (response.status === 200) {
          console.log("Vamos a editar la tarea ")
          // commit("setTask", task);
        } else {
          message = {
            msg: response.data.message,
            color: "error",
            status: response.status,
          };
          commit("setMesagge", message);
          commit("changeSheet");
        }
      } catch (error) {
        alert("There was an error the following \n" + error);
        message = {
          msg: error,
          color: "danger",
          status: error,
        };
        commit("setMesagge", message);
        commit("changeSheet");
      }
    },

  },
};
