import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from './App.styles'
import { AppRouter } from './router/AppRouter'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <AppRouter />
        <ToastContainer pauseOnHover theme="light" transition={Bounce} />
      </BrowserRouter>
    </AppContainer>
  )
}

export { App }
