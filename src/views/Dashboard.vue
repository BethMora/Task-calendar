<template>
  <v-main>
    <!-- Hola Dashboard {{ userLoggedOk }} <br><br>
    <hr />
    <P> Hola Dashboard: isLogin {{ userLoggedOk.isLogin }} </P> -->

    <!--{{ this.$route.params.id }}

    La data que estamos manejando :
    :src="require('http://localhost:3000/public/img/' + userLoggedOk.imageName)"  -->
    <router-view> </router-view>
  </v-main>
</template>

<script>
// import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "Dashboard",

  data() {
    return {};
  },

  computed: {
    // ...mapGetters(["eventsUserId"]),
  },

  // async created() {
  //   // const id = this.$route.params.id;
  //   // const user = await this.getUserId(id);
  //   // console.log(user);
  // },

  

  methods: {
    ...mapActions(["getPaginatedEvents"]),

   
  },
};
</script>
