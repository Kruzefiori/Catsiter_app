import { Button } from '@/components/Button/Button'
import {
  Address,
  BookingCard,
  ButtonsWrapper,
  CardsList,
  DateInfo,
  Details,
  EmptyMessage,
  Footer,
  Header,
  IconButton,
  Info,
  Name,
  Notes,
  VisitItem,
  VisitSummary,
  VisitWrapper
} from './BookingList.styles'
import { ArrowDropDown, CheckCircle, DeleteForever } from '@mui/icons-material'
import { requestersData } from './utils'
import { Booking } from '@/domain/models/Booking'
import { VisitStatus } from '@/domain/models/Visits'
import { useContext, useState } from 'react'
import { ResponseModal } from './ResponseModal'
import axios from 'axios'
import { AuthContext } from '@/context'
import { toast } from 'react-toastify'

interface BookingsListProps {
  bookings: Booking[]
  onAcceptBooking: (bookingId: number) => void
  onRejectBooking: (bookingId: number) => void
}

function BookingsList(props: BookingsListProps) {
  const { bookings, onAcceptBooking, onRejectBooking } = props

  const { getAuthTokenFromStorage } = useContext(AuthContext)

  const [visitResponse, setVisitResponse] = useState<'done' | 'cancel' | null>(null)

  const handleRespondVisit = async (responseType: 'done' | 'cancel', visitId: number, notes?: string) => {
    // booking/answer-visit
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_CATCARE_SERVER_URL}/booking/answer-visit`,
        {
          visitId,
          visitNotes: notes,
          status: responseType === 'done' ? VisitStatus.DONE : VisitStatus.CANCELLED
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthTokenFromStorage()}`
          }
        }
      )

      if (response.status < 200 || response.status >= 300) {
        toast.error('Erro ao responder visita')
        throw new Error('Erro ao responder visita')
        return
      }
    } catch (error) {
      console.error('Erro ao responder visita', error)
    }

    setVisitResponse(null)
  }

  return (
    <>
      {bookings.length === 0 ? (
        <EmptyMessage>Não há reservas para exibir.</EmptyMessage>
      ) : (
        <CardsList>
          {bookings.map((booking) => (
            <BookingCard key={booking.id}>
              <DateInfo>
                {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
              </DateInfo>
              <Header>
                <Name>
                  <strong>Solicitante:</strong> {requestersData.find((user) => user.id === booking.requesterId)?.name}
                </Name>
              </Header>
              <Address>
                <strong>Endereço:</strong>{' '}
                {`${requestersData.find((user) => user.id === booking.requesterId)?.address.street}, ${
                  requestersData.find((user) => user.id === booking.requesterId)?.address.number
                } - ${requestersData.find((user) => user.id === booking.requesterId)?.address.city}, ${
                  requestersData.find((user) => user.id === booking.requesterId)?.address.state
                }`}
              </Address>
              <Notes>
                <strong>Informações adicionais:</strong>
                <Details>{booking.generalNotes}</Details>
              </Notes>
              <Info>
                <strong>Visitas:</strong>
              </Info>
              {[...booking.visits].map((visit, index) => (
                <VisitWrapper key={visit.visitDate?.toISOString() ?? index}>
                  <VisitSummary expandIcon={<ArrowDropDown />}>{`Visita ${index + 1}`}</VisitSummary>
                  <VisitItem>
                    <Info>
                      <strong>Data:</strong> {visit.visitDate?.toLocaleDateString()}
                    </Info>
                    <Info>
                      <strong>Status:</strong>
                      {visit.status === VisitStatus.DONE
                        ? ' Feita'
                        : visit.status === VisitStatus.PENDING
                        ? ' Pendente'
                        : ' Cancelada'}
                    </Info>
                    <strong>Observações:</strong>
                    <Details>{visit.notes || <i>Sem observações.</i>}</Details>
                    {visit.status === VisitStatus.PENDING && booking.status === 'ACCEPTED' && (
                      <>
                        {visitResponse && (
                          <ResponseModal
                            responseType={visitResponse}
                            visitId={visit.id}
                            onRespondVisit={handleRespondVisit}
                            onClose={() => setVisitResponse(null)}
                          />
                        )}
                        <ButtonsWrapper>
                          <Button size="sm" variant="ghost" color="#2e7d32" onClick={() => setVisitResponse('done')}>
                            <CheckCircle color="success" />
                            Marcar como feita
                          </Button>
                          <Button size="sm" variant="ghost" color="#d32f2f" onClick={() => setVisitResponse('cancel')}>
                            <DeleteForever color="error" />
                            Cancelar visita
                          </Button>
                        </ButtonsWrapper>
                      </>
                    )}
                  </VisitItem>
                </VisitWrapper>
              ))}
              <Footer>
                {booking.status === 'PENDING' && (
                  <>
                    <Button
                      variant="filled"
                      color="#d32f2f"
                      size="sm"
                      fullWidth
                      onClick={() => onRejectBooking(booking.id)}
                    >
                      Recusar
                    </Button>
                    <Button
                      variant="filled"
                      color="#00a128"
                      size="sm"
                      fullWidth
                      onClick={() => onAcceptBooking(booking.id)}
                    >
                      Aceitar
                    </Button>
                  </>
                )}
              </Footer>
            </BookingCard>
          ))}
        </CardsList>
      )}
    </>
  )
}

export { BookingsList }
