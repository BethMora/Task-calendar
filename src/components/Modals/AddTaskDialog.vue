<template>
  <v-dialog
    v-model="dialogAddTask"
    transition="dialog-top-transition"
    max-width="800"
    persistent=""
  >
    <v-card tile>
      <v-toolbar flat dark color="accent">
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="light--text"
          >Adding new task
          <label class="subtitle-1 info--text ml-3">
            Starting date: {{ dateSelected.day }}/{{ dateSelected.month }}/{{
              dateSelected.year
            }}
          </label>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text @click="changeFlag">
            SAVE
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-alert dense color="light" style="width: 100%" class="mt-3">
            Start of task information
          </v-alert>
          <v-row justify="center">
            <v-col xs="1" lg="6">
              <h3>Start date {{ dateStart }}</h3>
              <!-- <input type="time" v-model="timeEnd" label="Time end" required /> -->
              <v-date-picker
                v-model="dateStart"
                year-icon="mdi-calendar-blank"
                flat
                :min="minDate"
                disabled=""
              ></v-date-picker>
            </v-col>

            <v-col style="width: 350px; flex: 0 1 auto;" lg="6">
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
            <v-col xs="1" lg="6">
              <h3>End date</h3>
              <!-- <input type="time" v-model="timeEnd" label="Time end" required /> -->
              <v-date-picker
                v-model="dateEnd"
                year-icon="mdi-calendar-blank"
                flat
                :min="minDate"
              ></v-date-picker>
            </v-col>

            <v-col style="width: 350px; flex: 0 1 auto;" lg="6">
              <h3>End time:</h3>
              <v-time-picker
                v-model="timeEnd"
                required
                :rules="[rules.required]"
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
            <v-col xs="1">
              <v-textarea
                v-model="descriptionTask"
                :counter="120"
                :rules="[rules.required, rules.min, rules.maxMsg]"
                label="Task description "
                required
              ></v-textarea>
            </v-col>
            <v-col xs="1">
              <label for="">Task color</label>
              <v-color-picker
                dot-size="25"
                :rules="[rules.required]"
                swatches-max-height="200"
                v-model="colorTask"
              ></v-color-picker>
            </v-col>
          </v-row>

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
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { formatDateToLocal, toMonthNumber } from "@/libs/dates";
export default {
  name: "AddTaskDialog",
  props: ["dialogAddTask", "emit", "dateSelected"],
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
        // minDate: (v) => {
        //   console.log(v);
        // },
      },
      // startDateSent: "",
      minDate: "",
    };
  },

  beforeUpdate() {
    this.minDate = this.dateSent();
    this.dateStart = this.dateSent();
  },

  methods: {
    ...mapActions(["addNewTask"]),

    dateSent() {
      const date =
        this.dateSelected.year +
        "-" +
        toMonthNumber(this.dateSelected.month) +
        "-" +
        this.dateSelected.day;
      return date;
    },

    changeFlag() {
      this.emit(false);
    },

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

    close() {
      this.reset();
      this.changeFlag();
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

      // try {

      //   // alert("The task has been registered successfully")
      // } catch (error) {
      //   alert("The task has not been registered successfully ");
      // }

      // console.log(this.valid);
      // console.log("Enviando formulario");
      // console.log(this.valid)
    },
  },
};
</script>
