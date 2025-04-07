export interface GenerateRequest {
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
    refiner_switch: number
    loras: Array<{ name: string, weight: number }>
}

export interface ImageInfo {
    filename: string
    url: string
    created_at: number
}

export interface GenerateResponse {
    images: string[]
}
