<template>
  <div>
    <h3 class="my-2">
      Editing password
    </h3>
    <v-divider class="mb-4" />
    Password que recivo es {{formDataRegister.password}}
    <v-divider class="mb-4" />
    
    <FormPassword :formDataRegister="formDataRegister" />
  </div>
</template>

<script>
import FormPassword from "@/components/Login/Forms/FormPassword";
import { mapGetters } from "vuex";
export default {
  name: "EditPassword",
  components: {
    FormPassword,
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
      console.log("Passwor que vamos a enviar es: ")
      console.log(this.userLoggedOk)
      //No envia nunca el password eso hay que validar de informacion del user
    this.formDataRegister = {
      password: this.userLoggedOk.password,
      };
  },
};
</script>
