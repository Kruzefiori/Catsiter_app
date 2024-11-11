import { Button } from '@/components/Button/Button'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import GoogleIcon from '@assets/google.svg?react'
import { useCallback, useState } from 'react'
import { IconButton, InputAdornment, TextField } from '@mui/material'

import { LoginContainer, Header, Title, Subtitle, InputWrapper, InfoText, Form } from './LoginScreen.styles'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, loginSchema } from './validation'
import { Link, NavigateOptions, useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/router/RouterPathsMapper'
import { saveAuthToken, setUserData } from '@/services/Authenticator'
import axios from 'axios'
import { useGoogleLogin } from '@react-oauth/google'
import { toast } from 'react-toastify'

type LoginBody = {
  email: string
  name: string
}

type LoginResponse = {
  token: string
}

type GoogleResponse = {
  token: string
  user: {
    email: string
    id: string | number
    name: string
    picture: string
  }
}

function LoginScreen() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = useCallback(async (data: LoginSchema) => {
    const response = await axios.post<LoginResponse>(`${import.meta.env.VITE_CATCARE_SERVER_URL}/auth/sign-in`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status < 200 || response.status >= 300) {
      toast.error('Não foi possível fazer o login. (MELHORE A MENSAGEM!)') // TODO: Não esquece disso
      return
    }

    saveAuthToken(response.data.token)
    toast.success('Login feito com sucesso!')
    navigate(RouterPaths.HOME, {
      state: {
        isGoogleUser: false
      }
    })
    reset()
  }, [])

  const handleGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      const response = await axios.post<GoogleResponse>('http://localhost:3000/api/auth/google', {
        code: codeResponse.code
      })

      saveAuthToken(response.data.token)
      setUserData({
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        picture: response.data.user.picture
      })

      toast.success('Login realizado com sucesso')
      navigate(RouterPaths.HOME, {
        state: {
          isGoogleUser: true
        }
      })
    },
    onError: (errorResponse) => {
      toast.error(`${errorResponse.error}: ${errorResponse.error_description}`)
    }
  })

  return (
    <LoginContainer>
      <Header>
        <Title>Boas vindas ao CatCare!</Title>
        <Subtitle>Entre na sua conta para continuar</Subtitle>
      </Header>
      <Form onSubmit={handleSubmit(handleLogin)}>
        <InputWrapper>
          <TextField
            size="small"
            type="text"
            label="E-mail"
            id="email"
            placeholder="exemplo@exemplo.com"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            {...register('email', { required: 'Informe o email' })}
          />
        </InputWrapper>

        <InputWrapper>
          <TextField
            size="small"
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="Senha"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            {...register('password', { required: 'Informe a sua senha' })}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton tabIndex={-1} onClick={() => setShowPassword((show) => !show)} edge="end">
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

        <Button type="submit" variant="filled">
          Entrar
        </Button>
      </Form>
      <InfoText>ou</InfoText>
      <Button variant="outline" gap={10} onClick={handleGoogleLogin}>
        <GoogleIcon width={16} height={16} /> Entrar com o Google
      </Button>
      <InfoText>
        Não possui uma conta? <Link to={RouterPaths.REGISTER}>Criar conta</Link>
      </InfoText>
    </LoginContainer>
  )
}

export { LoginScreen }
