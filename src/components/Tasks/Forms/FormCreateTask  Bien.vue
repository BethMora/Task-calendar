<template>
  <v-container fill-height fluid>
    <v-alert dense class="mt-4 light" style="width: 100%">
      Start of task information
    </v-alert>
    <v-row justify="center">
      <v-col lg="6" xs="1" align="center">
        <DatePickerModal
          :rules="[rules.required]"
          :date="task.dateStart"
          color="accent"
          titlePicker="Select start date on calendar"
        />
      </v-col>

      <v-col lg="6" xs="1" align="center">
        <TimePickerModal
          :rules="[rules.required]"
          :time="task.timeStart"
          color="accent"
          titlePicker="Select start time on clock"
        />
      </v-col>
    </v-row>

    <v-alert dense class="mt-4 light" style="width: 100%">
      End of task information
    </v-alert>
    <v-row justify="center">
      <v-col lg="6" xs="1" align="center">
        <DatePickerModal
          :rules="[rules.required]"
          :date="task.dateEnd"
          color="primary"
          titlePicker="Select end date on calendar"
        />
      </v-col>

      <v-col lg="6" xs="1" align="center">
        <TimePickerModal
          :rules="[rules.required]"
          :time="task.timeEnd"
          color="primary"
          titlePicker="Select end time on clock"
        />
      </v-col>
    </v-row>

    <v-text-field
      v-model="task.nameTask"
      :rules="[rules.required, rules.min, rules.max]"
      :counter="30"
      label="Task name"
      required
    ></v-text-field>

    <v-row justify="center">
      <v-col lg="6" xs="1" align="center">
        <v-textarea
          v-model="task.descriptionTask"
          :counter="120"
          :rules="[rules.required, rules.min, rules.maxMsg]"
          label="Task description "
          required
        ></v-textarea>
      </v-col>
      <v-col lg="6" xs="1" align="center">
        <label for="">Task color</label>
        <v-color-picker
          dot-size="25"
          :rules="[rules.required]"
          swatches-max-height="200"
          v-model="task.colorTask"
        ></v-color-picker>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DatePickerModal from "@/components/reusable/DatePickerModal";
import TimePickerModal from "@/components/reusable/TimePickerModal";
export default {
  name: "FormCreateTask",
  // props: ["task", "valid", "sendTask", "dialogAddTask", "emit", "dateSelected"],
  props: ["task"],
  components: {
    DatePickerModal,
    TimePickerModal,
  },
  data() {
    return {
      dateStart: "",
      timeStart: "",
      dateEnd: "",
      timeEnd: "",

      // isPicker: false,
      // dateStart: null,

      // titlePicker: "Select Start Date",

      // isDialogPicker: false,
      rules: {
        required: (v) => !!v || "Required",
        min: (v) => (v && v.length >= 5) || "Must be at least 5 characters",
        max: (v) =>
          (v && v.length <= 30) || "Must not be longer than 30 characters",
        maxMsg: (v) =>
          (v && v.length <= 120) || "Must not be longer than 120 characters",
        minDate: (v) =>
          (this.task.dateStart && v >= this.task.dateStart) ||
          "This date cannot be less than the start date ",
        // minDateEnd: (v) =>
        //   v <= this.task.dateEnd ||
        //   "La fecha de fin no puede ser menor a esta fecha ",
        // formatDate: (v) =>
        //   /[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(v) ||
        //   "The date format is invalid",
        // formatTime: (v) =>
        //   /[0-9]{2}:[0-9]{2}/.test(v) || "The time format is invalid",
      },
    };
  },

  computed: {
    // isModalPicker: {
    //   get: function() {
    //     return this.isPicker;
    //   },
    //   set: function(value) {
    //     this.changeDialogPicker(value);
    //   },
    // },

    // task: {
    //   get: function() {
    //     return this.dateStart;
    //   },
    //   set: function(value) {
    //     this.changeDialogPicker(value);
    //   },
    // },
  },

  methods: {
    // changeDialogPicker(value) {
    //   this.isPicker = value;
    // },
  },
};
</script>
