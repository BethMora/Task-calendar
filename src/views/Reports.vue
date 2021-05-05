<template>
  <div>
    <v-card class="mx-auto" max-width="500">
      <v-container fluid>
        <v-row dense>
          <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
            <v-card>
              <v-img
                :src="card.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>mdi-eye-outline</v-icon>
                </v-btn>

                <v-btn small="" class="ma-2" outlined fab color="teal" @click="saludo">
                  <v-icon>mdi-download</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
export default {
  name: "Reports",
  components: {},

  data() {
    return {
      cards: [
        {
          title: "Listado de usuarios",
          src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
          flex: 6,
        },
        {
          title: "tareas por mes",
          src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          flex: 6,
        },
        {
          title: "Todas las tareas",
          src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          flex: 12,
        },
      ],
    };
  },

  methods: {
    saludo() {
      // https://mrrio.github.io/jsPDF/

      //   var imgData = "@/assets/calendar";
      const doc = new jsPDF();
      //   const doc = new jsPDF({
      //     orientation: "landscape",
      //     unit: "in",
      //     format: [4, 2],
      //   });
      doc.setFontSize(30);
      //   doc.text(35, 25, "Paranyan loves jsPDF");
      doc.text("Estadistica de usuarios", 35, 25);
      doc.setFontSize(20);
      doc.setFont("courier", "normal");
      doc.text("Hello world!", 10, 35);
      //   doc.addImage(imgData, "JPEG", 15, 40, 180, 160);
      doc.addImage("public/calendar.jpg", "JPEG", 15, 40, 180, 180);

      doc.save("Saludo.pdf");
    },
  },
};
</script>
