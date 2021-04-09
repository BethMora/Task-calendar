<template>
  <div>
    <v-app-bar app dark absolute color="white" class="accent" elevate-on-scroll>
      <template v-if="!isLogin" class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="fab-transition"
            width="40"
          />
        </router-link>
      </template>
      <template v-else>
        <div
          style="border-right: 1px solid white; text-shadow: blue 0.1em 0.1em 0.2em"
          class="d-flex pr-3"
        >
          <v-icon medium class="mr-2" color="info">
            mdi-allergy
          </v-icon>

          <v-toolbar-title class="info--text">
            {{ this.$route.params.id }}
          </v-toolbar-title>
        </div>
      </template>

      <v-app-bar-nav-icon @click.stop="openNavigation"></v-app-bar-nav-icon>

      <v-toolbar-title> Task Management </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field
        class="mx-4"
        flat
        hide-details
        label="Search"
        prepend-inner-icon="mdi-magnify"
        solo-inverted
      ></v-text-field>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon>
            <template v-if="!isLogin">
              <v-icon v-model="isLogin" @click="goLogin"> mdi-account-circle </v-icon>
            </template>
            <template v-else >
              <v-icon v-model="isLogin" @click="logoOut"> mdi-logout </v-icon>
            </template>
          </v-btn>
        </template>
        <span v-if="!isLogin">Click to login</span>
        <span v-else>Click to logout</span>
      </v-tooltip>

      <v-tooltip select>
        <template v-slot:activator="{ on, attrs }">
          <v-col xs="1" lg="2" v-bind="attrs" v-on="on">
            <v-select
              :items="languages"
              menu-props="auto"
              label="Translations"
              hide-details
              prepend-icon="mdi-web"
            ></v-select>
          </v-col>
        </template>
        <span>Choose language</span>
      </v-tooltip>
    </v-app-bar>

    <Navigation :drawer="drawer" :changeValue="changeValue" />
  </div>
</template>

<script>
import Navigation from "@/components/Structure/Navigation";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Nav",
  components: {
    Navigation,
  },

  data() {
    return {
      bandDrawer: false,
      languages: [{ text: "English" }, { text: "Spanish" }],
      // isLogin: false,
      // url: "/login",
    };
  },

  computed: {
    ...mapGetters(["isLogin"]),
    drawer: {
      get: function() {
        return this.bandDrawer;
      },

      set: function(value) {
        this.changeValue(value);
      },
    },
  },

  watch: {
    isLogin() {
      console.log(`
      
      Bandera de login
      `);
      console.log(this.isLogin);
    },
    // loginStatus() {
    //   if (this.loginStatus.status === true) {
    //     this.url = "/";
    //     this.isLogin = true;
    //   } else {
    //     this.url = "/login";
    //     this.isLogin = false;
    //   }
    // },
  },

  methods: {
    ...mapActions(["logoOutUser"]),

    changeValue(value) {
      this.bandDrawer = value;
    },

    openNavigation() {
      this.bandDrawer = true;
    },

    goLogin(){
      if(this.$route.path != "/login"){
        this.$router.push('/login')
      }
    },
    logoOut() {
      this.logoOutUser()
    },
  },
};
</script>
