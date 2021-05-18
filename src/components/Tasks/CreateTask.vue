<template>
  <v-container
    :style="
      this.$route.path === '/createTask'
        ? 'margin-top: 10px'
        : 'margin-top: 0px'
    "
  >
    <v-row align="center" justify="center">
      <v-card
        fill-height
        fluid
        class="text-center justify-center"
        width="600px"
      >
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="sendTask"
        >
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
    </v-row>
  </v-container>
</template>

<script>
import BtnToolTipComponent from "@/components/Reusable/BtnToolTipComponent";
import FormCreateTask from "@/components/Tasks/Forms/FormCreateTask";
import { mapActions } from "vuex";
import { formatDateToLocal } from "@/libs/dates";

export default {
  name: "CreateTask",
  props: ["dateStartSent", "emit", "colorRamdon"],
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
        colorTask: this.colorRamdon,
      },
    };
  },
  beforeMount() {
    if(!this.colorRamdon){
      this.task.colorTask = this.generateColor();
    }
  },
  watch: {
    colorRamdon() {
      this.task.colorTask = this.colorRamdon;
    },
  },
  methods: {
    ...mapActions(["addNewTask"]),
     generateColor() {
      var simbolos, color;
      simbolos = "0123456789ABCDEF";
      color = "#";

      for (var i = 0; i < 6; i++) {
        color = color + simbolos[Math.floor(Math.random() * 16)];
      }
      console.log(color);
      return color;
    },

    reset() {
      // this.task.dateStart = "";
      // this.task.timeStart = "";
      // this.task.dateEnd = "";
      // this.task.timeEnd = "";
      // this.task.nameTask = "";
      // this.task.descriptionTask = "";
      // this.task.colorTask = "";
      return this.$refs.form.reset();
    },

    sendTask() {
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
          name: this.task.nameTask,
          description: this.task.descriptionTask,
          start: localDateStart,
          end: localDateEnd,
          color: this.task.colorTask,
          timed: timed,
          // idUser: this.userLoggedOk._id,
          // times: {
          //   dateStart: this.task.dateStart,
          //   timeStart: this.task.timeStart,
          //   dateEnd: this.task.dateEnd,
          //   timeEnd: this.task.timeEnd,
          // },
        };
        this.addNewTask(task);
        if (this.emit) {
          this.emit(false);
        }
        if (this.$route.path === "/createTask") {
          this.$router.push("/dashboard/:id");
        }
        this.reset();
      }
    },
  },
};
</script>
