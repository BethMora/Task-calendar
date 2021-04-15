<template>
  <v-main>
    <Users />
  </v-main>
</template>

<script>
import Users from "@/components/Login/Users.vue";

export default {
  name: "ListUsers",
  components: {
    Users
  }
  // computed: {
  //   ...mapGetters(["allUsers"]),
  // },

  // methods: {
  //   ...mapActions(["bringUserAPI"]),
  // },
};
</script>
