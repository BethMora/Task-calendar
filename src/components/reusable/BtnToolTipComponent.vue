<template>
  <v-tooltip right>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mr-4 black--text"
        :class="color"
        type="submit"
        :block="block"
        :disabled="!valid"
        @click="action"
        v-bind="attrs"
        v-on="on"
      >
        {{ title }}
      </v-btn>
    </template>

    <template v-if="!tip">Is activated when completing the form </template>
    <template v-else>{{ tip }} </template>
  </v-tooltip>
</template>

<script>
export default {
  name: "BtnToolTipComponent",
  props: ["title", "valid", "action", "color", "block", "tip"],
};
</script>
