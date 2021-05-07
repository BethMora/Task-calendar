<template>
  <v-dialog
    v-model="dialogEditUser"
    transition="dialog-bottom-transition"
    max-width="600"
    persistent=""
  >
    <v-card tile>
      <v-toolbar flat dark color="accent">
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title dark>Editing user </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text @click="close">
            SAVE
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container>
        <v-card>
          <AvatarSignUp title="Editing profile" />
          <v-container style="margin-top: -40px">
            <!-- <SignUp :close="close" :dataEditUser="dataEditUser"/> -->
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              enctype="multipart/form-data"
              @submit.prevent="adminIsUpdateUser"
            >
              <FormEditUser
                :valid="valid"
                :formDataRegister="formDataRegister"
              />

              <v-file-input
                label="Profile picture"
                accept="image/png, image/jpeg, image/bmp"
                show-size
                :rules="[rules.file]"
                prepend-icon="mdi-camera"
                @change="onFileChange"
                v-model="selectedAvatar"
              >
              </v-file-input>

              <BtnToolTipComponent
                title="Submit"
                :valid="valid"
                :action="adminIsUpdateUser"
                :block="btnBlock"
                color="secondary"
              />
            </v-form>

            <v-alert
              border="right"
              colored-border
              type="info"
              elevation="2"
              class="mt-4"
            >
              If the user has forgotten their password, you can help to reset
              their password.
              <v-btn class="ma-2" outlined color="teal" @click="resetPsw">
                <v-icon class="mr-3">mdi-key-arrow-right</v-icon> RESET PASSWORD
              </v-btn>
            </v-alert>
          </v-container>
        </v-card>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import FormEditUser from "@/components/Login/Forms/FormEditUser";
import { EventBus } from "@/libs/event-bus";
import AvatarSignUp from "@/components/reusable/AvatarSignUp";
import BtnToolTipComponent from "@/components/reusable/BtnToolTipComponent";
import { mapActions } from "vuex";
// import { encryptKey } from "@/libs/encrypt";
export default {
  name: "EditUserDialog",
  props: ["dialogEditUser", "emitEdit", "dataEditUser"],
  components: {
    FormEditUser,
    AvatarSignUp,
    BtnToolTipComponent,
  },
  data() {
    return {
      // urlImagen: null,
      btnBlock: true,
      valid: true,
      formDataRegister: {},
      selectedAvatar: null,

      rules: {
        file: (value) =>
          !value || value.size < 2000000 || "Size should be less than 2 MB!",
      },
    };
  },
  // beforeUpdate() {
  //   console.log("Desde el BEOFREUPDATE");
  //   console.log(this.dataEditUser);
  //   this.formDataRegister = {
  //     name: this.dataEditUser.name,
  //     lastName: this.dataEditUser.lastName,
  //     email: this.dataEditUser.email,
  //     isActive: this.dataEditUser.isActive,
  //     userName: this.dataEditUser.userName,
  //     role: this.dataEditUser.role,
  //   };
  // },

  watch: {
    dataEditUser() {
      this.formDataRegister = {
        name: this.dataEditUser.name,
        lastName: this.dataEditUser.lastName,
        email: this.dataEditUser.email,
        isActive: this.dataEditUser.isActive,
        userName: this.dataEditUser.userName,
        role: this.dataEditUser.role,
      };
    },
  },

  methods: {
    ...mapActions(["editUserAPI"]),

    close() {
      this.emitEdit(false);
      // EventBus.$emit("resetSignUp", null);
      // EventBus.$off();

      // this.$forceUpdate();
      // this.reset();
    },

    onFileChange(e) {
      if (e) {
        const url = URL.createObjectURL(e);
        EventBus.$emit("urlAvatar", url);
      } else {
        EventBus.$emit("urlAvatar", null);
      }
    },

    adminIsUpdateUser() {
      if (this.$refs.form.validate()) {
        const formData = new FormData();
        if (this.selectedAvatar) {
          formData.append("file", this.selectedAvatar);
        }
        // const pswSafe = encryptKey(this.formDataRegister.password);
        // formData.append("password", pswSafe);
        // formData.append("creationDate", new Date());
        formData.append("modificationDate", new Date());
        formData.append("typeEdit", "updatedByAdmin");
        formData.append("_id", this.dataEditUser._id);
        Object.entries(this.formDataRegister).forEach(([key, val]) => {
          // if (key != "password") {
          formData.append(key, val);
          // }
        });
        this.editUserAPI(formData);

        // if (this.$route.path === "/users") {
        this.$forceUpdate();
        this.close();
        // } else {
        // this.$router.push("/login");
        // }
        // this.$refs.form.reset();
        EventBus.$emit("urlAvatar", null);
        EventBus.$off();
      }
    },

    resetPsw() {
      console.log("Reseteando contrasenia");
    },
  },
};
</script>
