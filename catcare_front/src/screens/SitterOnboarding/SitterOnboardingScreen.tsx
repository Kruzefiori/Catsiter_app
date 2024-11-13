import { Button } from '@/components/Button/Button'
import {
  Form,
  DescriptionField,
  Header,
  Label,
  SitterOnboardingContainer,
  Subtitle,
  Title,
  WarningMessage,
  ErrorMessage,
  InputWrapper
} from './SitterOnboardingScreen.styles'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/router/RouterPathsMapper'
import { useBehaviorSubject } from '@/hooks/useBehaviorSubject'
import { AuthState, AuthStateProps } from '@/states/AuthState'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { InputAdornment, MenuItem, TextField } from '@mui/material'
import { cities } from './sitterOnboardingUtils'

type SitterSchema = z.infer<typeof sitterSchema>

const sitterSchema = z.object({
  jobDesc: z.string().min(1, 'Preencha esse campo')
})

function SitterOnboardingScreen() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<SitterSchema>({
    resolver: zodResolver(sitterSchema)
  })
  const navigate = useNavigate()

  const authState = useBehaviorSubject<AuthStateProps>(AuthState)

  const handleFinish = useCallback((data: SitterSchema) => {
    console.log(data, authState.user.id)

    navigate(RouterPaths.HOME)
  }, [])

  return (
    <SitterOnboardingContainer>
      <Header>
        <Title>Nos conte sobre o seu trabalho!</Title>
        <Subtitle>Queremos saber mais sobre como você cuida dos gatinhos</Subtitle>
      </Header>
      <Form onSubmit={handleSubmit(handleFinish)}>
        <InputWrapper>
          <Label>Qual o seu endereço?</Label>
          <TextField
            size="small"
            type="text"
            id="address"
            placeholder="rua, número, bairro, cidade, estado"
            // error={!!errors.email}
            // helperText={errors.email ? errors.email.message : ''}
            // {...register('email', { required: 'Informe o email' })}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Onde voce atende?</Label>
          <TextField
            size="small"
            type="text"
            select
            id="places"
            placeholder="mostrar opções de cidades"

            // error={!!errors.email}
            // helperText={errors.email ? errors.email.message : ''}
            // {...register('email', { required: 'Informe o email' })}
          >
            <div style={{ maxHeight: 250 }}>
              {cities.map((city) => (
                <MenuItem key={city.value} value={city.value}>
                  {city.label}
                </MenuItem>
              ))}
            </div>
          </TextField>
        </InputWrapper>
        <InputWrapper>
          <Label>Qual o preço do seu serviço?</Label>
          <TextField
            size="small"
            type="number"
            id="address"
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">R$</InputAdornment>
              }
            }}
            // error={!!errors.email}
            // helperText={errors.email ? errors.email.message : ''}
            // {...register('email', { required: 'Informe o email' })}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Deixe aqui uma descrição do seu trabalho</Label>
          <DescriptionField minRows={5} maxRows={10} {...register('jobDesc')} />
          {!!errors.jobDesc && <ErrorMessage>{errors.jobDesc.message}</ErrorMessage>}
        </InputWrapper>
        <Button type="submit" variant="filled">
          Finalizar
        </Button>
      </Form>
    </SitterOnboardingContainer>
  )
}

export { SitterOnboardingScreen }
