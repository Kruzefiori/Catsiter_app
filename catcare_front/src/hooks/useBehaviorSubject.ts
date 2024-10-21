import { useEffect, useState } from 'react'

import { BehaviorSubject } from 'rxjs'

export function useBehaviorSubject<T>(subject: BehaviorSubject<T>): T {
  const [value, setValue] = useState<T>(subject.getValue())

  useEffect(() => {
    const subscription = subject.subscribe(setValue)

    return () => {
      subscription.unsubscribe()
    }
  }, [subject])

  return value
}
