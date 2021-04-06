<template>
  <v-main>
    <v-alert
      dismissible
      :class="message.color"
      class="black--text"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-information-variant"
      v-if="message.msg.length > 0 && message != 'undefined'"
      @click="resetMessage"
    >
      {{ message.status }} -- {{ message.msg }}
    </v-alert>
    <v-card
      :loading="loading"
      class="mx-auto my-12"
      v-if="
        componentSelected == 'SignUp'
          ? (widthConten = 600)
          : (widthConten = 374)
      "
      :max-width="widthConten"
    >
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
          <span
            v-if="
              componentSelected == 'SignUp'
                ? (title = 'Sign Up ')
                : (title = 'Sign In')
            "
          >
            {{ title }}
          </span>
        </v-card-title>
      </v-col>

      <v-card-text style="margin-top: -30px">
        <v-container>
          <!-- <keep-alive> -->
          <component :is="componentSelected"> </component>
          <!-- </keep-alive> -->
        </v-container>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-subtitle>
        <v-alert outlined>
          <div class="text-center  d-flex justify-center">
            New here?
            <v-tab @click="componentSelected = 'SignUp'" class="accent--text">
              Create an account.
            </v-tab>
          </div>

          <div class="text-center  d-flex justify-center mt-3">
            I have an account !
            <v-tab @click="componentSelected = 'SignIn'" class="primary--text">
              Sign in.
            </v-tab>
          </div>
        </v-alert>
      </v-card-subtitle>
    </v-card>
  </v-main>
</template>

<script>
// @ is an alias to /src
// import Login from "@/components/Login.vue";
// import PostList from "@/components/PostList.vue";
import SignIn from "@/components/Login/SignIn.vue";
import SignUp from "@/components/Login/SignUp.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Login",
  components: {
    // PostList
    SignIn,
    SignUp,
  },
  data() {
    return {
      title: "",
      widthConten: 374,
      loading: false,
      componentSelected: "SignIn",
      // selection: 1,
    };
  },

  computed: {
    ...mapGetters(["message"]),
  },

  methods: {
    ...mapMutations(["resetMessage"]),
  },
};
</script>
