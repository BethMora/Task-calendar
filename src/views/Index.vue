<template>
  <v-main>
    <!-- <PostList msg="Welcome to Your Vue.js App" /> -->
    <Landing msg="Welcome to Your Vue.js App" />
  </v-main>
</template>

<script>
// @ is an alias to /src
// import Login from "@/components/Login.vue";
// import PostList from "@/components/PostList.vue";
import Landing from "@/components/Landing.vue";

export default {
  name: "Index",
  components: {
    // PostList
    Landing
  }
};
</script>
