<template>
  <div>
    <template slot="nameUser">
      <v-text-field
        v-model="name"
        :counter="4"
        :rules="[rules.required, rules.min]"
        label="First name and Last name"
        required
      ></v-text-field>
    </template>

    <template slot="email">
      <v-text-field
        v-model="email"
        :rules="[rules.required, rules.min, rules.valid]"
        label="E-mail"
        required
      ></v-text-field>
    </template>

    <slot name="userName">
      <v-text-field
        v-model="userName"
        :counter="4"
        :rules="[rules.required, rules.min]"
        label="User Name"
        required
      ></v-text-field>
    </slot>

    <slot name="password">
      <v-text-field
        v-model="psw"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 6 characters"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>
    </slot>

    <slot name="submit">
      <v-btn class="secondary black--text mt-3" block @click="login" :disabled="!valid">
        Submit
      </v-btn>
    </slot>

    <v-alert
      v-model="isValidLogin"
      dismissible
      color="error"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-account-alert"
      class="mt-6"
    >
      <span v-if="loginStatus.username == '-1'" class="row ml-1">
        <strong> Incorrect user </strong>
      </span>
      <span v-if="loginStatus.psw == '-1'" class="row ml-1">
        <strong> Incorrect password</strong>
      </span>
    </v-alert>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Access",
  data() {
    return {
      valid: true,
      name: "",
      email: "",
      userName: "",
      //   nameRules: [
      //     (v) => !!v || "Name is required",
      //     (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      //   ],
      show1: false,
      psw: "",
      //   emailRules: [
      //     (v) => !!v || "E-mail is required",
      //     (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      //   ],

      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 4 || "Min 4 characters",
        valid: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      },

      isValidLogin: false,
    };
  },

  async created() {
    try {
      this.bringUserAPI();
    } catch (error) {
      console.error(error);
    }
  },

  computed: {
    ...mapGetters(["allUsers", "loginStatus"]),
  },

  watch: {
    loginStatus() {
      if (this.loginStatus.status === false) {
        this.isValidLogin = true;
      } else {
        this.isValidLogin = false;
        this.$router.push({ name: 'dashboard', params: { id: this.userName} })
      }
      // console.log(this.loginStatus.status)
      // val || this.msgError();
    },
  },

  methods: {
    ...mapActions(["bringUserAPI", "loginUser", "loginUserAPI"]),
    // ...mapActions([ "loginUser"]),
    validate() {
      return this.$refs.form.validate();
    },

    reset() {
      return this.$refs.form.reset();
    },


    login() {
      // console.log(this.validate())
      const user = {
        username: this.userName,
        psw: this.psw,
      };
      // this.reset();
      // this.loginUser(user);
      this.loginUserAPI(user);
    },
  },
};
</script>
