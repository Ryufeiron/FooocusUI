<script setup lang="ts">
defineProps<{
  visible: boolean
  image: string | null
}>()
</script>

<template>
  <div v-show="visible" class="preview-window">
    <el-image 
      v-if="image"
      :src="image"
      fit="contain"
      :preview-src-list="image ? [image] : []"
    />
  </div>
</template>

<style scoped>
.preview-window {
  width: 100%;
  height: 768px;
  background: #f5f7fa;
  border-radius: 8px;
  overflow: hidden;
}

:deep(.el-image) {
  width: 100%;
  height: 100%;
}
</style>
