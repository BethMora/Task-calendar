<template>
  <v-menu
    ref="dateModal"
    v-model="isDialog"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :label="titlePicker"
        :rules="rules"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        :color="color"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      scrollable
      :color="color"
      :min="dateStart"
      :max="dateEnd"
      @click:date="$refs.dateModal.save(date)"
    >
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "DatePickerModal",
  props: ["titlePicker", "rules", "color", "setDate", "dateStart", "dateEnd"],
  data() {
    return {
      dateModal: "",
      isDialog: false,
      date: null,
    };
  },

  watch: {
    date() {
      this.$emit("setDate", this.date);
    },
  },

  methods: {
    // closeDialogPicker(value) {
    //   this.changeDialogPicker(value);
    // },
  },
};
</script>
