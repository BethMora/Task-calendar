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
          <FormCreateTask :task="task" />

          <v-row justify="center" class="mb-4">
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mr-4 success black--text"
                  type="submit"
                  :disabled="!valid"
                  @click="sendTaskDial"
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
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { formatDateToLocal, toMonthNumber } from "@/libs/dates";
import FormCreateTask from "@/components/Tasks/Forms/FormCreateTask";

export default {
  name: "AddTaskDialog",
  // props: ["dialogAddTask", "emit", "dateSelected", "task", "valid", "sendTask"],
  props: ["dialogAddTask", "emit", "dateSelected"],
  components: {
    FormCreateTask,
  },
  data() {
    return {
      valid: true,
      task: {
        dateStart: "",
        timeStart: "",
        dateEnd: "",
        timeEnd: "",
        nameTask: "",
        descriptionTask: "",
        colorTask: "",
      },
      // startDateSent: "",
      // minDate: "",
    };
  },

  beforeUpdate() {
    // this.minDate = this.dateSent();
    this.task.dateStart = this.dateSent();
  },

  computed: {
    ...mapGetters(["userLoggedOk"]),
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
      this.task.dateStart = "";
      this.task.timeStart = "";
      this.task.dateEnd = "";
      this.task.timeEnd = "";
      this.task.nameTask = "";
      this.task.descriptionTask = "";
      this.task.colorTask = "";
      return this.$refs.form.reset();
    },

    close() {
      this.reset();
      this.changeFlag();
    },

    sendTaskDial() {
      const localDateStart = formatDateToLocal(
        this.task.dateStart,
        this.task.timeStart
      );
      const localDateEnd = formatDateToLocal(
        this.task.dateEnd,
        this.task.timeEnd
      );
      let timed = false;
      if (this.task.dateStart === this.task.dateEnd) {
        timed = true;
      }
      if (this.validate()) {
        const task = {
          name: this.task.nameTask,
          description: this.task.descriptionTask,
          start: localDateStart,
          end: localDateEnd,
          color: this.task.colorTask,
          timed: timed,
          // idUser: this.userLoggedOk._id,
          times: {
            dateStart: this.task.dateStart,
            timeStart: this.task.timeStart,
            dateEnd: this.task.dateEnd,
            timeEnd: this.task.timeEnd,
          },
        };
        this.addNewTask(task);
        this.$forceUpdate();
        this.close();
      }
    },

    // sendTask() {
    //   const localDateStart = formatDateToLocal(this.dateStart, this.timeStart);
    //   const localDateEnd = formatDateToLocal(this.dateEnd, this.timeEnd);
    //   let timed = false;
    //   if (this.dateStart === this.dateEnd) {
    //     timed = true;
    //   }
    //   if (this.validate()) {
    //     const task = {
    //       name: this.nameTask,
    //       description: this.descriptionTask,
    //       start: localDateStart,
    //       end: localDateEnd,
    //       color: this.colorTask,
    //       timed: timed,
    //     };
    //     console.log(task);
    //     this.addNewTask(task);
    //     this.close();
    //   } else {
    //     alert("The task has not been registered successfully ");
    //   }
    // },
  },
};
</script>
