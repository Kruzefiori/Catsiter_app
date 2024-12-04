import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar'
import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import styled from 'styled-components'
import { useRef } from 'react'
import { Button } from '../Button/Button'

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
  onConfirm?: () => void
  onCancel?: () => void
  onClose: () => void
  onSelectEvent?: (event: CalendarEvent) => void
  onSlotClick?: (slotInfo: SlotInfo) => void
}

moment.locale('pt-br')
const localizer = momentLocalizer(moment)

function CalendarPopup(props: CalendarPopupProps) {
  const { events, height, width, onClose, onSlotClick, onCancel, onConfirm, onSelectEvent } = props

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
          defaultDate={moment().toDate()}
          defaultView="month"
          events={events}
          selectable
          onSelectSlot={onSlotClick}
          onSelectEvent={onSelectEvent}
          eventPropGetter={eventStyleGetter}
          style={{ height: '100%', width: '100%' }}
        />
        <ButtonsWrapper>
          {onConfirm && (
            <Button variant="filled" onClick={onConfirm}>
              Confirmar
            </Button>
          )}
          {onCancel && (
            <Button variant="ghost" onClick={onCancel}>
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
  background-color: rgba(0, 0, 0, 0.1);
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
  width: ${({ width }) => width ?? '50%'};
  height: ${({ height }) => height ?? '50%'};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`
