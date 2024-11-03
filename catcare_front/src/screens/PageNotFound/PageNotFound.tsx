import styled from 'styled-components'
import catMunch from '@assets/cat-munch.gif'
import { Link } from 'react-router-dom'
import { RouterPaths } from '@/router/RouterPathsMapper'

interface PageNotFoundScreenProps {}

function PageNotFoundScreen(props: PageNotFoundScreenProps) {
  const {} = props
  return (
    <PageNotFoundContainer>
      <GifFigure>
        <img src={catMunch} alt="" />
      </GifFigure>
      <Header>
        <Title>Ops! Parece que o gato comeu essa página...</Title>
        <Subtitle>
          "Infelizmente, não conseguimos encontrar o que você estava procurando. Talvez nosso gato aventureiro tenha
          derrubado o link da prateleira! 😸
        </Subtitle>

        <Message>
          Que tal voltar para a nossa <Link to={RouterPaths.HOME}>página inicial</Link> e continuar explorando?{' '}
        </Message>
      </Header>
    </PageNotFoundContainer>
  )
}

export { PageNotFoundScreen }

const PageNotFoundContainer = styled.div`
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
  text-align: center;
`

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.h1}
`

export const Subtitle = styled.h2`
  ${({ theme }) => theme.fonts.titleMD}
  color: ${({ theme }) => theme.colors.neutralL0};
`

const GifFigure = styled.figure`
  text-align: center;
  img {
    width: 150px;
    height: 120px;
  }
`

const Message = styled.span`
  ${({ theme }) => theme.fonts.infoMD}
  margin: 50px 0;
  width: 100%;
`
