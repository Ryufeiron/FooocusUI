<template>
  <div
    class="custom-image"
    :class="{ 'drag-enabled': allowDrag }"
    @dragover.prevent="handleDragOver"
    @drop.prevent="handleDrop"
    @click="triggerFileInput"
  >
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      @change="handleFileChange"
      class="image-input"
    />
    <div v-if="!imageSrc" class="placeholder">
      <p>拖放图片至此处</p>
      <p>- 或 -</p>
      <p>点击上传</p>
    </div>
    <img v-if="imageSrc" :src="imageSrc" alt="Uploaded Image" class="image-preview" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  allowDrag: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

const imageSrc = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      imageSrc.value = reader.result as string
      emit('update:modelValue', imageSrc.value)
    }
    reader.readAsDataURL(file)
  } else {
    imageSrc.value = null
    emit('update:modelValue', null)
  }
}

const handleDragOver = () => {
  console.log('Drag over detected')
}

const handleDrop = (event: DragEvent) => {
  const file = event.dataTransfer?.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      imageSrc.value = reader.result as string
      emit('update:modelValue', imageSrc.value)
    }
    reader.readAsDataURL(file)
  } else {
    console.error('No file detected in drop event')
  }
}
</script>

<style scoped>
.custom-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px dashed #dcdcdc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}

.custom-image.drag-enabled {
  border-color: #409eff;
}

.image-input {
  display: none;
}

.placeholder {
  color: #909399;
  font-size: 14px;
  text-align: center;
  white-space: pre-line;
}

.image-preview {
  max-width: 100%;
  max-height: 200px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
}
</style>
