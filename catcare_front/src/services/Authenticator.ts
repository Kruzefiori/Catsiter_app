import { User } from '@/domain/models/user/User'
import { AuthStateMutator } from '@/states/AuthState'

enum storageItems {
  token = 'cat_care-auth_token'
}

export const isLogged = () => {
  const authToken = sessionStorage.getItem(storageItems.token)
  if (authToken) {
    AuthStateMutator.setToken(authToken)
    return true
  }
  AuthStateMutator.setToken(null)
  return false
}

export const saveAuthToken = (authToken: string) => {
  sessionStorage.setItem(storageItems.token, authToken)
  AuthStateMutator.setToken(authToken)
}

export const resetAuthToken = () => {
  sessionStorage.removeItem(storageItems.token)
  AuthStateMutator.setToken(null)
}

export const setUserData = (user: User) => {
  AuthStateMutator.setUser(user)
}

export const resetUserData = () => {
  AuthStateMutator.setUser(null)
}
