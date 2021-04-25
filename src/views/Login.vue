<template>
  <v-main>
    <v-card class="mx-auto my-12" :max-width="widthConten">
      <v-card-title class="d-flex justify-center mb-4">
        <v-avatar>
          <img v-if="setUrl" :src="setUrl" />
          <v-icon v-else x-large color="blue darken-2">
            mdi-shield-account
          </v-icon>
        </v-avatar>
        <span> {{ title }} </span>
      </v-card-title>

      <v-card-text style="margin-top: -30px">
        <v-container>
          <router-view> </router-view>
        </v-container>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-subtitle>
        <v-alert outlined>
          <div class="text-center  d-flex justify-center">
            New here?
            <router-link
              to="/signUp"
              custom
              class="ml-2 text-uppercase caption"
            >
              Create an account.
            </router-link>
          </div>

          <div class="text-center  d-flex justify-center mt-3">
            I have an account !
            <router-link to="/login" custom class="ml-2 text-uppercase caption">
              Sign in.
            </router-link>
          </div>
        </v-alert>
      </v-card-subtitle>
    </v-card>
  </v-main>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { EventBus } from "@/libs/event-bus";
export default {
  name: "Login",
  data() {
    return {
      title: "Sign In",
      widthConten: 374,
      loading: false,
      url: "",
      urlImagen: null,
    };
  },

  beforeMount() {
    this.url = this.$route.name;
  },

  beforeUpdate() {
    this.url = this.$route.name;
  },

  watch: {
    url() {
      if (this.url === "SignIn") {
        this.title = "Sign In";
        this.widthConten = 374;
      } else {
        this.title = "Sign Up";
        this.widthConten = 674;
      }
    },
  },

  computed: {
    ...mapGetters(["message", "loginStatus"]),

    setUrl() {
      EventBus.$on("urlAvatar", (item) => {
        this.urlImagen = item;
      });
      return this.urlImagen;
    },
  },

  methods: {
    ...mapMutations(["resetMessage"]),
  },
};
</script>
