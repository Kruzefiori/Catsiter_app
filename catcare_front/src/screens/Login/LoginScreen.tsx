import { Button } from '@/components/Button/Button'
import styled from 'styled-components'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import GoogleIcon from '@assets/google.svg?react'
import { useState } from 'react'
import { IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material'

function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <LoginContainer>
      <Header>
        <Title>Boas vindas ao CatCare!</Title>
        <Subtitle>Entre na sua conta para continuar</Subtitle>
      </Header>
      <Form method="post">
        <InputWrapper>
          <TextField
            type="text"
            label="E-mail"
            size="small"
            name="email"
            id="email"
            placeholder="exemplo@exemplo.com"
          />
        </InputWrapper>

        <InputWrapper>
          {/* <InputLabel>Senha</InputLabel>

          <Input type={passwordInputType} name="password" id="password" placeholder="**********" />
           */}
          <TextField
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="Senha"
            size="small"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((show) => !show)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
          />

          <InfoText>
            Esqueceu a senha? <a href="">Recuperar senha</a>
          </InfoText>
        </InputWrapper>

        <Button variant="filled">Entrar</Button>
      </Form>
      <InfoText>ou</InfoText>
      <Button variant="outline" gap={10}>
        <GoogleIcon width={16} height={16} /> Entrar com o Google
      </Button>
      <InfoText>
        Não possui uma conta? <a href="">Criar conta</a>
      </InfoText>
    </LoginContainer>
  )
}

export { LoginScreen }

const LoginContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 24px;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  text-align: left;
`

const Title = styled.h1`
  ${({ theme }) => theme.fonts.h1}
`

const Subtitle = styled.h2`
  ${({ theme }) => theme.fonts.titleMD}
  color: ${({ theme }) => theme.colors.neutralL0};
`

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const InputLabel = styled.label`
  ${({ theme }) => theme.fonts.textMD}
  width: 100%;
`

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.neutralL3};

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.neutralL1};
  }
`

const InfoText = styled.p`
  ${({ theme }) => theme.fonts.textMD}
  color: ${({ theme }) => theme.colors.neutralSecondary};
`
