<template>
  <!-- list tasks de un usuario -->
  <div>
    <TitleComponent title="List of all tasks" />

    <v-card elevation="16" class="mx-auto">
      <v-card-title class="light">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <v-btn color="primary" dark class="ml-4" @click="isTaskDialog = true">
          New Task
        </v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="allTasks" :search="search">
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editTask(item)" color="accent">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteTask(item)" color="error">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <AddTaskDialog
      :dialogAddTask="dialogAddTask"
      :emit="emit"
    />
    <EditTaskDialog
      :dialogEditTask="dialogEditTask"
      :emitEdit="emitEdit"
    />
  </div>
</template>

<script>
import TitleComponent from "@/components/reusable/TitleComponent";
import AddTaskDialog from "@/components/Modals/AddTaskDialog";
import EditTaskDialog from "@/components/Modals/EditTaskDialog";
export default {
  name: "ListTasks",
  components: {
    TitleComponent,
    AddTaskDialog,
    EditTaskDialog,
  },
  data() {
    return {
      isTaskDialog: false, //flag open modal windows
      isEditTaskDialog: false, //flag open modal windows
      search: "",
      headers: [
        { text: "NAME", value: "name" },
        { text: "DESCRIPTION", value: "description" },
        { text: "START", value: "start" },
        { text: "END", value: "end" },
        { text: "COLOR", value: "color" },
        { text: "CREATION DATE", value: "creationDate" },
        { text: "ACTIONS", sortable: false, value: "actions" },
      ],

      allTasks: [
        {
          _id: { $oid: "608af6dc51ae7458d8429f93" },
          isVisible: false,
          done: false,
          idUser: "60899ad00a0dd9316403d8e4",
          name: "13 al 30",
          description: "mari@gmail.com\n#702269FF",
          start: { $date: "2021-04-13T18:00:00.000Z" },
          color: "#702269FF",
          end: { $date: "2021-04-30T18:30:00.000Z" },
          creationDate: { $date: "2021-04-29T18:11:40.794Z" },
          __v: 0,
        },
        {
          _id: { $oid: "608b369651ae7458d8429faa" },
          isVisible: false,
          done: false,
          idUser: "60847c71c97814286c05f852",
          name: "dasdasdsa",
          description: "sadasdsada",
          start: { $date: "2021-04-06T06:50:00.000Z" },
          color: "#00E3FFFF",
          end: { $date: "2021-04-23T07:17:00.000Z" },
          creationDate: { $date: "2021-04-29T22:43:34.915Z" },
          __v: 0,
        },
        {
          _id: { $oid: "60909073a506c45fd8c45bc9" },
          isVisible: false,
          done: false,
          idUser: "6089c3a80a0dd9316403d8e5",
          name: "5 al 20",
          description: "#51C165FF",
          start: { $date: "2021-05-05T10:25:00.000Z" },
          color: "#51C165FF",
          end: { $date: "2021-05-21T01:00:00.000Z" },
          creationDate: { $date: "2021-05-04T00:08:19.753Z" },
          __v: 0,
        },
      ],
    };
  },

  computed: {
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
    //Metodo para cambiar el estado que maneja la ventana modal Crear Tarea
    emit(value) {
      this.isTaskDialog = value;
    },

    //Metodo para cambiar el estado que maneja la ventana modal Editar Tarea
    emitEdit(value) {
      this.isEditTaskDialog = value;
    },


    imageAvatar(name) {
      return "http://localhost:3000/public/img/" + name;
    },

    editTask(item) {
      console.log("editando user");
      console.log(item);
    },

    deleteTask(item) {
      console.log("DELETE user");
      console.log(item);
    },

    // ...mapActions(["bringUserAPI"])
  },
};
</script>
