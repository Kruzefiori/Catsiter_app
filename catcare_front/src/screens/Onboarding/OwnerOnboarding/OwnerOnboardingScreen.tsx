import { Form, Header, Label, OwnerOnboardingContainer, Subtitle, Title } from './OwnerOnboardingScreen.styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'
import { useCallback, useContext, useEffect } from 'react'
import { RouterPaths } from '@/router/RouterPathsMapper'
import { Button } from '@/components/Button/Button'
import { TextField } from '@mui/material'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'

type OwnerSchema = z.infer<typeof ownerSchema>

const ownerSchema = z.object({
  address: z.string().min(1, 'Preencha esse campo')
})

function OwnerOnboardingScreen() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<OwnerSchema>({
    resolver: zodResolver(ownerSchema)
  })
  const navigate = useNavigate()
  const { authState, setUser } = useContext(AuthContext)

  const handleFinish = useCallback(async (data: OwnerSchema) => {
    const body = {
      ...data,
      userId: authState.user.id,
      isCatsitter: false
    }

    // const response = await axios.post(`${import.meta.env.VITE_CATCARE_SERVER_URL}/profile/onboarding`, body, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${authState.token}`
    //   }
    // })

    // if (response.status < 200 || response.status >= 300) {
    //   toast.error('Não foi possível finalizar o cadastro.')
    //   return
    // }

    setUser({ ...authState.user, isCatsitter: false, onBoardingDone: true })
    toast.success('Cadastro finalizado!')
    navigate(RouterPaths.HOME)
  }, [])

  useEffect(() => {
    if (authState.user?.onBoardingDone) {
      navigate(RouterPaths.HOME)
    }
  }, [authState.user?.onBoardingDone])

  return (
    <OwnerOnboardingContainer>
      <Header>
        <Title>Nos conte mais sobre você!</Title>
        <Subtitle>Precisamos de mais algumas informações para finalizarmos o seu cadastro</Subtitle>
      </Header>
      <Form onSubmit={handleSubmit(handleFinish)}>
        <Label>Qual o seu endereço?</Label>
        <TextField
          size="small"
          type="text"
          id="address"
          placeholder="rua, número, bairro, cidade, estado"
          error={!!errors.address}
          helperText={errors.address?.message}
          {...register('address')}
        />
        <Button type="submit" variant="filled" fullWidth>
          Finalizar
        </Button>
      </Form>
    </OwnerOnboardingContainer>
  )
  Header
}

export { OwnerOnboardingScreen }
