<template>
  <div class="input-image-panel">
    <el-tabs v-model=localParams.current_tab class="tabs-container">
      <el-tab-pane label="Upscale or Variation" name="uov">
        <UpscaleOrVariationTab @update="updateParams" />
      </el-tab-pane>
      <el-tab-pane label="Image Prompt" name="ip">
        <ImagePromptTab @update="updateParams" />
      </el-tab-pane>
      <el-tab-pane label="Inpaint or Outpaint" name="inpaint">
        <InpaintOrOutpaintTab @update="updateParams" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { GenerateParams } from '@/types/api.types'
import UpscaleOrVariationTab from '@/components/tabs/UpscaleOrVariationTab.vue'
import ImagePromptTab from '@/components/tabs/ImagePromptTab.vue'
import InpaintOrOutpaintTab from '@/components/tabs/InpaintOrOutpaintTab.vue'

const props = defineProps<{
  params: GenerateParams
}>()

const emit = defineEmits<{
  (e: 'update:params', value: Partial<GenerateParams>): void
}>()

const localParams = reactive({ ...props.params })
watch(() => props.params, (newParams) => {
  Object.assign(localParams, newParams)
}, { deep: true })

const updateParams = (data: any) => {
  if ('uov_input_image' in data) {
    localParams.uov_input_image = data.uov_input_image
    localParams.uov_method = data.uov_method
  } else if ('ipImages' in data) {
    

  } else if ('inpaint_input_image' in data) {
    localParams.inpaint_input_image = data.inpaint_input_image
    localParams.inpaint_strength = data.inpaint_strength
  }
  emit('update:params', localParams)
}
</script>

<style scoped>
.input-image-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.tabs-container {
  width: 100%;
}
</style>
