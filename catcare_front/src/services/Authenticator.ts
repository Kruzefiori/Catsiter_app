import { User } from '@/domain/models/user/User'
import { AuthStateMutator } from '@/states/AuthState'
import ms from 'ms'

enum storageItems {
  token = 'cat_care-auth_token',
  expiresIn = 'cat_care-token-expires_in',
  tokenCreatedAt = 'cat_care-token-created_at'
}

export const isLogged = () => {
  const authToken = localStorage.getItem(storageItems.token)
  const tokenExpiresIn = localStorage.getItem(storageItems.expiresIn)
  const tokenCreatedAt = localStorage.getItem(storageItems.tokenCreatedAt)

  if (!authToken || !tokenExpiresIn || !tokenCreatedAt) {
    AuthStateMutator.setToken(null)
    return false
  }

  const now = new Date().getTime()
  const createdAt = parseInt(tokenCreatedAt)
  const expiresIn = ms(tokenExpiresIn)
  const tokenExpired = now - createdAt > expiresIn
  if (tokenExpired) {
    AuthStateMutator.setToken(null)
    return false
  }

  AuthStateMutator.setToken(authToken)
  return true
}

export const saveAuthToken = (authToken: string, expiresIn: string, createdAt: string) => {
  localStorage.setItem(storageItems.token, authToken)
  localStorage.setItem(storageItems.expiresIn, expiresIn)
  localStorage.setItem(storageItems.tokenCreatedAt, createdAt)
  AuthStateMutator.setToken(authToken)
}

export const resetAuthToken = () => {
  localStorage.removeItem(storageItems.token)
  localStorage.removeItem(storageItems.expiresIn)
  localStorage.removeItem(storageItems.tokenCreatedAt)
  AuthStateMutator.setToken(null)
}

export const setUserData = (user: User) => {
  AuthStateMutator.setUser(user)
}

export const resetUserData = () => {
  AuthStateMutator.setUser(null)
}
