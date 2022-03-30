<template>
  <v-container>
    <v-form ref="form">
      <v-row>
        <v-col>
          <v-text-field
            v-model="newGame.name"
            label="Nome do jogo"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="newGame.url"
            label="Site externo"
            outlined
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="newGame.mediaKit"
            label="Media Kit"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>

        <v-col>
<!--          <item/>-->
<!--          <draggable v-for="(item, index) in images"-->
<!--                     v-model="images[index]"-->
<!--                     group="image"-->
<!--                     animation="150"-->
<!--                     selected-class="sortableSelected"-->
<!--                     ghost-class="imageGhost"-->
<!--                     @change="imagesChanged"-->
<!--                     tag="v-layout"-->
<!--                     class="sortableRow imageContainer"-->
<!--                     :component-data="{row: true}"-->
<!--                     :force-fallback="true"-->
<!--                     multi-drag>-->
<!--            <v-flex v-for="image in item" class="droppableImage" :key="image.path">-->
<!--              {{image}}-->
<!--            </v-flex>-->
<!--          </draggable>-->
        </v-col>
      </v-row>
      <div class="mb-2">
        <v-row>
          <v-col cols="3">
            <ImageUploader :new-image="newGame.image" :new-image-name="newGame.name"></ImageUploader>
          </v-col>
          <v-col cols="9">
            <v-autocomplete
              v-model="genresSelected"
              :items="genres"
              item-text="nome"
              item-value="id"
              outlined
              chips
              small-chips
              label="Selecionar Gêneros"
              multiple
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-btn
              x-large
              width="100%"
              outlined
              color="grey"
              class="mr-4"
              @click="showHtmlEditor = !showHtmlEditor">
              CRIAR DESCRIÇÃO
              <v-icon>{{ showHtmlEditor ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-slide-y-transition>
              <div v-show="showHtmlEditor">
                <HtmlEditor :disabled="false" :hide-structure="true" :html-value="newGame.description" :key="editorKey"/>
              </div>
            </v-slide-y-transition>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import HtmlEditor from '@/components/utils/HtmlEditor.vue'
import ImageUploader from '@/components/utils/ImageUploader';
// import item from '@/components/LeidaVerso/Item'

// import HypdoService from "@/services/HypdoService.js";
// const service = new HypdoService()
// import axios from "@/plugins/repository";

export default {
  name: 'RegisterGame',
  components: {
    HtmlEditor,
    ImageUploader,
    // item,
  },
  props: {
    gameSelected: Object
  },
  data: () => ({
    newGame: {
      steamId: 0,
      name: null,
      description: null,
      image: null,
      mediaKit: null
    },
    editorKey: 999999999,
    genres: [],
    genresSelected: [],
    showHtmlEditor: false,

    images: [[
      'Real-Time',
      'Audience',
      'Conversions',
    ],[
      'Real-Time2',
      'Audience2',
      'Conversions2',
    ]]
  }),
  mounted() {
    this.getGenres()
    console.log('mont')
    console.log(this.gameSelected)
    if (this.gameSelected) {
      this.initFormWithGameImported()
    }
    this.editorKey = 1352
  },
  methods: {
    async getGenres() {
      console.log('getGenres')
      // let response = await service.getGenres()
      let response = await this.$api.get('/genres')
      this.genres = response.data
      console.log(this.genres)
    },
    async initFormWithGameImported() {

      console.log('init')

      this.newGame.steamId = this.gameSelected.steam_appid
      this.newGame.name = this.gameSelected.name
      this.newGame.description = this.gameSelected.detailed_description
      this.newGame.image = this.gameSelected.header_image

      this.showHtmlEditor = true
    },
    importSteamGameInfo() {
      this.$emit("formFinished", this.newGame);
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>
