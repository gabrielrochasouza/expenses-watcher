<template>
  <v-card class="pa-3 mt-4 mb-4">
    <v-card-title class="text-center">Gráfico dos Gastos</v-card-title>
    <v-sheet color="rgba(0, 0, 0, .42)">
      <v-sparkline
        :labels="expensesLabels"
        :value="expensesForMonth"
        color="white"
        line-width="1"
        padding="12"
        smooth
        label-size="4"
      >
      </v-sparkline>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  props: {
    values: Array,
  },
  computed: {
    expensesForMonth() {
      return this.values.map((e) => Number(e.valor))
    },
    expensesLabels() {
      const monthsInPortuguese = [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ]
      return this.values.map(
        (e) => monthsInPortuguese[Number(e.mes) - 1]
      )
    },
  },
}
</script>

<style scoped>
.small {
  font-size: 6px !important;
}
</style>
