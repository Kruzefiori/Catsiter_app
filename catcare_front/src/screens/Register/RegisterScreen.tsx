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

  const handleRegister = useCallback((data: RegisterSchema) => {
    console.log(data)
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
          Entrar
        </Button>
      </Form>
      <InfoText>
        Já possui uma conta? <Link to={RouterPaths.LOGIN}>Criar conta</Link>
      </InfoText>
    </RegisterContainer>
  )
}

export { RegisterScreen }
