<template>
  <v-app>
    <Nav />
    <router-view />
    <Footer />
    <Alert />
    <vue-confirm-dialog></vue-confirm-dialog>
  </v-app>
</template>

<script>
import Nav from "@/components/Structure/Nav";
import Footer from "@/components/Structure/Footer";
import Alert from "@/components/Modals/Alert";
export default {
  name: "App",

  components: {
    Nav,
    Footer,
    Alert,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
