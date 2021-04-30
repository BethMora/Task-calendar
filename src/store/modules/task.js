import EventService from "@/services/EventService";
// registerEvent
// updateEvent
// deleteEvent

export default {
  strict: true,
  // namespaced: true,
  state: {
    tasksUserId: [],
  },

  getters: {
    tasksUserId(state) {
      return state.tasksUserId;
    },

    indexTasks: (state) => (id) => {
      return state.tasksUserId.findIndex((e) => e._id === id);
    },
  },

  mutations: {
    setEventsUserId(state, event) {
      state.tasksUserId = [];
      if (event === null) {
        state.tasksUserId = [];
      } else {
        if (event.length >= 1) {
          for (const iterator of event) {
            state.tasksUserId.push(iterator);
          }
        }
        if (event.length === undefined) {
          state.tasksUserId.push(event);
        }
      }
    },

    setOneEventUserId(state, event) {
      state.tasksUserId.push(event);
    },

    updateStateTask(state, index, event) {
      state.tasksUserId[index] = event;
    },

    deleteStateTask(state, index) {
      state.tasksUserId.splice(index, 1);
    },
  },

  actions: {
    async getPaginatedEvents({ commit, rootState }, { page, sizePage }) {
      const idUser = rootState.login.userLoggedOk._id;
      const response = await EventService.getEvents({ idUser, page, sizePage });
      let message;
      try {
        if (response.status === 200) {
          const events = response.data.data;
          if (response.data.data.length > 0) {
            commit("setEventsUserId", events);
          }
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

    async addNewTask({ commit, rootState }, task) {
      let message = {};
      const event = {
        idUser: rootState.login.userLoggedOk._id,
        name: task.name,
        description: task.description,
        start: task.start,
        isVisible: false,
        color: task.color,
        end: task.end,
        done: task.timed,
        creationDate: new Date(),
      };
      const response = await EventService.registerEvent(event);
      try {
        if (response.status === 200) {
          commit("setOneEventUserId", event);
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

    async editTaskAPI({ commit }, task) {
      let message = {};
      const response = await EventService.updateEvent(task);
      try {
        if (response.status === 200) {
          console.log("Vamos a editar la tarea ");
          // commit("setTask", task);
          // actions("getPaginatedEvents")
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

    // async deleteTaskAPI({ commit }, id) {
    async deleteTaskAPI(context, id) {
      let message = {};
      const idEventDelete = {
        _id: id,
      };
      const response = await EventService.deleteEvent(idEventDelete);
      try {
        if (response.status === 200) {
          console.log("Task delete");
          const index = context.getters.indexTasks(id);
          context.commit("deleteStateTask", index);
          // commit("setTask", task);
          // actions("getPaginatedEvents")
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
  },
};
