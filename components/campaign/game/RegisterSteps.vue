<template>
  <div>
    <template>
      <v-stepper v-model="actualStep">
        <v-stepper-header>
          <template v-for="step in steps">
            <v-stepper-step :complete="step.complete" :step="step.step" color="amber">
              {{ step.title }}
            </v-stepper-step>
            <v-divider v-if="step.step < steps.length"/>
          </template>
        </v-stepper-header>
      </v-stepper>
    </template>
    <v-card class="mt-5 mb-5">
      <component @customEvent="customEvent" :custom-prop="customProp" v-bind:is="actualContent.content"/>
    </v-card>
    <v-card height="60px">
      <v-btn
        color="primary"
        @click="changeStep()"
      >
        Continue
      </v-btn>
      <v-btn text>Cancel</v-btn>
    </v-card>
  </div>
</template>
<script>
import SelectMethodStep from "./SelectMethodStep"
import GameStepsEnum from "@/enums/GameStepsEnum.js"
import CustomProp from "@/dtos/CustomProp.js"
import GameRegister from "@/components/campaign/game/GameRegister"

export default {
  name: "RegisterSteps",
  components: {
    SelectMethodStep,
    GameRegister
  },
  mounted() {
    this.actualContent = this.steps.at(this.actualStep-1)
  },
  data() {
    return {
      customProp: {},
      actualStep: 1,
      actualContent: [],
      steps: [
         {
          step: 1,
          complete: false,
          title: 'Criar',
          content: SelectMethodStep
        },
        {
          step: 2,
          complete: false,
          title: 'Detalhes',
          content: GameRegister
        },
        {
          step: 3,
          complete: false,
          title: 'Configurar'
        },
        {
          step: 4,
          complete: false,
          title: 'Upload de chaves'
        }
      ]
    }
  },
  methods: {
    changeStep() {
      this.actualStep++
      this.actualContent = this.steps.at(this.actualStep - 1)
    },
    customEvent(event) {
      this.stepsSwitch(event)
      if (event.next) {
        this.changeStep()
      }
    },
    startNewGameRegister(event) {
      this.customProp = new CustomProp(
        event.step,
        GameStepsEnum.GAME_CREATION,
        {importType: event.contents.importType}
      )
    },
    showCreationForm(event) {
      this.customProp = new CustomProp(
        event.step,
        GameStepsEnum.GAME_CREATION,
        {importType: event.importType}
      )
    },
    stepsSwitch(event) {
      switch (event.step) {
        case GameStepsEnum.GAME_CREATION:
          this.startNewGameRegister(event)
          break;
        case GameStepsEnum.GAME_DETAILS:
          this.showCreationForm(event)
          break;
        default:
      }
    }
  }
}
</script>

<style scoped>

</style>
