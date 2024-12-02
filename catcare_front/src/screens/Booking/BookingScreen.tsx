import { Button } from '@/components/Button/Button'
import { AuthContext } from '@/context/AuthContext'
import { Visits, VisitStatus } from '@/domain/models/Visits'
import { longMonthDateOptions } from '@/utils/string'
import axios from 'axios'
import { useCallback, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Add, Delete } from '@mui/icons-material'
import {
  BookingDetailsContainer,
  BookingScreenContainer,
  BookingSubtitle,
  Label,
  PeriodWrapper,
  Subtitle,
  Title,
  VisitItem,
  VisitsContainer,
  VisitSummary,
  VisitWrapper
} from './BookingScreen.styles'
import { useNavigate, useParams } from 'react-router-dom'

function BookingScreen() {
  const { catsitterId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!catsitterId) {
      navigate(-1)
    }
  }, [catsitterId])

  const { authState, getAuthTokenFromStorage } = useContext(AuthContext)
  const [visits, setVisits] = useState<Visits[]>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [generalNotes, setGeneralNotes] = useState('')

  const handleAddVisit = useCallback(() => {
    setVisits([...visits, { id: crypto.randomUUID(), visitDate: null, notes: '', status: VisitStatus.PENDING }])
  }, [visits])

  const handleUpdateVisit = (index: number, field: string, value: string) => {
    const updatedVisits = [...visits]
    if (field === 'visitDate') {
      updatedVisits[index] = {
        ...updatedVisits[index],
        visitDate: new Date(value)
      }
      setVisits(updatedVisits)
      return
    }
    updatedVisits[index] = {
      ...updatedVisits[index],
      [field]: value
    }
    setVisits(updatedVisits)
  }

  const handleRemoveVisit = (index: number) => {
    const updatedVisits = [...visits]
    updatedVisits.splice(index, 1)
    setVisits(updatedVisits)
  }

  const handleCreateBooking = useCallback(async () => {
    const body = {
      visits: visits,
      requesterId: authState.user.id,
      requestedId: catsitterId,
      startDate: startDate,
      endDate: endDate,
      generalNotes: generalNotes
    }
    // verificando os dados antes de enviar
    console.log('body', body)

    const response = await axios.post(`${import.meta.env.VITE_CATCARE_SERVER_URL}/booking/add-booking`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthTokenFromStorage()}`
      }
    })

    if (response.status < 200 || response.status >= 300) {
      toast.error('Não foi possível solicitar a reserva. ')
      return
    }

    toast.success('Sua reserva foi solicitada com sucesso!')
    console.log('response', response.data)
  }, [authState.user.id, catsitterId, endDate, generalNotes, getAuthTokenFromStorage, startDate, visits])

  return (
    <BookingScreenContainer>
      <Title>Vamos agendar uma visita</Title>
      <Subtitle>Escolha as datas e adicione as visitas que deseja fazer</Subtitle>
      <BookingDetailsContainer>
        <BookingSubtitle>Dados da Reserva</BookingSubtitle>
        <PeriodWrapper>
          <Label>
            Data de Início:
            <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </Label>
          <Label>
            Data de Fim:
            <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </Label>
        </PeriodWrapper>
        <Label>
          Informações adicionais:
          <textarea value={generalNotes} onChange={(e) => setGeneralNotes(e.target.value)} />
        </Label>
        <VisitsContainer>
          <Button variant="ghost" fullWidth onClick={handleAddVisit}>
            <Add />
            Adicionar Visita
          </Button>
          {visits.map((visit, index) => (
            <VisitWrapper key={visit.visitDate?.toISOString() ?? index}>
              <VisitSummary expandIcon={<ArrowDropDownIcon />}>{`${index + 1}ª visita: ${
                visit.visitDate?.toLocaleDateString('pt-BR', longMonthDateOptions) ?? '(Clique para editar)'
              }`}</VisitSummary>
              <VisitItem>
                <Label>
                  Visit Date:
                  <input
                    type="datetime-local"
                    value={visit.visitDate?.toISOString().split('.')[0] ?? ''}
                    onChange={(e) => handleUpdateVisit(index, 'visitDate', e.target.value)}
                  />
                </Label>
                <Label>
                  Notes:
                  <textarea
                    minLength={1}
                    maxLength={2000}
                    value={visit.notes}
                    onChange={(e) => handleUpdateVisit(index, 'notes', e.target.value)}
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
    </BookingScreenContainer>
  )
}

export { BookingScreen }
