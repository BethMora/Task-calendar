import Api from "./Api";

export default {
  registerUser(params) {
    return Api().post("user/register", params);
  },

  loginUser(params) {
    return Api().post("user/login", params);
  },

  updateUser(params) {
    return Api().put("user/update", params);
  },
};
