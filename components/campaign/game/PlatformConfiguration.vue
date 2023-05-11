<template>
  <div>
    <v-card
      :style="`color: ${defaultConfig.textColor}`"
      class="mx-auto"
      :color="defaultConfig.cardColor"
      dark
      max-width="350"
      @click="dialog = true"
    >
      <v-card-title class="mx-auto align-center">

        <img width="30px" class="mr-3" :src="defaultConfig.icon" alt="te">
        <span class="text-h5 font-weight-bold text-uppercase">{{ defaultConfig.name }}</span>

      </v-card-title>

      <v-card-text class="text-h5 font-weight-bold" :style="`color: ${defaultConfig.textColor}`">
        <v-row no-gutters v-if="!validConfiguration">
          Você precisa configurar a campanha!
        </v-row>
        <v-row no-gutters v-else>
          <v-col cols="12">
            <small>Aprovação: </small> <small>{{
              platform.approvalType === approvalType.MANUAL ? 'Manual' : 'Automatico'
            }}</small>
          </v-col>
          <v-col cols="12" v-if="platform.approvalType === approvalType.MANUAL">
            <small>Responsavel: </small> <small>{{
              platform.approvalResponsible === approvalResponsible.CAMPAIGN_OWNER ? 'Dono da campanha' : 'Time da Hypando'
            }}</small>
          </v-col>
          <v-divider></v-divider>
          <v-col cols="12" v-if="platform.minCCV || platform.minFollows">
            <small>Criteria: </small> <br>
            <div v-if="platform.minCCV">
              <small class="ml-5">-CCV:</small> <small>{{ platform.minCCVCount }}</small> <br>
            </div>
            <div v-if="platform.minFollows">
              <small class="ml-5 text-uppercase">-{{ defaultConfig.viewLabel }}:</small>
              <small>{{ platform.minFollowsCount }}</small>
            </div>

          </v-col>
          <v-col cols="12">
            <small>Multiple Keys: </small> <small>{{ platform.allowMultipleKeys ? 'SIM' : 'NÃO' }}</small>
          </v-col>
          <v-col cols="12">
            <small>Coverage Text: </small> <small>{{ platform.allowCoverageText ? 'SIM' : 'NÃO' }}</small>
          </v-col>
        </v-row>
        <v-btn block>
          {{ !validConfiguration ? 'CLICK TO CONFIGURE' : 'CLICK TO EDIT' }}
        </v-btn>
      </v-card-text>

    </v-card>

    <v-dialog v-model="dialog" ref="platformDialog" persistent max-width="600px" :return-value.sync="platform">
      <v-form ref="platformConfiguration" >
        <v-card class="overflow-x-hidden">
          <v-card-title>
            <span class="text-h5">CONFIGURAR CAMPANHA PARA: TWITCH</span>
          </v-card-title>
          <hr>
          <v-alert
            v-show="hasError"
            text
            type="error"
            icon="mdi-alert"
          >
            Os campos em destaque são obrigatorios
          </v-alert>
          <v-container class="ma-2">
            <v-row>
              <v-col cols="12">
                Tipo de aprovação
                <v-radio-group v-model="platform.approvalType" row>
                  <v-radio
                    label="Automatica"
                    :value=approvalType.AUTOMATIC
                  ></v-radio>
                  <v-radio
                    label="Manual"
                    :value=approvalType.MANUAL
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-divider class="mb-2"/>
            <v-row v-if="platform.approvalType === approvalType.MANUAL" >
              <v-col cols="12">
                Responsavel pela aprovação
                <v-radio-group row v-model="platform.approvalResponsible" :rules="platform.approvalType === approvalType.MANUAL ? validation.radioRequired() : true">
                  <v-radio
                    label="Publisher Team"
                    :value=approvalResponsible.CAMPAIGN_OWNER
                  ></v-radio>
                  <v-radio
                    label="Hypando Team"
                    :value=approvalResponsible.HYPANDO_TEAM
                  ></v-radio>
                </v-radio-group>
                <v-divider/>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pb-0">
                Criterio minimo para solicitacao
              </v-col>
              <v-col cols="6">
                <v-row align="center" class="pl-3">
                  <v-checkbox
                    v-model="platform.minFollows"
                    hide-details
                    :rules="validateAutomaticMethod()"
                    class="shrink mr-2 mt-0"
                  ></v-checkbox>
                  <v-text-field-money
                    v-model="platform.minFollowsCount"
                    v-bind:properties="{
                        prefix: '',
                        suffix: '',
                        readonly: false,
                        disabled: !platform.minFollows,
                        outlined: false,
                        clearable: false,
                        placeholder: 'Media de follows',
                        rules: validateCheckboxValueMethod(platform.minFollows),
                      }"
                    v-bind:options="{
                      locale: 'en-us',
                      length: 3,
                      precision: 3,
                      empty: null,
                    }"
                  />
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row align="center" class="pl-3">
                  <v-checkbox
                    v-model="platform.minCCV"
                    :rules="validateAutomaticMethod()"
                    hide-details
                    class="shrink mr-2 mt-0"
                  ></v-checkbox>
                  <v-text-field-money
                    v-model="platform.minCCVCount"
                    v-bind:properties="{
                        prefix: '',
                        suffix: '',
                        readonly: false,
                        disabled: !platform.minCCV,
                        outlined: false,
                        clearable: false,
                        placeholder: 'Media de follows',
                        rules: validateCheckboxValueMethod(platform.minCCV),
                      }"
                    v-bind:options="{
                      locale: 'en-us',
                      length: 3,
                      precision: 3,
                      empty: null,
                    }"
                  />
                </v-row>
              </v-col>
            </v-row>
            <v-divider class="mt-2 mb-2"/>
            <v-row>
              <v-col cols="12">
                Outros:
                <v-switch
                  v-if="platform.approvalType === approvalType.MANUAL"
                  v-model="platform.allowCoverageText"
                  label="Usuario deve colocar seus planos de cobertura?"
                ></v-switch>
                <v-switch
                  v-model="platform.allowMultipleKeys"
                  label="Permitir solicitar mais de uma chave"
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click.prevent="submitForm()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>

</template>

<script>
import ApprovalResponsibleEnum from "@/enums/ApprovalResponsibleEnum.js"
import ApprovalTypeEnum from "@/enums/ApprovalTypeEnum.js"
import PlatformEnum from "@/enums/PlatformEnum.js";
import ValidationService from "@/services/ValidationService";

export default {
  name: "PlatformConfiguration",
  props: {
    platformConfig: String
  },

  mounted() {
    if (this.platformConfig) {
      this.changeConfig(this.platformConfig)
    }
  },
  data: () => ({
    approvalResponsible: ApprovalResponsibleEnum,
    approvalType: ApprovalTypeEnum,
    platformEnum: PlatformEnum,
    validation: new ValidationService(),

    platform: {
      approvalType: ApprovalTypeEnum.AUTOMATIC,
      approvalResponsible: null,
      minFollows: false,
      minFollowsCount: null,
      minCCV: false,
      minCCVCount: null,
      allowCoverageText: false,
      allowMultipleKeys: false,
    },

    dialog: false,
    hasError: false,
    validConfiguration: false,

    defaultConfig: {
      name: '',
      viewLabel: 'follows',
      icon: '',
      cardColor: 'white',
      textColor: 'black',
      buttonColor: 'red'
    },

    twitchConfig: {
      name: 'twitch',
      viewLabel: 'follows',
      icon: require('@/static/twitch-svg.svg'),
      cardColor: 'purple',
      textColor: 'black',
      buttonColor: 'black'
    },

    youtubeConfig: {
      name: 'youtube',
      viewLabel: 'follows',
      icon:  require('@/static/youtube-svg.svg'),
      cardColor: 'red',
      textColor: 'black',
      buttonColor: 'white'
    }
  }),
  methods: {
    submitForm () {
      if(!this.$refs.platformConfiguration.validate()) {
        this.hasError = true;
        return
      }

      this.validConfiguration = true,
      this.hasError = false;
      this.$refs.platformDialog.save(this.platform)
    },
    validateAutomaticMethod(){
      if(this.platform.approvalType === this.approvalType.MANUAL) {
        return []
      }
      return [
        (this.platform.minFollows || this.platform.minCCV) || "Selecione um metodo"
      ];
    },
    validateCheckboxValueMethod(checkbox) {
      if(!checkbox){
        return []
      }
      return [
        v => !!v || 'Valor é obrigatorio',
        v => (!isNaN(parseInt(v))) || 'Somente numeros',
        v => (v && v.length <= 9) || '999.999 É o maximo',
      ]
    },
    changeConfig(platform) {

      if (platform === PlatformEnum.TWITCH) {
        this.defaultConfig = this.twitchConfig;
      }

      if (platform === PlatformEnum.YOUTUBE) {
        this.defaultConfig = this.youtubeConfig;
      }

    }
  }
}
</script>

<style scoped>

</style>
