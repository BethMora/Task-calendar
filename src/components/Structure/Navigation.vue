<template>
  <div @click="changeVal">
    <v-navigation-drawer v-model="drawer" absolute left class="blue lighten-5">
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
        <v-list-item-group active-class="accent--text text--accent-4">
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :class="item.color"
            @click="sendUrl(item.url)"
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
            <v-list-item class="white" @click="logoOut">
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

    <ConfirmActionComponent
      @confirmOff="confirmOff"
      :isConfirmation="isConfirmation"
      :changeFlagConfirmation="changeFlagConfirmation"
      title="Sign off"
      subtitle="Are you sure to log out?"
    />
  </div>
</template>

<script>
import ConfirmActionComponent from "@/components/reusable/ConfirmActionComponent";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Navigation",
  props: ["drawer", "changeValue"],
  components: {
    ConfirmActionComponent,
  },
  data() {
    return {
      flagConfirmAction: false,
      items: null,
      itemsNavigation: [
        {
          name: "Sign In",
          ico: "mdi-folder-plus",
          color: "success",
          url: "/login",
        },
        {
          name: "Sign Up",
          ico: "mdi-account-details",
          color: "info",
          url: "/signUp",
        },
        {
          name: "Sample Tasks",
          ico: "mdi-calendar-check",
          color: "info",
          url: "/dashboard/:id",
        },
        {
          name: "About",
          ico: "mdi-file-chart",
          color: "secondary",
          url: "/about",
        },
      ],

      itemsNavigationAdmin: [
        {
          name: "Create Task",
          ico: "mdi-folder-plus",
          color: "success",
          url: "/createTask",
        },
        {
          name: "Calendar",
          ico: "mdi-calendar-check",
          color: "success",
          url: "/dashboard/:id",
        },
        {
          name: "List Tasks",
          ico: "mdi-file-tree",
          color: "success",
          url: "/dashboard/:id",
        },
        {
          name: "List Users",
          ico: "mdi-account-details",
          color: "info",
          url: "/users",
        },
        {
          name: "Reports",
          ico: "mdi-file-chart",
          color: "light",
          url: "/about",
        },
      ],

      itemsNavigationUser: [
        {
          name: "Create Task",
          ico: "mdi-folder-plus",
          color: "success",
          url: "/createTask",
        },
        {
          name: "Calendar",
          ico: "mdi-calendar-check",
          color: "success",
          url: "/signUp",
        },
        {
          name: "List Tasks",
          ico: "mdi-file-tree",
          color: "success",
          url: "/listTasks",
        },
        {
          name: "Reports",
          ico: "mdi-file-chart",
          color: "light",
          url: "/about",
        },
      ],
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
        console.log("Entro al user");
        this.items = this.itemsNavigationUser;
      } else {
        this.items = this.itemsNavigation;
      }
    },
  },

  computed: {
    ...mapGetters(["userLoggedOk"]),

    isConfirmation: {
      get: function() {
        return this.flagConfirmAction;
      },

      set: function(value) {
        this.changeFlagConfirmation(value);
      },
    },
  },

  methods: {
    ...mapActions(["logoOutUser"]),
    changeVal() {
      this.changeValue(false);
    },
    sendUrl(url) {
      if (this.$route.path != url) {
        this.$router.push(url);
        this.changeVal();
      }
    },
    changeFlagConfirmation(value) {
      this.flagConfirmAction = value;
    },

    logoOut() {
      this.flagConfirmAction = true;
    },

    confirmOff(value) {
      console.log("recivo del hijo ");
      if (value) {
        this.logoOutConfirmed();
      }
    },
    logoOutConfirmed() {
      this.logoOutUser();
      this.$router.push("/login");
    },
  },
};
</script>
