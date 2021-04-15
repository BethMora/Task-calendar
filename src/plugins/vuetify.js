import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

// import colors from 'vuetify/lib/util/colors';
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        accent: "#2C73B3", // #3F51B5
        primary: "#60A4B5", // #E53935
        info: "#7DE5FF", // #E53935
        secondary: "#FFE3BF", // #FFCDD2
        light: "#B3DBFF",

        warnign: "#F56A45", // #E53935
        error: "#D73C07", // #E53935
        success: "#AFF55D"
      }
    }
  }
});
