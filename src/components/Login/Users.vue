<template>
  <v-card elevation="16" max-width="400" class="mx-auto">
    <v-virtual-scroll :items="items" height="300" item-height="64">
      <template v-slot:default="{ item }">
        <v-list-item :key="item">
          <v-list-item-action>
            <v-btn fab small depressed color="primary">
              {{ item }}
            </v-btn>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              User Database Record <strong>ID {{ item }}</strong>
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon small>
              mdi-open-in-new
            </v-icon>
          </v-list-item-action>
        </v-list-item>

        <v-divider></v-divider>
      </template>
    </v-virtual-scroll>
    <ul v-for="user in allUsers" :key="user.id">
      <li>{{ user.name }}</li>
    </ul>
  </v-card>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Users",
  computed: {
    ...mapGetters(["allUsers"])
  },

  methods: {
    ...mapActions(["bringUserAPI"])
  },
  async created() {
    try {
      this.bringUserAPI();
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
