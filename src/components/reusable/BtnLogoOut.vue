<template>
  <div>
    <v-btn @click="dialog"> Sign Out </v-btn>
    <ConfirmActionComponent :process="processSignOf" />
  </div>
</template>

<script>
import ConfirmActionComponent from "@/components/reusable/ConfirmActionComponent";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "BtnLogoOut",
  components: {
    ConfirmActionComponent,
  },
   computed: {
    ...mapGetters(["isConfirmedSignOff"]),
  },

  watch: {
    isConfirmedSignOff() {
      console.log(this.isConfirmedSignOff);
      if (this.isConfirmedSignOff) {
        console.log("Confirmo");
      } else {
        console.log("Cancelo");
      }
    },
  },

  methods: {
    ...mapActions(["openDialog","processSignOf"]),
    dialog() {
      this.openDialog({
        title: "Sign off",
        subtitle: "Are you sure to log out?",
      });
    },
  },
};
</script>
