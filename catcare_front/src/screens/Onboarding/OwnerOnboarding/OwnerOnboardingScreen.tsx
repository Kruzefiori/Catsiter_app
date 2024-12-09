import {
  AddressItemGroup,
  Form,
  Header,
  Label,
  OwnerOnboardingContainer,
  Subtitle,
  Title
} from './OwnerOnboardingScreen.styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'
import { useCallback, useContext, useEffect } from 'react'
import { RouterPaths } from '@/router/RouterPathsMapper'
import { Button } from '@/components/Button/Button'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { statesBR } from '../SitterOnboarding/utils'

type OwnerSchema = z.infer<typeof ownerSchema>

const ownerSchema = z.object({
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
    complement: z.string().optional(),
    number: z.number().optional()
  })
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
      type: 'OWNER'
    }

    console.log(body)

    try {
      const response = await axios.post(`${import.meta.env.VITE_CATCARE_SERVER_URL}/profile/onboarding`, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authState.token}`
        }
      })

      if (response.status < 200 || response.status >= 300) {
        toast.error('Não foi possível finalizar o cadastro.')
        throw new Error('Não foi possível finalizar o cadastro.')
      }
      console.log(response.data)
      toast.success('Cadastro finalizado!')
      navigate(RouterPaths.HOME)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    if (authState.user?.onboardingDone) {
      navigate(RouterPaths.HOME)
    }
  }, [authState.user?.onboardingDone])

  return (
    <OwnerOnboardingContainer>
      <Header>
        <Title>Nos conte mais sobre você!</Title>
        <Subtitle>Precisamos de mais algumas informações para finalizarmos o seu cadastro</Subtitle>
      </Header>
      <Form onSubmit={handleSubmit(handleFinish)}>
        <Label>Endereço</Label>
        <AddressItemGroup>
          <TextField
            {...register('address.street')}
            error={!!errors.address?.street}
            helperText={errors.address?.street?.message}
            label="Rua"
            fullWidth
            sx={{ flex: 1 }}
          />
          <TextField
            type="number"
            {...register('address.number', { valueAsNumber: true })}
            error={!!errors.address?.number}
            helperText={errors.address?.number?.message}
            label="Número"
            fullWidth
            sx={{ flex: 0.3 }}
          />
        </AddressItemGroup>
        <TextField
          {...register('address.complement')}
          error={!!errors.address?.complement}
          helperText={errors.address?.complement?.message}
          label="Complemento"
          fullWidth
        />
        <AddressItemGroup>
          <TextField
            {...register('address.city')}
            error={!!errors.address?.city}
            helperText={errors.address?.city?.message}
            label="Cidade"
            fullWidth
            sx={{ flex: 0.7 }}
          />
          <FormControl fullWidth sx={{ flex: 0.3 }} error={!!errors.address?.state}>
            <InputLabel>Estado</InputLabel>
            <Select {...register('address.state')} error={!!errors.address?.state} label="Estado" fullWidth>
              {statesBR.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AddressItemGroup>
        <AddressItemGroup>
          <TextField
            {...register('address.zipCode')}
            error={!!errors.address?.zipCode}
            helperText={errors.address?.zipCode?.message}
            label="CEP"
            fullWidth
          />
          <TextField
            {...register('address.country')}
            error={!!errors.address?.country}
            helperText={errors.address?.country?.message}
            label="País"
            fullWidth
          />
        </AddressItemGroup>
        <Button type="submit" variant="filled" fullWidth>
          Finalizar
        </Button>
      </Form>
    </OwnerOnboardingContainer>
  )
  Header
}

export { OwnerOnboardingScreen }
