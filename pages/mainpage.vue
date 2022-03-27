<template>
  <v-row>
    <v-col class="text-center">
      <img
        src="/v.png"
        alt="Vuetify.js"
        class="mb-5"
      >
      <blockquote class="blockquote">
        CARAIO A PRIMEIRA PAGINA MANO
        <footer>
          <small>
            <em>&mdash;{{ name}}</em>
          </small>
          <small>
            <em>&mdash;{{ email_verified }}</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'default',
  middleware: 'auth',
  name: 'InspirePage',
  mounted() {
    this.name = this.$auth.$state.user.email
    this.email_verified = this.$auth.$state.user.email_verified
  },
  data() {
    return {
      name: '',
      email_verified :'',
    }
  }
}
</script>
