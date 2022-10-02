<template>
  <v-card class="pa-3 mt-4 mb-4">
    <v-card-title class="text-center">
      Gráfico dos Gastos
      <v-spacer></v-spacer>
      Média gasta por mês {{ mean | formatter }}
    </v-card-title>
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
    monthValues: Array,
  },

  computed: {
    expensesForMonth() {
      return this.monthValues.map((monthValue) => Number(monthValue.valor))
    },
    mean() {
      return (
        this.monthValues.map((monthValue) => Number(monthValue.valor)).reduce((v, acc) => v + acc, 0) /
        this.monthValues.length
      ).toFixed(2)
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
      return this.monthValues?.map((monthValue) => monthsInPortuguese[Number(monthValue.mes) - 1]+ '/' +monthValue.ano)
    },
  },
  filters: {
    formatter(value) {
      var formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
      return formatter.format(value)
    },
  },
}
</script>

<style scoped>
.small {
  font-size: 6px !important;
}
</style>
