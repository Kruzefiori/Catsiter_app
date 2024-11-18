import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'
import { useCallback, useContext } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'

interface BookingScreenProps {
  catsitterId?: number
}

function BookingScreen(props: BookingScreenProps) {
  const { catsitterId } = props

  const { authState } = useContext(AuthContext)

  const handleCreateBooking = useCallback(async () => {
    const visits = [
      {
        visitDate: '2023-11-17T00:00:00.000Z',
        notes: 'Hoje você só dá banho nele'
      }
    ]

    const startDate = '2023-11-16T00:00:00.000Z'
    const endDate = '2023-11-18T00:00:00.000Z'
    const generalNotes = 'Cuida bem do bechano'

    const body = {
      visits: visits,
      requesterId: authState.user.id,
      requestedId: catsitterId,
      startDate: startDate,
      endDate: endDate,
      generalNotes: generalNotes
    }
    const response = await axios.post(`${import.meta.env.VITE_CATCARE_SERVER_URL}/booking/add-booking`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authState.token}`
      }
    })

    if (response.status < 200 || response.status >= 300) {
      toast.error('Não foi possível criar o booking.')
      return
    }
  }, [])

  return <BookingScreenContainer></BookingScreenContainer>
}

export { BookingScreen }

const BookingScreenContainer = styled.div``
