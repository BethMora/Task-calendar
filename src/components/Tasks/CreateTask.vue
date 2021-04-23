<template>
  <v-main>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
      <FormCreateTask :task="task" />

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
    </v-form>
  </v-main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { formatDateToLocal } from "@/libs/dates";
import FormCreateTask from "@/components/Tasks/Forms/FormCreateTask";

export default {
  name: "CreateTask",
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
    };
  },

  computed: {
    ...mapGetters(["userLoggedOk"]),
  },

  methods: {
    ...mapActions(["addNewTask"]),
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

    sendTask() {
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
      if (this.$refs.form.validate()) {
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
        this.$router.push("/calendar");
      }
    },
  },
};
</script>
