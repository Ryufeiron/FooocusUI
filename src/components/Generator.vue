<template>
  <div class="generator">
    <!-- Image Browser -->
    <div class="image-browser">
      <div v-if="generationStore.state.results.length" class="image-grid">
        <div v-for="(image, index) in generationStore.state.results" 
             :key="`${index}-${generationStore.state.version}`" 
             class="image-item"
             draggable="true"
             @dragstart="(event) => handleDragStart(image, event)">
          <el-image
            :src="image"
            :preview-src-list="generationStore.state.results"
            fit="contain"
            :alt="`Generated image ${index + 1}`"
            @load="() => console.log('Image loaded:', image)"
            @error="(e) => console.error('Image load error:', e)"
          />
        </div>
      </div>
      <div v-else class="image-placeholder">
        <p>No images to display. Start generating images to see them here.</p>
      </div>
    </div>

    <!-- Prompt Input and Generate Button -->
    <div class="prompt-section">
      <div class="form-group">
        <label for="prompt-textarea">Prompt</label>
        <div class="prompt-input-wrapper">
          <el-input
            id="prompt-textarea"
            v-model="localParams.prompt"
            type="textarea"
            :rows="4"
            placeholder="Type prompt here..."
            aria-label="Prompt input"
            @update:modelValue="updateParams"
            class="prompt-input"
          />
          <el-button
            type="primary"
            :loading="generationStore.state.isGenerating"
            class="generate-btn"
            :title="generationStore.state.isGenerating ? 'Generating...' : 'Generate image'"
            aria-label="Generate image"
            @click="handleGenerate"
          >
            {{ generationStore.state.isGenerating ? 'Generating...' : 'Generate' }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { GenerateParams } from '../types'
import { generationStore } from '@/stores/generationStore'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:7866'

const props = defineProps<{
  params: GenerateParams
  styles: any[] 
  models: any
  configs: any
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'update:params', value: Partial<GenerateParams>): void
  (e: 'update:styles', value: string[]): void
  (e: 'update:models', value: any): void
  (e: 'update:configs', value: any): void
  (e: 'generated', data: any): void
}>()

const localParams = reactive({ ...props.params })

const updateParams = () => {
  emit('update:params', localParams)
}

const getImageUrl = (path: string) => {
  if (path.startsWith('data:') || path.startsWith('http')) {
    return path
  }
  return `${API_BASE_URL}${path}`
}

const handleGenerate = async () => {
  if (!localParams.prompt) {
    ElMessage.warning('Please enter a prompt')
    return
  }

  try {
    console.log('Creating generation task...')
    const createTaskResponse = await fetch(`${API_BASE_URL}/api/create_task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(localParams)
    })

    if (!createTaskResponse.ok) {
      throw new Error('Failed to create generation task')
    }

    const { status } = await createTaskResponse.json()
    if (status !== 'ok') {
      throw new Error('Task creation failed')
    }

    console.log('Task created successfully. Starting SSE...')
    const eventSource = new EventSource(`${API_BASE_URL}/api/generate`)

    generationStore.state.isGenerating = true

    eventSource.onmessage = (event) => {
      try {
        console.log('Raw SSE message received:', event.data)

        const jsonStr = event.data.startsWith('data: ') ? event.data.slice(6).trim() : event.data.trim()
        const eventData = JSON.parse(jsonStr)
        console.log('Processing event:', eventData)

        switch (eventData.event) {
          case 'preview':
            console.log('Preview event received:', eventData)
            generationStore.state.preview.message = `${eventData.data.percentage}% - ${eventData.data.title}`
            break

          case 'results':
          case 'finish':
            console.log('Results/Finish event received:', eventData)
            if (eventData.data.images?.length) {
              const urls = eventData.data.images.map((url: string) => getImageUrl(url))
              generationStore.setResults(urls)
              if (eventData.event === 'finish') {
                generationStore.state.isGenerating = false
                eventSource.close()
              }
            }
            break
        }
      } catch (err) {
        console.error('Failed to process SSE message:', err)
        console.error('Problematic message:', event.data)
      }
    }

    eventSource.onerror = (err) => {
      console.error('SSE connection error:', err)
      console.error('EventSource readyState:', eventSource.readyState)
      eventSource.close()
      generationStore.state.isGenerating = false
      ElMessage.error('SSE connection error. Please check the server logs or network connection.')
    }
  } catch (error) {
    generationStore.state.isGenerating = false
    console.error('Generation error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Generation failed'
    ElMessage.error(errorMessage)
  }
}

const handleDragStart = (image: string, event: DragEvent) => {
  console.log('Drag start detected:', image)
  event.dataTransfer?.setData('text/plain', image)
}
</script>

<style scoped>
.generator {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  overflow: hidden;
}

.image-browser {
  flex: 0.7; /* Occupy 70% of the height */
  background: #f5f5f5;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-y: auto;
}

.image-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #909399;
  font-size: 16px;
  height: 100%;
}

.prompt-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.prompt-input-wrapper {
  display: flex;
  gap: 10px;
  align-items: stretch;
}

.prompt-input {
  flex: 17;
}

.generate-btn {
  flex: 3;
  height: auto;
  white-space: nowrap;
}
</style>
