<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="44">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="550" @click="createTask">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="accent"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="createTask"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-5" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn icon>
                <v-icon @click="editTask(selectedEvent)">mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="deleteTask(selectedEvent._id)">
                <v-icon>mdi-delete-alert-outline</v-icon>
              </v-btn>
              <v-btn icon @click="selectedOpen = false">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.description"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text @click="selectedOpen = false">
                Cancel
              </v-btn>
              <v-btn text color="accent" @click="editTask(selectedEvent)">
                Edit
              </v-btn>
              <v-btn text color="accent" @click="deleteTask(selectedEvent._id)">
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
      <AddTaskDialog
        :dialogAddTask="dialogAddTask"
        :emit="emit"
        :dateSelected="dateSelected"
        :colorRamdon="colorRamdon"
      />
      <EditTaskDialog
        :dialogEditTask="dialogEditTask"
        :emitEdit="emitEdit"
        :eventEdit="selectedEvent"
      />
    </v-col>
  </v-row>
</template>

<script>
import AddTaskDialog from "@/components/Modals/AddTaskDialog";
import EditTaskDialog from "@/components/Modals/EditTaskDialog";
import { mapGetters, mapActions } from "vuex";
import { numberToStringMonth, getFormatDate } from "@/libs/dates";
let date = new Date();
let month = date.getMonth();
export default {
  name: "Calendar",
  components: {
    AddTaskDialog,
    EditTaskDialog,
  },

  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,

    isTaskDialog: false, //flag open modal windows
    isEditTaskDialog: false, //flag open modal windows
    dateSelected: {}, //obj contains the task start date
    colorRamdon: "",
  }),
  async mounted() {
    this.$refs.calendar.checkChange();
    const time = this.dateStartEndForQueryApi(month);
    await this.tasksAPI(time);
  },

  computed: {
    ...mapGetters({ events: "tasksUserId" }),

    dialogAddTask: {
      get: function() {
        return this.isTaskDialog;
      },

      set: function(value) {
        this.emit(value);
      },
    },

    dialogEditTask: {
      get: function() {
        return this.isEditTaskDialog;
      },

      set: function(value) {
        this.emitEdit(value);
      },
    },
  },

  methods: {
    ...mapActions(["deleteTaskAPI", "editTaskAPI", "tasksAPI"]),
    dateStartEndForQueryApi(monthValue) {
      const firstDays = new Date(date.getFullYear(), monthValue, 1);
      const lastDays = new Date(date.getFullYear(), monthValue + 1, 0);
      const startEnd = {
        start: getFormatDate(firstDays),
        end: getFormatDate(lastDays),
      };
      return startEnd;
    },
    // ***********************
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },

    setToday() {
      this.focus = "";
    },
    async prev() {
      this.$refs.calendar.prev();
      month -= 1;
      const time = this.dateStartEndForQueryApi(month);
      await this.tasksAPI(time);
    },
    async next() {
      this.$refs.calendar.next();
      month += 1;
      const time = this.dateStartEndForQueryApi(month);
      await this.tasksAPI(time);
    },

    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },

    //Metodo para cambiar el estado que maneja la ventana modal Crear Tarea
    emit(value) {
      this.isTaskDialog = value;
    },

    //Metodo para cambiar el estado que maneja la ventana modal Editar Tarea
    emitEdit(value) {
      this.isEditTaskDialog = value;
    },

    createTask(event) {
      try {
        const selectedTag = event.target.className;
        if (selectedTag.match("outside")) {
          alert("The selected day does not correspond to the current month");
        }

        if (this.type === "month" && !selectedTag.match("outside")) {
          let day = event.path[0].firstChild.children[0].outerText;
          if (day.length > 2) {
            day = day.split(" ")[1];
          }
          if (day.length < 2) {
            day = "0" + day;
          }

          const monthYear = this.$refs.calendar.title;
          const month = monthYear.split(" ")[0];
          const year = monthYear.split(" ")[1];
          this.dateSelected = {
            day: day,
            month: month,
            year: year,
          };
        }
      } catch (error) {
        this.dateSelected = {
          day: event.day,
          month: numberToStringMonth(event.month),
          year: event.year,
        };
      }
      this.colorRamdon = this.generateColor();
      this.isTaskDialog = true;
    },

    editTask() {
      this.isEditTaskDialog = true;
    },

    deleteTask() {
      this.selectedOpen = false;
      this.showConfirm();
    },

    showConfirm() {
      this.$confirm({
        title: "DELETE TASK",
        message: `Are you sure to delete the task ? ${this.selectedEvent.name}`,
        button: {
          yes: "Yes",
          no: "Cancel",
        },
        callback: (confirm) => {
          if (confirm == true) {
            this.deleteTaskAPI(this.selectedEvent._id);
          }
        },
      });
    },

    generateColor() {
      let symbols, color;
      symbols = "0123456789ABCDEF";
      color = "#";

      for (var i = 0; i < 6; i++) {
        color = color + symbols[Math.floor(Math.random() * 16)];
      }
      console.log(color);
      return color;
    },
  },
};
</script>
