<template>
  <div>
    <v-card class="mb-3">
      <v-card-title>
        <v-avatar class="mr-5" size="48" left>
          <img
            class="cover"
            :src="politicianInfo?.ultimoStatus?.urlFoto"
            :alt="politicianInfo.nomeCivil"
          />
        </v-avatar>
        <div>
          {{ politicianInfo['nomeCivil'] }}
          <v-subheader class="subheader ma-0 pa-0">
            {{ politicianInfo?.ultimoStatus?.siglaPartido }}</v-subheader
          >
        </div>
      <v-spacer></v-spacer>
      <v-btn @click="dialog = true" class="mr-2 btn-position" color="primary">Escolher Outro Ano</v-btn>
      <v-btn class="btn-position" :to="`/deputado/${$route.params.id}`">Voltar</v-btn>
      </v-card-title>
    </v-card>

    <v-card>
      <v-card-title>
        Despesas do ano de {{ $route.params.ano }}
        <v-spacer></v-spacer>

        <span>Total gasto R$:{{ totalExpend }} </span>
      </v-card-title>

      <template>
        <v-data-table
          :headers="headers"
          :items="expensesInfo"
          :items-per-page="10"
          class="elevation-1"
        ></v-data-table>
      </template>
    </v-card>
    <choose-year v-model="dialog" v-on:dialogChange="close" :allYears='allYears' :dialog="dialog" ></choose-year>
    <expenses-graph :values="monthValues" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ExpensesGraph from '~/components/ExpensesGraph.vue'
import ChooseYear from'~/components/ChooseYear.vue'
export default {
  data(){
    return {
      dialog:false,
    }
  },
  async fetch({ params, store, error }) {
    try {
      const { id, ano } = params
      let data = await store.dispatch('deputados/setExpenses', {
        id,
        ano,
        pagina: 1,
      })
      const total = Number(data.headers['x-total-count'])
      if (total > 100) {
        const numberOfRequests = Math.ceil(total / 100)
        const pages = Array(numberOfRequests)
          .fill(0)
          .map((e, i) => i + 1)
        for (let i = 1; i < pages.length; i++) {
          await store.dispatch('deputados/setExpensesAcc', {
            id,
            ano,
            pagina: pages[i],
          })
        }
      }
      await store.dispatch('deputados/setPolitician', id)
    } catch (err) {
      error({
        message: err.message,
        statusCode: err.statusCode,
      })
    }
  },
  props: {
    ExpensesGraph,
    ChooseYear
  },
  computed: {
    close(){
      this.dialog = false
    },
    headers() {
      return [
        {
          text: 'Data do documento',
          value: 'dataDocumento',
          sortable: false,
        },
        {
          text: 'Tipo Despesa',
          value: 'tipoDespesa',
        },
        {
          text: 'Tipo Documento',
          value: 'tipoDocumento',
        },
        {
          text: 'Valor Documento',
          value: 'valorDocumento',
        },
        {
          text: 'Valor Líquido',
          value: 'valorLiquido',
        },
        {
          text: 'Nome Fornecedor',
          value: 'nomeFornecedor',
        },
      ]
    },
    expensesInfo() {
      return this.expenses?.map((e) => {
        return {
          dataDocumento: e.dataDocumento?.split('-').reverse().join('/'),
          tipoDespesa: e.tipoDespesa,
          tipoDocumento: e.tipoDocumento,
          valorDocumento: e.valorDocumento,
          valorLiquido: e.valorLiquido,
          nomeFornecedor: e.nomeFornecedor,
        }
      })
    },
    totalExpend() {
      return this.expenses
        .reduce((acc, e) => e.valorLiquido + acc, 0)
        .toFixed(2)
    },
    monthValues() {
      const months = []
      this.expenses.forEach((expense) => {
        if (!months.some((m) => m.mes == expense.mes)) {
          months.push({ mes: expense.mes, valor: expense.valorLiquido })
        } else {
          months.find((m) => m.mes == expense.mes).valor += expense.valorLiquido
        }
      })
      return months
        .reverse()
        .map((m) => ({ mes: m.mes, valor: m.valor.toFixed(2) }))
    },
    allYears() {
      const lastUpdateDate = this.politicianInfo?.ultimoStatus?.data
      const firstYear = Number(lastUpdateDate.split('T')[0].split('-')[0])
      const currentYear = Number(new Date().getFullYear())
      const years = []
      for (let i = firstYear; i <= currentYear; i++) {
        years.push(i.toString())
      }
      return years
    },
    ...mapState('deputados', ['expenses', 'politicianInfo']),
  },
}
</script>

<style scoped>
.subheader{
  height: 10px;
}
.cover{
  object-fit: cover;
}
@media (max-width: 500px) {
  .btn-position{
    margin: 12px 0 0 0 ;
  }
}

</style>
