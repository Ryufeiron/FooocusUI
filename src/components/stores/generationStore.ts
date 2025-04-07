import { reactive } from 'vue'

export const generationStore = {
    state: reactive({
        isGenerating: false,
        preview: {
            image: null as string | null,
            message: ''
        },
        results: [] as string[],
        version: 0
    }),

    reset() {
        console.log('Resetting state...')
        Object.assign(this.state, {
            isGenerating: false,
            preview: { image: null, message: '' },
            results: [],
            version: this.state.version + 1
        })
        console.log('State after reset:', JSON.stringify(this.state, null, 2))
    },

    setPreview(image: string | null, message: string) {
        console.log('Setting preview:', { image, message })
        this.state.preview.image = image
        this.state.preview.message = message
        this.state.version++
        console.log('State after setting preview:', JSON.stringify(this.state, null, 2))
    },

    setResults(urls: string[]) {
        console.log('Setting results:', urls)
        this.state.results = [...urls] // Ensure reactivity by creating a new array
        this.state.version++
        console.log('State after setting results:', JSON.stringify(this.state, null, 2))
    }
}
