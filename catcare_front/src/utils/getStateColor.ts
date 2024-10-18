import { changeRgbLuminance } from './changeRgbLuminance'

type ComponentState = 'normal' | 'hover' | 'pressed' | 'focused'

const HOVER_LUMINANCE = 2.5
const ACTIVE_LUMINANCE = 5

const getStateColor = (hex: string, state: ComponentState) => {
  if (state === 'normal') {
    return changeRgbLuminance(hex, 0)
  } else if (state === 'hover') {
    return changeRgbLuminance(hex, HOVER_LUMINANCE)
  } else if (state === 'pressed' || state === 'focused') {
    return changeRgbLuminance(hex, ACTIVE_LUMINANCE)
  }
}

export { getStateColor }
