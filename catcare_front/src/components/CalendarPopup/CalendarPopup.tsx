import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar'
import moment from 'moment'
import 'moment/dist/locale/pt-br'
import 'moment-timezone'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import styled from 'styled-components'
import { useRef } from 'react'
import { Button } from '../Button/Button'
import { calendarMessagesPtBr } from './utils'

export enum CalendarColor {
  // Light colors
  LIGHT_BLUE = '#BEE0F9',
  LIGHT_GREEN = '#CFF4D2',
  LIGHT_YELLOW = '#FFF3C4',
  LIGHT_ORANGE = '#FFE6D0',
  LIGHT_RED = '#FFD6D6',
  // Dark colors
  DARK_BLUE = '#1E90FF',
  DARK_GREEN = '#008000',
  DARK_YELLOW = '#FFD700',
  DARK_ORANGE = '#FFA500',
  DARK_RED = '#FF6347'
}

export interface CalendarEvent {
  id: string
  title?: string
  start: Date
  end: Date
  color?: string
}

export interface CalendarPopupProps {
  width?: string
  height?: string
  events: CalendarEvent[]
  defaultView?: 'month' | 'week' | 'day' | 'agenda'
  onConfirm?: () => void
  onCancel?: () => void
  onClose: () => void
  onSelectEvent?: (event: CalendarEvent) => void
  onSlotClick?: (slotInfo: SlotInfo) => void
}

moment.locale('pt-br')
moment.tz.setDefault('America/Sao_Paulo')
const localizer = momentLocalizer(moment)

function CalendarPopup(props: CalendarPopupProps) {
  const {
    events,
    height,
    width,
    defaultView = 'month',
    onClose,
    onSlotClick,
    onCancel,
    onConfirm,
    onSelectEvent
  } = props

  const popupRef = useRef<HTMLDivElement>(null)

  const eventStyleGetter = (event: CalendarEvent) => {
    return {
      style: {
        backgroundColor: event.color
      }
    }
  }

  return (
    <PopupContainer onClick={onClose}>
      <Popup ref={popupRef} width={width} height={height} onClick={(e) => e.stopPropagation()}>
        <Calendar
          localizer={localizer}
          messages={calendarMessagesPtBr}
          defaultDate={moment().toDate()}
          defaultView={defaultView}
          events={events}
          min={new Date(0, 0, 0, 8)}
          max={new Date(0, 0, 0, 20)}
          selectable
          onSelectSlot={onSlotClick}
          onSelectEvent={onSelectEvent}
          eventPropGetter={eventStyleGetter}
          style={{ height: '87%', width: '100%' }}
        />
        <ButtonsWrapper>
          {onConfirm && (
            <Button size="md" variant="filled" onClick={onConfirm}>
              Confirmar
            </Button>
          )}
          {onCancel && (
            <Button size="md" variant="ghost" onClick={onCancel}>
              Cancelar
            </Button>
          )}
        </ButtonsWrapper>
      </Popup>
    </PopupContainer>
  )
}

export { CalendarPopup }

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  box-shadow: 0 0 8px red;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`

interface PopupProps {
  width?: string
  height?: string
}

const Popup = styled.div<PopupProps>`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  width: ${({ width }) => width ?? '70%'};
  height: ${({ height }) => height ?? '70%'};
  max-width: 800px;
  max-height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > .rbc-calendar {
    font-family: 'Open Sans', sans-serif;
  }

  & .rbc-event {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.secondary};
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`
