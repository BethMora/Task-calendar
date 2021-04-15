<template>
  <div>
    <h3 class="my-2">
      Editing user information
    </h3>
    <v-divider class="mb-4" />

    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      enctype="multipart/form-data"
      @submit.prevent="updateUser"
    >
      <FormUser
        :valid="valid"
        :rol="rol"
        :formDataRegister="formDataRegister"
      />

      <v-btn
        class="secondary black--text mt-3"
        block
        type="submit"
        :disabled="!valid"
        @keypress.enter="updateUser"
      >
        SUBMIT
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import FormUser from "@/components/Login/Forms/FormUser";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "EditUser",
  components: {
    FormUser,
  },
  data() {
    return {
      valid: true,
      rol: ["ADMIN", "USER"],
      formDataRegister: {},
    };
  },

  computed: {
    ...mapGetters(["creatingUser", "userLoggedOk"]),
  },

  beforeMount() {
    this.formDataRegister = {
      name: this.userLoggedOk.name,
      lastName: this.userLoggedOk.lastName,
      role: this.userLoggedOk.role,
      userName: this.userLoggedOk.userName,
      email: this.userLoggedOk.email,
    };
  },

  methods: {
    ...mapActions(["editUserAPI"]),
    validate() {
      return this.$refs.form.validate();
    },

    // reset() {
    //   this.$refs.form.reset();
    // },

    updateUser() {
      if (this.validate()) {
        this.formDataRegister._id = this.userLoggedOk._id;
        this.formDataRegister.modificationDate = new Date();
        this.editUserAPI(this.formDataRegister);
        this.$router.push({
          name: "dashboard",
          params: { id: this.userLoggedOk.userName },
        });
      }
    },
  },
};
</script>
