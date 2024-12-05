import { getStateColor } from '@/utils/getStateColor'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import styled from 'styled-components'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  variant: 'filled' | 'outline' | 'light-filled' | 'ghost'
  gap?: number
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

function Button(props: ButtonProps) {
  const { children, variant, gap, size, fullWidth = false, ...rest } = props
  return (
    <ButtonContainer size={size} variant={variant} gap={gap} fullWidth={fullWidth} {...rest}>
      {children}
    </ButtonContainer>
  )
}

export { Button }

interface ButtonStyledProps {
  variant: 'filled' | 'outline' | 'light-filled' | 'ghost'
  gap: number
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

const ButtonContainer = styled.button<ButtonStyledProps>`
  border: 1px solid
    ${({ theme, variant }) =>
      variant === 'filled' || variant === 'ghost'
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
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
  height: ${({ size }) => (size === 'sm' ? '32px' : size === 'md' ? '40px' : '48px')};
  border-radius: 8px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ gap }) => gap ?? 0}px;
  ${({ theme, size }) => (size === 'sm' ? theme.fonts.infoSM : size === 'md' ? theme.fonts.infoMD : theme.fonts.infoLG)}

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
