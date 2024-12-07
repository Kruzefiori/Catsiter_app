import { Button } from '@/components/Button/Button'
import { List, ListItemButton, RadioGroup, Textarea } from '@mui/joy'
import { catSchema, CatSchema } from './validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { catCondition } from './catRegisterUtils'
import { TextField } from '@mui/material'

import {
  Body,
  CatRegisterContainer,
  CatWrapper,
  CatSummary,
  CatItem,
  CheckboxPill,
  Form,
  Header,
  InputGroup,
  InputLabel,
  InputWrapper,
  PillGroup,
  RadioButton,
  Subtitle,
  Title
} from './CatRegister.styles'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/router/RouterPathsMapper'
import { toast } from 'react-toastify'
import { AuthContext } from '@/context'
import { ArrowDropDown } from '@mui/icons-material'
import { Cat } from '@/domain/models/Cat'

function CatRegisterScreen() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<CatSchema>({
    resolver: zodResolver(catSchema)
  })

  const navigate = useNavigate()
  const { authState, getAuthTokenFromStorage } = useContext(AuthContext)

  const [catList, setCatList] = useState<CatSchema[]>([])

  useEffect(() => {
    const run = async () => {
      try {
        const response = await axios.get<CatSchema[]>(`${import.meta.env.VITE_CATCARE_SERVER_URL}/cat/get-cats`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthTokenFromStorage()}`
          }
        })

        if (response.status < 200 || response.status >= 300) {
          throw new Error('Erro ao buscar os gatinhos')
        }

        setCatList(response.data)
      } catch (error) {
        if (error instanceof Error) {
          toast.error('Houve um erro ao buscar os gatinhos')
          console.error(error)
        }
      }
    }

    run()
  }, [])

  const handleRegisterCat = (data: CatSchema) => {
    const run = async () => {
      // preparar os dados

      // o tipo de body é Cat, mas sem o id como obrigatório
      const body: Omit<Cat, 'id'> = {
        name: data.name,
        gender: data.gender,
        age: data.ageYears * 12 + data.ageMonths,
        ownerId: authState.user.id,
        breed: data.breed,
        weight: data.weight,
        castrated: data.conditions.includes('castrado'),
        conditions: data.conditions.join(','),
        protectionScreen: false, // data.protectionScreen,
        streetAccess: false // data.streetAccess
      }
      try {
        // chamar a api
        const response = await axios.post(`${import.meta.env.VITE_CATCARE_SERVER_URL}/cat/add-cat`, body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthTokenFromStorage()}`
          }
        })
        // tratar a resposta
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Erro ao cadastrar gatinho')
        }
        // dar um feedback visual
        toast.success('Gatinho cadastrado com sucesso!')
        // adicionar o gatinho na lista
        setCatList([...catList, data])
        // limpar o formulário
        reset()
      } catch (error) {
        if (error instanceof Error) {
          toast.error('Houve um erro ao cadastrar o gatinho')
          console.error(error)
        }
      }
    }

    run()
  }

  const handleFinalizeRegister = () => {
    toast.success('Cadastro finalizado com sucesso!')
    navigate(RouterPaths.HOME)
  }

  return (
    <CatRegisterContainer>
      <Header>
        <Title>Vamos cadastrar os seus gatinhos</Title>
        <Subtitle>Forneça as informações necessárias para que eles sejam bem cuidados</Subtitle>
      </Header>
      <h3>Seus gatinhos</h3>
      {catList.map((cat, index) => (
        <CatWrapper key={index}>
          <CatSummary expandIcon={<ArrowDropDown />}>
            <div>{cat.name}</div>
          </CatSummary>
          <CatItem>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}
            >
              <div>
                <strong>Idade</strong>: {cat.ageYears} anos e {cat.ageMonths} meses
              </div>
              <div>
                <strong>Sexo</strong>: {cat.gender}
              </div>
              <div>
                <strong>Raça</strong>: {cat.breed}
              </div>
              <div>
                <strong>Peso</strong>: {cat.weight} kg
              </div>
              <div>
                <strong>Condições de saúde</strong>: {cat.conditions}
              </div>
              <div>
                <strong>Informações adicionais</strong>: {cat.additionalInfo}
              </div>
            </div>
          </CatItem>
        </CatWrapper>
      ))}

      <Body>
        <h3>Adicionar novo gatinho</h3>
        <Form onSubmit={handleSubmit(handleRegisterCat)}>
          <InputWrapper>
            <InputLabel>Nome</InputLabel>
            <TextField
              size="small"
              type="text"
              placeholder="Miau"
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
              {...register('name')}
            />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Sexo</InputLabel>
            <RadioGroup name="gender" orientation="horizontal" {...register('gender')}>
              <List orientation="horizontal" sx={{ gap: 3 }}>
                {['fêmea', 'macho'].map((item) => (
                  <ListItemButton
                    variant="plain"
                    key={item}
                    sx={{
                      boxShadow: 'none',
                      border: 'none',
                      borderRadius: 8,
                      height: 20,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      flex: 1
                    }}
                  >
                    <RadioButton
                      overlay
                      variant="plain"
                      value={item}
                      label={item}
                      disableIcon
                      color="neutral"
                      {...register('gender')}
                    />
                  </ListItemButton>
                ))}
              </List>
            </RadioGroup>
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Raça</InputLabel>
            <TextField
              size="small"
              type="text"
              placeholder="SRD"
              error={!!errors.breed}
              helperText={errors.breed ? errors.breed.message : ''}
              {...register('breed')}
            />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Idade</InputLabel>
            <InputGroup>
              <TextField
                size="small"
                type="number"
                placeholder="6"
                slotProps={{
                  htmlInput: { min: 0 }
                }}
                error={!!errors.ageYears}
                helperText={errors.ageYears ? errors.ageYears.message : ''}
                {...register('ageYears', { valueAsNumber: true })}
              />
              <TextField
                size="small"
                type="number"
                placeholder="meses"
                slotProps={{
                  htmlInput: { min: 0, max: 12 }
                }}
                error={!!errors.ageMonths}
                helperText={errors.ageMonths ? errors.ageMonths.message : ''}
                {...register('ageMonths', { valueAsNumber: true })}
              />
            </InputGroup>
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Peso</InputLabel>
            <TextField
              size="small"
              type="number"
              id="weight"
              placeholder="3"
              slotProps={{
                htmlInput: { min: 0 }
              }}
              error={!!errors.weight}
              helperText={errors.weight ? errors.weight.message : ''}
              {...register('weight', { valueAsNumber: true })}
            />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Condições específicas ou de saúde</InputLabel>
            <PillGroup>
              {catCondition.map((condition) => (
                <CheckboxPill
                  key={condition}
                  size="sm"
                  disableIcon
                  value={condition}
                  label={condition}
                  {...register('conditions')}
                />
              ))}
            </PillGroup>
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Informações adicionais</InputLabel>
            <Textarea minRows={2} maxRows={5} {...register('additionalInfo')} />
          </InputWrapper>
          <Button type="submit" variant="light-filled" fullWidth>
            Adicionar
          </Button>
        </Form>
        <Button variant="filled" fullWidth onClick={handleFinalizeRegister}>
          Finalizar cadastro
        </Button>
      </Body>
    </CatRegisterContainer>
  )
}

export { CatRegisterScreen }
