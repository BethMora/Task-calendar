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
          <FormCreateTask :task="task" :valid="valid" :sendTaskDial="sendTaskDial" 
          :dialogAddTask="dialogAddTask" :emit="emit" :dateSelected="dateSelected"/>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { formatDateToLocal, toMonthNumber } from "@/libs/dates";
import FormCreateTask from "@/components/Tasks/FormCreateTask";

export default {
  name: "AddTaskDialog",
  props: ["dialogAddTask", "emit", "dateSelected","task", "valid", "sendTask"],
  components: {
    FormCreateTask,
  },
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
      // startDateSent: "",
      minDate: "",
    };
  },

  beforeUpdate() {
    this.minDate = this.dateSent();
    this.task.dateStart = this.dateSent();
    console.log(this.minDate);
    console.log(this.task.dateStart);
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
          times: {
            dateStart: this.task.dateStart,
            timeStart: this.task.timeStart,
            dateEnd: this.task.dateEnd,
            timeEnd: this.task.timeEnd,
          },
        };
        this.addNewTask(task);
        this.$router.push("/calendar");
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
