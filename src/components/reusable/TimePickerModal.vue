<template>
  <v-menu
    ref="dateModal"
    v-model="menu2"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="time"
        :label="titlePicker"
        :rules="rules"
        prepend-icon="mdi-clock-time-four-outline"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="menu2"
      v-model="time"
      full-width
      :color="color"
      @click:minute="$refs.dateModal.save(time)"
    ></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  name: "TimePickerModal",
  props: ["titlePicker", "rules", "color", "setTime", "timeSentEdit"],
  data() {
    return {
      dateModal: "",
      time: null,
      menu2: false,
    };
  },

  beforeMount() {
    if (this.timeSentEdit) {
      this.time = this.timeSentEdit;
    }
  },

  watch: {
    time() {
      this.$emit("setTime", this.time);
    },
    timeSentEdit() {
      this.time = this.timeSentEdit;
    },
  },
};
</script>
