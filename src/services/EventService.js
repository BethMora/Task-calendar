import Api from "./Api";

export default {
  async registerEvent(params) {
    try {
      return await Api().post("event/add", params);
    } catch (error) {
      return error;
    }
  },

  async getEventStartEnd(params) {
    try {
      return await Api().get(`event/get-by-date/${params.start}/${params.end}`);
    } catch (error) {
      return error;
    }
  },

  async getEvents(params) {
    try {
      return await Api().get(
        `event/paginated-by-id-user/${params.idUser}/${params.page}/${params.sizePage}`
      );
    } catch (error) {
      return error;
    }
  },

  async updateEvent(params) {
    try {
      return await Api().put("event/update", params);
    } catch (error) {
      return error;
    }
  },

  async deleteEvent(params) {
    try {
      console.log("Vamos a imprimir para ", params);
      // return await Api().delete("event/delete",{data: {params}});
      return await Api().delete("event/delete", { data: params });
    } catch (error) {
      return error;
    }
  },
};
