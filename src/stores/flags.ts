export const uovList = [
    'Disabled',
    'Vary (Subtle)',
    'Vary (Strong)',
    'Upscale (1.5x)',
    'Upscale (2x)',
    'Upscale (Fast 2x)'
]

export const ipList = ['ImagePrompt', 'PyraCanny', 'CPDS', 'FaceSwap'] // Matches webui.py's ip_list
export const defaultIp = 'ImagePrompt' // Matches webui.py's default_ip
export const defaultParameters = {
    ImagePrompt: [0.5, 0.6],
    FaceSwap: [0.9, 0.75],
    PyraCanny: [0.5, 1.0],
    CPDS: [0.5, 1.0]
} // Matches webui.py's default_parameters

export const inpaintOptions = [
    'Inpaint or Outpaint (default)',
    'Improve Detail (face, hand, eyes, etc.)',
    'Modify Content (add objects, change background, etc.)'
] // Matches the inpaint_options in webui.py
