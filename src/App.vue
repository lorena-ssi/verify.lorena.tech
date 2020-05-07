<template>
  <v-app>
    <v-overlay :value="$store.state.loading">
      <v-progress-circular indeterminate size="32"></v-progress-circular>
    </v-overlay>
    <v-app-bar
      app
      color="#1D8DCF"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Lorena Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/logo.png')"
          transition="scale-transition"
          width="180"
        />
      </div>

      <v-spacer></v-spacer>
      <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                icon
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in menuItems"
                :key="i"
                @click="$router.push({name: item.link}).catch(e=>{})"
              >
                <v-list-item-title >{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    menuItems: [
      { title: 'Verify credential', link: 'Home' },
      { title: 'Symmetric encryption', link: 'Encryption' }
    ]
  })
}
</script>
