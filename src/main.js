import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import axios from "axios";
import VueAxios from "vue-axios";
import { sha256, sha224 } from "js-sha256";

import VueConfirmDialog from 'vue-confirm-dialog';

Vue.use(VueAxios, axios);
Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  axios,
  sha256,
  sha224,
  render: h => h(App)
}).$mount("#app");
