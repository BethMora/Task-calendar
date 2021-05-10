<template>
  <div  @click.stop="change">
    <!-- <div  @click.stop="change"> -->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      left
      class="blue lighten-5"
      style="z-index: 100"
    >
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
          <v-img src="@/assets/tasks.png" transition="fab-transition"></v-img>
        </v-list-item-avatar>
      </v-col>

      <v-divider class="mb-2"></v-divider>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="accent--text text--accent-4"
        >
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :class="item.color"
            @click="setUrl(item.url)"
            class="my-2"
          >
            <v-list-item-icon>
              <v-icon class="ml-6" color="accent">{{ item.ico }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <template v-if="userLoggedOk.role">
            <v-list-item class="white" @click.stop="showConfirm()">
              <v-list-item-icon>
                <v-icon class="ml-6" color="accent"> mdi-logout</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title> Sign out</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>

      <v-col class="d-flex justify-center">
        <v-btn
          class="mx-2 primary--accent"
          rounded
          color="blue-grey lighten-5"
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
import { mapGetters, mapActions } from "vuex";
import {
  navigationAnyUser,
  navigationAdmin,
  navigationUser,
} from "@/libs/dataNavigationRole";

export default {
  name: "Navigation",
  props: ["drawer", "changeValue"],
  data() {
    return {
      group: null,
      items: null,
      itemsNavigation: navigationAnyUser,
      itemsNavigationAdmin: navigationAdmin,
      itemsNavigationUser: navigationUser,
    };
  },

  beforeMount() {
    this.items = this.itemsNavigation;
  },

  watch: {
    userLoggedOk() {
      if (this.userLoggedOk.role === "ADMIN") {
        this.items = this.itemsNavigationAdmin;
      } else if (this.userLoggedOk.role === "USER") {
        this.items = this.itemsNavigationUser;
      } else {
        this.items = this.itemsNavigation;
      }
    },
    group() {
      this.changeValue(false);
      console.log("---------------------------- ", this.drawer);
    },
  },

  computed: {
    ...mapGetters(["userLoggedOk"]),
  },

  methods: {
    ...mapActions(["logoOutUser"]),
    setUrl(url) {
      if (this.$route.path != url) {
        this.$router.push(url);
        this.changeValue(false);
      }
    },
    change() {
      this.changeValue(false);
      console.log("Cambiando flag ", this.drawer);
    },

    showConfirm() {
      this.$confirm({
        title: "SIGN OFF",
        message: `Are you sure to log out?`,
        button: {
          yes: "Yes",
          no: "Cancel",
        },
        callback: (confirm) => {
          if (confirm == true) {
            this.logoOutUser();
          }
          this.changeValue(false);
        },
      });
    },
  },
};
</script>
