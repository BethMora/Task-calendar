<template>
  <v-card width="250px">
    <div v-for="(menu, ind) in menuLoggedIn" :key="ind">
      <template v-if="menu.submenu">
        <v-list-group
          :value="true"
          :prepend-icon="menu.url ? menu.url : (url = '')"
        >
          <template v-slot:activator>
            <template v-if="!menu.url">
              <Avatar :url="imageAvatar(imageName)" :size="40" class="mr-4" />
            </template>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </template>

          <v-list-item
            v-for="(element, index) in menu.submenu"
            :key="index"
            :value="true"
            no-action
            link
            @click="clickSubMenu(element.action)"
          >
            <v-list-item-title v-text="element.title" />
            <v-list-item-icon>
              <v-icon color="primary" v-text="element.url" />
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </template>
      <template v-else>
        <v-list-item @click="clickSubMenu(menu.action)">
          <v-list-item-icon>
            <v-icon v-text="menu.url" />
          </v-list-item-icon>

          <v-list-item-title>
            {{ menu.title }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </div>
  </v-card>
</template>

<script>
import Avatar from "@/components/Structure/Avatar";
export default {
  name: "SubMenuLogged",
  components: {
    Avatar,
  },
  props: ["imageName", "handleClick"],
  data() {
    return {
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

  methods: {
    imageAvatar(name) {
      return "http://localhost:3000/public/img/" + name;
    },

    clickSubMenu(value) {
      this.$emit("handleClick", value);
    },
  },
};
</script>
