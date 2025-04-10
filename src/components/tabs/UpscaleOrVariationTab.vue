<template>
  <div class="tab-content">
    <div class="upload-section">
      <div class="left-panel">
        <CustomImage
          v-model="uploadedImage"
          label="Image"
          :allow-upload="true"
          :allow-drag="true"
          :show-label="false"
          class="custom-image"
        />
      </div>

      <div class="right-panel">
        <div>
          <label class="radio-group-label">Upscale or Variation:</label>
          <el-radio-group v-model="uovMethod" class="uov-method">
            <el-radio
              v-for="method in uovMethods"
              :key="method"
              :label="method"
            >
              {{ method }}
            </el-radio>
          </el-radio-group>
          <el-link
            href="https://github.com/lllyasviel/Fooocus/discussions/390"
            target="_blank">
            📔 Documentation
          </el-link>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue'
import CustomImage from '@/components/CustomImage.vue'
import { uovList } from '@/stores/flags' // Import uov_list from flags.js

const emit = defineEmits<{
  (e: 'update', value: { uovMethod: string; uploadedImage: string | null }): void
}>()

const uploadedImage = ref<string | null>(null) // Uploaded image
const uovMethods = ref(uovList) // Dynamically load choices from flags.js
const uovMethod = ref(uovList[0]) // Default value matches the first item in uov_list

watch([uploadedImage, uovMethod], ([newImage, newMethod]) => {
  emit('update', { uovMethod: newMethod, uploadedImage: newImage })
})
</script>

<style scoped>
.tab-content {
  margin-top: 10px;
}

.upload-section {
  display: flex;
  gap: 20px;
}

.left-panel {
  flex: 1;
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.radio-group-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.uov-method {
  display: flex;
  flex-direction: row; /* Arrange radio buttons horizontally */
  gap: 20px; /* Add spacing between radio buttons */
}
</style>
