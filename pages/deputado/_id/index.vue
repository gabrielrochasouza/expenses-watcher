<template>
  <div>
    <v-card class="mt-8 mb-10 mx-auto pa-3" max-width="600px">
      <v-card-title>
        <v-avatar class="mr-5" size="48" left>
          <img
            class="photo"
            :src="politicianInfo?.ultimoStatus?.urlFoto"
            :alt="politicianInfo.nomeCivil"
          />
        </v-avatar>
        <div>
        {{ politicianInfo['nomeCivil'] }}
        <v-subheader class="subheader ma-0 pa-0"> {{ politicianInfo?.ultimoStatus?.siglaPartido }}</v-subheader>

        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-subtitle class="mt-4 subtitle"> Informações: </v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <p>Situação: {{ politicianInfo?.ultimoStatus?.situacao }}</p>
            <p>
              Condição Eleitoral:
              {{ politicianInfo?.ultimoStatus?.condicaoEleitoral }}
            </p>
            <p>
              Descrição Status:
              {{
                politicianInfo?.ultimoStatus?.descricaoStatus || 'Não informado'
              }}
            </p>
            <ul v-if="politicianInfo?.ultimoStatus?.gabinete">
              Gabinete Info:
              <li
                v-for="(gabInfo, index) in Object.entries(
                  politicianInfo?.ultimoStatus?.gabinete
                )"
                :key="index"
              >
                <span>
                  {{ gabInfo[0] }}:
                  {{ gabInfo[1] || 'Não informado' }}
                </span>
              </li>
            </ul>
          </v-col>

          <v-col cols="12" sm="6">
            <p>Sigla UF: {{ politicianInfo?.ultimoStatus?.siglaUf }}</p>
            <p>CPF: {{ politicianInfo?.cpf }}</p>
            <p>Escolaridade: {{ politicianInfo?.escolaridade }}</p>
            <p>
              Data de Nascimento:
              {{ politicianInfo?.dataNascimento | birtDateFormatter }}
            </p>
            <p v-if="politicianInfo?.dataFalecimento">
              Data de Falescimento: {{ politicianInfo?.dataFalecimento }}
            </p>
            <p>UF de Nascimento: {{ politicianInfo?.ufNascimento }}</p>
            <p>
              Município de Nascimento: {{ politicianInfo?.municipioNascimento }}
            </p>
            <p>
              Nome Eleitoral: {{ politicianInfo?.ultimoStatus?.nomeEleitoral }}
            </p>
            <p>
              Sigla Partido: {{ politicianInfo?.ultimoStatus?.siglaPartido }}
            </p>
            <p>
              Data da Última Atualização:
              {{ politicianInfo?.ultimoStatus?.data | lastUpdateFormatter }}
            </p>
          </v-col>
        </v-row>

        <div
          class="socialMedia"
          v-if="politicianInfo?.redeSocial && socialMedia"
        >
          <a
            :href="socialMedia.youtube"
            target="_blanck"
            v-show="socialMedia.youtube"
          >
            <youtube-icon size="2x" v-show="socialMedia.youtube"></youtube-icon>
          </a>

          <a
            :href="socialMedia.instagram"
            target="_blanck"
            v-show="socialMedia.instagram"
          >
            <instagram-icon
              size="2x"
              v-show="socialMedia.instagram"
            ></instagram-icon>
          </a>

          <a
            :href="socialMedia.twitter"
            target="_blanck"
            v-show="socialMedia.twitter"
          >
            <twitter-icon size="2x" v-show="socialMedia.twitter"></twitter-icon>
          </a>

          <a
            :href="socialMedia.facebook"
            target="_blanck"
            v-show="socialMedia.facebook"
          >
            <facebook-icon
              size="2x"
              v-show="socialMedia.facebook"
            ></facebook-icon>
          </a>
        </div>
        <v-row v-else> Redes Sociais: Não possui. </v-row>
      </v-card-text>
      <v-divider class="mb-2"></v-divider>
      <v-card-actions>
        <v-btn color="primary" dark @click="dialog = true">
          Ver Despesas
        </v-btn>

        <choose-year v-model="dialog" v-on:dialogChange="close" :allYears='allYears' :dialog="dialog" ></choose-year>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {
  YoutubeIcon,
  TwitterIcon,
  InstagramIcon,
  FacebookIcon,
} from 'vue-feather-icons'
import { mapState } from 'vuex'
import ChooseYear from'~/components/ChooseYear.vue'
export default {
  data() {
    return {
      dialogm1: '',
      dialog: false,
      selectedYear: '',
    }
  },
  props: {
    ChooseYear
  },
  filters: {
    birtDateFormatter(value) {
      if (value) return value.split('-').reverse().join('/')
    },
    lastUpdateFormatter(value) {
      if (value) return value.split('T')[0].split('-').reverse().join('/')
    },
  },
  async fetch({ error, store, params }) {
    try {
      const id = params.id
      await store.dispatch('deputados/setPolitician', id)
    } catch (err) {
      error({
        message: err.message,
        statusCode: err.statusCode,
      })
    }
  },
  components: {
    YoutubeIcon,
    TwitterIcon,
    InstagramIcon,
    FacebookIcon,
  },
  computed: {
    openDialog(){
      return this.dialog = true
    },
    socialMedia() {
      if (this.politicianInfo?.redeSocial) {
        const redeSocial = this.politicianInfo?.redeSocial
        const twitter = redeSocial.find((r) => r.includes('twitter'))
        const youtube = redeSocial.find((r) => r.includes('youtube'))
        const instagram = redeSocial.find((r) => r.includes('instagram'))
        const facebook = redeSocial.find((r) => r.includes('facebook'))
        return { twitter, youtube, instagram, facebook }
      }
      return null
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
    ...mapState('deputados', ['politicianInfo']),
  },
  methods: {
    close(){
      this.dialog = false
    }
  },
}
</script>

<style scoped>
p,
ul,
li {
  margin: 0;
}
ul {
  padding: 0;
}
.subtitle {
  font-size: bold;
  font-size: 18px;
}
li {
  padding: 0 0 0 8px;
  list-style: none;
}
.photo {
  object-fit: cover;
}
.subheader{
  height: 10px;
}
.socialMedia {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0 0;
}
</style>
