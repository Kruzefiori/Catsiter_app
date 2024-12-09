import { User } from '@/domain/models/User'

export const requestersData: User[] = [
  {
    id: 1,
    name: 'Rodrigo Oliveira',
    address: {
      street: 'Rua dos Gatos',
      city: 'Pouso Alegre',
      state: 'MG',
      zipCode: '12345678',
      country: 'Brasil',
      complement: 'Apto 101',
      number: 123
    },
    email: 'rodrigo@email.com',
    type: 'OWNER',
    onboardingDone: true
  },
  {
    id: 3,
    name: 'João Silva',
    address: {
      street: 'Rua dos Gatos',
      city: 'Brazópolis',
      state: 'MG',
      zipCode: '12345678',
      country: 'Brasil',
      complement: 'Apto 202',
      number: 456
    },
    email: 'joao@email.com',
    type: 'OWNER',
    onboardingDone: true
  },

  {
    id: 5,
    name: 'Maria Souza',
    address: {
      street: 'Travessa dos Gatinhos',
      city: 'Itajubá',
      state: 'MG',
      zipCode: '12345678',
      country: 'Brasil',
      complement: 'Apto 303',
      number: 789
    },
    email: 'maria@email.com',
    type: 'OWNER',
    onboardingDone: true
  }
]
