<template>
  <v-row>
    <v-col>
      <v-card max-width="600px" class="mx-auto mt-8 pb-2">
        <v-card-title class="pa-4"> Sobre essa aplicação </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p>
            Essa aplicação foi feita utilizando o framework vue.js 2 junto com
            vuex (gerenciador de estado), vuetify (para customizar), axios (para
            fazer as requisições para api) e nuxt.js.
          </p>
          <p>
            E essa aplicação consume a api de dados abertos. O link para a
            documentação está abaixo:
          </p>
          <p>
            <a
              href="https://dadosabertos.camara.leg.br/swagger/api.html"
              title="Link da api utilizada"
              >Link da documentação da API de dados abertos
            </a>
          </p>
          <p>
            O intuito dessa aplicação é treinar e exercitar as habilidade usando
            o framework vue.js e consumir uma api e mostrar de maneira mais
            fácil e intuitiva os gastos dos deputados brasileiros.
          </p>
          <p>
            Caso queira ver o repositório da aplicação e fazer alguma crítica
            construtiva, ou caso encontre um bug, eu deixarei o link do
            repositório no github, e meu linkedin Caso queira entrar em contato
            comigo.
          </p>
        </v-card-text>
        <div class="text-center mb-2 links">
          <a href="https://github.com/gabrielrochasouza/expenses-watcher" class="mr-2 mb-4" target="_blanck">
            <github-icon />
          </a>
          <a href="https://www.linkedin.com/in/gabriel-da-rocha-de-souza/" class="ml-2 mb-4" target="_blanck">
            <linkedin-icon />
          </a>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { GithubIcon, LinkedinIcon } from 'vue-feather-icons'
export default {
  name: 'InspirePage',
  components: {
    GithubIcon,
    LinkedinIcon,
  },
}
</script>

<style scoped>
  .links a {
    border: 1px solid;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    padding: 6px;
    width: 36px;
    height: 36px;
    transition: 1s all;
  }
  .links a:hover {
    transform: scale(1.2);
    transition: 1s all;
    color: #fff;
  }
</style>