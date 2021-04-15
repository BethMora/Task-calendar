<template>
  <v-overlay :opacity="opacity" :value="isConfirmation">
    <v-btn x-large class="error" @click="confirmLogOut">
      <v-icon class="mr-1">mdi-check-bold </v-icon>
      Confirm
    </v-btn>
    <v-btn x-large class="accent ml-4" @click="cancelLogOut">
      <v-icon class="mr-1">mdi-hand-left</v-icon>
      Cancel
    </v-btn>
  </v-overlay>
</template>

<script>
export default {
  name: "ConfirmAction",
  props: ["isConfirmation", "changeFlagConfirmation"],
  data: () => ({
    opacity: 0.75,
  }),

  methods: {
    confirmLogOut() {
      this.changeFlagConfirmation(false);
      this.$emit("confirmOff", true);
    },

    cancelLogOut() {
      this.changeFlagConfirmation(false);
    },
  },
};
</script>
