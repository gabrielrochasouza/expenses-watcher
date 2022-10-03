<template>
  <v-card class="pa-3 mt-4 mb-4">
    <v-card-title class="text-center">
      Gráfico dos Gastos
      <v-spacer></v-spacer>
      Média gasta por mês {{ mean | formatter }}
    </v-card-title>
    <v-sheet color="rgba(255, 255, 255 )">
      <template>
        <Bar
          :chart-options="chartOptions"
          :chart-data="chartData"
          :chart-id="chartId"
          :dataset-id-key="datasetIdKey"
          :plugins="plugins"
          :css-classes="cssClasses"
          :styles="styles"
          :width="width"
          :height="height"
          title="Gasto"
        />
      </template>
    </v-sheet>
  </v-card>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
  data() {
    return {
      chartOptions: {
        responsive: true,
      },
    }
  },
  props: {
    monthValues: Array,
    chartId: {
      type: String,
      default: 'bar-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  components: { Bar },
  computed: {
    expensesForMonth() {
      return this.monthValues.map((monthValue) => Number(monthValue.valor))
    },
    mean() {
      return (
        this.monthValues
          .map((monthValue) => Number(monthValue.valor))
          .reduce((v, acc) => v + acc, 0) / this.monthValues.length
      ).toFixed(2)
    },
    chartData() {
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
      return {
        labels: [
          ...this.monthValues.map(
            (monthValue) => monthsInPortuguese[monthValue.mes - 1]+ '/' + monthValue.ano
          ),
        ],
        datasets: [
          {
            label:"Gastos",
            backgroundColor:"#000",
            data: [
              ...this.monthValues.map((monthValue) => Number(monthValue.valor)),
            ],
          },
        ],
      }
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
      return this.monthValues?.map(
        (monthValue) =>
          monthsInPortuguese[Number(monthValue.mes) - 1] + '/' + monthValue.ano
      )
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
