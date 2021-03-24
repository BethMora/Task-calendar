<template>
  <v-footer dark padless app>
    <v-card flat tile class="accent  text-center flex">
      <v-col class="py-2">
        <v-btn v-for="(icon, index) in icons" :key="index" class="mx-4 white--text"
        :href="icon.go" target="_blank" icon>
          <v-icon size="24px">
            {{ icon.name }}
          </v-icon>
        </v-btn>
      </v-col>

      <v-divider></v-divider>

      <v-col class="white--text py-2 " cols="12">
        {{ new Date().getFullYear() }} — <strong>Project made in Vue by Betsabe Mora</strong>
      </v-col>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      icons: [
        {name: "mdi-facebook", go: "https://www.facebook.com/betsabe.mora.948/"} ,
        {name: "mdi-instagram", go: "https://www.instagram.com/marybeth_mora/"} ,
        {name: "mdi-twitter", go: "https://twitter.com/MariaBetsabeMo1"} ,
        {name: "mdi-linkedin", go: "https://www.linkedin.com/in/betsabe-mora/"} ,
        {name: "mdi-github", go: "https://github.com/BethMora"} ,
      ],
    };
  }
};
</script>
