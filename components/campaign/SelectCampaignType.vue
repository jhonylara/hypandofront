<template>
  <div>
    <v-row>
      <v-col class="col-4">
        <v-card class="mx-auto" max-width="300">
          <div class="white--text align-end" style="height:150px; box-shadow: inset 0 0px 100px 0px #000000; background-image: url('https://www.jornalbomdia.com.br/tb_noticias/30683/games.png')">
            <v-card-title class="white--text align-end">COBERTURA DE JOGO</v-card-title>
          </div>

          <v-card-text class="text--primary">
            <div> Disponibilize chaves de jogos para streamers fazerem lives de seu jogo</div>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="sendToCreate()" color="orange" text>
              SELECIONAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col class="col-4">
        <v-card class="mx-auto" max-width="300">
          <div class="white--text align-end" style="height:150px; box-shadow: inset 0 0px 100px 0px #000000; background-position: center; background-image: url('https://www.acheiusa.com/wp-content/uploads/2021/09/Youtube.jpeg')">
            <v-card-title class="white--text align-end">VIDEO REVIEW</v-card-title>
          </div>

          <v-card-text class="text--primary">
            <div> Youtubers jogarão e farão videos sobre o seu jogo!</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text>
              SELECIONAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col class="col-4">
        <v-card class="mx-auto" max-width="300">
          <div class="white--text align-end" style="height:150px; box-shadow: inset 0 0px 100px 0px #000000; background-position: center; background-image: url('https://images.twinkl.co.uk/tw1n/image/private/t_630/u/ux/article-wiki_ver_2.png')">
            <v-card-title class="white--text align-end">ESCRITA DE ARTIGO</v-card-title>
          </div>

          <v-card-text class="text--primary">
            <div> Sites e curadores escreverão artigos e reviews sobre seu jogo</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text>
              SELECIONAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SelectMethodStep from "@/components/campaign/game/SelectMethodStep";

export default {
  name: "SelectCampaignType",
  components: {
    SelectMethodStep
  },
  methods:{
    sendToCreate() {
      this.$router.push('/business/campaign/create')
    }
  }
}
</script>

<style scoped>

</style>
