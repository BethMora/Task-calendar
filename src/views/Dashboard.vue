<template>
  <v-main>
    Hola Dashboard {{ userLoggedOk }} <br><br>
    <P> Hola Dashboard {{ userLoggedOk.name }} id </P>
    
    <hr />
    {{ this.$route.params.id }}

    La data que estamos manejando :
    <!-- :src="require('http://localhost:3000/public/img/' + userLoggedOk.imageName)"  -->
    <v-container>
          <router-view> </router-view>
    </v-container>

  </v-main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",

  data() {
    return {};
  },


  computed: {
    ...mapGetters(["userLoggedOk"]),
  },

  // async created() {
  //   // const id = this.$route.params.id;
  //   // const user = await this.getUserId(id);
  //   // console.log(user);
  // },

  methods: {
    // ...mapActions(["getUserId"])
  },
};
</script>
