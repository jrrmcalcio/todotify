<template>
  <v-app id="todotify">
    <v-navigation-drawer v-model="drawer" :mobile-breakpoint="768" app>
      <v-img
        class="pa-4 text-center"
        src="/assets/images/mountains.jpg"
        height="170"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
        <v-container fluid fill-height>
          <v-row justify="center">
            <v-avatar site="70" class="mb-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3yRn4mg9mp4jh8yTqzYpY0mskZKB-XXxM6A&usqp=CAU"
                alt="Todotify"
              />
            </v-avatar>
          </v-row>

          <v-row justify="center">
            <div class="white--text text-subtitle-1 font-weight-bold">
              Todotify
            </div>
          </v-row>

          <v-row justify="center">
            <div class="white--text text-subtitle-2">Track your to do list</div>
          </v-row>
        </v-container>
      </v-img>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      color="primary"
      dark
      src="/assets/images/mountains.jpg"
      app
      prominent
      :height="$route.path === '/' ? 238 : 170"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.9)"
        ></v-img>
      </template>

      <v-container class="header-container pa-0">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

          <v-spacer></v-spacer>

          <search />
        </v-row>

        <v-row>
          <v-toolbar-title class="ml-4 text-h4">
            {{ $store.state.appTitle }}
          </v-toolbar-title>
        </v-row>

        <v-row>
          <live-date-time />
        </v-row>

        <v-row v-if="$route.path == '/'">
          <field-add-task />
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <snackbar message="something" />
    </v-main>
  </v-app>
</template>

<script>
import Search from './components/tools/Search.vue'
import Snackbar from './components/global/Snackbar.vue'
import LiveDateTime from './components/tools/LiveDateTime.vue'
import FieldAddTask from '@/components/todo/FieldAddTask'

export default {
  components: { Snackbar, Search, LiveDateTime, FieldAddTask },

  data: () => ({
    drawer: false,
    items: [
      { title: 'Todo', icon: 'mdi-format-list-checks', to: '/' },
      { title: 'About', icon: 'mdi-help-box', to: '/about' },
    ],
  }),

  mounted() {
    this.$store.dispatch('getTasks')
  },
}
</script>

<style lang="sass">
.header-container
  max-width: none !important
</style>
