import { Button } from '@/components/Button/Button'
import {
  Address,
  BookingCard,
  CardsList,
  DateInfo,
  Details,
  EmptyMessage,
  Footer,
  Header,
  Info,
  Name,
  Notes,
  VisitItem,
  VisitSummary,
  VisitWrapper
} from './BookingList.styles'
import { ArrowDropDown } from '@mui/icons-material'
import { requestersData } from './utils'
import { Booking } from '@/domain/models/Booking'

interface BookingsListProps {
  bookings: Booking[]
  onAcceptBooking: (bookingId: number) => void
  onRejectBooking: (bookingId: number) => void
}

function BookingsList(props: BookingsListProps) {
  const { bookings, onAcceptBooking, onRejectBooking } = props
  return (
    <>
      {bookings.length === 0 && <EmptyMessage>Não há reservas para exibir.</EmptyMessage>}
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
              <strong>Endereço:</strong> {requestersData.find((user) => user.id === booking.requesterId)?.address}
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
                    <strong>Observações:</strong>
                    <Details>{visit.notes || <i>Sem observações.</i>}</Details>
                  </Info>
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
    </>
  )
}

export { BookingsList }
