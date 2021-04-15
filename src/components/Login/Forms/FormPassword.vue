<template>
  <div>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="formDataRegister.password"
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
  </div>
</template>

<script>
export default {
  name: "FormPassword",
  props: ["formDataRegister"],

  data() {
    return {
      show1: false,
      rules: {
        required: (v) => !!v || "Required.",
        minPsw: (v) => (v && v.length >= 4) || "At least 4 characters",
        maxPsw: (v) => (v && v.length <= 20) || "Maximum 20 characters",
        pswConfirmEqual: (v) =>
          v === this.formDataRegister.password ||
          "The password confirmation does not match",
      },
    };
  },
};
</script>
