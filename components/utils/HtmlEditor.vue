<template>
  <Editor
    api-key="jwwax90ksmt9gz1rccnc9e2trt5qc19zjg7m5nrb7lfobryi"
    :disabled="disabled"
    :inline="hideStructure"
    :initial-value="(!htmlValue) ? html : htmlValue"
    :init="{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bWold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help'
      }"
    output-format="html"

  />
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  name: "HtmlEditor",
  components: {
    Editor
  },
  props: {
    disabled: Boolean,
    hideStructure: Boolean,
    htmlValue: String,
  },
  data () {
    return {
      html: '<h3 style="text-align: center;" data-mce-style="text-align: center;"> <img src="https://ia902905.us.archive.org/8/items/clickme_202004/tapme.gif" data-mce-src="https://ia902905.us.archive.org/8/items/clickme_202004/tapme.gif" data-mce-style="width: 250; heigth: 250;" width="211" height="218"> &lt;- É PERIGOSO IR <em>SOZINHO </em>USE ESSE <em>EDITOR&nbsp; </em> 😎</h3>'
    }
  }
}
</script>

<style scoped>

</style>


