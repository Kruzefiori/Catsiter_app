import { AuthContext } from '@/context/AuthContext'
import { Visits, VisitStatus } from '@/domain/models/Visits'
import axios from 'axios'
import { useCallback, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'

interface BookingScreenProps {
  catsitterId?: number
}

function BookingScreen(props: BookingScreenProps) {
  const { catsitterId } = props

  const { authState } = useContext(AuthContext)
  const [visits, setVisits] = useState<Visits[]>([])

  const handleAddVisit = useCallback(
    (visitDate: string, notes: string) => {
      setVisits([...visits, { visitDate, notes, status: VisitStatus.PENDING }])
    },
    [visits]
  )

  const handleCreateBooking = useCallback(async (startDate: string, endDate: string, generalNotes: string) => {
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
