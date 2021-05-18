<template>
  <!-- list tasks de un usuario -->
  <div class="my-3 mx-3">
    <TableList
      titleTable="List of all tasks"
      titleBtn="New Task"
      :headers="headers"
      :items="tasksUserId"
      :newActionBtn="newActionBtn"
      :edit="editTask"
      :delet="deleteTask"
      :page.sync="page"
      :items-per-page="itemsPerPage"
    />

    <AddTaskDialog :dialogAddTask="dialogAddTask" :emit="emit" />
    <EditTaskDialog :dialogEditTask="dialogEditTask" :emitEdit="emitEdit" />
  </div>
</template>

<script>
import TableList from "@/components/Reusable/TableList";
import AddTaskDialog from "@/components/Modals/AddTaskDialog";
import EditTaskDialog from "@/components/Modals/EditTaskDialog";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ListTasks",
  components: {
    TableList,
    AddTaskDialog,
    EditTaskDialog,
  },
  data() {
    return {
      isTaskDialog: false, //flag open modal windows
      isEditTaskDialog: false, //flag open modal windows

      headers: [
        { text: "NAME", value: "name" },
        { text: "DESCRIPTION", value: "description" },
        { text: "START", value: "start" },
        { text: "END", value: "end" },
        { text: "COLOR", value: "color" },
        { text: "CREATION DATE", value: "creationDate" },
        { text: "ACTIONS", sortable: false, value: "actions" },
      ],

      page: 1,
      itemsPerPage: 5,
    };
  },

  beforeMount() {
    this.getPaginatedEvents({
      page: this.pageNum,
      sizePage: this.itemsPerPageNum,
    });
  },

  computed: {
    ...mapGetters(["tasksUserId"]),
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
    ...mapActions(["getPaginatedEvents", "deleteTaskAPI"]),
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

    newActionBtn() {
      this.isTaskDialog = true;
    },

    editTask(item) {
      console.log("editando TASK");
      console.log(item);
    },

    deleteTask(id) {
      console.log("DELETE task");
      console.log(id);
      this.deleteTaskAPI(id);
    },
  },
};
</script>
