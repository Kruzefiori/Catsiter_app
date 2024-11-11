import { getStateColor } from '@/utils/getStateColor'
import styled from 'styled-components'

export const OnboardingContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 24px;
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  text-align: left;
`

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.h1}
`

export const Subtitle = styled.h2`
  ${({ theme }) => theme.fonts.titleMD}
  color: ${({ theme }) => theme.colors.neutralL0};
`

export const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const TypeOptions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`

export const Label = styled.label`
  ${({ theme }) => theme.fonts.textLG}
  color: ${({ theme }) => theme.colors.secondary};
`

export const WarningMessage = styled.p`
  ${({ theme }) => theme.fonts.textSM}
  color: ${({ theme }) => theme.colors.notification};
`

interface SelectButtonProps {
  isActive: boolean
}

export const SelectButton = styled.span<SelectButtonProps>`
  border: 1px solid ${({ theme, isActive }) => (isActive ? 'transparent' : theme.colors.secondary)};
  background-color: ${({ theme, isActive }) => (isActive ? theme.colors.secondary : theme.colors.neutralL5)};
  color: ${({ theme, isActive }) => (isActive ? theme.colors.neutralL5 : theme.colors.secondary)};
  ${({ theme }) => theme.fonts.infoSM}
  height: 40px;
  width: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme, isActive }) =>
      isActive ? getStateColor(theme.colors.secondary, 'hover') : getStateColor(theme.colors.neutralL3, 'hover')};
  }
`
