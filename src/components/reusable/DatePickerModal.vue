<template>
  <v-menu
    ref="dateModal"
    v-model="isDialog"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="auto"
    :disabled="dateStartSent != null ? true : false"
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
  props: [
    "titlePicker",
    "rules",
    "color",
    "setDate",
    "dateStart",
    "dateEnd",
    "dateStartSent",
    "dateSentEdit",
  ],
  data() {
    return {
      dateModal: "",
      isDialog: false,
      date: null,
    };
  },
  beforeMount() {
    if (this.dateStartSent) {
      this.date = this.dateStartSent;
    }
    if (this.dateSentEdit) {
      this.date = this.dateSentEdit;
    }
  },

  watch: {
    date() {
      this.$emit("setDate", this.date);
    },
    dateSentEdit() {
      this.date = this.dateSentEdit;
    },
    dateStartSent() {
      this.date = this.dateStartSent;
    },
  },
};
</script>
