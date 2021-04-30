<template>
  <v-dialog v-model="isConfirmation" width="500">
    <v-card>
      <v-card-title class=" text-uppercase accent white--text text-center">
        {{ title }}
      </v-card-title>

      <v-card-text class="my-3 indigo--text">
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
      this.$forceUpdate();
    },

    cancelLogOut() {
      this.changeFlagConfirmation(false);
    },
  },
};
</script>
