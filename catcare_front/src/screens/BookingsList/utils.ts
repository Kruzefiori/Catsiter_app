import { User } from '@/domain/models/User'

export const requestersData: User[] = [
  {
    id: 1,
    name: 'Rodrigo Oliveira',
    address: {
      street: 'Rua dos Gatos, 123',
      city: 'São Paulo',
      state: 'SP',
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
      street: 'Rua dos Gatos, 456',
      city: 'São Paulo',
      state: 'SP',
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
      street: 'Travessa dos Gatinhos, 789',
      city: 'São Paulo',
      state: 'SP',
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
