<template>
  <v-app>
    <Nav />
    <!-- <Navigation/> -->
    <router-view />
    <Footer />
    <Alert />
    <!-- <ConfirmActionComponent
      @confirmOff="confirmOff"
      :isConfirmation="isConfirmation"
      :changeFlagConfirmation="changeFlagConfirmation"
      title="Sign off"
      subtitle="Are you sure to log out?"
    /> -->
  </v-app>
</template>

<script>
// import Started from "@/views/Started";
import Nav from "@/components/Structure/Nav";
// import Navigation from "@/components/Navigation";
import Footer from "@/components/Structure/Footer";
import Alert from "@/components/Modals/Alert";
// import ConfirmActionComponent from "@/components/reusable/ConfirmActionComponent";

export default {
  name: "App",

  components: {
    Nav,
    // Navigation,
    // Started,
    Footer,
    Alert,
    // ConfirmActionComponent,
  },

  data: () => ({
    //
  }),

  // computed: {
  //   isConfirmation: {
  //     get: function() {
  //       return this.flagConfirmAction;
  //     },

  //     set: function(value) {
  //       this.changeFlagConfirmation(value);
  //     },
  //   },
  // },

  // methods: {
  //   changeFlagConfirmation(value) {
  //     this.flagConfirmAction = value;
  //   },

  //   confirmOff(value) {
  //     if (value) {
  //       console.log("Action delete");
  //     }
  //   },
  // },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
