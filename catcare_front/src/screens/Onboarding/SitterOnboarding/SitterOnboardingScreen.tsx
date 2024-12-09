import { Button } from '@/components/Button/Button'
import {
  Form,
  DescriptionField,
  Header,
  Label,
  SitterOnboardingContainer,
  Subtitle,
  Title,
  InputWrapper,
  MenuProps,
  AddressItemGroup
} from './SitterOnboardingScreen.styles'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/router/RouterPathsMapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material'
import { cities, statesBR } from './utils'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'

type SitterSchema = z.infer<typeof sitterSchema>

const sitterSchema = z.object({
  address: z.object({
    street: z.string().min(1, 'Informe a rua'),
    city: z.string().min(1, 'Informe a cidade'),
    state: z.string().min(1, 'Informe o estado'),
    zipCode: z.string().min(1, 'Informe o CEP'),
    country: z.string().min(1, 'Informe o país'),
    complement: z.string().optional(),
    number: z.number().optional()
  }),
  price: z.number().min(0, 'Informe o preço do serviço'),
  jobDesc: z.string().min(1, 'Informe a descrição do trabalho')
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
  const { authState, setUser } = useContext(AuthContext)

  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [emptyCitiesError, setEmptyCitiesError] = useState(false)

  const handleChange = (event: SelectChangeEvent<typeof selectedCities>) => {
    const {
      target: { value }
    } = event
    setSelectedCities(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const handleFinish = useCallback(
    async (data: SitterSchema) => {
      if (selectedCities.length === 0) {
        setEmptyCitiesError(true)
        return
      }

      const body = {
        ...data,
        attendancePlaces: selectedCities,
        userId: authState.user.id,
        type: 'SITTER'
      }

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
        setUser({ ...authState.user, type: 'SITTER', onboardingDone: true })

        toast.success('Cadastro finalizado!')
        navigate(RouterPaths.HOME)
      } catch (error) {
        console.error(error)
      }
    },
    [selectedCities, authState.user.id]
  )

  useEffect(() => {
    if (authState.user?.onboardingDone) {
      navigate(RouterPaths.HOME)
    }
  }, [authState.user?.onboardingDone])

  return (
    <SitterOnboardingContainer>
      <Header>
        <Title>Nos conte sobre o seu trabalho!</Title>
        <Subtitle>Queremos saber mais sobre como você cuida dos gatinhos</Subtitle>
      </Header>
      <Form onSubmit={handleSubmit(handleFinish)}>
        <InputWrapper>
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
              <Select
                {...register('address.state')}
                defaultValue={''}
                error={!!errors.address?.state}
                label="Estado"
                fullWidth
              >
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
        </InputWrapper>
        <InputWrapper>
          <Label>Onde voce atende?</Label>
          <Select
            multiple
            maxRows={1}
            size="small"
            placeholder="Selecione as cidades"
            value={selectedCities}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
            error={emptyCitiesError}
          >
            {[...cities].sort().map((city) => (
              <MenuItem
                key={city}
                value={city}
                style={{
                  backgroundColor: selectedCities.indexOf(city) !== -1 ? 'rgba(0, 20, 26, 0.11)' : 'white'
                }}
              >
                {city}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={emptyCitiesError}>
            {emptyCitiesError ? 'Selecione pelo menos uma cidade' : ''}
          </FormHelperText>
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
            error={!!errors.price}
            helperText={errors.price ? errors.price.message : ''}
            {...register('price', { valueAsNumber: true })}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Deixe aqui uma descrição do seu trabalho</Label>
          <DescriptionField
            multiline
            minRows={5}
            maxRows={10}
            placeholder="Descreva como você cuida dos gatinhos"
            error={!!errors.jobDesc}
            helperText={errors.jobDesc ? errors.jobDesc.message : ''}
            {...register('jobDesc')}
          />
        </InputWrapper>
        <Button type="submit" variant="filled" fullWidth>
          Finalizar
        </Button>
      </Form>
    </SitterOnboardingContainer>
  )
}

export { SitterOnboardingScreen }
