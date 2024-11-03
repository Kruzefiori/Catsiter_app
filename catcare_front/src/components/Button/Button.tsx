import { getStateColor } from '@/utils/getStateColor'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import styled from 'styled-components'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  variant: 'filled' | 'outline' | 'light-filled'
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
  variant: 'filled' | 'outline' | 'light-filled'
  gap: number
}

const ButtonContainer = styled.button<ButtonStyledProps>`
  border: 1px solid
    ${({ theme, variant }) =>
      variant === 'filled'
        ? 'transparent'
        : variant === 'light-filled'
        ? theme.colors.neutralL0
        : theme.colors.secondary};
  background-color: ${({ theme, variant }) =>
    variant === 'filled'
      ? theme.colors.secondary
      : variant === 'light-filled'
      ? theme.colors.neutralTertiary
      : 'transparent'};
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
      variant === 'filled'
        ? getStateColor(theme.colors.secondary, 'hover')
        : variant === 'light-filled'
        ? getStateColor(theme.colors.neutralTertiary, 'hover')
        : `${theme.colors.secondary}10`};
  }
`
