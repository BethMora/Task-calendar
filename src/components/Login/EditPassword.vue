<template>
  <div>
    <TitleComponent title="Editing password" />
    <FormPassword :formDataRegister="formDataRegister" />
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
