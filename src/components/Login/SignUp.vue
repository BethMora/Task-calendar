<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    enctype="multipart/form-data"
    @submit.prevent="checkIn"
  >
    <FormUser :valid="valid" :formDataRegister="formDataRegister" />
    <FormPassword :formDataRegister="formDataRegister" />

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

    <BtnToolTipComponent
      title="Submit"
      :valid="valid"
      :action="checkIn"
      :block="btnBlock"
      color="secondary"
    />
  </v-form>
</template>

<script>
import BtnToolTipComponent from "@/components/reusable/BtnToolTipComponent";

import FormUser from "@/components/Login/Forms/FormUser";
import FormPassword from "@/components/Login/Forms/FormPassword";
import { encryptKey } from "@/libs/encrypt";
import { EventBus } from "@/libs/event-bus";
import { mapActions } from "vuex";
export default {
  name: "SignUp",
  components: {
    FormUser,
    FormPassword,
    BtnToolTipComponent,
  },
  data() {
    return {
      btnBlock: true,
      valid: true,
      formDataRegister: {},
      selectedAvatar: null,

      rules: {
        required: (v) => !!v || "Required.",
        file: (value) =>
          !value || value.size < 2000000 || "Size should be less than 2 MB!",
      },
    };
  },

  beforeDestroy() {
    EventBus.$emit("urlAvatar", null);
    EventBus.$off();
  },

  methods: {
    ...mapActions(["checkInAPI"]),

    onFileChange(e) {
      if (e) {
        const url = URL.createObjectURL(e);
        EventBus.$emit("urlAvatar", url);
      } else {
        EventBus.$emit("urlAvatar", null);
      }
    },

    checkIn() {
      if (this.$refs.form.validate()) {
        const formData = new FormData();
        formData.append("file", this.selectedAvatar);
        const pswSafe = encryptKey(this.formDataRegister.password);
        formData.append("password", pswSafe);
        formData.append("creationDate", new Date());
        formData.append("modificationDate", new Date());
        Object.entries(this.formDataRegister).forEach(([key, val]) => {
          if (key != "password") {
            formData.append(key, val);
          }
        });
        this.checkInAPI(formData);
        this.$router.push("/login");
        EventBus.$emit("urlAvatar", null);
        EventBus.$off();
      }
    },
  },
};
</script>
