import type { GenerateParams, SSEEvent, APIResponse } from '@/types/api.types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:7866'

// Error handler helper
const handleResponse = async (response: Response) => {
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
    }
    return response.json()
}

// SSE stream handler
export async function fetchEventSource(url: string, params: GenerateParams, callbacks: {
    onMessage: (data: SSEEvent) => void
    onError: (error: any) => void
}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })

    if (!response.ok) {
        throw new Error('HTTP error ' + response.status)
    }

    const reader = response.body?.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (reader) {
        const { value, done } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
            if (line.startsWith('data: ')) {
                try {
                    const data = JSON.parse(line.slice(5))
                    callbacks.onMessage(data)
                } catch (error) {
                    callbacks.onError(error)
                }
            }
        }
    }
}

// Regular API endpoints with type safety
export const api = {
    getStyles: async (): Promise<string[]> => {
        return fetch(`${API_BASE_URL}/api/styles`)
            .then(handleResponse)
            .then(data => data.styles)
    },

    getModels: async () => {
        return fetch(`${API_BASE_URL}/api/models`)
            .then(handleResponse)
    },

    getConfigs: async () => {
        return fetch(`${API_BASE_URL}/api/configs`)
            .then(handleResponse)
    },

    createTask: async (params: GenerateParams): Promise<APIResponse> => {
        return fetch(`${API_BASE_URL}/api/create_task`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        }).then(handleResponse)
    },

    generate: async (params: GenerateParams): Promise<APIResponse> => {
        return fetch(`${API_BASE_URL}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        }).then(handleResponse)
    }
}
