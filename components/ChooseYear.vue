<template>
  <div>
    <v-dialog v-model="mutableDialog" scrollable max-width="300px">
      <v-card>
        <v-card-title>Escolha um ano</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-radio-group v-model="dialogm1" column>
            <v-radio
              v-for="year in allYears"
              :key="year"
              :label="year"
              :value="year"
              name="year"
              @click="selectedYear = year"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            :disabled="!!!selectedYear"
            color="blue darken-1"
            text
            :to="`/deputado/${$route.params.id}/despesas/${selectedYear}`"
          >
            Ver Despesas
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogm1: '',
      selectedYear: '',
    }
  },
  model: {
    event:'dialogChange',
    prop: 'dialog' 
  },
  props: {
    allYears: Array,
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    mutableDialog: {
      get() {
        return this.dialog
      },
      set(value) {
        this.$emit('dialogChange')
      },
    },
  },
}
</script>

<style scoped></style>
