<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    enctype="multipart/form-data"
    @submit.prevent="checkIn"
  >
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="formDataRegister.firstName"
          :counter="30"
          :rules="[rules.required, rules.min, rules.max]"
          label="First name"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="formDataRegister.lastName"
          :counter="30"
          :rules="[rules.required, rules.min, rules.max]"
          label="Last name"
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <v-text-field
      v-model="formDataRegister.email"
      :rules="[rules.required, rules.validEmail]"
      label="E-mail"
      required
    ></v-text-field>

    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="formDataRegister.userName"
          :counter="15"
          :rules="[
            rules.required,
            rules.minformDataRegisterName,
            rules.maxformDataRegisterName,
          ]"
          label="User Name"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-select
          :items="rol"
          label="Rol"
          v-model="formDataRegister.rolSelected"
          :rules="[rules.required]"
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="formDataRegister.psw"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.minPsw, rules.maxPsw]"
          :type="show1 ? 'text' : 'password'"
          label="Password"
          hint="At least 4 characters"
          :counter="20"
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="formDataRegister.pswConfirm"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[
            rules.required,
            rules.minPsw,
            rules.maxPsw,
            rules.pswConfirmEqual,
          ]"
          :type="show1 ? 'text' : 'password'"
          label="Confirm Password"
          hint="At least 4 characters"
          :counter="20"
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-file-input
      label="Profile picture"
      accept="image/png, image/jpeg, image/bmp"
      show-size
      :rules="[rules.file, rules.required]"
      prepend-icon="mdi-camera"
      v-model="selectedAvatar"
    >
    </v-file-input>

    <v-btn
      class="secondary black--text mt-3"
      block
      type="submit"
      :disabled="!valid"
      @keypress.enter="checkIn"
    >
      SUBMIT
    </v-btn>
  </v-form>
</template>

<script>
import { encryptKey } from "@/libs/encrypt";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SignUp",
  data() {
    return {
      valid: true,
      rol: ["ADMIN", "USER"],
      formDataRegister: {},
      selectedAvatar: null,

      show1: false,

      rules: {
        required: (v) => !!v || "Required.",
        min: (v) => (v && v.length >= 2) || "At least 2 characters",
        max: (v) => (v && v.length <= 30) || "Maximum 30 characters",
        minformDataRegisterName: (v) =>
          (v && v.length >= 2) || "At least 2 characters",
        maxformDataRegisterName: (v) =>
          (v && v.length <= 15) || "Maximum 15 characters",
        minPsw: (v) => (v && v.length >= 4) || "At least 4 characters",
        maxPsw: (v) => (v && v.length <= 20) || "Maximum 20 characters",
        validEmail: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        file: (value) =>
          !value || value.size < 2000000 || "Size should be less than 2 MB!",
        pswConfirmEqual: (v) =>
          v === this.formDataRegister.psw ||
          "The password confirmation does not match",
      },
    };
  },

  computed: {
    ...mapGetters(["creatingUser"]),
  },

  methods: {
    ...mapActions(["checkInAPI"]),
    validate() {
      return this.$refs.form.validate();
    },

    reset() {
      this.$refs.form.reset();
    },

    checkIn() {
      if (this.validate()) {
        const formData = new FormData();
        formData.append("file", this.selectedAvatar);
        // this.formDataRegister.password =encryptKey(this.formDataRegister.email, this.formDataRegister.psw)
        const pswSafe = encryptKey(
          this.formDataRegister.email,
          this.formDataRegister.psw
        );
        formData.append("name", this.formDataRegister.firstName);
        formData.append("lastName", this.formDataRegister.lastName);
        formData.append("userName", this.formDataRegister.userName);
        formData.append("email", this.formDataRegister.email);
        formData.append("role", this.formDataRegister.rolSelected);
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
