<template>
  <v-container>
    <v-form ref="form">
      <v-row>
        <v-col>
          <v-text-field
            label="Qual o titulo da campanha?"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12">
          Quais plataformas de streaming serão aceitas?
        </v-col>
      </v-row>
      <v-row class="ma-6">
        <v-col class="col-2">
          <div class="d-inline">
            <v-badge
              bordered
              :color="youtubeEnable ? 'success' : 'error'"
              :icon="youtubeEnable ? 'mdi-check-bold' : 'mdi-window-close'"
              overlap
            >
              <v-btn
                class="white--text"
                color="red"
                :plain="!youtubeEnable"
                text
                depressed
                @click="youtubeEnable = !youtubeEnable"
              >
                <img width="30px" class="mr-3" src="@/static/youtube-svg.svg"/> YOUTUBE
              </v-btn>
            </v-badge>
          </div>
        </v-col>
        <v-col class="col-2">
          <v-badge
            bordered
            :color="twitchEnable ? 'success' : 'error'"
            :icon="twitchEnable ? 'mdi-check-bold' : 'mdi-window-close'"
            overlap
          >
            <v-btn
              class="white--text"
              color="purple"
              :plain="!twitchEnable"
              text
              depressed
              @click="twitchEnable = !twitchEnable"
            >
              <img width="20px" class="mr-3" src="@/static/twitch-svg.svg"/> TWITCH
            </v-btn>
          </v-badge>
        </v-col>
      </v-row>
      <v-row v-if="youtubeEnable || twitchEnable">
        <v-col class="col-12">
          <v-divider></v-divider>

          Criterios de aceite de criadores
        </v-col>
      </v-row>
      <v-row class="ma-6">
        <v-col cols="6">
          <PlatformConfiguration v-show="youtubeEnable" :platform-config="platformEnum.YOUTUBE" :key="platformEnum.YOUTUBE"/>
        </v-col>
        <v-col cols="6">
          <PlatformConfiguration v-show="twitchEnable" :platform-config="platformEnum.TWITCH" :key="platformEnum.TWITCH"/>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col>
          <v-switch
            v-model="hasDuration"
            label="Sua campanha tem data de inicio ou fim ?"
          ></v-switch>
        </v-col>
      </v-row>
      <v-slide-y-transition>
        <div v-show="hasDuration" class="ma-6">
          <v-row>
            <v-col class="col-12">
              Data e hora de inicio da campanha:
            </v-col>
            <v-col class="col-1 text-right">
              <v-divider vertical></v-divider>
            </v-col>
            <v-col class="col-6">
              <DateAndTime id="campainInitial"></DateAndTime>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="col-12">
              Data e hora de termino da campanha:
            </v-col>
            <v-col class="col-1 text-right">
              <v-divider vertical></v-divider>
            </v-col>
            <v-col class="col-6">
              <DateAndTime date-label="Data de termino" time-label="Hora de termino" id="campainEnding"></DateAndTime>
            </v-col>
          </v-row>
        </div>
      </v-slide-y-transition>
      <v-divider></v-divider>
      <v-row>
        <v-col>
          <v-switch
            v-model="hasEmbargo"
            label="Sua campanha tem data de embargo?"
          ></v-switch>
        </v-col>
      </v-row>
      <v-slide-y-transition>
        <div v-show="hasEmbargo" class="ma-6">
          <v-row>
            <v-col class="col-12">
              Data do embargo:
            </v-col>
            <v-col class="col-1 text-right">
              <v-divider vertical></v-divider>
            </v-col>
            <v-col class="col-6">

              <DateAndTime id="embargoDate"></DateAndTime>
            </v-col>
          </v-row>
        </div>
      </v-slide-y-transition>
      <v-divider></v-divider>
    </v-form>
  </v-container>
</template>

<script>
import DateAndTime from "@/components/utils/DateAndTime";
import PlatformConfiguration from "@/components/campaign/game/PlatformConfiguration";
import PlatformEnum from "@/enums/PlatformEnum.js";

export default {
  name: "GameCampaignDetails",
  components: {
    DateAndTime,
    PlatformConfiguration
  },
  data() {
    return {
      platformEnum: PlatformEnum,
      youtubeEnable: false,
      twitchEnable: false,
      hasDuration: false,
      hasEmbargo: false,
      date: null,
      time: null,
    }
  }
}
</script>


<style scoped>
i .v-icon {
  color: black !important;
}
</style>
