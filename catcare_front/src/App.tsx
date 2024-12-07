import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from './App.styles'
import { AppRouter } from './router/AppRouter'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthContextProvider } from './context/AuthContext'

function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <AuthContextProvider>
          <AppRouter />
        </AuthContextProvider>
      </BrowserRouter>
      <ToastContainer theme="light" transition={Bounce} autoClose={1500} />
    </AppContainer>
  )
}

export { App }
