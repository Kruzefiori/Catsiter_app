import { ThemeProvider as ScThemeProvider } from 'styled-components'

import { LightTheme } from './light.theme'

interface ThemeProviderProps {
  children: React.ReactNode
  theme: 'light'
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props

  return <ScThemeProvider theme={LightTheme}>{children}</ScThemeProvider>
}

export { ThemeProvider }
