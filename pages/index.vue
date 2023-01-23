<template>
  <v-form  @submit.prevent="search">
    <v-row class="mt-6" justify="center" align="center">
      <v-col class="mt-10 mb-0 pa-0" cols="12" sm="8" md="6">
        <h1 class="text-center mt-16 mb-0 pa-0">Selecione um Deputado</h1>
        <v-card-text class="text-center mt-0 pa-0 mb-4">
          Veja suas informações e despesas
        </v-card-text>

        <v-autocomplete
          :items="politiciansRepresentation"
          dense
          outlined
          label="Selecione um e aperte enter."
          filled
          rounded
          item-text="nome"
          item-value="nome"
          color="white"
          prepend-inner-icon="mdi-account-search"
          dark
          class="pa-0 ma-0"
          v-model='deputy'
          @change='search'
        >
          <template v-slot:item="data">
            <v-list-item-avatar>
              <img class="cover" :src="data.item.foto" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.nome"></v-list-item-title>
            </v-list-item-content>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row class="text-center pa-0">
      <v-col class="pa-0">
        <v-btn
          rounded
          color="primary"
          dark
          type="submit"
          :loading="loading"
          :disabled="loading"
        >
          Pesquisar
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'IndexPage',
  data() {
    return {
      errorNotFound: false,
      deputy: null,
      loading: false,
    }
  },
  async fetch({ error, store }) {
    try {
      await store.dispatch('deputados/setPoliticians')
    } catch (err) {
      error({
        message: err.message,
        statusCode: err.statusCode,
      })
    }
  },
  computed: {
    politiciansRepresentation() {
      return this.politicians?.map((p) => ({
        foto: p.urlFoto,
        nome: p.nome + ' - ' + p.siglaUf + ' - ' + p.siglaPartido,
      }))
    },
    ...mapState('deputados', ['politicians']),
  },
  methods: {
    search() {
      if(this.deputy){
        const nameSearched = this.deputy.split(' - ')[0]
        const politician = this.politicians.find((p) => p.nome === nameSearched)
        if (politician) {
          this.loading = true;
          const searchedId = politician.id
          this.$router.push('deputado/' + searchedId)
        }
      } 
    },

  },
}
</script>
<style scoped>
.cover {
  object-fit: cover;
}
</style>
