import { Button } from '@/components/Button/Button'
import {
  OnboardingContainer,
  Header,
  Title,
  Subtitle,
  Body,
  InputWrapper,
  InputLabel,
  RadioButton,
  Form
} from './OnboardingScreen.styles'
import { List, ListItemButton, RadioGroup } from '@mui/joy'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema, ProfileSchema } from './validation'
import { useForm } from 'react-hook-form'
import { TextField } from '@mui/material'
import { useCallback } from 'react'
interface OnboardingScreenProps {}

function OnboardingScreen(props: OnboardingScreenProps) {
  const {} = props

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema)
  })

  const handleSaveUserProfile = useCallback((data: ProfileSchema) => {
    console.log(data)
  }, [])

  return (
    <OnboardingContainer>
      <Header>
        <Title>Vamos completar o seu cadastro!</Title>
        <Subtitle>Preencha mais algumas informações sobre você para continuarmos</Subtitle>
      </Header>
      <Body>
        <Form onSubmit={handleSubmit(handleSaveUserProfile)}>
          <InputWrapper>
            <InputLabel>Seu nome</InputLabel>
            <TextField
              size="small"
              placeholder="Como podemos te chamar?"
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
              {...register('name')}
            />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>O que melhor descreve você?</InputLabel>
            <RadioGroup name="userType" orientation="horizontal" {...register('jobDesc')}>
              <List orientation="horizontal" sx={{ gap: 3 }}>
                {[
                  { id: 'owner', value: 'Tutor(a)' },
                  { id: 'sitter', value: 'Catsitter' }
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
                      {...register('jobDesc')}
                    />
                  </ListItemButton>
                ))}
              </List>
            </RadioGroup>
          </InputWrapper>
          <Button type="submit" variant="filled">
            Continuar
          </Button>
        </Form>
      </Body>
    </OnboardingContainer>
  )
}

export { OnboardingScreen }
