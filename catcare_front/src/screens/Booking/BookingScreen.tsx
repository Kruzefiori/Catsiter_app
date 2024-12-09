import { Button } from '@/components/Button/Button'
import { AuthContext } from '@/context/AuthContext'
import { Visits, VisitStatus } from '@/domain/models/Visits'
import { longMonthDateOptions } from '@/utils/string'
import axios from 'axios'
import { useCallback, useContext, useEffect, useState, useMemo } from 'react'
import { toast } from 'react-toastify'
import { Add, ArrowDropDown, Close, Delete, Edit } from '@mui/icons-material'
import {
  BookingDetailsContainer,
  BookingScreenContainer,
  BookingSubtitle,
  Value,
  Label,
  PeriodWrapper,
  Subtitle,
  Title,
  VisitItem,
  VisitsContainer,
  VisitSummary,
  VisitWrapper,
  EventModal,
  IconButton,
  Tip
} from './BookingScreen.styles'
import { useNavigate, useParams } from 'react-router-dom'
import { addOneHour, getDifferenceInHours, getFirstVisitDate, getLastVisitDate } from './utils'
import { CalendarColor, CalendarEvent, CalendarPopup } from '@/components/CalendarPopup'
import { SlotInfo } from 'react-big-calendar'
import { mockedCatSitters } from '../Home/utils'

type VisitWithoutIds = Omit<Visits, 'id' | 'bookingId'> & { id?: number | string; bookingId?: number }

function BookingScreen() {
  const { catsitterId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!catsitterId) {
      navigate(-1)
    }
  }, [catsitterId])

  const { authState, getAuthTokenFromStorage } = useContext(AuthContext)
  const [visits, setVisits] = useState<VisitWithoutIds[]>([])
  const [currentEvents, setCurrentEvents] = useState<CalendarEvent[]>([])
  const [eventToShow, setEventToShow] = useState<CalendarEvent | null>(null)
  const [generalNotes, setGeneralNotes] = useState('')
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const catsitterAgenda = useMemo(() => {
    const catsitter = mockedCatSitters.find((catsitter) => catsitter.id === Number(catsitterId))
    if (!catsitter) {
      return []
    }
    const events: CalendarEvent[] = []
    catsitter.bookings.forEach((booking) => {
      booking.visits.forEach((visit) => {
        events.push({
          id: visit.id,
          title: 'Ocupado',
          start: new Date(visit.visitDate),
          end: addOneHour(new Date(visit.visitDate)),
          color: CalendarColor.DARK_RED
        })
      })
    })
    return events
  }, [catsitterId])

  const handleUpdateVisit = (visitId: number | string, field: string, value: string) => {
    const updatedVisits = [...visits]
    const visitIndex = updatedVisits.findIndex((visit) => visit.id === visitId)
    if (visitIndex === -1) {
      return
    }
    if (field === 'visitDate') {
      updatedVisits[visitIndex] = {
        ...updatedVisits[visitIndex],
        visitDate: new Date(value)
      }
      setVisits(updatedVisits)
      return
    }
    updatedVisits[visitIndex] = {
      ...updatedVisits[visitIndex],
      [field]: value
    }
    setVisits(updatedVisits)
  }

  const handleRemoveVisit = (index: number) => {
    const updatedVisits = [...visits]
    updatedVisits.splice(index, 1)
    setVisits(updatedVisits)
    toast.info('Visita removida com sucesso!')
  }

  const handleCreateBooking = useCallback(async () => {
    const body = {
      visits: visits.map((visit) => ({
        visitDate: visit.visitDate,
        status: visit.status,
        visitNotes: visit.visitNotes,
        durationInMinutes: visit.durationInMinutes
      })),
      requesterId: authState.user.id,
      requestedId: Number(catsitterId),
      startDate: getFirstVisitDate(visits),
      endDate: getLastVisitDate(visits),
      generalNotes: generalNotes
    }
    // verificando os dados antes de enviar
    console.log('body', body)

    try {
      const response = await axios.post(`${import.meta.env.VITE_CATCARE_SERVER_URL}/booking/add-booking`, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthTokenFromStorage()}`
        }
      })

      if (response.status < 200 || response.status >= 300) {
        toast.error('Não foi possível solicitar a reserva. ')
        throw new Error('Não foi possível solicitar a reserva. ')
      }

      toast.success('Sua reserva foi solicitada com sucesso!')
      console.log('response', response.data)
      navigate(-1)
    } catch (error) {
      console.error(error)
    }
  }, [authState.user.id, catsitterId, generalNotes, getAuthTokenFromStorage, visits])

  const handleSlotClick = useCallback(
    (slotInfo: SlotInfo) => {
      const end = getDifferenceInHours(slotInfo.end, slotInfo.start) > 1 ? slotInfo.end : addOneHour(slotInfo.start)
      const newEvent: CalendarEvent = {
        id: crypto.randomUUID(),
        title: 'Nova Visita',
        start: slotInfo.start,
        end,
        color: CalendarColor.LIGHT_GREEN
      }

      setCurrentEvents([...currentEvents, newEvent])
    },
    [currentEvents]
  )

  const handleDeleteEvent = useCallback(
    (event: CalendarEvent) => {
      const updatedEvents = currentEvents.filter((currentEvent) => currentEvent.id !== event.id)
      if (updatedEvents.length === currentEvents.length) {
        toast.error('Você não pode remover essa visita')
        return
      }
      setCurrentEvents(updatedEvents)
    },
    [currentEvents]
  )

  const handleShowEvent = useCallback((event: CalendarEvent) => {
    setEventToShow(event)
  }, [])

  const handleOpenCalendar = useCallback(() => {
    const events = [...visits]
      .sort((a, b) => new Date(a.visitDate).getTime() - new Date(b.visitDate).getTime())
      .map((visit, index) => ({
        id: visit.id,
        start: visit.visitDate,
        end: new Date(new Date(visit.visitDate).getTime() + visit.durationInMinutes * 60000),
        title: `Visita ${index + 1}`,
        notes: visit.visitNotes,
        color: CalendarColor.LIGHT_BLUE
      }))
    setCurrentEvents(events)
    setIsCalendarOpen(true)
  }, [visits, catsitterAgenda])

  const handleSaveVisits = useCallback(() => {
    if (currentEvents.length === 0) {
      setIsCalendarOpen(false)
      toast.warning('As visitas foram salvas!')
      return
    }
    const newVisits: VisitWithoutIds[] = currentEvents.map((event) => ({
      id: event.id,
      visitDate: event.start,
      durationInMinutes: getDifferenceInHours(event.end, event.start) * 60,
      visitNotes: event.notes,
      status: VisitStatus.PENDING
    }))

    setVisits(newVisits)
    setCurrentEvents([])
    setIsCalendarOpen(false)

    toast.success('Visitas adicionadas com sucesso!')
  }, [currentEvents, visits])

  const handleCancelSchedule = useCallback(() => {
    setIsCalendarOpen(false)
  }, [])

  return (
    <BookingScreenContainer>
      <Title>Vamos agendar uma visita</Title>
      <Subtitle>Escolha as datas e adicione as visitas que deseja fazer</Subtitle>
      <BookingDetailsContainer>
        <BookingSubtitle>Dados da Reserva</BookingSubtitle>
        <PeriodWrapper>
          {visits.length > 0 && (
            <Label>
              Data de Início: <Value>{getFirstVisitDate(visits)?.toLocaleDateString() ?? ''}</Value>
            </Label>
          )}
          {visits.length > 1 && (
            <Label>
              Data de Fim: <Value>{getLastVisitDate(visits)?.toLocaleDateString() ?? ''}</Value>
            </Label>
          )}
        </PeriodWrapper>
        <Label>
          informações adicionais:
          <textarea value={generalNotes} onChange={(e) => setGeneralNotes(e.target.value)} />
        </Label>
        {isCalendarOpen && (
          <CalendarPopup
            events={[...currentEvents, ...catsitterAgenda]}
            width="80%"
            height="80%"
            defaultView="week"
            onSlotClick={handleSlotClick}
            onSelectEvent={handleShowEvent}
            onClose={() => setIsCalendarOpen(false)}
            onConfirm={handleSaveVisits}
            onCancel={handleCancelSchedule}
          />
        )}
        {eventToShow && (
          <EventModal>
            <IconButton
              style={{ position: 'absolute', right: 12, top: 12 }}
              title={'fechar'}
              onClick={() => setEventToShow(null)}
            >
              <Close fontSize="small" />
            </IconButton>
            <Label>
              Nome: <Value>{eventToShow.title}</Value>
            </Label>
            <Label>
              Data Início: <Value>{eventToShow.start.toLocaleString('pt-BR', longMonthDateOptions)}</Value>
            </Label>
            <Label>
              Data Fim: <Value>{eventToShow.end.toLocaleString('pt-BR', longMonthDateOptions)}</Value>
            </Label>
            <Label>
              Observações: <Value>{eventToShow.notes}</Value>
            </Label>
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              onClick={() => {
                setEventToShow(null)
                handleDeleteEvent(eventToShow)
              }}
            >
              <Delete />
              Remover Visita
            </Button>
          </EventModal>
        )}
        <VisitsContainer>
          <Button variant="ghost" fullWidth onClick={handleOpenCalendar}>
            <Add />
            Adicionar Visitas
          </Button>
          {visits.length > 0 && <Tip>{'(clique em uma visita para editar os detalhes)'}</Tip>}
          {[...visits]
            .sort((a, b) => new Date(a.visitDate).getTime() - new Date(b.visitDate).getTime())
            .map((visit, index) => (
              <VisitWrapper key={visit.visitDate?.toISOString() ?? index}>
                <VisitSummary expandIcon={<ArrowDropDown />}>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveVisit(index)
                    }}
                  >
                    <Close fontSize="small" color="action" />
                  </IconButton>
                  {`Visita ${index + 1}`}
                </VisitSummary>
                <VisitItem>
                  <Label>
                    Data:
                    <input
                      type="date"
                      value={visit.visitDate?.toISOString().split('T')[0] ?? ''}
                      onChange={(e) => handleUpdateVisit(visit.id, 'visitDate', e.target.value)}
                    />
                  </Label>
                  <Label>
                    Observações:
                    <textarea
                      minLength={1}
                      maxLength={2000}
                      value={visit.visitNotes}
                      onChange={(e) => handleUpdateVisit(visit.id, 'visitNotes', e.target.value)}
                    />
                  </Label>
                  <Button variant="ghost" fullWidth onClick={() => handleRemoveVisit(index)}>
                    <Delete />
                    Remover Visita
                  </Button>
                </VisitItem>
              </VisitWrapper>
            ))}
        </VisitsContainer>
      </BookingDetailsContainer>
      <Button variant="filled" fullWidth onClick={handleCreateBooking}>
        Solicitar Reserva
      </Button>
      <Button variant="ghost" fullWidth onClick={() => navigate(-1)}>
        Cancelar
      </Button>
    </BookingScreenContainer>
  )
}

export { BookingScreen }
