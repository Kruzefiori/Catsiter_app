import { User } from '@/domain/models/User'

type Requester = User & { address: string }

export const requestersData: Requester[] = [
  {
    id: 1,
    name: 'Rodrigo Oliveira',
    address: 'Rua dos Gatos, 123',
    email: 'rodrigo@email.com',
    isCatsitter: false,
    onBoardingDone: true
  },
  {
    id: 3,
    name: 'João Silva',
    address: 'Avenida dos Felinos, 456',
    email: 'joao@email.com',
    isCatsitter: false,
    onBoardingDone: true
  },
  {
    id: 5,
    name: 'Maria Souza',
    address: 'Travessa dos Gatinhos, 789',
    email: 'maria@email.com',
    isCatsitter: false,
    onBoardingDone: true
  }
]
