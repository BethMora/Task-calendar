export default {
  strict: true,
  state: {
    tasks: [],
    counter: 1
  },

  getters: {
    tasks(state) {
      return state.tasks;
    }
  },

  mutations: {
    setTask(state, task) {
      state.tasks.push(task);
      state.counter++;
    }
  },

  actions: {
    addNewTask(context, task) {
      task.id = context.state.counter;
      context.commit("setTask", task);
      // this.$router.push('/calendar')
    }
  }
};
