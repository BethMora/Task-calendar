<template>
  <div class="mt-10">
    <v-card elevation="4" max-width="600" class="mx-auto">
      <v-card-text>
        <TitleComponent title="Editing password" />
        <FormPassword :formDataRegister="formDataRegister" />
        <v-btn
          class="secondary black--text mt-3"
          block
          type="submit"
          :disabled="!valid"
          @keypress.enter="updateImageUser"
        >
          SUBMIT
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import TitleComponent from "@/components/reusable/TitleComponent";
import FormPassword from "@/components/Login/Forms/FormPassword";
import { mapGetters } from "vuex";
export default {
  name: "EditPassword",
  components: {
    FormPassword,
    TitleComponent,
  },
  data() {
    return {
      formDataRegister: {},
      valid: true,
    };
  },

  computed: {
    ...mapGetters(["creatingUser", "userLoggedOk"]),
  },

  beforeMount() {
    this.formDataRegister = {
      password: this.userLoggedOk.password,
    };
  },
};
</script>
