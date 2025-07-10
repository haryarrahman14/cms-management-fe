<template>
  <v-card flat class="pa-2">
    <label class="text-subtitle-2 font-weight-medium mb-1 d-block">{{ label }}</label>
    <QuillEditor
      content-type="html"
      v-model:content="model"
      :options="editorOptions"
      style="height: 250px"
    />
  </v-card>
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const props = defineProps({
  modelValue: String,
  label: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const model = defineModel()

const editorOptions = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, false] }],
      ['link'],
    ],
  },
}
</script>
