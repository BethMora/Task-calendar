<template>
  <div class="mt-10">
    <v-card elevation="4" max-width="600" class="mx-auto">
      <v-card-text>
        <TitleComponent title="Editing general user information" />

        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          enctype="multipart/form-data"
          @submit.prevent="updateUser"
        >
          <FormUser
            :valid="valid"
            :formDataRegister="formDataRegister"
          />

          <v-btn
            class="secondary black--text mt-3"
            block
            type="submit"
            :disabled="!valid"
            @keypress.enter="updateUser"
            @click:submit.prevent="updateUser"
          >
            SUBMIT
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import TitleComponent from "@/components/reusable/TitleComponent";
import FormUser from "@/components/Login/Forms/FormUser";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "EditUser",
  components: {
    FormUser,
    TitleComponent,
  },
  data() {
    return {
      valid: true,
      formDataRegister: {},
    };
  },

  computed: {
    ...mapGetters(["userLoggedOk"]),
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

    updateUser() {
      if (this.$refs.form.validate()) {
        this.formDataRegister._id = this.userLoggedOk._id;
        this.formDataRegister.modificationDate = new Date();
        this.editUserAPI(this.formDataRegister);
        this.$router.push({
          name: "Calendar",
          params: { id: this.userLoggedOk.userName },
        });
      }
    },
  },
};
</script>
