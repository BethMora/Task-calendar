import Api from "./Api";

export default {
  async allUsers(params) {
    try {
      return await Api().get(`user/get-all/${params.page}/${params.sizePage}`);
    } catch (error) {
      return error;
    }
  },

  async registerUser(params) {
    try {
      return await Api().post("user/register", params);
    } catch (error) {
      return error;
    }
  },

  async loginUser(params) {
    try {
      return await Api().post("user/login", params);
    } catch (error) {
      return error;
    }
  },

  async updateUser(params) {
    try {
      return await Api().put("user/update", params);
    } catch (error) {
      return error;
    }
  },
};
