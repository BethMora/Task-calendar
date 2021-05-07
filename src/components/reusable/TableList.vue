<template>
  <div>
    <TitleComponent :title="titleTable" />
    <v-card elevation="16" class="mx-auto">
      <v-card-title class="light">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <v-btn color="primary" dark class="ml-4" @click="newActionBtn">
          {{ titleBtn }}
        </v-btn>
      </v-card-title>
      <v-data-table
        fixed-header
        height="400px"
        sort-by="creationDate"
        :headers="headers"
        :items="items"
        :search="search"
        :page="page"
        :items-per-page="itemsPerPage"
      >
        <template v-slot:item.imageName="{ item }">
          <v-avatar size="50px" class="py-2">
            <img :src="imageAvatar(item.imageName)" />
          </v-avatar>
        </template>
        <template v-slot:item.actions="{ item }">
           <v-icon small class="mr-2" @click="edit(item)" color="accent">
            mdi-pencil
          </v-icon>
          <v-icon v-if="item.isActive" small @click="delet(item._id)" color="error">
            mdi-delete
          </v-icon>
          <v-icon v-else small @click="restore(item._id)" color="success">
            mdi-backup-restore
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import TitleComponent from "@/components/reusable/TitleComponent";
export default {
  name: "TableList",
  props: [
    "titleTable",
    "titleBtn",
    "headers",
    "items",
    "edit",
    "delet",
    "restore",
    "newActionBtn",
    "page",
    "itemsPerPage",
    // "pageCount",
    // "emitItemsPerPage",
    // "emitPage",
  ],
  components: {
    TitleComponent,
  },
  data() {
    return { search: "" };
  },

  methods: {
    imageAvatar(name) {
      return "http://localhost:3000/public/img/" + name;
    },
  },
};
</script>
