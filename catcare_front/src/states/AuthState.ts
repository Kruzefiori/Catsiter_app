import { User } from '@/domain/models/user/User'
import { BehaviorSubject } from 'rxjs'

export interface AuthStateProps {
  token: string
  user: User
}

const INITIAL_STATE: AuthStateProps = {
  token: null,
  user: {
    email: null,
    id: null,
    name: null,
    isCatsitter: null,
    onBoardingDone: null
  }
}

export const AuthState = new BehaviorSubject<AuthStateProps>(INITIAL_STATE)

export const AuthStateMutator = {
  mutate: (newState: AuthStateProps) => {
    AuthState.next(newState)
  },

  setUser: (user: User) => {
    AuthState.next({
      ...AuthState.getValue(),
      user
    })
  },

  setToken: (token: string) => {
    AuthState.next({
      ...AuthState.getValue(),
      token
    })
  }
}
