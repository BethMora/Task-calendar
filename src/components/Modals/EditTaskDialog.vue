<template>
  <v-dialog
    v-model="dialogEditTask"
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
          >Editing task
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
                  @click="editTask"
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
import { mapActions } from "vuex";
import { formatDateToLocal, getFormatDate, getFormatTime } from "@/libs/dates";
// import { formatDateToLocal, toMonthNumber } from "@/libs/dates";
import FormCreateTask from "@/components/Tasks/Forms/FormCreateTask";

export default {
  name: "EditTaskDialog",
  props: ["dialogEditTask", "emitEdit", "eventEdit"],
  components: {
    FormCreateTask,
  },
  data() {
    return {
      valid: true,
      task: {},
    };
  },

  beforeUpdate() {
    this.task = {
      nameTask: this.eventEdit.name,
      descriptionTask: this.eventEdit.description,
      dateStart: getFormatDate(this.eventEdit.start),
      dateEnd: getFormatDate(this.eventEdit.end),
      timeStart: getFormatTime(this.eventEdit.start),
      timeEnd: getFormatTime(this.eventEdit.end),
      timed: this.eventEdit.timed,
    };
  },

  methods: {
    ...mapActions(["editTaskAPI"]),

    changeFlag() {
      this.emitEdit(false);
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

    editTask() {
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
        this.editTaskAPI(task);
        this.$forceUpdate();
        this.close();
      }
    },
  },
};
</script>
