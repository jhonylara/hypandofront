<template>
  <div>
    <SteamSearch v-if="showSteamSearch" @gameSelectedToImport="gameSelectedToImport"/>
    <GameForm  v-if="showGameForm" :gameSelected="gameSelected" :key="formKey" @formFinished="formFinished"/>
  </div>
</template>

<script>
import SteamSearch from "@/components/campaign/game/SteamSearch"
import GameForm from "@/components/campaign/game/GameForm"
import ImportsEnum from "@/enums/ImportsEnum.js"

export default {
  name: "GameRegister",
  props: {
    customProp: Object
  },
  components: {
    SteamSearch,
    GameForm
  },
  data() {
    return {
      showSteamSearch: false,
      showGameForm: false,
      gamesIsLoaded: false,
      gameSelected: null,
      formKey: 1,
    }
  },
  mounted() {
    if (this.customProp.contents.importType === ImportsEnum.STEAM_IMPORT) {
      this.showSteamSearch = true
    } else {
      this.showGameForm = true
    }
  },
  methods: {
    gameSelectedToImport(gameSelected) {
      this.showGameForm = false
      this.gameSelected = gameSelected
      this.formKey = this.gameSelected.steam_appid
      this.showGameForm = true
    },
    formFinished(form) {

    }
  }
}


</script>

<style scoped>

</style>
