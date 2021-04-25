<template>
  <div>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="formDataRegister.name"
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
          v-model="formDataRegister.role"
          :rules="[rules.required]"
        ></v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "FormUser",
  props: ["valid", "rol", "formDataRegister"],
  data() {
    return {
      rules: {
        required: (v) => !!v || "Required.",
        min: (v) => (v && v.length >= 2) || "At least 2 characters",
        max: (v) => (v && v.length <= 30) || "Maximum 30 characters",
        minformDataRegisterName: (v) =>
          (v && v.length >= 2) || "At least 2 characters",
        maxformDataRegisterName: (v) =>
          (v && v.length <= 15) || "Maximum 15 characters",
        validEmail: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      },
    };
  },
};
</script>
