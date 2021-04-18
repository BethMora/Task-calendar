<template>
  <v-menu
    ref="dateModal"
    v-model="isModalPicker"
    :close-on-content-click="closeDialogPicker(false)"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="auto"
    @click="closeDialogPicker(true)"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :label="titlePicker"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="closeDialogPicker(false)">
        Cancel
      </v-btn>
      <v-btn text color="primary" @click="$refs.dateModal.save(date)">
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "DatePickerModal",
  // props: ["isDialogPicker", "task" , "changeDialogPicker"],
  props: ["titlePicker", "dateModal", "isModalPicker", "changeDialogPicker", "date"],

  methods: {
    closeDialogPicker(value) {
      this.changeDialogPicker(value);
    },
  },
};
</script>
