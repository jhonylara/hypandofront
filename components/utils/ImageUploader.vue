<template>
  <v-col>
    <v-row>
      <v-text-field
        outlined
        label="Selecionar imagem"
        @click='selectImage'
        v-model='imageName'
      ></v-text-field>
      <input
        type="file"
        style="display: none"
        ref="hiddenImg"
        accept="image/*"
        @change="pickFile"
      >
    </v-row>
    <v-row class="justify-center" no-gutters>
    <v-img
      max-height="150"
      max-width="250"
      @click="pickFile"
      :src="previewImage"/>
    </v-row>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      previewImage: null,
      imageName: null
    };
  },
  props: {
    newImage: String,
    newImageName: String,
  },
  watch: {
    newImage: {
      handler (image) {
        this.previewImage = image
        this.imageName = this.newImageName
      },
      deep: true,
    },
  },
  methods: {
    selectImage () {
      this.$refs.hiddenImg.click()
    },
    pickFile (e) {
      let file = e.target.files
      if (file && file[0]) {
        let reader = new FileReader
        this.imageName = file[0].name
        reader.onload = e => {
          this.previewImage = e.target.result
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
      }
    }
  }
}
</script>

