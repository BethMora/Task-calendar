<template>
  <div @click="changeVal">
    <v-navigation-drawer v-model="drawer" absolute left>
      <v-list-item class="mt-10 text-center">
        <v-list-item-content>
          <v-list-item-title class="title">
            Management
          </v-list-item-title>
          <v-list-item-subtitle>
            Tasks
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-col class="d-flex justify-center">
        <v-list-item-avatar size="60">
          <v-img
            src="@/assets/tasks.png"
            transition="fab-transition"
          ></v-img>
        </v-list-item-avatar>
      </v-col>

      <v-divider class="mb-2"></v-divider>
      <v-list nav dense>
        <v-list-item-group
          
          active-class="accent--text text--accent-4"
        >
          <v-list-item
            v-for="(item, index) in itemsNavigation"
            :key="index"
            :class="item.color"
            @click="sendUrl(item.url)"
            class="my-2"
          >
            <v-list-item-icon>
              <v-icon class="ml-6">{{ item.ico }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-col class="d-flex justify-center">
        <v-btn
          class="mx-2 primary--accent"
          rounded
          color="white"
          
          large
        >
          <v-icon dark>
            mdi-close
          </v-icon>
        </v-btn>
      </v-col>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  props: ["drawer", "changeValue"],
  data() {
    return {
      // group: null,
      itemsNavigation: [
        { name: "Create task", ico: "mdi-folder-plus", color: "success", url:"/createTask" },
        { name: "List Users", ico: "mdi-account-details", color: "info", url:"/"},
        { name: "List Tasks", ico: "mdi-calendar-check", color: "info", url:"/calendar"  },
        { name: "Report", ico: "mdi-file-chart", color: "secondary", url:"/" },
        { name: "Logo Out", ico: "mdi-exit-run", color: "light", url:"/" },
      ],
    };
  },
 
  methods: {
    changeVal() {
      this.changeValue(false);
    },
    sendUrl(url){
      if(this.$route.path != url){
        this.$router.push(url)
        this.changeVal()
      }
    }
  },
};
</script>
