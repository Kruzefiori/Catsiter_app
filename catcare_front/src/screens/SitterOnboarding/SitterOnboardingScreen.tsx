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
  ErrorMessage
} from './SitterOnboardingScreen.styles'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/router/RouterPathsMapper'
import { useBehaviorSubject } from '@/hooks/useBehaviorSubject'
import { AuthState, AuthStateProps } from '@/states/AuthState'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

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
        <Label>Descreva aqui o seu trabalho</Label>
        <DescriptionField minRows={5} maxRows={10} {...register('jobDesc')} />
        {!!errors.jobDesc && <ErrorMessage>{errors.jobDesc.message}</ErrorMessage>}
        <Button type="submit" variant="filled">
          Finalizar
        </Button>
      </Form>
    </SitterOnboardingContainer>
  )
}

export { SitterOnboardingScreen }
