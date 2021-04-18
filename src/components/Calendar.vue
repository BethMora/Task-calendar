<template>
  <v-main>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
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
        <v-sheet height="600" @click="createTask">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="tasks"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon>
                  <v-icon @click="editTask(selectedEvent)"
                    >mdi-pencil</v-icon
                  >
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="deleteTask(selectedEvent.id)">
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
                <v-btn
                  text
                  color="accent"
                  @click="deleteTask(selectedEvent.id)"
                >
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>

    <AddTaskDialog
      :dialogAddTask="dialogAddTask"
      :emit="emit"
      :dateSelected="dateSelected"
    />
    <EditTaskDialog :dialogEditTask="dialogEditTask" :emitEdit="emitEdit" :eventEdit="eventEdit" />

    <ConfirmAction
      @confirmOff="confirmOff"
      :isConfirmation="isConfirmation"
      :changeFlagConfirmation="changeFlagConfirmation"
    />
  </v-main>
</template>

<script>
import AddTaskDialog from "@/components/Modals/AddTaskDialog";
import EditTaskDialog from "@/components/Modals/EditTaskDialog";
import ConfirmAction from "@/components/Modals/ConfirmAction";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Calendar",
  components: {
    AddTaskDialog,
    EditTaskDialog,
    ConfirmAction,
  },

  data: () => ({
    flagConfirmAction: false,
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days"
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    eventEdit:{},
    // events: [],
    // colors: [
    //   "blue",
    //   "indigo",
    //   "deep-purple",
    //   "cyan",
    //   "green",
    //   "orange",
    //   "grey darken-1",
    // ],
    // names: [
    //   "Meeting",
    //   "Holiday",
    //   "PTO",
    //   "Travel",
    //   "Event",
    //   "Birthday",
    //   "Conference",
    //   "Party",
    // ],

    isTaskDialog: false, //flag open modal windows
    isEditTaskDialog: false, //flag open modal windows
    dateSelected: {} //obj contains the task start date

    // hidden: false,

    // focus: "",
    // type: "month",
    // typeToLabel: {
    //   month: "Month",
    //   week: "Week",
    //   day: "Day",
    //   "4day": "4 Days",
    // },
    // selectedEvent: {},
    // selectedElement: null,
    // selectedOpen: false,

    // colors: [
    //   "blue",
    //   "indigo",
    //   "deep-purple",
    //   "cyan",
    //   "green",
    //   "orange",
    //   "grey darken-1",
    // ],
    // names: [
    //   "Meeting",
    //   "Holiday",
    //   "PTO",
    //   "Travel",
    //   "Event",
    //   "Birthday",
    //   "Conference",
    //   "Party",
    // ],

    // events: [],
    // name: "",
    // details: "",
    // color: "",
    // currentlyEditing: null,
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },

  computed: {
    ...mapGetters(["tasks"]),
    isConfirmation: {
      get: function() {
        return this.flagConfirmAction;
      },

      set: function(value) {
        this.changeFlagConfirmation(value);
      },
    },

    dialogAddTask: {
      get: function() {
        return this.isTaskDialog;
      },

      set: function(value) {
        this.emit(value);
      }
    },

    dialogEditTask: {
      get: function() {
        return this.isEditTaskDialog;
      },

      set: function(value) {
        this.emitEdit(value);
      }
    }
  },

  methods: {
    ...mapActions(["DeleteTask", "editTaskAPI"]),
    

    changeFlagConfirmation(value) {
      this.flagConfirmAction = value;
    },

    emit(value) {
      this.isTaskDialog = value;
    },

    emitEdit(value) {
      this.isEditTaskDialog = value;
    },

    createTask(event) {
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
          year: year
        };

        this.isTaskDialog = true;
      }
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
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
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
    updateRange({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        console.log(first);
        console.log(second);
        console.log(allDay);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay
        });
      }
      // console.log(events)
      // console.log(typeof(events))
      // console.log(this.events)
      // console.log(typeof(this.events))
      // console.log(this.tasks)
      // console.log(typeof(this.tasks))
      // this.events = events //muestra los eventos
      console.log("El listado de eventios generados es \n ");
      console.log(events);
      this.events = this.tasks; //muestra los eventos
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    // updateRange() {
    //   // console.log("Nuevi evento")
    //   if (this.tasks.length > 0) {
    //     this.events = this.tasks;
    //     console.log(this.events);
    //   }
    // },
    // updateRange({ start, end }) {
    //   const events = [];

    //   const min = new Date(`${start.date}T00:00:00`);
    //   const max = new Date(`${end.date}T23:59:59`);
    //   const days = (max.getTime() - min.getTime()) / 86400000;
    //   const eventCount = this.rnd(days, days + 20);

    //   for (let i = 0; i < eventCount; i++) {
    //     const allDay = this.rnd(0, 3) === 0;
    //     const firstTimestamp = this.rnd(min.getTime(), max.getTime());
    //     const first = new Date(firstTimestamp - (firstTimestamp % 900000));
    //     const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
    //     const second = new Date(first.getTime() + secondTimestamp);

    //     events.push({
    //       name: this.names[this.rnd(0, this.names.length - 1)],
    //       start: first,
    //       end: second,
    //       color: this.colors[this.rnd(0, this.colors.length - 1)],
    //       timed: !allDay,
    //     });
    //   }
    //   if (this.tasks.length > 0) {
    //     this.events = this.tasks;
    //   }
    // },

    // rnd(a, b) {
    //   return Math.floor((b - a + 1) * Math.random()) + a;
    // },

    updateEvents() {
      return (this.events = this.tasks);
    },

    deleteTask(id) {
      this.selectedOpen = false
      console.log("Vamos a eliminar la tarea de id "+id)
      this.flagConfirmAction = true
      // console.log("DELET task de id " + id);
      // var txt;
      // if (confirm("Press OK if you want to delete task")) {
      //   txt = "You pressed OK!";
      // } else {
      //   txt = "You pressed Cancel!";
      //   this.selectedOpen = false;
      // }
      // console.log(txt);
    },

    confirmOff(value) {
      if (value) {
        console.log("SE ELIMINO el evento")
      }
    },

    editTask(task) {
      this.eventEdit=task;
      this.isEditTaskDialog = true;
      this.editTaskAPI(task);
    }
  },

  watch: {
    // tasks() {
    //   // console.log("Eventos tenemos")
    //   // console.log(this.events)
    //   // console.log(typeof(this.events))
    //   // console.log("TASKS tenemos")
    //   // console.log(this.tasks)
    //   // console.log(typeof(this.tasks))
    //   this.events = this.tasks;
    //   // this.selectedEvent  = this.tasks
    //   // console.log(this.events);
    //   // this.updateRange();
    // },
    events() {
      console.log("Soy TASKS");
      this.events = this.tasks;
      // this.selectedEvent  = this.tasks
      // this.showEvent();
      console.log(this.events);
    }
  }
};
</script>
