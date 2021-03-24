<template>
  <v-main>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
      <!-- <v-row class="d-flex justify-center align-center align-content-center align-self-center" align="center" justify="center"> -->
      <v-container fill-height fluid>
        <v-alert dense color="light" style="width: 100%">
          Start of task information
        </v-alert>
        <v-row justify="center">
          <v-col lg="6" xs="1" align="center">
            <h3>Start date {{ dateStart }}</h3>
            <v-date-picker
              v-model="dateStart"
              year-icon="mdi-calendar-blank"
              flat
            ></v-date-picker>
          </v-col>

          <v-col lg="6" xs="1" align="center">
            <h3>Start time:</h3>
            <v-time-picker
              v-model="timeStart"
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
            <h3>End date</h3>
            <!-- <input type="time" v-model="timeEnd" label="Time end" required /> -->
            <v-date-picker
              v-model="dateEnd"
              year-icon="mdi-calendar-blank"
              flat
              :rules="[rules.required, rules.minDate]"
            ></v-date-picker>
          </v-col>

          <v-col lg="6" xs="1" align="center">
            <h3>End time:</h3>
            <v-time-picker
              v-model="timeEnd"
              required
              :min="dateStart"
            ></v-time-picker>
          </v-col>
        </v-row>

        <v-text-field
          v-model="nameTask"
          :rules="[rules.required, rules.min, rules.max]"
          :counter="30"
          label="Task name"
          required
        ></v-text-field>

        <v-row justify="center">
          <v-col lg="6" xs="1" align="center">
            <v-textarea
              v-model="descriptionTask"
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
              v-model="colorTask"
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
    </v-form>
  </v-main>
</template>

<script>
import { mapActions } from "vuex";
import { formatDateToLocal } from "@/libs/dates";
export default {
  name: "CreateTask",
  data() {
    return {
      valid: true,
      dateStart: "",
      timeStart: "",
      dateEnd: "",
      timeEnd: "",
      nameTask: "",
      descriptionTask: "",
      colorTask: "",
      rules: {
        required: (v) => !!v || "Required",
        min: (v) => (v && v.length >= 5) || "Must be at least 5 characters",
        max: (v) =>
          (v && v.length <= 30) || "Must not be longer than 30 characters",
        maxMsg: (v) =>
          (v && v.length <= 120) || "Must not be longer than 120 characters",
        minDate: (v) =>
          v === "26" ||
          "Esta fecha no puede ser menor a la fecha de inicio ",
      },
    };
  },

  methods: {
    ...mapActions(["addNewTask"]),

    validate() {
      return this.$refs.form.validate();
    },

    reset() {
      this.dateStart = "";
      this.timeStart = "";
      this.dateEnd = "";
      this.timeEnd = "";
      this.colorTask = "";
      return this.$refs.form.reset();
    },

    sendTask() {
      const localDateStart = formatDateToLocal(this.dateStart, this.timeStart);
      const localDateEnd = formatDateToLocal(this.dateEnd, this.timeEnd);
      let timed = false;
      if (this.dateStart === this.dateEnd) {
        timed = true;
      }
      if (this.validate()) {
        const task = {
          name: this.nameTask,
          description: this.descriptionTask,
          start: localDateStart,
          end: localDateEnd,
          color: this.colorTask,
          timed: timed,
        };
        console.log(task);
        this.addNewTask(task);
        this.close();
      } else {
        alert("The task has not been registered successfully ");
      }
    },
  },
};
</script>
