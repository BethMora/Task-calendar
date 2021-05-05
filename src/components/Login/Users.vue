<template>
  <div class="my-3 mx-3">
    <TitleComponent title="List of all users" />
    <v-card elevation="16" class="mx-auto">
      <v-card-title class="light">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <v-btn color="primary" dark class="ml-4" @click="isUserDialog = true">
          New User
        </v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="allUsers" :search="search">
        <template v-slot:item.imageName="{ item }">
          <v-avatar size="50px" class="py-2">
            <img :src="imageAvatar(item.imageName)" />
          </v-avatar>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editUser(item)" color="accent">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteUser(item)" color="error">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <NewUserDialog :dialogAddUser="dialogAddUser" :emit="emit" />
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
import TitleComponent from "@/components/reusable/TitleComponent";
import NewUserDialog from "@/components/Modals/NewUserDialog";

export default {
  name: "Users",
  components: {
    TitleComponent,
    NewUserDialog,
  },
  data() {
    return {
      isUserDialog: false,
      search: "",
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

      allUsers: [
        {
          _id: { $oid: "60847c71c97814286c05f852" },
          role: "USER",
          password:
            "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
          creationDate: "Sat Apr 24 2021 15:15:45 GMT-0500 (Ecuador Time)",
          modificationDate: "Wed Apr 28 2021 15:43:39 GMT-0500 (Ecuador Time)",
          name: "David  V",
          lastName: "Vaca Mora",
          email: "david@vacam.com",
          userName: "Muñecote",
          imageName: "1619642620041-IMG-20181201-WA0001.jpeg",
          __v: 0,
        },
        {
          _id: { $oid: "60899ad00a0dd9316403d8e4" },
          role: "ADMIN",
          password:
            "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5",
          creationDate: "Wed Apr 28 2021 12:26:39 GMT-0500 (Ecuador Time)",
          modificationDate: "Wed Apr 28 2021 15:47:39 GMT-0500 (Ecuador Time)",
          name: "Maria",
          lastName: "Mora",
          email: "mari@gmail.com",
          userName: "MaryBeth74",
          imageName: "1619642859234-feb.jpg",
          __v: 0,
        },
        {
          _id: { $oid: "6089c3a80a0dd9316403d8e5" },
          role: "ADMIN",
          password:
            "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
          creationDate: "Wed Apr 28 2021 15:20:56 GMT-0500 (Ecuador Time)",
          modificationDate: "2021-04-28T20:24:41.780Z",
          name: "Ramses",
          lastName: "Vaca",
          email: "ramses@vaca.com",
          userName: "Ramses",
          imageName: "1619641256184-cone.jpg",
          __v: 0,
        },
      ],
    };
  },
  computed: {
    // ...mapGetters(["allUsers"])
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

    // ...mapActions(["bringUserAPI"])
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
