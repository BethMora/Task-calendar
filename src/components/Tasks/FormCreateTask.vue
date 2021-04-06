<template>
  <v-container fill-height fluid>
    <v-alert dense color="light" style="width: 100%">
      End of task information
    </v-alert>
    <v-row justify="center">
      <v-col lg="6" xs="1" align="center">
        <v-text-field
          :rules="[rules.required]"
          v-model="task.dateEnd"
          label="End date:"
          readonly
          placeholder="Select end date on calendar"
        ></v-text-field>
        <v-date-picker
          v-model="task.dateEnd"
          year-icon="mdi-calendar-blank"
          flat
          :rules="[rules.required, rules.minDate]"
          :min="task.dateStart"
        ></v-date-picker>
      </v-col>

      <v-col lg="6" xs="1" align="center">
        <v-text-field
          :rules="[rules.required]"
          v-model="task.timeEnd"
          label="End time:"
          readonly
          placeholder="Select end time on clock"
        ></v-text-field>
        <v-time-picker v-model="task.timeEnd" required></v-time-picker>
      </v-col>
    </v-row>

    <v-alert dense color="light" style="width: 100%">
      Start of task information
    </v-alert>
    <v-row justify="center">
      <v-col lg="6" xs="1" align="center">
        <v-text-field
          :rules="[rules.required, rules.minDateEnd, rules.formatDate]"
          v-model="task.dateStart"
          label="Start date:"
          readonly
          placeholder="Select start date on calendar"
        ></v-text-field>
        <v-date-picker
          v-model="task.dateStart"
          year-icon="mdi-calendar-blank"
          flat
        ></v-date-picker>
      </v-col>

      <v-col lg="6" xs="1" align="center">
        <v-text-field
          :rules="[rules.required]"
          v-model="task.timeStart"
          label="Start time:"
          readonly
          placeholder="Select start time on clock"
        ></v-text-field>
        <v-time-picker
          v-model="task.timeStart"
          required
          :rules="[rules.required]"
        ></v-time-picker>
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

    <v-row justify="center" class="mb-4">
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mr-4 success black--text"
            type="submit"
            :disabled="!valid"
            @click="sendTask"
            v-bind="attrs"
            v-on="on"
          >
            SUBMIT
          </v-btn>
        </template>
        Is activated when completing the form
      </v-tooltip>

      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="reset"
            class="secondary black--text"
            v-bind="attrs"
            v-on="on"
          >
            CLEAN UP
          </v-btn>
        </template>
        Click to clear all fields
      </v-tooltip>
    </v-row>
  </v-container>
</template>

<script>
// import { mapActions } from "vuex";
// import { formatDateToLocal } from "@/libs/dates";
export default {
  name: "FormCreateTask",
  props: ["task", "valid", "sendTask", "dialogAddTask", "emit", "dateSelected"],
  data() {
    return {
      // valid: true,
      // task: {
      //   dateStart: "",
      //   timeStart: "",
      //   dateEnd: "",
      //   timeEnd: "",
      //   nameTask: "",
      //   descriptionTask: "",
      //   colorTask: "",
      // },
      rules: {
        required: (v) => !!v || "Required",
        min: (v) => (v && v.length >= 5) || "Must be at least 5 characters",
        max: (v) =>
          (v && v.length <= 30) || "Must not be longer than 30 characters",
        maxMsg: (v) =>
          (v && v.length <= 120) || "Must not be longer than 120 characters",
        minDate: (v) =>
          v < this.task.dateStart ||
          "Esta fecha no puede ser menor a la fecha de inicio ",
        minDateEnd: (v) =>
          v <= this.task.dateEnd ||
          "La fecha de fin no puede ser menor a esta fecha ",
        formatDate: (v) =>
          /[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(v) ||
          "El formato de fecha es invalida",
        formatTime: (v) =>
          /[0-9]{2}:[0-9]{2}/.test(v) || "El formato del tiempo es invalido",
      },
    };
  },

  watch: {
    task() {
      console.log("Hubo un cambio");
    },
  },

  methods: {
    reset() {
      this.task.dateStart = "";
      this.task.timeStart = "";
      this.task.dateEnd = "";
      this.task.timeEnd = "";
      this.task.colorTask = "";
      return this.$refs.form.reset();
    },

    // ...mapActions(["addNewTask"]),
    // sendTask() {
    //   const localDateStart = formatDateToLocal(
    //     this.task.dateStart,
    //     this.task.timeStart
    //   );
    //   const localDateEnd = formatDateToLocal(
    //     this.task.dateEnd,
    //     this.task.timeEnd
    //   );
    //   let timed = false;
    //   if (this.task.dateStart === this.task.dateEnd) {
    //     timed = true;
    //   }
    //   if (this.validate()) {
    //     const task = {
    //       name: this.task.nameTask,
    //       description: this.task.descriptionTask,
    //       start: localDateStart,
    //       end: localDateEnd,
    //       color: this.task.colorTask,
    //       timed: timed,
    //       times: {
    //         dateStart: this.task.dateStart,
    //         timeStart: this.task.timeStart,
    //         dateEnd: this.task.dateEnd,
    //         timeEnd: this.task.timeEnd,
    //       },
    //     };
    //     this.addNewTask(task);
    //     this.$router.push("/calendar");
    //   }
    // },
  },
};
</script>
