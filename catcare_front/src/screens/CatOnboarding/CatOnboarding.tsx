import { Button } from '@/components/Button/Button'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import styled from 'styled-components'

interface CatOnboardingScreenProps {}

function CatOnboardingScreen(props: CatOnboardingScreenProps) {
  const {} = props

  const catCondition = [
    {
      id: 'castrated',
      label: 'Castrado'
    },
    {
      id: 'diabetes',
      label: 'Diabetes'
    },
    {
      id: 'renal_insufficiency',
      label: 'Insuficiência renal'
    },
    {
      id: 'fiv',
      label: 'FIV'
    },
    {
      id: 'kidney_stones',
      label: 'Cálculo renal'
    },
    {
      id: 'gingivitis',
      label: 'Gengivite'
    },
    {
      id: 'felv',
      label: 'FELV'
    },
    {
      id: 'obesity',
      label: 'Obesidade'
    }
  ]

  return (
    <CatOnboardingContainer>
      <Header>
        <Title>Hora de cadastrar os seus gatinhos</Title>
        <Subtitle>
          Complete o cadastro dos seus gatinhos fornecendo as informações necessárias para que eles sejam bem cuidados
        </Subtitle>
      </Header>
      <Body>
        <Accordion>
          <AccordionSummary>Garfield</AccordionSummary>
          <AccordionDetails>Detalhes do gato Garfield</AccordionDetails>
        </Accordion>
        <InputWrapper>
          <label htmlFor="name">Nome</label>
          <input type="text" id="name" placeholder="Miau" />
        </InputWrapper>
        <InputWrapper>
          <p>Sexo</p>
          <input type="radio" id="male" name="sex" /> <label htmlFor="male">Macho</label>
          <input type="radio" id="female" name="sex" /> <label htmlFor="female">Fêmea</label>
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="age">Idade</label>
          <input type="number" id="age" placeholder="6" /> <input type="number" placeholder="meses" />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="weight">Peso</label>
          <input type="number" id="weight" placeholder="3" />
          kg
        </InputWrapper>
        <InputWrapper>
          <p>Condições específicas ou de saúde</p>
          {catCondition.map((condition) => (
            <>
              <input type="checkbox" name={condition.id} id={condition.id} />
              <label htmlFor={condition.id}>{condition.label}</label>
            </>
          ))}
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="additional-info">Informações adicionais</label>
          <textarea name="additional-info" id="additional-info" />
        </InputWrapper>

        <Button type="submit" variant="filled">
          Salvar
        </Button>
        <Button type="submit" variant="light-filled">
          Adicionar outro gatinho
        </Button>
        <Button type="submit" variant="filled">
          Continuar
        </Button>
      </Body>
    </CatOnboardingContainer>
  )
}

export { CatOnboardingScreen }

const CatOnboardingContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 24px;
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  text-align: left;
`

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.h1}
`

export const Subtitle = styled.h2`
  ${({ theme }) => theme.fonts.titleMD}
  color: ${({ theme }) => theme.colors.neutralL0};
`

export const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const InputWrapper = styled.div`
  width: 100%;
  gap: 8px;
`
