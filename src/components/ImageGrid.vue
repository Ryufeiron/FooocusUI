<template>
  <div class="image-grid-container">
    <div v-if="images.length > 0" class="image-grid">
      <div v-for="(image, index) in images" 
           :key="index" 
           class="image-item">
        <el-image
          :src="image"
          fit="cover"
          :preview-src-list="images"
          :initial-index="index"
        >
          <template #placeholder>
            <div class="image-placeholder">
              <el-icon><Loading /></el-icon>
            </div>
          </template>
          <template #error>
            <div class="image-error">
              <el-icon><PictureRounded /></el-icon>
              <span>加载失败</span>
            </div>
          </template>
        </el-image>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loading, PictureRounded } from '@element-plus/icons-vue'

defineProps<{
  images: string[]
}>()
</script>

<style scoped>
.image-grid-container {
  padding: 20px;
  overflow-y: auto;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
  gap: 20px;
}

.image-item {
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f7fa;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.image-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
  font-size: 24px;
}

.image-error {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #909399;
  gap: 8px;
  font-size: 14px;
}

:deep(.el-image) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
