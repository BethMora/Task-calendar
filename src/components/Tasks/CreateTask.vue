<template>
  <v-container
    :style="
      this.$route.path === '/createTask'
        ? 'margin-top: 50px'
        : ' margin-top: 0px'
    "
  >
    <v-card fill-height fluid class="text-center justify-center">
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
        <FormCreateTask :task="task" :dateStartSent="dateStartSent" />

        <v-row justify="center" class="mb-4">
          <BtnToolTipComponent
            title="Submit"
            :valid="valid"
            :action="sendTask"
            :block="btnBlock"
            color="success"
          />

          <BtnToolTipComponent
            title="CLEAN UP"
            :valid="true"
            :action="reset"
            :block="btnBlock"
            color="secondary"
            tip="Click to clear all fields"
          />
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import BtnToolTipComponent from "@/components/reusable/BtnToolTipComponent";
import FormCreateTask from "@/components/Tasks/Forms/FormCreateTask";
import { mapGetters, mapActions } from "vuex";
import { formatDateToLocal } from "@/libs/dates";

export default {
  name: "CreateTask",
  props: ["dateStartSent","emit"],
  components: {
    FormCreateTask,
    BtnToolTipComponent,
  },
  data() {
    return {
      btnBlock: false,
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
      // this.task.colorTask = "";
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
        // this.reset();
        this.emit(false);
        if( this.$route.path === '/createTask'){
          this.$router.push("/dashboard/:id");

        }else{
          this.$forceUpdate();

        }
        // this.addNewTask(task);
        this.reset();
      }
    },
  },
};
</script>
