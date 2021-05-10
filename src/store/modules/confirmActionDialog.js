export default {
  strict: true,
  state: {
    isDialog: false,
    information: {
      title: "",
      subtitle: "",
    },
    isConfirmedAction: false,
    isConfirmedSignOff: false,
  },
  getters: {
    isDialog(state) {
      return state.isDialog;
    },
    information(state) {
      return state.information;
    },
    isConfirmedAction(state) {
      return state.isConfirmedAction;
    },
    isConfirmedSignOff(state) {
      return state.isConfirmedSignOff;
    },
  },

  mutations: {
    setIsDialog(state, value) {
      state.isDialog = value;
    },
    setInformation(state, payload) {
      state.information = {
        title: payload.title,
        subtitle: payload.subtitle,
      };
    },
    setIsConfirmedAction(state, value) {
      state.isConfirmedAction = value;
    },
    setIsConfirmedSignOff(state, value) {
      state.isConfirmedSignOff = value;
    },
  },
  actions: {
    openDialog({ commit }, payload) {
      commit("setInformation", payload);
      commit("setIsDialog", true);
    },
    confirmLogOut({ commit }) {
      commit("setIsDialog", false);
      commit("setIsConfirmedAction", true);
    },
    cancelLogOut({ commit }) {
      commit("setIsDialog", false);
      commit("setIsConfirmedAction", false);
    },

    SignOff({ commit }, value) {
      commit("setIsConfirmedSignOff", value);
    },
    
    processAction({ commit }, callback) {
      commit("setIsDialog", false);
      callback();
    },
    
    processSignOf({ commit }, value) {
      commit("setIsDialog", false);
      commit("setIsConfirmedSignOff", value);
    },
  },
};
