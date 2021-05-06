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
    />

    <NewUserDialog :dialogAddUser="dialogAddUser" :emit="emit" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TableList from "@/components/reusable/TableList";
import NewUserDialog from "@/components/Modals/NewUserDialog";

export default {
  name: "Users",
  components: {
    TableList,
    NewUserDialog,
  },
  data() {
    return {
      isUserDialog: false,
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
        { text: "AVATAR", sortable: false, value: "imageName" },
        { text: "CREATION DATE", value: "creationDate" },
        { text: "MODIFICATION DATE", value: "modificationDate" },
        { text: "ACTIONS", sortable: false, value: "actions" },
      ],

      // allUsers: [
      //   {
      //     _id: { $oid: "60847c71c97814286c05f852" },
      //     role: "USER",
      //     password:
      //       "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
      //     creationDate: "Sat Apr 24 2021 15:15:45 GMT-0500 (Ecuador Time)",
      //     modificationDate: "Wed Apr 28 2021 15:43:39 GMT-0500 (Ecuador Time)",
      //     name: "David  V",
      //     lastName: "Vaca Mora",
      //     email: "david@vacam.com",
      //     userName: "Muñecote",
      //     imageName: "1619642620041-IMG-20181201-WA0001.jpeg",
      //     __v: 0,
      //   },
      //   {
      //     _id: { $oid: "60899ad00a0dd9316403d8e4" },
      //     role: "ADMIN",
      //     password:
      //       "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5",
      //     creationDate: "Wed Apr 28 2021 12:26:39 GMT-0500 (Ecuador Time)",
      //     modificationDate: "Wed Apr 28 2021 15:47:39 GMT-0500 (Ecuador Time)",
      //     name: "Maria",
      //     lastName: "Mora",
      //     email: "mari@gmail.com",
      //     userName: "MaryBeth74",
      //     imageName: "1619642859234-feb.jpg",
      //     __v: 0,
      //   },
      //   {
      //     _id: { $oid: "6089c3a80a0dd9316403d8e5" },
      //     role: "ADMIN",
      //     password:
      //       "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
      //     creationDate: "Wed Apr 28 2021 15:20:56 GMT-0500 (Ecuador Time)",
      //     modificationDate: "2021-04-28T20:24:41.780Z",
      //     name: "Ramses",
      //     lastName: "Vaca",
      //     email: "ramses@vaca.com",
      //     userName: "Ramses",
      //     imageName: "1619641256184-cone.jpg",
      //     __v: 0,
      //   },
      // ],
    };
  },

  beforeMount(){
    console.log("Before mount")
    console.log(this.usersAPI({page: 1, sizePage: 5}))
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
  },

  methods: {
    emit(value) {
      this.isUserDialog = value;
    },

    imageAvatar(name) {
      return "http://localhost:3000/public/img/" + name;
    },

    editUser(item) {
      console.log("editando user");
      console.log(item);
    },

    deleteUser(item) {
      console.log("DELETE user");
      console.log(item);
    },

    newActionBtn() {
      this.isUserDialog = true;
    },

    ...mapActions(["usersAPI"])
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
