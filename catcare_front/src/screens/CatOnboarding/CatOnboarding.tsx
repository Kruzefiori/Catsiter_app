import { Button } from '@/components/Button/Button'
import { List, ListItemButton, RadioGroup, Textarea } from '@mui/joy'
import { useTheme } from 'styled-components'
import { catSchema, CatSchema } from './validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { catCondition } from './catOnboardingUtils'
import { TextField } from '@mui/material'

import {
  Body,
  CatOnboardingContainer,
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
} from './CatOnboarding.styles'

interface CatOnboardingScreenProps {}

function CatOnboardingScreen(props: CatOnboardingScreenProps) {
  const {} = props

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<CatSchema>({
    resolver: zodResolver(catSchema)
  })

  const handleRegisterCat = (data: CatSchema) => {
    // preparar os dados
    console.log(data)
    // chamar a api
    // passar os dados no body
    // receber a resposta
    // dar um feedback visual
  }

  return (
    <CatOnboardingContainer>
      <Header>
        <Title>Hora de cadastrar os seus gatinhos</Title>
        <Subtitle>
          Complete o cadastro dos seus gatinhos fornecendo as informações necessárias para que eles sejam bem cuidados
        </Subtitle>
      </Header>
      <Body>
        {/* <Accordion>
          <AccordionSummary>Garfield</AccordionSummary>
          <AccordionDetails>Detalhes do gato Garfield</AccordionDetails>
        </Accordion> */}
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
                {[
                  { id: 'female', value: 'Fêmea' },
                  { id: 'male', value: 'Macho' }
                ].map((item) => (
                  <ListItemButton
                    variant="plain"
                    key={item.id}
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
                      value={item.id}
                      label={item.value}
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
                  key={condition.id}
                  size="sm"
                  disableIcon
                  value={condition.id}
                  label={condition.label}
                  {...register('conditions')}
                />
              ))}
            </PillGroup>
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Informações adicionais</InputLabel>
            <Textarea minRows={2} maxRows={5} {...register('additionalInfo')} />
          </InputWrapper>
          <Button type="submit" variant="light-filled">
            Adicionar outro gatinho
          </Button>
        </Form>
        <Button variant="filled">Continuar</Button>
      </Body>
    </CatOnboardingContainer>
  )
}

export { CatOnboardingScreen }
