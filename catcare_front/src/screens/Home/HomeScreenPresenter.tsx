import { useBehaviorSubject } from '@/hooks/useBehaviorSubject'
import { AuthState, AuthStateProps } from '@/states/AuthState'
import { OwnerHomeScreen } from './OwnerHomeScreen'
import { SitterHomeScreen } from './SitterHomeScreen'

function HomeScreenPresenter() {
  const authState = useBehaviorSubject<AuthStateProps>(AuthState)

  if (!authState.user.isCatsitter) return <SitterHomeScreen />
  else return <OwnerHomeScreen />
}

export { HomeScreenPresenter }
