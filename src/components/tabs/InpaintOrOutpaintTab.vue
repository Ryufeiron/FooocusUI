<template>
  <div class="tab-content">
    <div class="upload-section">
      <CustomImage
        v-model="inpaint_image"
        label="Upload Image"
        :allow-upload="true"
        :allow-drag="true"
        :show-label="true"
        class="custom-image"
      />
    </div>
    <div class="mode-selection">
      <label class="dropdown-label">Inpaint or Outpaint Mode:</label>
      <el-select v-model="mode" placeholder="Select a mode">
        <el-option
          v-for="option in modes"
          :key="option"
          :label="option"
          :value="option"
        />
      </el-select>
    </div>
    <div class="sliders">
      <label class="slider-label">Strength:</label>
      <el-slider v-model="strength" :min="0" :max="1" :step="0.01" />
    </div>
    <div class="outpaint-selections">
      <label class="checkbox-group-label">Outpaint Directions:</label>
      <el-checkbox-group v-model="outpaintSelections">
        <el-checkbox label="Left" />
        <el-checkbox label="Right" />
        <el-checkbox label="Top" />
        <el-checkbox label="Bottom" />
      </el-checkbox-group>
    </div>
    <div class="documentation-link">
      <el-link href="https://github.com/lllyasviel/Fooocus/discussions/414" target="_blank">
        📔 Documentation
      </el-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue'
import CustomImage from '@/components/CustomImage.vue'
import { inpaintOptions } from '@/stores/flags'

const emit = defineEmits<{
  (e: 'update', value: any): void
}>()

const inpaint_image = ref<string | null>(null) // Uploaded image
const modes = inpaintOptions // Modes for Inpaint or Outpaint
const mode = ref(modes[0]) // Default selected mode
const strength = ref(0.5) // Strength for Inpaint
const outpaintSelections = ref<string[]>([]) // Selections for Outpaint

watch([inpaint_image, mode, strength, outpaintSelections], () => {
  emit('update', {
    'mode': mode.value,
    'strength': strength.value,
    'selections': outpaintSelections.value,
    'inpaint_image': inpaint_image.value
  })
})
</script>

<style scoped>
.tab-content {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.upload-section {
  margin-bottom: 10px;
}

.mode-selection {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dropdown-label {
  font-weight: bold;
}

.sliders {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.slider-label {
  font-weight: bold;
}

.outpaint-selections {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.checkbox-group-label {
  font-weight: bold;
}

.documentation-link {
  margin-top: 10px;
}

.custom-image {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
</style>
