import { Button } from '@/components/Button/Button'
import { useState } from 'react'
import styled from 'styled-components'

interface ResponseModalProps {
  responseType: 'done' | 'cancel'
  visitId: number
  onRespondVisit: (responseType: 'done' | 'cancel', visitId: number, notes?: string) => void
  onClose: () => void
}

function ResponseModal(props: ResponseModalProps) {
  const { responseType, visitId, onRespondVisit, onClose } = props

  const [respondingVisitNotes, setRespondingVisitNotes] = useState<string>('')

  return (
    <BackDrop onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <p>Deseja adicionar alguma observação?</p>
        <textarea
          rows={4}
          placeholder="Observações"
          value={respondingVisitNotes}
          onChange={(e) => setRespondingVisitNotes(e.target.value)}
        />

        <Button
          size="sm"
          variant="filled"
          color={responseType === 'done' ? '#2e7d32' : '#d32f2f'}
          fullWidth
          onClick={() => onRespondVisit(responseType, visitId, respondingVisitNotes)}
        >
          {responseType === 'done' ? 'Marcar como feita' : 'Cancelar visita'}
        </Button>
      </Container>
    </BackDrop>
  )
}

export { ResponseModal }

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.neutralL1};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.neutralTertiary};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  width: 300px;
  max-width: 100%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  ${({ theme }) => theme.fonts.textMD}

  textarea {
    border: 1px solid ${({ theme }) => theme.colors.neutralL1};
    border-radius: 8px;
    padding: 8px;
    resize: none;
  }
`
