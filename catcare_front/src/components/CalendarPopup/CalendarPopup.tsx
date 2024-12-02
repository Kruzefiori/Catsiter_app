import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import styled from 'styled-components'

export interface CalendarEvent {
  title: string
  start: Date
  end: Date
  // implementar cor do evento para marcar se foi aceito ou não, ou se está pendente
}

export interface CalendarPopupProps {
  events: CalendarEvent[]
  onClose: () => void
}

function CalendarPopup(props: CalendarPopupProps) {
  const { events, onClose } = props
  return (
    <PopupContainer onClick={onClose}>
      <Popup>
        <Calendar
          localizer={momentLocalizer(moment)}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          style={{ height: '100%', width: '100%' }}
        />
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
`

const Popup = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  width: 40%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
