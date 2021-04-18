<template>
  <div>
    <v-app-bar app dark absolute color="white" class="accent" elevate-on-scroll>
      <template v-if="!userLoggedOk.isLogin" class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Vuetify Logo"
            src="@/assets/vuetifyLogo.png"
            transition="fab-transition"
            width="40"
          />
        </router-link>
      </template>
      <template v-else>
        <div id="divImagenProfile" class="d-flex">
          <v-row>
            <Avatar
              :url="imageAvatar(userLoggedOk.imageName)"
              :alt="userLoggedOk.name"
              :size="50"
            />
          </v-row>
          <v-toolbar-title class="info--text ml-6">
            {{ this.$route.params.id }}
          </v-toolbar-title>
        </div>
      </template>

      <v-app-bar-nav-icon @click.stop="openNavigation"></v-app-bar-nav-icon>

      <v-toolbar-title> Task Management </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field
        class="mx-4"
        flat
        hide-details
        label="Search"
        prepend-inner-icon="mdi-magnify"
        solo-inverted
      />

      <v-tooltip bottom v-if="!userLoggedOk.isLogin">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon>
            <template>
              <v-icon v-model="userLoggedOk.isLogin" @click="goLogin">
                mdi-account-circle
              </v-icon>
            </template>
          </v-btn>
        </template>
        <span>Click to login</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-col xs="1" lg="2" v-bind="attrs" v-on="on">
            <v-select
              :items="languages"
              menu-props="auto"
              label="Translations"
              hide-details
              prepend-icon="mdi-web"
            ></v-select>
          </v-col>
        </template>
        <span>Choose language</span>
      </v-tooltip>

      <template v-if="userLoggedOk.isLogin">
        <v-menu bottom origin="center center" transition="scale-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" dark small icon>
              <v-icon>mdi-arrow-down-drop-circle-outline</v-icon>
            </v-btn>
          </template>

          <v-list-item-action-text>
            <SubMenuLogged
              :menuLoggedIn="menuLoggedIn"
              :imageName="userLoggedOk.imageName"
              @handleClick="handleClick"
            />
          </v-list-item-action-text>
        </v-menu>
      </template>
    </v-app-bar>

    <Navigation :drawer="drawer" :changeValue="changeValue" />
    <ConfirmActionComponent
      @confirmOff="confirmOff"
      :isConfirmation="isConfirmation"
      :changeFlagConfirmation="changeFlagConfirmation"
      title = "Sign off"
      subtitle = "Are you sure to log out?"
    />
  </div>
</template>

<script>
import Navigation from "@/components/Structure/Navigation";
import SubMenuLogged from "@/components/Structure/SubMenuLogged";
import Avatar from "@/components/Structure/Avatar";
import ConfirmActionComponent from "@/components/reusable/ConfirmActionComponent";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Nav",
  components: {
    Navigation,
    SubMenuLogged,
    Avatar,
    ConfirmActionComponent,
  },

  data() {
    return {
      bandDrawer: false,
      flagConfirmAction: false,
      languages: [{ text: "English" }, { text: "Spanish" }],
      menuLoggedIn: [
        {
          title: "Your Profile",
          submenu: [
            {
              title: "Edit Profile information",
              url: "mdi-account-edit-outline",
              action: "editProfile",
            },
            {
              title: "Change profile picture ",
              url: "mdi-camera-wireless-outline",
              action: "editProfilePicture",
            },

            {
              title: "Change Password ",
              url: "mdi-account-key",
              action: "editProfilePassword",
            },
          ],
        },
        { title: "Sign out", url: "mdi-logout", action: "logoOut" },
      ],
    };
  },

  computed: {
    ...mapGetters(["userLoggedOk"]),
    drawer: {
      get: function() {
        return this.bandDrawer;
      },

      set: function(value) {
        this.changeValue(value);
      },
    },

    isConfirmation: {
      get: function() {
        return this.flagConfirmAction;
      },

      set: function(value) {
        this.changeFlagConfirmation(value);
      },
    },
  },

  watch:{
    userLoggedOk(){
      // console.log("Ha cambiado la data")
      this.imageAvatar()
    }
  },

  methods: {
    ...mapActions(["logoOutUser"]),

    changeValue(value) {
      this.bandDrawer = value;
    },

    changeFlagConfirmation(value) {
      this.flagConfirmAction = value;
    },

    openNavigation() {
      this.bandDrawer = true;
    },

    goLogin() {
      if (this.$route.path != "/login") {
        this.$router.push("/login");
      }
    },

    imageAvatar(name) {
      return "http://localhost:3000/public/img/" + name;
    },

    handleClick(action) {
      switch (action) {
        case "editProfile":
          this.editProfile();
          break;
        case "editProfilePicture":
          this.editProfilePicture();
          break;
        case "editProfilePassword":
          this.editProfilePassword();
          break;
        case "logoOut":
          this.flagConfirmAction = true;
          break;
        default:
        // code block
      }
    },

    logoOut() {
      this.logoOutUser();
      this.$router.push("/login");
    },

    confirmOff(value) {
      console.log("recivo del hijo ");
      if (value) {
        this.logoOut();
      }
    },

    editProfile() {
      if (this.$route.name != "EditUser") {
        this.$router.push("/editUser");
      }
    },

    editProfilePicture() {
      if (this.$route.name != "EditPictureProfile") {
        this.$router.push("/editPictureProfile");
      }
    },

    editProfilePassword() {
      if (this.$route.name != "EditPassword") {
        this.$router.push("/editPassword");
      }
    },
  },
};
</script>

<style scoped>
#divImagenProfile {
  border-right: 1px solid white;
  text-shadow: blue 0.1em 0.1em 0.2em;
  padding-right: 1em;
}

#textLeftBtn {
  text-align: left;
  display: inline-block;
  width: 150;
}
</style>
