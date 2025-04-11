<template>
  <div class="input-image-panel">
    <el-tabs v-model="activeTab" class="tabs-container">
      <el-tab-pane label="Upscale or Variation" name="upscale">
        <UpscaleOrVariationTab @update:image="handleImageUpdate" />
      </el-tab-pane>
      <el-tab-pane label="Image Prompt" name="image-prompt">
        <ImagePromptTab @update:image="handleImageUpdate" />
      </el-tab-pane>
      <el-tab-pane label="Inpaint or Outpaint" name="inpaint-outpaint">
        <InpaintOrOutpaintTab @update:image="handleImageUpdate" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UpscaleOrVariationTab from '@/components/tabs/UpscaleOrVariationTab.vue'
import ImagePromptTab from '@/components/tabs/ImagePromptTab.vue'
import InpaintOrOutpaintTab from '@/components/tabs/InpaintOrOutpaintTab.vue'

const activeTab = ref('upscale') // Default active tab

const emit = defineEmits<{
  (e: 'update:image', value: string | null): void
}>()

const handleImageUpdate = (image: string | null) => {
  emit('update:image', image)
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
