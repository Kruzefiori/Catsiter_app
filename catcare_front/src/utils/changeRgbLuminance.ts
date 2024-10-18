import { rgbHexToHsl } from './rgbHexToHsl'

/**
 * Changes a luminance of a RGB string, return a HSL string in CSS format
 *
 * @example changeRgbLuminance('#ff0000', 25) => 'hsl(0, 100%, 75%)'
 * @param hex rgb string
 * @param luminance luminance value
 */
const changeRgbLuminance = (hex: string, luminance: number): string => {
  const [h, s, l] = rgbHexToHsl(hex)

  if (l * 100 + luminance >= 100) {
    return `hsl(${Math.round(h * 360)}, ${s * 100}%, 100%)`
  }
  return `hsl(${Math.round(h * 360)}, ${s * 100}%, ${(l * 100 + luminance).toFixed(1)}%)`
}

export { changeRgbLuminance }
