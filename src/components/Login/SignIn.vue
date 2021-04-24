<template>
  <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="login">
    <v-text-field
      v-model="userName"
      :counter="4"
      :rules="[rules.required, rules.min]"
      label="User Name or Email"
      required
    ></v-text-field>

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

    <BtnToolTipComponent
      title="Submit"
      :valid="valid"
      :action="login"
      :block="btnBlock"
      color="secondary"
    />

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
      <!-- <span v-if="loginStatus.username == '-1'" class="row ml-1">
        <strong> Incorrect user </strong>
      </span>
      <span v-if="loginStatus.psw == '-1'" class="row ml-1">
        <strong> Incorrect password</strong>
      </span> -->
    </v-alert>
  </v-form>
</template>

<script>
import BtnToolTipComponent from "@/components/reusable/BtnToolTipComponent";
// import BtnSubmitComponent from "@/components/reusable/BtnSubmitComponent";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SignIn",
  components: {
    BtnToolTipComponent,
  },
  data() {
    return {
      btnBlock: true,
      valid: true,
      show1: false,
      userName: "",
      psw: "",

      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 4 || "Min 4 characters",
        valid: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      },

      isValidLogin: false,
    };
  },

  // async created() {
  //   // try {
  //   //   this.bringUserAPI();
  //   // } catch (error) {
  //   //   console.error(error);
  //   // }
  // },

  computed: {
    // ...mapGetters(["allUsers", "loginStatus", "isLogin"]),
    ...mapGetters(["userLoggedOk"]),
  },

  watch: {
    //   usersLogin() {
    //     if (this.loginStatus.status === false) {
    //       this.isValidLogin = true;
    //     } else {
    //       console.log("entro");
    //       console.log(this.isLogin);
    //       this.validateToken();
    //       console.log("Luego de la validacion");
    //       console.log(this.isLogin);
    //       if (this.isLogin === true) {
    //         this.isValidLogin = false;
    //         this.$router.push({
    //           name: "dashboard",
    //           params: { id: this.userName },
    //         });
    //       }
    //     }
    //     // console.log(this.loginStatus.status)
    //   },

    userLoggedOk() {
      // console.log("esta es la informacion para el dashboard");
      // console.log(this.userLoggedOk);

      if (this.userLoggedOk.isLogin) {
        this.$router.push({
          name: "dashboard",
          params: { id: this.userLoggedOk.userName },
        });
      }
    },
  },

  methods: {
    // ...mapActions([
    //   "bringUserAPI",
    //   "loginUser",
    //   "loginUserAPI",
    //   "validateToken",
    // ]),
    ...mapActions(["loginUserAPI", "validateToken"]),

    // reset() {
    //   return this.$refs.form.reset();
    // },

    login() {
      if (this.$refs.form.validate()) {
        const user = {
          username: this.userName,
          psw: this.psw,
        };
        // this.reset();
        // this.loginUser(user);
        this.loginUserAPI(user);
      }
    },
  },
};
</script>
