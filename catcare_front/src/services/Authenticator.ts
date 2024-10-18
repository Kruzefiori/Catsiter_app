enum storageItems {
  token = 'cat_care-auth_token'
}

export const isLogged = () => {
  const authToken = sessionStorage.getItem(storageItems.token)
  if (authToken) return true
  return false
}

export const saveAuthToken = (authToken: string) => {
  sessionStorage.setItem(storageItems.token, authToken)
}

export const resetAuthToken = () => {
  sessionStorage.removeItem(storageItems.token)
}
