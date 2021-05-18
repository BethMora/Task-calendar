<template>
  <div class="my-3 mx-3">
    <TableList
      titleTable="List of all users"
      titleBtn="New User"
      :headers="headers"
      :items="allUsers"
      :newActionBtn="newActionBtn"
      :edit="editUser"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :delet="deleteUser"
      :restore="restoreUser"
    />

    <NewUserDialog :dialogAddUser="dialogAddUser" :emit="emit" />
    <EditUserDialog
      :dialogEditUser="dialogEditUser"
      :emitEdit="emitEdit"
      :dataEditUser="dataEditUser"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TableList from "@/components/Reusable/TableList";
import NewUserDialog from "@/components/Modals/NewUserDialog";
import EditUserDialog from "@/components/Modals/EditUserDialog";

export default {
  name: "Users",
  components: {
    TableList,
    NewUserDialog,
    EditUserDialog,
  },
  data() {
    return {
      isUserDialog: false,
      isEditDialog: false,
      headers: [
        { text: "FIRST NAME", value: "name" },
        { text: "LAST NAME", value: "lastName" },
        { text: "USER NAME", value: "userName" },
        { text: "EMAIL", value: "email" },
        { text: "ROL", value: "role" },
        { text: "ACTIVO", value: "isActive" },
        { text: "AVATAR", sortable: false, value: "imageName" },
        { text: "CREATION DATE", value: "creationDate" },
        { text: "MODIFICATION DATE", value: "modificationDate" },
        { text: "ACTIONS", sortable: false, value: "actions" },
      ],

      page: 1,
      itemsPerPage: 5,
      dataEditUser: null,
    };
  },

  beforeMount() {
    this.usersAPI({ page: this.pageNum, sizePage: this.itemsPerPageNum });
  },

  computed: {
    ...mapGetters(["allUsers"]),
    dialogAddUser: {
      get: function() {
        return this.isUserDialog;
      },

      set: function(value) {
        this.emit(value);
      },
    },
    dialogEditUser: {
      get: function() {
        return this.isEditDialog;
      },

      set: function(value) {
        this.emitEdit(value);
      },
    },
  },

  methods: {
    ...mapActions(["usersAPI", "editUserAPI"]),
    emit(value) {
      this.isUserDialog = value;
    },
    emitEdit(value) {
      this.isEditDialog = value;
    },

    imageAvatar(name) {
      return "http://localhost:3000/public/img/" + name;
    },

    editUser(item) {
      this.dataEditUser = item;
      this.isEditDialog = true;
    },

    deleteUser(item) {
      const dataDelete = {
        _id: item,
        isActive: false,
        modificationDate: new Date(),
      };

      this.$confirm({
        title: "CHANGE USER STATUS",
        message: `Are you sure to unsubscribe the user? ${item}`,
        button: {
          yes: "Yes",
          no: "Cancel",
        },
        callback: (confirm) => {
          if (confirm == true) {
            this.editUserAPI(dataDelete);
          }
        },
      });
    },

    restoreUser(item) {
      const dataDelete = {
        _id: item,
        isActive: true,
        modificationDate: new Date(),
      };
      this.$confirm({
        title: "CHANGE USER STATUS",
        message: `Are you sure to activate the user? ${item}`,
        button: {
          yes: "Yes",
          no: "Cancel",
        },
        callback: (confirm) => {
          if (confirm == true) {
            this.editUserAPI(dataDelete);
          }
        },
      });
    },

    newActionBtn() {
      this.isUserDialog = true;
    },
  },
};
</script>
