import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import isPropValid from '@emotion/is-prop-valid'
import { StyleSheetManager } from 'styled-components'
import { ThemeProvider } from './theme/provider.tsx'
import { GlobalStyle } from './global.styles.ts'

function shouldForwardProp(propName: string, target: any) {
  if (typeof target === 'string') {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return isPropValid(propName)
  }
  // For other elements, forward all props
  return true
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StyleSheetManager shouldForwardProp={shouldForwardProp}>
    <ThemeProvider theme="light">
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </StyleSheetManager>
)
