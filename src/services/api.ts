import type { GenerateRequest, GenerateResponse, ImageInfo } from '../types/api'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7866'

export async function generateImages(params: GenerateRequest): Promise<GenerateResponse> {
    const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || 'Failed to generate images')
    }

    const data = await response.json()
    return {
        ...data,
        // Keep URLs relative
        images: data.images.map((img: string) => img.startsWith('/') ? img : `/${img}`)
    }
}

export async function getImages(): Promise<ImageInfo[]> {
    const response = await fetch('/api/images')
    if (!response.ok) {
        throw new Error('Failed to fetch images')
    }
    return response.json()
}
