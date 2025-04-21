<template>
  <div class="tab-content">
    <div class="image-prompt-section">
      <div class="image-grid">
        <div
          v-for="(_, index) in ipImages"
          :key="index"
          class="image-item"
        >
          <CustomImage
            v-model="ipImages[index]"
            label="Image"
            :allow-upload="true"
            :allow-drag="true"
            :show-label="false"
            class="custom-image"
          />
          <div v-if="advancedMode" class="advanced-controls">
            <el-row>
              <el-col :span="12">
                <el-slider
                  v-model="ipStops[index]"
                  :min="0.0"
                  :max="1.0"
                  :step="0.001"
                  label="Stop At"
                />
              </el-col>
              <el-col :span="12">
                <el-slider
                  v-model="ipWeights[index]"
                  :min="0.0"
                  :max="2.0"
                  :step="0.001"
                  label="Weight"
                />
              </el-col>
            </el-row>
            <el-radio-group
              v-model="ipTypes[index]"
              class="type-selection"
            >
              <el-radio
                v-for="type in ipTypeChoices"
                :key="type"
                :label="type"
              >
                {{ type }}
              </el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div>
        <el-checkbox v-model="advancedMode" @change="handleAdvancedModeChange" label="Advanced" />        
      </div>
      
    </div>
    <div class="documentation">
      <p>
        * "Image Prompt" is powered by Fooocus Image Mixture Engine (v1.0.1).
        <el-link
          href="https://github.com/lllyasviel/Fooocus/discussions/557"
          target="_blank"
        >
          📔 Documentation
        </el-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import CustomImage from '@/components/CustomImage.vue'
import { ipList, defaultIp, defaultParameters } from '@/stores/flags'

const ipImages = ref(Array(4).fill(null)) // Default 4 image slots
const ipTypes = ref(ipImages.value.map(() => defaultIp))
const ipStops = ref(ipImages.value.map(() => defaultParameters[defaultIp][0]))
const ipWeights = ref(ipImages.value.map(() => defaultParameters[defaultIp][1]))
const ipTypeChoices = ipList
const advancedMode = ref(false)

const emit = defineEmits<{
  (e: 'update', value: { ipImages: string[]; ipTypes: string[]; ipStops: number[]; ipWeights: number[] }): void
}>()  

watch([ipImages, ipTypes, ipStops, ipWeights], ([newImages, newTypes, newStops, newWeights]) => {
  emit('update', {
    'ipImages': newImages,
    'ipTypes': newTypes,
    'ipStops': newStops,
    'ipWeights': newWeights
  })
})

const handleAdvancedModeChange = () => {
  if (!advancedMode.value) {
    ipTypes.value = ipImages.value.map(() => defaultIp)
    ipStops.value = ipImages.value.map(() => defaultParameters[defaultIp][0])
    ipWeights.value = ipImages.value.map(() => defaultParameters[defaultIp][1])
  }
}
</script>

<style scoped>
.tab-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.image-prompt-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
  gap: 20px;
}

.image-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.advanced-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.type-selection {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.documentation {
  font-size: 14px;
  color: #909399;
}
</style>
