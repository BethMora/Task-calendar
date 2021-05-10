<template>
  <v-dialog v-model="isVisible" width="500">
    <v-card>
      <v-card-title class=" text-uppercase accent white--text text-center">
        {{ information.title }}
      </v-card-title>

      <v-card-text class="my-3 indigo--text">
        {{ information.subtitle }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="my-3">
        <v-spacer></v-spacer>
        <v-btn x-large class="error" @click.stop="processSignOf(true)">
          <v-icon class="mr-1">mdi-check-bold </v-icon>
          Confirm
        </v-btn>
        <v-btn x-large class="accent ml-4" @click.stop="processSignOf(false)">
          <v-icon class="mr-1">mdi-hand-left</v-icon>
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ConfirmActionComponent",
  data: () => ({}),
  props:["process"],

  computed: {
    ...mapGetters(["isDialog", "information"]),
     isVisible: {
      get: function() {
        return this.isDialog
      },
      set: function(value) {
        this.processSignOf(value)
      }
    }
  },

  methods: {
    // ...mapActions(["confirmLogOut", "cancelLogOut"])
    ...mapActions(["processSignOf"])
  },
};
</script>
