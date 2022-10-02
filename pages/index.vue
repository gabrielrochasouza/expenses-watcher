<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-form @submit.prevent="search">
        <h1 class="text-center mt-12 mb-0">Selecione um Deputado</h1>
        <v-card-text class="text-center mt-0"
          >Veja suas informações e despesas</v-card-text
        >

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
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'IndexPage',
  data() {
    return {
      errorNotFound: false,
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
    search(e) {
      const nameSearched = e.target[1].value.split(' - ')[0]
      const politician = this.politicians.find((p) => p.nome === nameSearched)
      if (politician) {
        const searchedId = politician.id
        this.$router.push('deputado/' + searchedId)
      }
    },
    select(){
      console.log('ok')
    }
  },
}
</script>
<style scoped>
.cover {
  object-fit: cover;
}
</style>
