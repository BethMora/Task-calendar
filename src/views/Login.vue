<template>
  <v-main>
    <v-card :loading="loading" class="mx-auto my-12" :max-width="widthConten">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-col class="d-flex justify-center">
        <v-icon x-large color="blue darken-2">
          mdi-shield-account
        </v-icon>

        <v-card-title>
          <span> {{ title }} </span>
        </v-card-title>
      </v-col>

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
export default {
  name: "Login",
  data() {
    return {
      title: "Sign In",
      widthConten: 374,
      loading: false,
      url: ""
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
    }
  },

  computed: {
    ...mapGetters(["message", "loginStatus"])
  },

  methods: {
    ...mapMutations(["resetMessage"])
  }
};
</script>
