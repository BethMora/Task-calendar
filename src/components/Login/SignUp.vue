<template>
  <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="checkIn">
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="firstName"
          :counter="30"
          :rules="[rules.required, rules.min, rules.max]"
          label="First name"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="lastName"
          :counter="30"
          :rules="[rules.required, rules.min, rules.max]"
          label="Last name"
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <v-text-field
      v-model="email"
      :rules="[rules.required, rules.validEmail]"
      label="E-mail"
      required
    ></v-text-field>

    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="userName"
          :counter="15"
          :rules="[rules.required, rules.minUserName, rules.maxUserName]"
          label="User Name"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-select
          :items="rol"
          label="Rol"
          v-model="rolSelected"
          :rules="[rules.required]"
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="psw"
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
          v-model="pswConfirm"
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
      @change="onFileSelected"
    >
    </v-file-input>

    <!-- <input
      type="file"
      ref="image"
      accept="image/png, image/jpeg, image/bmp"
      @change="onFileSelected2"
      prepend-icon="mdi-camera"
    /> -->

    <v-btn
      class="secondary black--text mt-3"
      block
      type="submit"
      :disabled="!valid"
    >
      SUBMIT
    </v-btn>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SignUp",
  data() {
    return {
      valid: true,
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      rol: ["ADMIN", "USER"],
      rolSelected: "",
      psw: "",
      pswConfirm: "",
      // avatar: "",
      selectedAvatar: null,
      //   nameRules: [
      //     (v) => !!v || "Name is required",
      //     (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      //   ],
      show1: false,
      //   emailRules: [
      //     (v) => !!v || "E-mail is required",
      //     (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      //   ],

      rules: {
        required: (v) => !!v || "Required.",
        min: (v) => v.length >= 2 || "At least 2 characters",
        max: (v) => v.length <= 30 || "Maximum 30 characters",
        minUserName: (v) => v.length >= 2 || "At least 2 characters",
        maxUserName: (v) => v.length <= 15 || "Maximum 15 characters",
        minPsw: (v) => v.length >= 4 || "At least 4 characters",
        maxPsw: (v) => v.length <= 20 || "Maximum 20 characters",
        validEmail: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        file: (value) =>
          !value || value.size < 2000000 || "Size should be less than 2 MB!",
        pswConfirmEqual: (v) =>
          v === this.psw || "The password confirmation does not match",
      },
    };
  },

  computed: {
    ...mapGetters(["creatingUsers"]),
  },

  methods: {
    ...mapActions(["checkInAPI"]),
    validate() {
      return this.$refs.form.validate();
    },

    reset() {
      this.$refs.form.reset();
    },

    onFileSelected(event) {
      // console.log(event);
      return this.selectedAvatar = event;
      // console.log(this.selectedAvatar)
    },
    // onFileSelected2(event) {
    //   // console.log(event);
    //   this.selectedAvatar = event.target.files[0];
    //   console.log(this.selectedAvatar)
    // },

    checkIn() {
      // console.log(this.$refs.form.validate());
      if (this.validate()) {
        const newUser = {
          name: this.firstName,
          lastName: this.lastName,
          userName: this.userName,
          email: this.email,
          role: this.rolSelected,
          password: this.pswConfirm,
          // imageName: this.selectedAvatar,
          imageName: "Solo tiene String",
          creationDate: new Date(),
          modificationDate: new Date(),
        };
        // console.log(newUser)
        this.checkInAPI(newUser);
        // this.$refs.form.reset();
      }
    },
  },
};
</script>
