<template>
  <v-main>
    Hola
    <Users />
    <ul v-for="user in allUsers" :key="user.id">
      <li>{{ user.name }}</li>
    </ul>
  </v-main>
</template>

<script>
import Users from "@/components/Login/SignIn.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ListUsers",
  components: {
    Users,
  },
  computed: {
    ...mapGetters(["allUsers"]),
  },

  methods: {
    ...mapActions(["bringUserAPI"]),
  },

  async created() {
    try {
      this.bringUserAPI();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
