<template>
  <v-main>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
      <FormCreateTask :task="task" :valid="valid" :sendTask="sendTask" />
    </v-form>
  </v-main>
</template>

<script>
import { mapActions } from "vuex";
import { formatDateToLocal } from "@/libs/dates";
import FormCreateTask from "@/components/Tasks/FormCreateTask";

export default {
  name: "CreateTask",
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
    };
  },

  methods: {
    ...mapActions(["addNewTask"]),

    // cathData(){

    // },

    validate() {
      return this.$refs.form.validate();
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
  },
};
</script>
