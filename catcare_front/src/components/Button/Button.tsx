import { PropsWithChildren } from 'react'
import styled from 'styled-components'

interface ButtonProps extends PropsWithChildren {
  variant: 'filled' | 'outline'
  gap?: number
}

function Button(props: ButtonProps) {
  const { children, variant, gap } = props
  return (
    <ButtonContainer variant={variant} gap={gap}>
      {children}
    </ButtonContainer>
  )
}

export { Button }

interface ButtonStyledProps {
  variant: 'filled' | 'outline'
  gap: number
}

const ButtonContainer = styled.button<ButtonStyledProps>`
  border: 1px solid ${({ theme, variant }) => (variant === 'outline' ? theme.colors.secondary : 'transparent')};
  background-color: ${({ theme, variant }) => (variant === 'filled' ? theme.colors.secondary : 'transparent')};
  color: ${({ theme, variant }) => (variant === 'filled' ? theme.colors.neutralL5 : theme.colors.secondary)};
  width: 100%;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ gap }) => gap ?? 0}px;
`
