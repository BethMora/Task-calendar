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

        <template v-slot:item.creationDate="{ item }">
          {{ transformDate(item.creationDate) }} <br />
          {{ transformTime(item.creationDate) }}
        </template>

        <template v-slot:item.modificationDate="{ item }">
          {{ transformDate(item.modificationDate) }} <br />
          {{ transformTime(item.modificationDate) }}
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="edit(item)" color="accent">
            mdi-pencil
          </v-icon>
          <template v-if="convertBoolean(item.isActive)">
            <v-icon small @click.stop="delet(item._id)" color="error">
              mdi-delete
            </v-icon>
          </template>
          <template v-else>
            <v-icon small @click.stop="restore(item._id)" color="success">
              mdi-backup-restore
            </v-icon>
          </template>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { timeEcuador, onlyDate } from "@/libs/dates";
import TitleComponent from "@/components/Reusable/TitleComponent";
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
    convertBoolean(value) {
      if (typeof value === "string") {
        if (value === "true") {
          return true;
        } else {
          return false;
        }
      }
      return value;
    },

    transformDate(date) {
      return onlyDate(date);
    },

    transformTime(date) {
      return timeEcuador(date);
    },
  },
};
</script>
