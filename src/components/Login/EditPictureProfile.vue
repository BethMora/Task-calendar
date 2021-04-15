<template>
  <div>
    <h3 class="my-2">
      Editing profile picture
    </h3>
    <v-divider class="mb-4" />

    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      enctype="multipart/form-data"
      @submit.prevent="updateImageUser"
    >
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
        @keypress.enter="updateImageUser"
      >
        SUBMIT
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "EditPictureProfile",
  data() {
    return {
      valid: true,
      selectedAvatar: null,
      formDataRegister: {},
      rules: {
        required: (v) => !!v || "Required.",
        file: (value) =>
          !value || value.size < 2000000 || "Size should be less than 2 MB!",
      },

    };
  },

  computed: {
    ...mapGetters(["userLoggedOk"]),
  },

  beforeMount() {
    console.log("Picture que vamos a enviar es: ");
    console.log(this.userLoggedOk.imageName);
    //No envia nunca el password eso hay que validar de informacion del user
    // this.selectedAvatar = this.userLoggedOk.imageName;
    // this.formDataRegister = {
    //   imageName: this.userLoggedOk.imageName,
    // };
  },

  methods: {
    ...mapActions(["editImageProfileAPI"]),

    validate() {
      return this.$refs.form.validate();
    },

    updateImageUser() {
      if (this.validate()) {
        const formData = new FormData();
        formData.append("_id", this.userLoggedOk._id);
        formData.append("file", this.selectedAvatar);
        formData.append("modificationDate", new Date());
        this.editImageProfileAPI(formData);
        this.$router.push({
          name: "dashboard",
          params: { id: this.userLoggedOk.userName },
        });
      }
    },
  },
};
</script>
