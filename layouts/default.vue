<template>
  <v-app dark>
    <v-navigation-drawer
      class="navigation-drawer"
      v-model="drawer"
      :mini-variant="false"
      :clipped="false"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <nuxt-link to="/" class="link-text">
        <v-toolbar-title v-text="title" />
      </nuxt-link>
      <v-spacer />
      <v-toolbar-items v-if="rank.length" @click='bottomDrawer = !bottomDrawer ' ripple class="pointer">
        <v-icon>mdi-book</v-icon>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container class="center-content">
        <transition name="fade-slide" appear mode="out-in">
          <Nuxt />
        </transition>
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="bottomDrawer"
      :mini-variant="false"
      :clipped="false"
      class="z-index-max min-width-navigation-drawer"
      temporary
      fixed
      floating
      right
      bottom
      dark
    >
      <v-list density="compact" class="pa-3 history-subheader">
        Histórico de pesquisas
      </v-list>
      <v-expansion-panels
        multiple
      >
        <v-expansion-panel v-for="(data, index) in rank" :key="'panelIndex:' + index" class="pa-0">
          <v-expansion-panel-header class="expansion-header">Ano {{ data.ano }}</v-expansion-panel-header>
          <v-expansion-panel-content class="pa-0 ma-0" >
            <v-list 
              ripple
              class="d-flex align-center flex-wrap pa-0 my-4"
              v-for="(data, indexData) in data.data"
              :key="indexData"
            >
              <nuxt-link :to="'/deputado/' + data.id">
                <v-avatar left class="mr-4">
                  <img
                    class="cover"
                    :src="data.politicianData.img"
                    :alt="data.politicianData.name"
                  />
                </v-avatar>
              </nuxt-link>
              <div class="small-line-height text-max-width text-overflow-hidden">
                <p class="pa-0 ma-0 small-line-height small text-overflow-hidden">
                  {{ indexData + 1 }}° {{ data.politicianData.name }}
                </p>
                <p class="pa-0 ma-0 small small-line-height text-overflow-hidden">
                  {{ data.politicianData.partido }} -
                  {{ data.politicianData.siglaUf }}
                </p>
                <p class="mt-0 mb-0 pa-0 small small-line-height text-overflow-hidden">
                  Total Gasto: R$ {{ data.totalExpend | formatter }} - Visto: {{ data.lastTimeVisited }}
                </p>
              </div>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>

    <v-footer class="text-center move-up" :absolute="!fixed" app>
      <span
        >&copy; 2022 Criado por:
        <a
          href="https://github.com/gabrielrochasouza"
          class="link-text bold"
          target="_blanck"
        >
          Gabriel Rocha
        </a>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'DefaultLayout',
    data() {
      return {
        clipped: false,
        drawer: false,
        bottomDrawer: false,
        fixed: false,
        items: [
          {
            icon: 'mdi-apps',
            title: 'Selecionar Deputado',
            to: '/',
          },
          {
            icon: 'mdi-chart-bubble',
            title: 'Sobre o app',
            to: '/about',
          },
          {
            icon: 'mdi-book',
            title: 'Historico pesquisas',
            to: '/historico',
          },
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Expenses Watcher',
      }
    },
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
  .link-text {
    color: #fff;
    text-decoration: none;
  }
  .expansion-header {
    position: sticky;
    top: 47px;
    z-index: 10;
    background: #1e1e1e;
    left: 0;
  }
  @media (min-width: 1264px) {
    .min-width-navigation-drawer {
      min-width: 400px;
    }
  }
  .history-subheader {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 19;
    background:#292929 !important;
  }
  .pointer {
    cursor: pointer;
  }
  .text-overflow-hidden {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .text-max-width {
    max-width: calc(100% - 64px);
  }
  .overflow-auto {
    overflow: auto;
  }
  .small {
    font-size: 10px;
  }
  .small-line-height {
    line-height: 0.88rem;
  }
  .fade-slide-enter {
    opacity: 0;
    transform: translateX(200px);
  }
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: 1000ms all;
  }
  .fade-slide-leave-to {
    transform: translateX(-200px);
    opacity: 0;
  }
  .bold {
    font-weight: bold;
  }
  .subheader {
    height: 10px;
  }
  .center-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
  }
  .navigation-drawer {
    max-height: none !important;
    z-index: 10;
  }
  .move-up {
    z-index: 20;
  }
  .z-index-max {
    z-index: 30;
  }
</style>
