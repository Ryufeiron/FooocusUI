<template>
  <div class="home-view">
    <div :class="['main-container', { 'with-advanced': showAdvancedSettings }]">
      <!-- Left Side: Generator, Checkboxes, and InputImagePanel -->
      <div class="left-side">
        <div :class="['generator-container', { 'with-input-panel': showInputImagePanel }]">
          <Generator
            :params="generatorParams"
            @update:params="updateParams"
            @generated="handleGenerated"
          />
          <!-- Checkbox Panel -->
          <div class="checkbox-panel">
            <el-checkbox v-model="generatorParams.input_image_checkbox">Input Image</el-checkbox>
            <el-checkbox v-model="showAdvancedSettings">Advanced</el-checkbox>
          </div>
        </div>
        <div v-if="generatorParams.input_image_checkbox" class="input-image-panel-wrapper">
          <InputImagePanel
          :params="generatorParams"
          @update:params="updateParams"
          />
        </div>
      </div>

      <!-- Right Side: AdvancedSettings -->
      <div v-if="showAdvancedSettings" class="advanced-settings">
        <AdvancedSettings
          :params="generatorParams"
          :configs="configs"
          :styles="styles"
          :models="models"
          @update:params="updateParams"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import Generator from '@/components/Generator.vue'
import AdvancedSettings from '@/components/AdvancedSettings.vue'
import InputImagePanel from '@/components/InputImagePanel.vue'
import { api } from '@/services/api'
import type { GenerateParams } from '@/types/api.types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:7866'

const showInputImagePanel = ref(false)
const showAdvancedSettings = ref(false)
const enhanceEnabled = ref(false) // State for Enhance checkbox
const configs = ref({})
const styles = ref([])
const models = ref([])
const generatorParams = reactive<GenerateParams>({
  prompt: '',
  negative_prompt: '',
  style_selections: [],
  performance_selection: 'Speed', // 确保初始值为 Speed
  aspect_ratios_selection: '1152×896',
  image_number: 1,
  image_seed: -1,
  sharpness: 2.0,
  guidance_scale: 4.0,
  base_model_name: '',
  refiner_model_name: 'None',
  loras: [],
  input_image_checkbox: false,
  current_tab: 'uov', // Default tab
  uov_input_image: null,
  uov_method: 'Disabled',

  // ControlNet Parameters
  // controlnet_softness: 0.5,
  // canny_low_threshold: 100,
  // canny_high_threshold: 200,

  // FreeU Parameters
  // freeu_enabled: false,
  // freeu_b1: 0,
  // freeu_b2: 0,
  // freeu_s1: 0,
  // freeu_s2: 0,

  // Inpainting Parameters
  // inpaint_engine: null,
  // inpaint_mask: null,
  inpaint_strength: 0.5,
  // inpaint_respective_field: 0.5,
  inpaint_input_image: null
})

// 添加状态变量
const showPreview = ref(false)
const showResults = ref(false)
const showGallery = ref(false)
const previewImage = ref<string | null>(null)
const progressHTML = ref('')
const currentResults = ref<string[]>([])
const intermediateResults = ref<string[]>([])

const updateParams = (newParams: Partial<GenerateParams>) => {
  Object.assign(generatorParams, newParams)
}

// 添加生成事件处理
const handleGenerated = (data: any) => {
  console.log('Received generation event:', data)
  
  switch (data.event) {
    case 'preview':
      showPreview.value = true
      showResults.value = false
      showGallery.value = false
      previewImage.value = data.data.image
      progressHTML.value = `<div class="progress-text">${data.data.percentage}% - ${data.data.title}</div>`
      break

    case 'results':
      showPreview.value = false
      showResults.value = true
      showGallery.value = false
      intermediateResults.value = data.data.images.map((url: string) => `${API_BASE_URL}${url}`)
      break

    case 'finish':
      showPreview.value = false
      showResults.value = false
      showGallery.value = true
      currentResults.value = data.data.images.map((url: string) => `${API_BASE_URL}${url}`)
      ElMessage.success('Generation completed')
      break
  }
}

onMounted(async () => {
  try {
    const [stylesRes, modelsRes, configsRes] = await Promise.all([
      fetch(`${API_BASE_URL}/api/styles`),
      fetch(`${API_BASE_URL}/api/models`),
      fetch(`${API_BASE_URL}/api/configs`)
    ])

    // Check each response individually
    if (!stylesRes.ok || !modelsRes.ok || !configsRes.ok) {
      throw new Error(`API Error: ${!stylesRes.ok ? 'Styles ' : ''}${!modelsRes.ok ? 'Models ' : ''}${!configsRes.ok ? 'Configs ' : ''}failed to load`)
    }
    
    const [stylesData, modelsData, configData] = await Promise.all([
      stylesRes.json(),
      modelsRes.json(),
      configsRes.json()
    ])
    configs.value = configData
    styles.value = stylesData.styles
    models.value = modelsData.base_models

    // Set default values
    generatorParams.performance_selection = 'Speed'
    generatorParams.aspect_ratios_selection = configData.aspect_ratios[0] || '1152×896'
    generatorParams.base_model_name = modelsData.base_models[0] || ''
    generatorParams.style_selections = configData.default_settings.style_selections || []
    generatorParams.guidance_scale = parseFloat(configData.default_settings.guidance_scale || 4.0)
    generatorParams.sharpness = parseFloat(configData.default_settings.sharpness || 2.0)
    generatorParams.negative_prompt = configData.default_settings.negative_prompt || ''
  } catch (error: any) {
    console.error('API Error:', error)
    ElMessage.error(`Failed to load initial data: Please check if the API server is running at ${API_BASE_URL}`)
  }
})
</script>

<style scoped>
.home-view {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.main-container {
  display: flex;
  width: 100%;
  height: 100%;
  transition: width 0.3s ease;
}

.main-container.with-advanced {
  flex: 1;
}

.left-side {
  display: flex;
  flex-direction: column;
  flex: 1;
  transition: flex 0.3s ease;
}

.main-container.with-advanced .left-side {
  flex: 0.7; /* Left side occupies 70% when AdvancedSettings is visible */
}

.generator-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: flex 0.3s ease;
}

.generator-container.with-input-panel {
  flex: 0.7; /* Generator occupies 70% when InputImagePanel is visible */
}

.checkbox-panel {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  background: #f9f9f9;
  border-top: 1px solid #dcdcdc;
  width: 100%; /* Align width with generator-container */
}

.input-image-panel-wrapper {
  flex: 0.3; /* InputImagePanel occupies 30% when visible */
  overflow-y: auto;
  background: #f9f9f9;
  border-top: 1px solid #dcdcdc;
  transition: flex 0.3s ease;
}

.advanced-settings {
  flex: 0.3; /* Right side occupies 30% */
  height: 100%; /* Full height of the browser */
  background: #f5f5f5;
  border-left: 1px solid #dcdcdc;
  overflow-y: auto;
  transition: flex 0.3s ease;
}
</style>
