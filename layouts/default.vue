<template>
  <v-app dark>
    <v-navigation-drawer
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
    </v-app-bar>
    <v-main>
      <v-container>
        <transition name="fade-slide" appear mode="out-in">
          <Nuxt />
        </transition>
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
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
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Selecionar Deputado',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Sobre o site',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Expenses Watcher',
    }
  },
}
</script>

<style scoped>
.link-text {
  color: #fff;
  text-decoration: none;
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
</style>
