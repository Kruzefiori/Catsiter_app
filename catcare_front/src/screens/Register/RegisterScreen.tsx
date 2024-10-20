import { useCallback, useState } from 'react'
import { Button } from '@/components/Button/Button'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { RegisterContainer, Header, Title, Subtitle, InputWrapper, InfoText, Form } from './RegisterScreen.styles'
import { useForm } from 'react-hook-form'
import { registerSchema, RegisterSchema } from './validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/router/RouterPathsMapper'
import { toast } from 'react-toastify'
import axios from 'axios'

function RegisterScreen() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema)
  })

  const navigate = useNavigate()

  const [showMainPassword, setShowMainPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleRegister = useCallback(async (data: RegisterSchema) => {
    const response = await axios.post(`${import.meta.env.VITE_CATCARE_SERVER_URL}/api/users/register`, {
      name: data.name,
      email: data.email,
      password: data.password
    })

    if (response.status < 200 || response.status >= 300) {
      console.log(response.data)
      toast.error('Ocorreu um erro no nosso sistema. Tente novamente mais tarde')
      return
    }
    console.log(response.data)
    toast.success('Usuário registrado! Entre com a sua nova conta.')
    navigate(RouterPaths.LOGIN)
    reset()
  }, [])

  return (
    <RegisterContainer>
      <Header>
        <Title>Boas vindas ao CatCare!</Title>
        <Subtitle>Crie conta para continuar</Subtitle>
      </Header>
      <Form onSubmit={handleSubmit(handleRegister)}>
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
            type="text"
            label="Nome"
            id="name"
            placeholder="exemplo@exemplo.com"
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
            {...register('name', { required: 'Informe o seu nome' })}
          />
        </InputWrapper>
        <InputWrapper>
          <TextField
            size="small"
            id="password"
            type={showMainPassword ? 'text' : 'password'}
            label="Senha"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            {...register('password', { required: 'Informe a sua senha' })}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowMainPassword((show) => !show)} edge="end">
                      {showMainPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <TextField
            size="small"
            id="confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirmar senha"
            error={!!errors.confirm}
            helperText={errors.confirm ? errors.confirm.message : ''}
            {...register('confirm')}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword((show) => !show)} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
          />
        </InputWrapper>
        <Button type="submit" variant="filled">
          Cadastrar
        </Button>
      </Form>
      <InfoText>
        Já possui uma conta? <Link to={RouterPaths.LOGIN}>Criar conta</Link>
      </InfoText>
    </RegisterContainer>
  )
}

export { RegisterScreen }
