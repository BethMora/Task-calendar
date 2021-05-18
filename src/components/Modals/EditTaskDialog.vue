<template>
  <v-dialog
    v-model="dialogEditTask"
    transition="dialog-top-transition"
    width="700"
    persistent=""
  >
    <v-card tile>
      <v-toolbar flat dark color="accent">
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title dark>Editing task </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text @click="close">
            SAVE
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container>
        <v-card fill-height fluid class="text-center justify-center">
          <div>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="editTask"
            >
              <FormCreateTask :task="task" />

              <v-row justify="center" class="mb-4">
                <BtnToolTipComponent
                  title="Submit"
                  :valid="valid"
                  :action="editTask"
                  :block="btnBlock"
                  color="success"
                />
              </v-row>
            </v-form>
          </div>
        </v-card>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { formatDateToLocal, getFormatDate, getFormatTime } from "@/libs/dates";
import BtnToolTipComponent from "@/components/Reusable/BtnToolTipComponent";
import FormCreateTask from "@/components/Tasks/Forms/FormCreateTask";

export default {
  name: "EditTaskDialog",
  props: ["dialogEditTask", "emitEdit", "eventEdit"],
  components: {
    BtnToolTipComponent,
    FormCreateTask,
  },
  data() {
    return {
      btnBlock: true,
      valid: true,

      task: {},
    };
  },

  watch: {
    eventEdit() {
      this.task = {
        nameTask: this.eventEdit.name,
        descriptionTask: this.eventEdit.description,
        dateStart: getFormatDate(this.eventEdit.start),
        dateEnd: getFormatDate(this.eventEdit.end),
        timeStart: getFormatTime(this.eventEdit.start),
        timeEnd: getFormatTime(this.eventEdit.end),
        timed: this.eventEdit.done,
        colorTask: this.eventEdit.color,
      };
    },
  },

  methods: {
    ...mapActions(["editTaskAPI"]),

    close() {
      this.emitEdit(false);
    },

    editTask() {
      if (this.$refs.form.validate()) {
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

        const task = {
          _id: this.eventEdit._id,
          name: this.task.nameTask,
          description: this.task.descriptionTask,
          start: localDateStart,
          end: localDateEnd,
          color: this.task.colorTask,
          done: timed,
          idUser: this.eventEdit.idUser,
        };
        this.editTaskAPI(task);
        this.close();
      }
    },
  },
};
</script>
