<template>
  <div class="pt-5 pb-15">
    <div class="mx-auto mb-4">
      <v-card-text class="text-h3 font-weight-light text-center">
        COMO DESEJA INICIAR SUA JORNADA?
      </v-card-text>
    </div>
    <v-row>
      <v-col cols="6">
        <v-hover v-slot="{ hover }">
        <v-card @click="selectedImportType(importType.CREATE_NEW)" class="mx-auto" color="#482e6e" dark max-width="500" :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
          <v-card-title>
            <v-icon large left>
              mdi-note-plus
            </v-icon>
            <span class="text-h5 font-weight-bold">MANUALMENTE</span>
          </v-card-title>

          <v-card-text class="text-h5 font-weight-light text-left">
            " Preencha os detalhes e imagens do jogo manualmente do zero!"
          </v-card-text>
          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar>
                <v-img class="elevation-6" alt=""
                       src="https://pbs.twimg.com/profile_images/1323351779560558593/5JRd5DSM_400x400.jpg"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title  class="text-left">HARD MODE</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card-actions>
        </v-card>
        </v-hover>
      </v-col>
      <v-col cols="6">
        <v-hover v-slot="{ hover }">
        <v-card @click="selectedImportType(importType.STEAM_IMPORT)"  class="mx-auto" color="#1e6127" dark max-width="500" :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
          <v-card-title class="text-right justify-end" >
            <span class="text-h5 font-weight-bold">IMPORTAR DA STEAM</span>
            <v-icon large right>
              mdi-steam
            </v-icon>
          </v-card-title>

          <v-card-text class="text-h5 font-weight-light text-right">
            "Pesquise um jogo já publicado na steam e importe para edita-lo, simples!"
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-list-item class="grow">
              <v-list-item-content >
                <v-list-item-title class="text-right">EASY MODE</v-list-item-title>
              </v-list-item-content>
              <v-list-item-avatar color="grey darken-3 ">
                <v-img
                  class="elevation-6"
                  alt=""
                  src="https://tm.ibxk.com.br/bj/images/highlights/000/026/388/main_normal_26388.jpg?ims=704x264"
                ></v-img>
              </v-list-item-avatar>
            </v-list-item>
          </v-card-actions>
        </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ImportsEnum from "@/enums/ImportsEnum.js"
import GameStepsEnum from "@/enums/GameStepsEnum.js"
import CustomEvent from "@/dtos/CustomEvent.js"


export default {
  name: "SelectMethodStep",
  mounted() {
    this.importType = ImportsEnum
  },
  data () {
    return {
      importType: ImportsEnum,
    }
  },
  methods: {
    selectedImportType(type) {
      let event = new CustomEvent(
        true,
        GameStepsEnum.GAME_CREATION,
        {
          importType: type
        }
      )
      this.$emit('customEvent', event)
    }
  }
}
</script>

<style scoped>
.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

</style>
