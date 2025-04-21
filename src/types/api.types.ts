// API Request/Response Types
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
    input_image_checkbox: boolean
    current_tab: string
    uov_method: string
    uov_input_image: string | null

    // Advanced Parameters
    // clip_skip: number
    // sampler: string
    // scheduler: string
    // vae: string

    // ControlNet Parameters
    // controlnet_softness: number
    // canny_low_threshold: number
    // canny_high_threshold: number

    // FreeU Parameters
    // freeu_enabled: boolean
    // freeu_b1: number
    // freeu_b2: number
    // freeu_s1: number
    // freeu_s2: number

    // Inpainting Parameters
    // inpaint_engine: string | null
    // inpaint_mask: string | null
    inpaint_strength: number
    // inpaint_respective_field: number
    inpaint_input_image: string | null
}

export interface GenerateResponse {
    images: string[];
    detail?: string;
}

export interface APIResponse {
    status: 'ok' | 'error'
    message?: string
    data?: any
}

// SSE Event Types
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

// Feature-specific Types
export interface ImagePromptParams {
    style_image?: string | null;
    target_image?: string | null;
    prompt_method: 'style' | 'target' | 'mixed';
}
