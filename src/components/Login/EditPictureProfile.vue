<template>
  <div class="mt-10">
    <v-card elevation="4" max-width="600" class="mx-auto">
      <v-card-text>
        <TitleComponent title="Editing picture profile" />
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          enctype="multipart/form-data"
          @submit.prevent="updateImageUser"
        >
          <div v-if="url" class=" my-4">
            <v-alert
              border="right"
              outlined
              color="primary"
              class="text-center"
              prominent
              id="titleImg"
            >
              New profile picture
              <v-divider class="my-2" />
              <v-row justify="center">
                <v-img max-height="200" max-width="200" :src="url" />
              </v-row>
            </v-alert>
          </div>

          <v-file-input
            label="Profile picture"
            accept="image/png, image/jpeg, image/bmp"
            show-size
            :rules="[rules.file, rules.required]"
            prepend-icon="mdi-camera"
            @change="onFileChange"
            v-model="selectedAvatar"
          >
          </v-file-input>

          <v-btn
            class="secondary black--text mt-3"
            block
            type="submit"
            :disabled="!valid"
            @keypress.enter="updateImageUser"
            @click:submit.prevent="updateImageUser"
          >
            SUBMIT
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import TitleComponent from "@/components/Reusable/TitleComponent";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "EditPictureProfile",
  components: { TitleComponent },
  data() {
    return {
      valid: true,
      selectedAvatar: null,
      formDataRegister: {},
      url: null,
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

  methods: {
    ...mapActions(["editUserAPI"]),

    onFileChange(e) {
      if (e) {
        this.url = URL.createObjectURL(e);
      } else {
        this.url = null;
      }
    },

    updateImageUser() {
      if (this.$refs.form.validate()) {
        const formData = new FormData();
        formData.append("_id", this.userLoggedOk._id);
        formData.append("file", this.selectedAvatar);
        formData.append("modificationDate", new Date());
        this.editUserAPI(formData);
        this.$router.push({
          name: "Calendar",
          params: { id: this.userLoggedOk.userName },
        });
      }
    },
  },
};
</script>

<style>
#titleImg {
  width: 300px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}
</style>
