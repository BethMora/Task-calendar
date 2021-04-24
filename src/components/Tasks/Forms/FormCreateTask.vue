<template>
  <v-card fill-height fluid class="text-center justify-center">
    <v-alert dense class="light text-uppercase" style="width: 100%">
      Start of task information
    </v-alert>

    <v-row justify="center">
      <v-col cols="12" lg="3" md="4" sm="6" xs="2">
        <DatePickerModal
          :rules="[rules.required]"
          color="accent"
          titlePicker="Select start date on calendar"
          :dateEnd="task.dateEnd"
          @setDate="setDateStart"
        />
      </v-col>

      <v-col cols="12" lg="3" md="4" sm="6" xs="2">
        <TimePickerModal
          :rules="[rules.required]"
          color="accent"
          titlePicker="Select start time on clock"
          @setTime="setTimeStart"
        />
      </v-col>
    </v-row>

    <v-alert dense class="light text-uppercase" style="width: 100%">
      End of task information
    </v-alert>
    <v-row justify="center">
      <v-col cols="12" lg="3" md="4" sm="6" xs="2">
        <DatePickerModal
          :rules="[rules.required]"
          @setDate="setDateEnd"
          :dateStart="task.dateStart"
          color="primary"
          titlePicker="Select end date on calendar"
        />
      </v-col>

      <v-col cols="12" lg="3" md="4" sm="6" xs="2">
        <TimePickerModal
          :rules="[rules.required]"
          @setTime="setTimeEnd"
          color="primary"
          titlePicker="Select end time on clock"
        />
      </v-col>
    </v-row>
    <v-divider></v-divider>

    <v-row justify="center">
      <v-col cols="6" lg="3" md="4" sm="6" xs="1">
          <v-text-field
            v-model="task.nameTask"
            :rules="[rules.required, rules.min, rules.max]"
            :counter="30"
            label="Task name"
            required
          />

          <v-textarea
            v-model="task.descriptionTask"
            :counter="120"
            :rules="[rules.required, rules.min, rules.maxMsg]"
            label="Task description "
            required
          />
      </v-col>

      <v-col cols="6" lg="3" md="4" sm="6" xs="1">
        <label for="Color Task"> </label>
        <v-text-field
          label="Color Task"
          prepend-icon="mdi-palette"
          readonly
          v-model="task.colorTask"
        ></v-text-field>

        <v-color-picker
          dot-size="25"
          :rules="[rules.required]"
          swatches-max-height="200"
          v-model="task.colorTask"
          hide-inputs
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import DatePickerModal from "@/components/reusable/DatePickerModal";
import TimePickerModal from "@/components/reusable/TimePickerModal";
export default {
  name: "FormCreateTask",
  props: ["task"],
  components: {
    
    DatePickerModal,
    TimePickerModal,
  },
  data() {
    return {
      rules: {
        required: (v) => !!v || "Required",
        min: (v) => (v && v.length >= 5) || "Must be at least 5 characters",
        max: (v) =>
          (v && v.length <= 30) || "Must not be longer than 30 characters",
        maxMsg: (v) =>
          (v && v.length <= 120) || "Must not be longer than 120 characters",
      },
    };
  },

  methods: {
    setDateStart(value) {
      this.task.dateStart = value;
    },

    setTimeStart(value) {
      this.task.timeStart = value;
    },

    setDateEnd(value) {
      this.task.dateEnd = value;
    },

    setTimeEnd(value) {
      this.task.timeEnd = value;
    },
  },
};
</script>
