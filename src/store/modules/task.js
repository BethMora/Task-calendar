import EventService from "@/services/EventService";
// registerEvent
// updateEvent
// deleteEvent

export default {
  strict: true,
  // namespaced: true,
  state: {
    allTasks: [],
    tasksUserId: [],
  },

  getters: {
    tasksUserId(state) {
      return state.tasksUserId;
    },

    indexTasks: (state) => (id) => {
      return state.tasksUserId.findIndex((e) => e._id === id);
    },

    allTasks(state) {
      return state.allTasks;
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

    setAllTasks(state, tasks) {
      state.allTasks = tasks;
    },
  },

  actions: {
    async tasksAPI({ commit }, obj) {
      try {
        const response = await EventService.getEventStartEnd(obj);
        console.log(response);
        if (response.status === 200) {
          response.flagMsg = "OK";
          const arrayUsers = response.data.data;
          // commit("setAllUsers", arrayUsers);
          commit("setEventsUserId", arrayUsers);
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

    async getPaginatedEvents({ commit, rootState }, { page, sizePage }) {
      const idUser = rootState.login.userLoggedOk._id;
      const response = await EventService.getEvents({ idUser, page, sizePage });
      try {
        if (response.status === 200) {
          const events = response.data.data;
          if (response.data.data.length > 0) {
            commit("setEventsUserId", events);
            // commit("setAllTasks", events);
          }
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

    async addNewTask({ commit, rootState }, task) {
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
          response.flagMsg = "ERROR";
          commit("setMesagge", response);
          commit("changeSheet");
        }
      } catch (error) {
        commit("setMesaggeErrorCatch", error);
        commit("changeSheet");
      }
    },

    async editTaskAPI({ commit }, task) {
      const response = await EventService.updateEvent(task);
      try {
        if (response.status === 200) {
          console.log("Vamos a editar la tarea ");
          // commit("setTask", task);
          // actions("getPaginatedEvents")
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

    async deleteTaskAPI(context, id) {
      const idEventDelete = {
        _id: id,
      };
      const response = await EventService.deleteEvent(idEventDelete);
      try {
        if (response.status === 200) {
          console.log("Task delete");
          const index = context.getters.indexTasks(id);
          context.commit("deleteStateTask", index);
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
  },
};
