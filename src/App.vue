<template>
  <v-app>
    <Nav />
    <!-- <Navigation/> -->
    <router-view />
    <Footer />
    <Alert />
  </v-app>
</template>

<script>
// import Started from "@/views/Started";
import Nav from "@/components/Structure/Nav";
// import Navigation from "@/components/Navigation";
import Footer from "@/components/Structure/Footer";
import Alert from "@/components/Modals/Alert";

export default {
  name: "App",

  components: {
    Nav,
    // Navigation,
    // Started,
    Footer,
    Alert
  },

  data: () => ({
    //
  })
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
