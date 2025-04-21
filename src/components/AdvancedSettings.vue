<template>
  <div class="advanced-settings">
    <div class="header">
      <h3>Advanced Settings</h3>
    </div>
    <el-form label-position="top" @update:modelValue="updateParams">
      <el-form-item label="Performance" for="performance-select">
        <el-select
          id="performance-select"
          v-model="params.performance_selection" 
          class="full-width"
        >
          <el-option
            v-for="perf in configs.performance_selections"
            :key="perf"
            :label="perf"
            :value="perf"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Resolution" for="resolution-select">
        <el-select 
          id="resolution-select"
          v-model="params.aspect_ratios_selection" 
          class="full-width"
        >
          <el-option
            v-for="ratio in configs.aspect_ratios"
            :key="ratio"
            :label="ratio"
            :value="ratio"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Guidance Scale" for="guidance-slider">
        <el-slider
          id="guidance-slider"
          v-model="params.guidance_scale"
          :min="1"
          :max="20"
          :step="0.1"
        />
      </el-form-item>

      <el-form-item label="Sharpness" for="sharpness-slider">
        <el-slider
          id="sharpness-slider"
          v-model="params.sharpness"
          :min="0"
          :max="30"
          :step="0.1"
        />
      </el-form-item>

      <el-form-item label="Seed" for="seed-input">
        <el-input-number
          id="seed-input"
          v-model="params.image_seed"
          :min="-1"
          :max="2147483647"
          class="full-width"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { GenerateParams } from '@/types/api.types';
import { defineProps, watch, reactive } from 'vue'

const props = defineProps<{
  params: GenerateParams

  styles: any[] 
  models: any
  configs: any
}>()

const emit = defineEmits<{
  (e: 'update:params', value: Partial<GenerateParams>): void
  (e: 'update:styles', value: string[]): void
  (e: 'update:models', value: any): void
  (e: 'update:configs', value: any): void
}>()

const localParams = reactive({ ...props.params })
watch(() => props.params, (newParams) => {
  Object.assign(localParams, newParams)
}, { deep: true })

const updateParams = () => {
  emit('update:params', localParams)
}
</script>

<style scoped>
.advanced-settings {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #fff;
  overflow-y: auto;
}

.header {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}

.full-width {
  width: 100%;
}
</style>
