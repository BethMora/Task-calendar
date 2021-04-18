import Api from "./Api";

export default {
  registerEvent(params) {
    return Api().post("event/add", params);
  },

  updateEvent(params) {
    return Api().put("event/update", params);
  },

  deleteEvent(params) {
    return Api().delete("event/update", params);
  },
};
