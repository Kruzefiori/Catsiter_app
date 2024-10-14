import { BrowserRouter } from 'react-router-dom'

import { AppContainer } from './App.styles'
import { AppRouter } from './router/AppRouter'

function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppContainer>
  )
}

export { App }
