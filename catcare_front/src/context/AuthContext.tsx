import { User } from '@/domain/models/user/User'
import ms from 'ms'
import { createContext, ReactNode, useState } from 'react'
import { toast } from 'react-toastify'

interface AuthState {
  token: string
  user: User
}

interface AuthContextData {
  authState: AuthState
  isLogged(): boolean
  getAuthTokenFromStorage(): string
  saveAuthToken(authToken: string, expiresIn: string, createdAt: string): void
  resetAuthToken(): void
  setUserData(user: User): void
  resetUserData(): void
}

export const AuthContext = createContext({} as AuthContextData)

interface AuthContextProviderProps {
  children: ReactNode
}

enum StorageItems {
  Token = 'cat_care-auth_token',
  ExpiresIn = 'cat_care-token-expires_in',
  TokenCreatedAt = 'cat_care-token-created_at'
}

const INITIAL_STATE_USER: User = { id: null, name: null, email: null, isCatsitter: null, onBoardingDone: null }

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    user: INITIAL_STATE_USER
  })

  const setToken = (token: string) => {
    setAuthState((prev) => ({ ...prev, token }))
  }

  const setUser = (user: User) => {
    setAuthState((prev) => ({ ...prev, user }))
  }

  const isLogged = (): boolean => {
    const authToken = localStorage.getItem(StorageItems.Token)
    const tokenExpiresIn = localStorage.getItem(StorageItems.ExpiresIn)
    const tokenCreatedAt = localStorage.getItem(StorageItems.TokenCreatedAt)

    if (!authToken || !tokenExpiresIn || !tokenCreatedAt) {
      setToken(null)
      return false
    }

    const now = new Date().getTime()
    const createdAt = parseInt(tokenCreatedAt)
    const expiresIn = ms(tokenExpiresIn)
    const tokenExpired = now - createdAt > expiresIn

    if (tokenExpired) {
      toast.warning('Sua sessão expirou. Faça o login novamente')
      setToken(null)
      return false
    }
    return true
  }

  const getAuthTokenFromStorage = () => {
    return localStorage.getItem(StorageItems.Token)
  }

  const saveAuthToken = (authToken: string, expiresIn: string, createdAt: string): void => {
    localStorage.setItem(StorageItems.Token, authToken)
    localStorage.setItem(StorageItems.ExpiresIn, expiresIn)
    localStorage.setItem(StorageItems.TokenCreatedAt, createdAt)
    setToken(authToken)
  }
  const resetAuthToken = (): void => {
    localStorage.removeItem(StorageItems.Token)
    localStorage.removeItem(StorageItems.ExpiresIn)
    localStorage.removeItem(StorageItems.TokenCreatedAt)
    setToken(null)
  }
  const setUserData = (user: User): void => {
    const parsedUser: User = {
      ...INITIAL_STATE_USER,
      ...user
    }

    setUser(parsedUser)
  }
  const resetUserData = (): void => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        isLogged,
        getAuthTokenFromStorage,
        resetAuthToken,
        resetUserData,
        saveAuthToken,
        setUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
