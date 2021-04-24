<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    enctype="multipart/form-data"
    @submit.prevent="checkIn"
  >
    <FormUser
      :valid="valid"
      :rol="rol"
      :formDataRegister="formDataRegister"
    />

    <FormPassword
      :formDataRegister="formDataRegister"
    />

    <v-file-input
      label="Profile picture"
      accept="image/png, image/jpeg, image/bmp"
      show-size
      :rules="[rules.file, rules.required]"
      prepend-icon="mdi-camera"
      v-model="selectedAvatar"
    >
    </v-file-input>

    <BtnToolTipComponent  title="Submit"
            :valid="valid"
            :action="checkIn"
            :block="btnBlock"
            color="secondary"/>
            <!-- <BtnSubmitComponent :valid="valid" @methodOfAction="checkIn"/> -->
  </v-form>
</template>

<script>
// import BtnSubmitComponent from "@/components/reusable/BtnSubmitComponent";
import BtnToolTipComponent from "@/components/reusable/BtnToolTipComponent";

import FormUser from "@/components/Login/Forms/FormUser";
import FormPassword from "@/components/Login/Forms/FormPassword";
import { encryptKey } from "@/libs/encrypt";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SignUp",
  components: {
    FormUser,
    FormPassword,
    BtnToolTipComponent
  },
  data() {
    return {
      btnBlock: true,
      valid: true,
      rol: ["ADMIN", "USER"],
      formDataRegister: {},
      selectedAvatar: null,

      // show1: false,

      rules: {
        required: (v) => !!v || "Required.",
      //   min: (v) => (v && v.length >= 2) || "At least 2 characters",
      //   max: (v) => (v && v.length <= 30) || "Maximum 30 characters",
      //   minformDataRegisterName: (v) =>
      //     (v && v.length >= 2) || "At least 2 characters",
      //   maxformDataRegisterName: (v) =>
      //     (v && v.length <= 15) || "Maximum 15 characters",
      //   minPsw: (v) => (v && v.length >= 4) || "At least 4 characters",
      //   maxPsw: (v) => (v && v.length <= 20) || "Maximum 20 characters",
      //   validEmail: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        file: (value) =>
          !value || value.size < 2000000 || "Size should be less than 2 MB!",
      //   pswConfirmEqual: (v) =>
      //     v === this.formDataRegister.psw ||
      //     "The password confirmation does not match",
      },
    };
  },

  computed: {
    ...mapGetters(["creatingUser"]),
  },

  methods: {
    ...mapActions(["checkInAPI"]),

    // reset() {
    //   this.$refs.form.reset();
    // },

    checkIn() {
      if (this.$refs.form.validate()) {
        const formData = new FormData();
        formData.append("file", this.selectedAvatar);
        // this.formDataRegister.password =encryptKey(this.formDataRegister.email, this.formDataRegister.psw)
        const pswSafe = encryptKey(
          // this.formDataRegister.email,
          this.formDataRegister.password
        );
        formData.append("name", this.formDataRegister.name);
        formData.append("lastName", this.formDataRegister.lastName);
        formData.append("userName", this.formDataRegister.userName);
        formData.append("email", this.formDataRegister.email);
        formData.append("role", this.formDataRegister.role);
        formData.append("password", pswSafe);
        formData.append("creationDate", new Date());
        formData.append("modificationDate", new Date());
        // formData.append("email", this.email);
        // formData.append("password", this.psw);
        // Object.entries(this.formDataRegister).forEach(([key, val]) =>
        //   formData.append(key, val)
        // )
        this.checkInAPI(formData);
        this.$router.push("/login");
      }
    },
  },
};
</script>
