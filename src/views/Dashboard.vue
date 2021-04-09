<template>
  <v-main>
    Hola Dashboard {{userLog.name}}
    Hola Dashboard {{user.name}}
    id {{ this.$route.params.id }}
  </v-main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Dashboard",

  data() {
    return {
      user: {},
    };
  },

    computed: {
      ...mapGetters(["userLog"]),
    },

  async created() {
    // const id = this.$route.params.id;
    // const user = await this.getUserId(id);
    // console.log(user);
  },

    methods: {
      ...mapActions(["getUserId"]),
    },
};
</script>
