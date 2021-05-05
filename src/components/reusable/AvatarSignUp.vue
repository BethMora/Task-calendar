<template>
  <v-card-title class="d-flex justify-center mb-4">
    <v-avatar>
      <img v-if="setUrl" :src="setUrl" />
      <v-icon v-else x-large color="blue darken-2">
        mdi-shield-account
      </v-icon>
    </v-avatar>
    <span class="ml-2"> {{ title }} </span>
  </v-card-title>
</template>

<script>
import { EventBus } from "@/libs/event-bus";
export default {
  name: "AvatarSignUp",
  props: ["title"],
  data() {
    return {
      urlImagen: null,
    };
  },

  computed: {
    setUrl() {
      EventBus.$on("urlAvatar", (item) => {
        this.urlImagen = item;
      });
      return this.urlImagen;
    },
  },
};
</script>
