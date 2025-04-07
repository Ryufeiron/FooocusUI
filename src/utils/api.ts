import type { GenerateParams } from '@/types'

export async function fetchEventSource(url: string, params: GenerateParams, callbacks: {
    onMessage: (data: any) => void
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
                    console.error('Failed to parse SSE message:', error)
                }
            }
        }
    }
}
