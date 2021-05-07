<template>
  <div class="my-3 mx-3">
    <TableList
      titleTable="List of all users"
      titleBtn="New User"
      :headers="headers"
      :items="allUsers"
      :newActionBtn="newActionBtn"
      :edit="editUser"
      :delet="deleteUser"
      :page.sync="page"
      :items-per-page="itemsPerPage"
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
import TableList from "@/components/reusable/TableList";
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
        {
          text: "FIRST NAME",
          // align: "center",
          // filterable: false,
          value: "name",
          // class: "secondary text-uppercase pt-2",
        },
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

      // pageCount: 0,
      // pageNum: 1,
      // itemsPerPageNum: null,
      page: 1,
      itemsPerPage: 5,

      dataEditUser: null,
    };
  },

  beforeMount() {
    // this.usersAPI({ page: 1, sizePage: 10 });
    this.usersAPI({ page: this.pageNum, sizePage: this.itemsPerPageNum });
    // console.log("beforeMount users");
    // console.log(this.allUsers);
  },

  // watch: {
  //   allUsers() {
  //     //   this.usersAPI({ page: this.pageNum, sizePage: this.itemsPerPageNum });
  //     console.log("Cambio el array users");
  //     console.log(this.allUsers);
  //   },
  // },

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

    // page: {
    //   get: function() {
    //     return this.pageNum;
    //   },

    //   set: function(value) {
    //     this.emitPage(value);
    //   },
    // },

    // itemsPerPage: {
    //   get: function() {
    //     return this.itemsPerPageNum;
    //   },

    //   set: function(value) {
    //     this.emitItemsPerPage(value);
    //   },
    // },
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
      const data = {
        _id: item,
        isActive: false,
        modificationDate: new Date(),
      };
      this.editUserAPI(data);
      //   formData.append("modificationDate", new Date());
      //   formData.append("typeEdit", "updatedByAdmin");
      //   formData.append("_id", this.dataEditUser._id);
    },

    restoreUser(item) {
      const data = {
        _id: item,
        isActive: true,
        modificationDate: new Date(),
      };
      this.editUserAPI(data);
    },

    newActionBtn() {
      this.isUserDialog = true;
    },

    // emitPage(value){
    //    this.pageNum = value;
    // },

    // emitItemsPerPage(value){
    //    this.itemsPerPageNum = value;
    // },
  },

  // async created() {
  //   try {
  //     this.bringUserAPI();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
};
</script>
