<template>
  <v-dialog
    v-model="dialogEditTask"
    transition="dialog-top-transition"
    max-width="800"
    persistent=""
  >
    <v-card tile>
      <v-toolbar flat dark color="black">
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Editing task </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text @click="changeFlag">
            SAVE
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-text-field
            v-model="nameTask"
            :rules="[rules.required, rules.min, rules.max]"
            :counter="30"
            label="Task name"
            required
          ></v-text-field>

          <v-row justify="center">
            <v-col>
              <v-textarea
                v-model="descriptionTask"
                :counter="120"
                :rules="[rules.required, rules.min, rules.maxMsg]"
                label="Task description "
                required
              ></v-textarea>
            </v-col>
            <v-col>
              <label for="">Task color</label>
              <v-color-picker
                dot-size="25"
                :rules="[rules.required]"
                swatches-max-height="200"
                v-model="colorTask"
              ></v-color-picker>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col>
              <label for="">Starting date</label>
              <v-date-picker
                v-model="dateStart"
                year-icon="mdi-calendar-blank"
                flat
                color="accent"
              ></v-date-picker>
            </v-col>

            <v-col>
              <label for="">Ending date</label>
              <v-date-picker
                v-model="dateEnd"
                year-icon="mdi-calendar-blank"
                flat
              ></v-date-picker>
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

export default {
  name: "EditTaskDialog",
  props: ["dialogEditTask", "emitEdit"],
  data() {
    return {
      valid: true,
      nameTask: "",
      descriptionTask: "",
      dateStart: "",
      dateEnd: "",
      colorTask: "",
      rules: {
        required: v => !!v || "Required",
        min: v => (v && v.length >= 5) || "Must be at least 5 characters",
        max: v =>
          (v && v.length <= 30) || "Must not be longer than 30 characters",

        maxMsg: v =>
          (v && v.length <= 120) || "Must not be longer than 120 characters"
        // minHour: (v) => (this.dateStart === dateEnd && )
      }
    };
  },

  // beforeUpdate() {
  //   this.minDate = this.dateSent();
  // },

  methods: {
    ...mapActions(["addNewTask"]),

    // dateSent() {
    //   const date =
    //     this.dateSelected.year +
    //     "-" +
    //     this.toMonthNumber() +
    //     "-" +
    //     this.dateSelected.day;
    //   return date;
    // },

    toMonthNumber() {
      let monthNumber = -1;
      switch (this.dateSelected.month) {
        case "January":
          monthNumber = "01";
          break;
        case "February":
          monthNumber = "02";
          break;
        case "March":
          monthNumber = "03";
          break;
        case "April":
          monthNumber = "04";
          break;
        case "May":
          monthNumber = "05";
          break;
        case "June":
          monthNumber = "06";
          break;
        case "July":
          monthNumber = "07";
          break;
        case "August":
          monthNumber = "08";
          break;
        case "September":
          monthNumber = "09";
          break;
        case "October":
          monthNumber = "10";
          break;
        case "November":
          monthNumber = "10";
          break;
        case "December":
          monthNumber = "12";
          break;
        default:
          monthNumber;
      }
      return monthNumber;
    },

    changeFlag() {
      this.emitEdit(false);
    },

    validate() {
      this.$refs.form.validate();
    },

    reset() {
      this.$refs.form.reset();
    },

    close() {
      this.reset();
      this.changeFlag();
    },

    sendTask() {
      this.validate();
      const task = {
        name: this.nameTask,
        description: this.descriptionTask,
        start: this.minDate,
        end: this.dateEnd,
        color: this.colorTask
      };

      try {
        this.addNewTask(task);
        this.close();
        // alert("The task has been registered successfully")
      } catch (error) {
        alert("The task has not been registered successfully ");
      }

      // console.log(this.valid);
      // console.log("Enviando formulario");
      // console.log(this.valid)
    }
  }
};
</script>
