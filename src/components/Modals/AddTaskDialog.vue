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
        <v-toolbar-title dark
          >Adding new task
          <label class="subtitle-1 info--text ml-3" v-if="dateSelected">
            Starting date: {{ dateSelected.day }}/{{ dateSelected.month }}/{{
              dateSelected.year
            }}
          </label>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text @click="close">
            SAVE
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <CreateTask :dateStartSent="dateStartSent" :emit="emit" />
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { toMonthNumber } from "@/libs/dates";
import CreateTask from "@/components/Tasks/CreateTask";

export default {
  name: "AddTaskDialog",
  props: ["dialogAddTask", "emit", "dateSelected"],
  components: {
    CreateTask,
  },
  data() {
    return {
      dateStartSent: "",
    };
  },

  watch: {
    dateSelected() {
      this.dateStartSent = this.dateSent();
    },
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

    close() {
      this.emit(false);
      // this.$forceUpdate();
      // this.reset();
    },
  },
};
</script>
