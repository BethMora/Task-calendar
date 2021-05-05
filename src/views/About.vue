<template>
  <v-main id="bg">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card
          class="mx-auto mt-6"
          max-width="500"
          :elevation="hover ? 24 : 6"
        >
          <v-container>
            <v-img
              src="@/assets/calendar.jpg"
              height="300px"
              width="600px"
              aspect-ratio="2"
              contain
            ></v-img>
          </v-container>
          <v-divider />

          <v-card-title class="primary--text">
            Welcome to the homework calendar.
          </v-card-title>

          <v-card-subtitle>
            This page is intended to help the user to record events or tasks,
            which have a name, description, start date, end date and an
            identification color, which can be seen on a calendar or in a table.
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="warning" text @click="$router.push('/login')">
              Go to login
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon color="success">{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                On this page, when you log in, you have access to create and
                edit your profile, manage your tasks and generate reports.
                <br />
                The page also has an administrator role, which in addition to
                having the user functions, manages all users, has access to all
                the tasks of all users and generation of reports.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </template>
    </v-hover>
  </v-main>
</template>

<script>
export default {
  name: "About",
  data() {
    return { show: false };
  },
};
</script>

<style scoped>
#bg {
  background-image: url("../assets/bgAbout.jpg");
  background-size: cover;
}
</style>
