import { CSSObject } from 'styled-components'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends AppTheme {}
}

interface AppThemeFont extends CSSObject {
  fontFamily: string
  fontWeight: number
  fontSize: string
  letterSpacing: string
}

export interface AppTheme {
  colors: {
    neutralL0: string
    neutralL1: string
    neutralL2: string
    neutralL3: string
    neutralL4: string
    neutralL5: string
    neutralSecondary: string
    neutralTertiary: string

    primary: string

    secondary: string

    yellowL0: string
    yellowL1: string

    blueL0: string
    blueL1: string
    blueL2: string

    notification: string
    error: string
  }
  fonts: {
    h1: AppThemeFont
    h2: AppThemeFont
    h3: AppThemeFont
    infoLG: AppThemeFont
    infoMD: AppThemeFont
    infoSM: AppThemeFont
    infoXS: AppThemeFont
    labelMD: AppThemeFont
    labelSM: AppThemeFont
    textLG: AppThemeFont
    textMD: AppThemeFont
    textSM: AppThemeFont
    titleLG: AppThemeFont
    titleMD: AppThemeFont
    titleSM: AppThemeFont
    titleXS: AppThemeFont
  }
}
