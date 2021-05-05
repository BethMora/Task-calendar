<template>
  <v-dialog
    v-model="dialogAddUser"
    transition="dialog-bottom-transition"
    max-width="600"
    persistent=""
  >
    <v-card tile>
      <v-toolbar flat dark color="accent">
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title dark>Adding new user </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text @click="close">
            SAVE
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container>
        <v-card>
          <AvatarSignUp title="Sign Up" />
          <v-container>
            <SignUp />
          </v-container>
        </v-card>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import SignUp from "@/components/Login/SignUp";
import AvatarSignUp from "@/components/reusable/AvatarSignUp";
// import { EventBus } from "@/libs/event-bus";
export default {
  name: "NewUserDialog",
  props: ["dialogAddUser", "emit"],
  components: {
    SignUp,
    AvatarSignUp,
  },
  data() {
    return {
      urlImagen: null,
    };
  },

  methods: {
    close() {
      this.emit(false);
      // EventBus.$emit("resetSignUp", null);
      // EventBus.$off();

      this.$forceUpdate();
      // this.reset();
    },
  },
};
</script>
