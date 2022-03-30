<template>
  <v-container>
    <v-form ref="search" v-model="valid" lazy-validation >
      <v-row>
        <v-col cols="1" >
<!--          <v-container fill-height fluid>-->
<!--            Importar da STEAM-->
<!--          </v-container>-->
        </v-col>
        <v-col cols="8">
          <v-autocomplete
            v-model="gameSelected"
            :items="gamesSearched"
            :loading="isLoading"
            :search-input.sync="userSearchInput"
            :rules="empty"
            :disabled="isSearching || waitingServerResponse"
            color="white"
            hide-no-data
            hide-selected
            item-text="name"
            item-value="appid"
            label="Procure um jogo"
            placeholder="Qualquer um menos monster hunter ;)"
            prepend-icon="mdi-steam"
          ></v-autocomplete>
        </v-col>
        <v-col cols="1">
        </v-col>
        <v-col cols="2">
          <v-btn
            :disabled="!valid || isSearching || waitingServerResponse"
            :loading="isSearching"
            x-large
            width="100%"
            outlined
            color="amber"
            class="mr-4"
            @click="importSteamGameInfo()"
          >
            IMPORTAR
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-progress-linear
      :active="waitingServerResponse"
      indeterminate
      color="cyan"
    ></v-progress-linear>
  </v-container>
</template>

<script>
import HypdoService from "@/services/HypdoService.js";
const service = new HypdoService()

export default {
  name: 'SteamSearch',
  data: () => ({
    userSearchInput: null,
    waitingServerResponse: false,
    isLoading: false,
    gamesSearched: [],
    gameSelected: false,
    isSearching: false,
    gamesList: [],
    valid: true,
    empty: [
      v => !!v || 'Precisamos que você escolha um jogo 😉'
    ],
    select: null
  }),
  mounted() {
    this.getSteamGameList()
  },
  watch: {
    userSearchInput(textInput) {
      if ((textInput === null || textInput === '') || textInput.length < 3 ) {
        this.gamesSearched = null
        return
      }
      setTimeout('', 500);

      if (this.isLoading) return

      this.isLoading = true
      this.gamesSearched = this.findGameByName(textInput)
      this.isLoading = false
    },
  },
  methods: {
    findGameByName(textInput) {
      if(this.gamesList.empty){
        return
      }
      return this.gamesList.filter(function (game) {
        return game.name.toLowerCase().includes(textInput.toLowerCase())
      }).map(function (game) {
        return game
      });
    },
    async getSteamGameList() {
      this.waitingServerResponse = true
      let response = await service.getAllSteamGameList()
      this.gamesList = response.data.applist.apps
      this.waitingServerResponse = false
    },
    async importSteamGameInfo() {
      console.log('this.gameSelected')
      console.log(this.gameSelected)
      if(!this.$refs.search.validate()){
        return
      }
      this.isSearching = true

      let response = await service.getSteamGameInfo(this.gameSelected)

      this.gameSelectedInfo = response.data.data

      this.isSearching = false

      this.$emit("gameSelectedToImport", this.gameSelectedInfo);
    },
  },
}
</script>
