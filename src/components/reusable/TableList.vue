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
      <v-data-table :headers="headers" :items="items" :search="search">
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="edit(item)" color="accent">
            mdi-pencil
          </v-icon>
          <v-icon small @click="delet(item._id.$oid)" color="error">
            mdi-delete
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
  props: ["titleTable", "titleBtn", "headers", "items", "edit", "delet", 'newActionBtn'],
  components: {
    TitleComponent,
  },
  data() {
    return { search: "" };
  },
};
</script>
