<template>
  <v-container fill-height fluid>
    <v-alert dense color="light" style="width: 100%">
      Start of task information
    </v-alert>
    <v-row justify="center">
      <v-col lg="6" xs="1" align="center">
        <v-text-field
          :rules="[rules.required]"
          v-model="task.dateStart"
          label="Start date:"
          readonly
          placeholder="Select start date on calendar"
        ></v-text-field>

        <!-- <template v-if="task.dateStart">
          <v-date-picker
            v-model="task.dateStart"
            year-icon="mdi-calendar-blank"
            flat
            disabled=""
          ></v-date-picker>
        </template>

        <template v-else> -->
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="task.dateStart"
                label="Start date:"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="task.dateStart" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        <!-- </template> -->
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

    <v-alert dense color="light" style="width: 100%">
      End of task information
    </v-alert>
    <v-row justify="center">
      <v-col lg="6" xs="1" align="center">
        <v-text-field
          :rules="[rules.required, rules.minDate]"
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
          color="accent"
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
        <v-time-picker
          v-model="task.timeEnd"
          required
          color="accent"
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
  </v-container>
</template>

<script>
export default {
  name: "FormCreateTask",
  // props: ["task", "valid", "sendTask", "dialogAddTask", "emit", "dateSelected"],
  props: ["task"],
  data() {
    return {
       menu: false,
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
};
</script>
