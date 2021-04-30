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
  </v-form>
</template>

<script>
import BtnToolTipComponent from "@/components/reusable/BtnToolTipComponent";
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
    };
  },

  computed: {
    ...mapGetters(["userLoggedOk"]),
  },

//revisar el userLoggedOk, creo es mejor usar el getter de isLogin
//revisar el watch
  watch: {
    userLoggedOk() {
      if (this.userLoggedOk.isLogin) {
        this.$router.push({
          name: "Calendar",
          params: { id: this.userLoggedOk.userName },
        });
      }
    },
  },

  methods: {
    ...mapActions(["loginUserAPI"]),
    login() {
      if (this.$refs.form.validate()) {
        const user = {
          username: this.userName,
          psw: this.psw,
        };
        this.loginUserAPI(user);
      }
    },
  },
};
</script>
