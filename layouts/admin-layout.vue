<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <div>
        <small>
          Usuario: <em>&mdash;{{ this.loggedInUser.name }}</em>
        </small>
        <br/>
        <small>
          Verificado <em>&mdash;{{ this.isAuthenticated }}</em>
        </small>
      </div>
      <sidenav/>

    </v-navigation-drawer>
    <v-main>
      <v-container md="auto">
        <v-card md="auto" style="background-color: #363636" max-width="1200px" class="justify-center mx-auto" >
          <Nuxt/>
        </v-card>
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
     FEITO POR LEIDINHA 💖 <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import sidenav from "@/components/layout/sidenav";
import { mapGetters } from 'vuex'

export default {
  name: 'admin-layout',
  components: {
    sidenav
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      miniVariant: false,
      right: true,
      title: 'Vuetify.js'
    }
  }
}
</script>
