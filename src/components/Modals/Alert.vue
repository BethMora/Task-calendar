<template>
  <div>
    <v-bottom-sheet v-model="sheet" persistent inset v-slot:default="{ hover }">
      <v-sheet class="text-center mb-3" :class="message.color" height="130px">
        <v-btn
          class="py-2 title"
          block=""
          :elevation="hover ? 24 : 6"
          @click="closeAlert"
        >
          close
          <v-icon right dark color="accent">
            mdi-close
          </v-icon>
        </v-btn>
        <div class="py-6">{{ message.status }} -- {{ message.msg }}</div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data: () => ({}),

  computed: {
    ...mapGetters(["message", "sheet"]),
  },

  methods: {
    ...mapMutations(["resetMessage", "changeSheet"]),

    closeAlert() {
      this.changeSheet();
      this.resetMessage();
    },
  },
};
</script>
