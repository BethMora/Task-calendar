<template>
  <v-avatar :size="size">
    <img :src="url" />
  </v-avatar>
</template>

<script>
export default {
  name: "Avatar",
  props: ["url", "size"],
};
</script>
