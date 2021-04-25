<template>
  <div>
    <h3 class="my-2 accent--text">
        {{title}}
    </h3>
    <v-divider class="mb-4" />
  </div>
</template>

<script>
export default {
    name: "TitleComponent",
    props: ["title", "subtitle"]
}
</script>