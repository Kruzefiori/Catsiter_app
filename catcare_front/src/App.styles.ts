import styled from 'styled-components'

export const AppContainer = styled.div`
  padding: 10px 0;
  height: 100vh;
  max-width: 430px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  &::-webkit-scrollbar {
    border-radius: 20px;
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.neutralL5};
    border-radius: 20px;
  }
`
