import { getStateColor } from '@/utils/getStateColor'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import styled from 'styled-components'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  variant: 'filled' | 'outline'
  gap?: number
}

function Button(props: ButtonProps) {
  const { children, variant, gap, ...rest } = props
  return (
    <ButtonContainer variant={variant} gap={gap} {...rest}>
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

  &:hover {
    cursor: pointer;
    background-color: ${({ theme, variant }) =>
      variant === 'filled' ? getStateColor(theme.colors.secondary, 'hover') : `${theme.colors.secondary}10`};
  }
`
