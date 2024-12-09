import { AuthContext } from '@/context'
import axios from 'axios'
import { useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import styled from 'styled-components'
import { Cat } from '@/domain/models/Cat'
import { ArrowDropDown } from '@mui/icons-material'
import { ageByMonths } from './utils'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/router/RouterPathsMapper'
import { Add } from '@mui/icons-material'
import { Button } from '@/components/Button/Button'

function ProfileScreen() {
  const { authState, getAuthTokenFromStorage } = useContext(AuthContext)
  const navigate = useNavigate()

  const [catList, setCatList] = useState<Cat[]>([])

  const user = useMemo(() => authState.user, [authState])

  const handleAddMoreCats = () => {
    navigate(RouterPaths.CAT_REGISTER)
  }

  useEffect(() => {
    const run = async () => {
      try {
        const response = await axios.get<Cat[]>(`${import.meta.env.VITE_CATCARE_SERVER_URL}/cat/get-cats`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthTokenFromStorage()}`
          }
        })

        if (response.status < 200 || response.status >= 300) {
          throw new Error('Erro ao buscar os gatos do usuário')
        }

        setCatList(response.data)
      } catch (error) {
        if (error instanceof Error) {
          toast.error('Houve um erro ao buscar seus gatinhos')
          console.error(error)
        }
      }
    }

    run()
  }, [])

  return (
    <ProfileScreenContainer>
      <h1>{user.name}</h1>
      <span>{user.type === 'OWNER' ? 'Proprietário' : 'Cuidador'}</span>
      <span>
        <strong>Email</strong>: {user.email}
      </span>
      <span>
        <strong>Endereço</strong>:{' '}
        {user.address ? (
          `${user.address.street}, ${user.address.number} - ${user.address.city}, ${user.address.state}`
        ) : (
          <i>(não informado)</i>
        )}
      </span>
      <CatsHeader>
        <h2>Seus gatinhos</h2>
        <Button variant="ghost" size="sm" onClick={handleAddMoreCats}>
          <Add />
          <span>Adicionar</span>
        </Button>
      </CatsHeader>
      {catList.map((cat) => (
        <CatWrapper key={cat.id}>
          <CatSummary expandIcon={<ArrowDropDown />}>
            <div>
              <span>{cat.name}</span>
            </div>
          </CatSummary>
          <CatItem>
            <span>
              <strong>Nome</strong>: {cat.name}
            </span>
            <span>
              <strong>Idade</strong>: {ageByMonths(cat.age)}
            </span>
            <span>
              <strong>Sexo</strong>: {cat.gender}
            </span>
            <span>
              <strong>Raça</strong>: {cat.breed}
            </span>
            <span>
              <strong>Peso</strong>: {cat.weight} kg
            </span>
            <span>
              <strong>Castrado</strong>: {cat.castrated ? '✅' : '❌'}
            </span>
            <span>
              <strong>Condições</strong>: {cat.conditions.replace(',', ', ')}
            </span>
            <span>
              <strong>Tela de proteção</strong>: {cat.protectionScreen ? '✅' : '❌'}
            </span>
            <span>
              <strong>Acesso à rua</strong>: {cat.streetAccess ? '✅' : '❌'}
            </span>
          </CatItem>
        </CatWrapper>
      ))}
    </ProfileScreenContainer>
  )
}

export { ProfileScreen }

const ProfileScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`

const CatWrapper = styled(Accordion)`
  border: 1px solid ${({ theme }) => theme.colors.neutralL1};
  border-radius: 8px;
  width: 100%;
`

const CatSummary = styled(AccordionSummary)`
  ${({ theme }) => theme.fonts.titleXS}
  color: ${({ theme }) => theme.colors.secondary};
  & > * {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`

export const CatItem = styled(AccordionDetails).attrs({
  sx: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '8px 8px 16px 8px'
  }
})``

const CatsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`
