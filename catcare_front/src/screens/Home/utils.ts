import { CatSitter } from '@/domain/models/CatSitter'
import { VisitStatus } from '@/domain/models/Visits'
import { Booking, BookingStatus } from '@/domain/models/Booking'
import { User } from '@/domain/models/User'

// requesters ids: 1, 3, 5, etc...
// requesteds ids: 2, 4, 6, etc...
// catsitters are the requesteds
// owners are the requesters

export const mockedCatSitters: CatSitter[] = [
  {
    id: 2,
    name: 'Cat Sitter 1',
    price: 50.99,
    jobDesc: 'Meu trabalho envolve alimentar, brincar e cuidar do seu gato.',
    address: 'Rua dos Gatos, 123',
    bookings: [
      {
        id: 2,
        requesterId: 1,
        requestedId: 2,
        startDate: new Date('2024-12-01T00:00:00'),
        endDate: new Date('2024-12-10T00:00:00'),
        generalNotes: 'Gato muito bravo.',
        status: BookingStatus.PENDING,
        totalVisits: 3,
        createdAt: new Date('2024-12-01T00:00:00'),
        updatedAt: new Date('2024-12-01T00:00:00'),
        visits: [
          {
            id: 1,
            bookingId: 2,
            visitDate: new Date('2024-12-01T08:30:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          },
          {
            id: 2,
            bookingId: 2,
            visitDate: new Date('2024-12-05T14:15:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          },
          {
            id: 3,
            bookingId: 2,
            visitDate: new Date('2024-12-10T11:45:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          }
        ]
      },
      {
        id: 4,
        requesterId: 3,
        requestedId: 2,
        startDate: new Date('2024-12-15T00:00:00'),
        endDate: new Date('2024-12-20T00:00:00'),
        generalNotes: 'Gato muito doente.',
        status: BookingStatus.PENDING,
        totalVisits: 2,
        createdAt: new Date('2024-12-01T00:00:00'),
        updatedAt: new Date('2024-12-01T00:00:00'),
        visits: [
          {
            id: 4,
            bookingId: 4,
            visitDate: new Date('2024-12-15T09:00:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          },
          {
            id: 5,
            bookingId: 4,
            visitDate: new Date('2024-12-20T16:00:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'Cat Sitter 2',
    price: 60.25,
    jobDesc: 'Minha especialidade é cuidar de gatos idosos.',
    address: 'Avenida dos Felinos, 456',
    bookings: [
      {
        id: 2,
        requesterId: 5,
        requestedId: 4,
        startDate: new Date('2024-12-15T00:00:00'),
        endDate: new Date('2024-12-20T00:00:00'),
        generalNotes: 'Gato muito doente.',
        status: BookingStatus.PENDING,
        totalVisits: 2,
        createdAt: new Date('2024-12-01T00:00:00'),
        updatedAt: new Date('2024-12-01T00:00:00'),
        visits: [
          {
            id: 6,
            bookingId: 2,
            visitDate: new Date('2024-12-15T10:30:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          },
          {
            id: 7,
            bookingId: 2,
            visitDate: new Date('2024-12-20T13:00:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          }
        ]
      },
      {
        id: 5,
        requesterId: 5,
        requestedId: 4,
        startDate: new Date('2024-12-25T00:00:00'),
        endDate: new Date('2024-12-30T00:00:00'),
        generalNotes: 'Gato muito mimado.',
        status: BookingStatus.PENDING,
        totalVisits: 1,
        createdAt: new Date('2024-12-01T00:00:00'),
        updatedAt: new Date('2024-12-01T00:00:00'),
        visits: [
          {
            id: 8,
            bookingId: 5,
            visitDate: new Date('2024-12-25T08:00:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          },
          {
            id: 9,
            bookingId: 5,
            visitDate: new Date('2024-12-30T10:30:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          }
        ]
      },
      {
        id: 6,
        requesterId: 7,
        requestedId: 4,
        startDate: new Date('2024-12-01T00:00:00'),
        endDate: new Date('2024-12-10T00:00:00'),
        generalNotes: 'Gato muito doente.',
        status: BookingStatus.PENDING,
        totalVisits: 3,
        createdAt: new Date('2024-12-01T00:00:00'),
        updatedAt: new Date('2024-12-01T00:00:00'),
        visits: [
          {
            id: 10,
            bookingId: 6,
            visitDate: new Date('2024-12-01T14:45:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          },
          {
            id: 11,
            bookingId: 6,
            visitDate: new Date('2024-12-05T10:00:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          },
          {
            id: 12,
            bookingId: 6,
            visitDate: new Date('2024-12-10T12:30:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          }
        ]
      }
    ]
  },
  {
    id: 6,
    name: 'Cat Sitter 3',
    price: 70.5,
    jobDesc: 'Sou especialista em gatos de raça.',
    address: 'Travessa dos Gatinhos, 789',
    bookings: [
      {
        id: 3,
        requesterId: 7,
        requestedId: 6,
        startDate: new Date('2024-12-25T00:00:00'),
        endDate: new Date('2024-12-30T00:00:00'),
        generalNotes: 'Gato muito mimado.',
        status: BookingStatus.PENDING,
        totalVisits: 1,
        createdAt: new Date('2024-12-01T00:00:00'),
        updatedAt: new Date('2024-12-01T00:00:00'),
        visits: [
          {
            id: 13,
            bookingId: 3,
            visitDate: new Date('2024-12-25T15:00:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          },
          {
            id: 14,
            bookingId: 3,
            visitDate: new Date('2024-12-30T09:00:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          }
        ]
      }
    ]
  }
]

export const mockedUserBookings: Booking[] = [
  {
    id: 1,
    requesterId: 1,
    requestedId: 2,
    startDate: new Date('2024-12-01T00:00:00'),
    endDate: new Date('2024-12-10T00:00:00'),
    generalNotes:
      'O gato é muito tímido e pode se esconder embaixo da cama ou atrás do sofá. Por favor, não o force a sair. Deixe um pouco de comida e água perto do esconderijo dele. Se ele se sentir confortável, você pode tentar atraí-lo com o brinquedo de varinha que está na gaveta da estante.',
    status: BookingStatus.PENDING,
    totalVisits: 3,
    createdAt: new Date('2024-12-01T00:00:00'),
    updatedAt: new Date('2024-12-01T00:00:00'),
    visits: [
      {
        id: 1,
        bookingId: 1,
        visitDate: new Date('2024-12-01T08:30:00'),
        status: VisitStatus.PENDING,
        durationInMinutes: 60,
        visitNotes: 'Quero que alimente o gato com ração de frango.'
      },
      {
        id: 2,
        bookingId: 1,
        visitDate: new Date('2024-12-05T14:15:00'),
        status: VisitStatus.PENDING,
        durationInMinutes: 60,
        visitNotes: 'Meu gato adora brincar com bolinhas.'
      },
      {
        id: 3,
        bookingId: 1,
        visitDate: new Date('2024-12-10T11:45:00'),
        status: VisitStatus.PENDING,
        durationInMinutes: 60,
        visitNotes: 'Nesse dia, quero que limpe a caixa de areia.'
      }
    ]
  },
  {
    id: 2,
    requesterId: 5,
    requestedId: 2,
    startDate: new Date('2024-12-15T00:00:00'),
    endDate: new Date('2024-12-20T00:00:00'),
    generalNotes:
      'Lembre-se de limpar a caixa de areia antes de sair. Use o saco de lixo biodegradável que está no armário do banheiro e reponha com a areia nova que está no balde azul. Ele gosta que a caixa esteja sempre limpa e pode ficar estressado se não estiver.',
    status: BookingStatus.PENDING,
    totalVisits: 2,
    createdAt: new Date('2024-12-01T00:00:00'),
    updatedAt: new Date('2024-12-01T00:00:00'),
    visits: [
      {
        id: 4,
        bookingId: 2,
        visitDate: new Date('2024-12-15T10:30:00'),
        status: VisitStatus.PENDING,
        durationInMinutes: 60,
        visitNotes: 'Hoje, quero que dê o remédio para o gato.'
      },
      {
        id: 5,
        bookingId: 2,
        visitDate: new Date('2024-12-20T13:00:00'),
        status: VisitStatus.PENDING,
        durationInMinutes: 60,
        visitNotes: 'Meus gatos adoram brincar com bolinhas.'
      }
    ]
  },
  {
    id: 3,
    requesterId: 3,
    requestedId: 2,
    startDate: new Date('2024-12-25T00:00:00'),
    endDate: new Date('2024-12-30T00:00:00'),
    generalNotes:
      'No almoço, sirva metade de uma lata da ração úmida e misture com a ração seca que está no pote verde. Ele tem tendência a comer rápido, então, divida a refeição em duas porções com um intervalo de 15 minutos para evitar vômitos.',
    status: BookingStatus.PENDING,
    totalVisits: 1,
    createdAt: new Date('2024-12-01T00:00:00'),
    updatedAt: new Date('2024-12-01T00:00:00'),
    visits: [
      {
        id: 6,
        bookingId: 3,
        visitDate: new Date('2024-12-25T15:00:00'),
        status: VisitStatus.PENDING,
        durationInMinutes: 60,
        visitNotes: 'Meu gato gosta que brinquem com ele.'
      },
      {
        id: 7,
        bookingId: 3,
        visitDate: new Date('2024-12-30T09:00:00'),
        status: VisitStatus.PENDING,
        durationInMinutes: 60,
        visitNotes: 'Hoje vou deixar a ração separada.'
      }
    ]
  },
  {
    id: 4,
    requesterId: 3,
    requestedId: 2,
    startDate: new Date('2024-12-15T00:00:00'),
    endDate: new Date('2024-12-20T00:00:00'),
    generalNotes:
      'Ele precisa tomar um comprimido de vermífugo hoje. Envolva o comprimido em um pedacinho de patê (está na geladeira) para facilitar. Se ele recusar, há uma seringa de administração no kit de medicamentos dele, mas só use se for realmente necessário.',
    status: BookingStatus.PENDING,
    totalVisits: 2,
    createdAt: new Date('2024-12-01T00:00:00'),
    updatedAt: new Date('2024-12-01T00:00:00'),
    visits: [
      {
        id: 8,
        bookingId: 4,
        visitDate: new Date('2024-12-15T09:00:00'),
        status: VisitStatus.PENDING,
        durationInMinutes: 60,
        visitNotes: 'Quero que fique um pouco mais para brincar com o gato.'
      },
      {
        id: 9,
        bookingId: 4,
        visitDate: new Date('2024-12-20T16:00:00'),
        status: VisitStatus.PENDING,
        durationInMinutes: 60,
        visitNotes: 'Nesse dia chegarei mais cedo. Por favor, me avise se precisar de algo.'
      }
    ]
  },
  {
    id: 5,
    requesterId: 5,
    requestedId: 2,
    startDate: new Date('2024-12-25T00:00:00'),
    endDate: new Date('2024-12-30T00:00:00'),
    generalNotes:
      'Antes de sair, passe um tempo brincando com ele, principalmente com os ratinhos de brinquedo. Ele tem muita energia acumulada e isso o ajuda a relaxar. Não esqueça de guardar os brinquedos no cesto, porque ele pode tentar morder os fios.',
    status: BookingStatus.PENDING,
    totalVisits: 1,
    createdAt: new Date('2024-12-01T00:00:00'),
    updatedAt: new Date('2024-12-01T00:00:00'),
    visits: [
      {
        id: 10,
        bookingId: 5,
        visitDate: new Date('2024-12-25T08:00:00'),
        status: VisitStatus.PENDING,
        durationInMinutes: 60,
        visitNotes: 'Há um brinquedo novo para o gato. Deixe ele brincar um pouco.'
      },
      {
        id: 11,
        bookingId: 5,
        visitDate: new Date('2024-12-30T10:30:00'),
        status: VisitStatus.PENDING,
        durationInMinutes: 60,
        visitNotes: 'Meus gatos não gostam de visitas muito longas.'
      }
    ]
  }
]
