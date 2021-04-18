<template>
  <v-btn
    class="secondary black--text mt-3"
    block
    :disabled="!valid"
    @click.prevent="action"
  >
    Submit
  </v-btn>
</template>

<script>
export default {
    name: "BtnSubmitComponent",
    props: ["valid" , "methodOfAction"],
    methods:{
      action(){
        this.$emit("methodOfAction")
      }
    }
}
</script>