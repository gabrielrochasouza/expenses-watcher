<template>
  <div>
    <v-row class="mt-4 mb-4 pa-1 dark">
      <v-col>
        <v-card class="pa-4">
          <v-title> Histórico das Pesquisas </v-title>

          <div class="mt-4 pa-0" v-for="(yearData, index) in rank" :key="index">
            <v-card-text class="mb-4 mt-10">
              Ano: {{ yearData.ano }}
            </v-card-text>
            <v-card
              color="rgba(0,0,0,0.2)"
              ripple
              class="mb-2 pa-3 d-flex align-center flex-wrap"
              v-for="(data, indexData) in yearData.data"
              :key="indexData"
            >
              <v-avatar left class="mr-4">
                <img
                  class="cover"
                  :src="data.politicianData.img"
                  :alt="data.politicianData.name"
                />
              </v-avatar>
              <v-card-subtitle class="short">
                {{ indexData + 1 }}° {{ data.politicianData.name }}
                <v-card-text>
                  {{ data.politicianData.partido }} -
                  {{ data.politicianData.siglaUf }}
                </v-card-text>
              </v-card-subtitle>

              <v-spacer></v-spacer>
              <div class="expenses">
                <v-subheader class="mt-0 mb-0 pa-0 subheader"
                  >Gasto por mês:
                  <strong> {{ data.expensesForMonth | formatter }}</strong>
                </v-subheader>
                <v-subheader class="mt-0 mb-0 pa-0 subheader"
                  >Gasto Total:
                  <strong>
                    {{ data.totalExpend | formatter }}
                  </strong>
                </v-subheader>
                <v-subheader class="mt-0 mb-0 pa-0 subheader small">
                  Visto: {{ data.lastTimeVisited }}
                </v-subheader>
              </div>
            </v-card>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  created() {
    this.$store.dispatch('deputados/setHistoryRequests')
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
  computed: {
    rank() {
      const years = []
      const rank = []
      for (let i = 0; i < this.historyRequests.length; i++) {
        if (!years.some((y) => y == this.historyRequests[i].ano)) {
          years.push(this.historyRequests[i].ano)
        }
      }
      for (let i = 0; i < years.length; i++) {
        rank.push({
          ano: years[i],
          data: this.historyRequests.filter(
            (historyRequest) => historyRequest.ano === years[i]
          ),
        })
      }
      const result = rank.map((r) => {
        return {
          ano: r.ano,
          data: r.data.sort((a, b) => a.totalExpend - b.totalExpend),
        }
      })
      return result.sort((a, b) => b.ano - a.ano)
    },
    ...mapState('deputados', ['historyRequests']),
  },
}
</script>

<style scoped>
p,
div {
  margin: 0;
  padding: 0;
}
.subheader {
  height: 20px;
  justify-content: end;
  font-size: 13px;
  height: 16px;
}
.small {
  font-size: 10px;
}
@media (max-width: 540px) {
  .expenses {
    margin: 5px 0 20px;
    width: 100%;
  }
  .expenses .subheader {
    justify-content: center;
  }
  .subheader {
    font-size: 10px !important;
  }
}
.cover {
  object-fit: cover;
}
@media (max-width: 700px) {
  .short {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 240px;
  }
}
@media (max-width: 400px) {
  .short {
    max-width: 200px;
  }
}
@media (max-width: 340px) {
  .short {
    max-width: 180px;
  }
}
</style>
