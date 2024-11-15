import { Button } from '@/components/Button/Button'
import {
  Form,
  DescriptionField,
  Header,
  Label,
  SitterOnboardingContainer,
  Subtitle,
  Title,
  InputWrapper
} from './SitterOnboardingScreen.styles'
import { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/router/RouterPathsMapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Box,
  Chip,
  FormHelperText,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material'
import { cities } from './sitterOnboardingUtils'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'

type SitterSchema = z.infer<typeof sitterSchema>

const sitterSchema = z.object({
  address: z.string().min(1, 'Informe o endereço'),
  price: z.number().min(0, 'Informe o preço do serviço'),
  jobDesc: z.string().min(1, 'Informe a descrição do trabalho')
})

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

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
  const { authState } = useContext(AuthContext)

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
      console.log(data, authState.user.id)
      if (selectedCities.length === 0) {
        setEmptyCitiesError(true)
        return
      }

      const body = {
        ...data,
        cities: selectedCities,
        userId: authState.user.id
      }

      const response = await axios.post(`${import.meta.env.VITE_CATCARE_SERVER_URL}/profile/onboarding`, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authState.token}`
        }
      })

      if (response.status < 200 || response.status >= 300) {
        toast.error('Não foi possível finalizar o cadastro.')
        return
      }

      toast.success('Cadastro finalizado!')
      navigate(RouterPaths.HOME)
    },
    [selectedCities, authState.user.id]
  )

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
            error={!!errors.address}
            helperText={errors.address ? errors.address.message : ''}
            {...register('address')}
          />
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
            {cities.map((city) => (
              <MenuItem
                key={city.value}
                value={city.value}
                style={{
                  backgroundColor: selectedCities.indexOf(city.value) !== -1 ? 'rgba(0, 20, 26, 0.11)' : 'white'
                }}
              >
                {city.label}
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
