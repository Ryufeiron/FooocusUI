export interface GenerateParams {
    prompt: string
    negative_prompt: string
    style_selections: string[]
    performance_selection: string
    aspect_ratios_selection: string
    image_number: number
    image_seed: number
    sharpness: number
    guidance_scale: number
    base_model_name: string
    refiner_model_name: string
    loras: Array<{ name: string; weight: number }>
    input_image: string | null
    uov_method: string | null
}

export interface GenerateResponse {
    images: string[];
    detail?: string;
}

export interface SSEPreviewData {
    percentage: number
    title: string
    image: string | null
}

export interface SSEResultsData {
    images: string[]
}

export interface SSEFinishData {
    images: string[]
    execution_time: number
}

export interface SSEEvent {
    event: 'preview' | 'results' | 'finish'
    data: SSEPreviewData | SSEResultsData | SSEFinishData
}
