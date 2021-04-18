<template>
  <div class="text-center">
    <v-dialog v-model="isConfirmation" width="500">
      <v-card>
        <v-card-title class="headline primary text-uppercase lighten-2">
          {{ title }}
        </v-card-title>

        <v-card-text  class="my-3">
          {{ subtitle }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="my-3">
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
  name: "ConfirmActionComponent",
  props: ["isConfirmation", "changeFlagConfirmation", "title", "subtitle"],
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
