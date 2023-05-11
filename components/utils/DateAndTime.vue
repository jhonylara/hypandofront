<template>
  <v-row>
    <v-col class="col-8">
      <v-dialog
        ref="dateDialog"
        v-model="modalDate"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            :label="dateLabel ? dateLabel : defaultDateLabel"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modalDate = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dateDialog.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
    <v-col class="col-4">
      <v-dialog
        ref="timeDialog"
        v-model="modalTime"
        :return-value.sync="time"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            :label="timeLabel ? timeLabel : defaultTimeLabel"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          format="24hr"
          v-if="modalTime"
          v-model="time"
          full-width
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modalTime = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.timeDialog.save(time)"
          >
            OK
          </v-btn>
        </v-time-picker>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "DateAndTime",
  props: {
    dateLabel: String,
    timeLabel: String,
  },
  data() {
    return {
      date: null,
      modalDate: false,
      defaultDateLabel: 'Data de início',
      time: null,
      modalTime: false,
      defaultTimeLabel: 'Hora de início',
    }
  }
}
</script>

<style scoped>

</style>
