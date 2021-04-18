<template>
  <div class="text-center">
    <v-dialog v-model="isConfirmation" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Privacy Policy
        </v-card-title>

         <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
         <v-btn x-large class="error" @click="confirmLogOut">
          <v-icon class="mr-1">mdi-check-bold </v-icon>
          Confirm
        </v-btn>
        <v-btn x-large class="accent ml-4" @click="cancelLogOut">
          <v-icon class="mr-1">mdi-hand-left</v-icon>
          Cancel
        </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ConfirmAction",
  props: ["isConfirmation", "changeFlagConfirmation"],
  data: () => ({
    opacity: 0.75,
    zIndex: 0,
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
