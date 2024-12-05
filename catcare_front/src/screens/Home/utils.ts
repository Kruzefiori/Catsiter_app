import { CatSitter2 } from '@/domain/models/CatSitter'
import { VisitStatus } from '@/domain/models/Visits'
import { BookingStatus } from '@/domain/models/Booking'

export const mockedCatSitters: CatSitter2[] = [
  {
    id: 1,
    name: 'Cat Sitter 1',
    price: 50.99,
    jobDesc: 'Meu trabalho envolve alimentar, brincar e cuidar do seu gato.',
    address: 'Rua dos Gatos, 123',
    bookings: [
      {
        id: 1,
        requesterId: 2,
        requestedId: 1,
        startDate: new Date('2024-12-01T00:00:00'),
        endDate: new Date('2024-12-10T00:00:00'),
        generalNotes: 'Gato muito bravo.',
        status: BookingStatus.PENDING,
        totalVisits: 3,
        createdAt: new Date('2024-12-01T00:00:00'),
        updatedAt: new Date('2024-12-01T00:00:00'),
        visits: [
          {
            id: 'b1v1',
            visitDate: new Date('2024-12-01T08:30:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          },
          {
            id: 'b1v2',
            visitDate: new Date('2024-12-05T14:15:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          },
          {
            id: 'b1v3',
            visitDate: new Date('2024-12-10T11:45:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          }
        ]
      },
      {
        id: 4,
        requesterId: 2,
        requestedId: 1,
        startDate: new Date('2024-12-15T00:00:00'),
        endDate: new Date('2024-12-20T00:00:00'),
        generalNotes: 'Gato muito doente.',
        status: BookingStatus.PENDING,
        totalVisits: 2,
        createdAt: new Date('2024-12-01T00:00:00'),
        updatedAt: new Date('2024-12-01T00:00:00'),
        visits: [
          {
            id: 'b4v1',
            visitDate: new Date('2024-12-15T09:00:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          },
          {
            id: 'b4v2',
            visitDate: new Date('2024-12-20T16:00:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Cat Sitter 2',
    price: 60.25,
    jobDesc: 'Minha especialidade é cuidar de gatos idosos.',
    address: 'Avenida dos Felinos, 456',
    bookings: [
      {
        id: 2,
        requesterId: 2,
        requestedId: 3,
        startDate: new Date('2024-12-15T00:00:00'),
        endDate: new Date('2024-12-20T00:00:00'),
        generalNotes: 'Gato muito doente.',
        status: BookingStatus.PENDING,
        totalVisits: 2,
        createdAt: new Date('2024-12-01T00:00:00'),
        updatedAt: new Date('2024-12-01T00:00:00'),
        visits: [
          {
            id: 'b2v1',
            visitDate: new Date('2024-12-15T10:30:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          },
          {
            id: 'b2v2',
            visitDate: new Date('2024-12-20T13:00:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          }
        ]
      },
      {
        id: 5,
        requesterId: 2,
        requestedId: 3,
        startDate: new Date('2024-12-25T00:00:00'),
        endDate: new Date('2024-12-30T00:00:00'),
        generalNotes: 'Gato muito mimado.',
        status: BookingStatus.PENDING,
        totalVisits: 1,
        createdAt: new Date('2024-12-01T00:00:00'),
        updatedAt: new Date('2024-12-01T00:00:00'),
        visits: [
          {
            id: 'b5v1',
            visitDate: new Date('2024-12-25T08:00:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          },
          {
            id: 'b5v2',
            visitDate: new Date('2024-12-30T10:30:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          }
        ]
      },
      {
        id: 6,
        requesterId: 2,
        requestedId: 3,
        startDate: new Date('2024-12-01T00:00:00'),
        endDate: new Date('2024-12-10T00:00:00'),
        generalNotes: 'Gato muito doente.',
        status: BookingStatus.PENDING,
        totalVisits: 3,
        createdAt: new Date('2024-12-01T00:00:00'),
        updatedAt: new Date('2024-12-01T00:00:00'),
        visits: [
          {
            id: 'b6v1',
            visitDate: new Date('2024-12-01T14:45:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          },
          {
            id: 'b6v2',
            visitDate: new Date('2024-12-05T10:00:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          },
          {
            id: 'b6v3',
            visitDate: new Date('2024-12-10T12:30:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          }
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'Cat Sitter 3',
    price: 70.5,
    jobDesc: 'Sou especialista em gatos de raça.',
    address: 'Travessa dos Gatinhos, 789',
    bookings: [
      {
        id: 3,
        requesterId: 2,
        requestedId: 5,
        startDate: new Date('2024-12-25T00:00:00'),
        endDate: new Date('2024-12-30T00:00:00'),
        generalNotes: 'Gato muito mimado.',
        status: BookingStatus.PENDING,
        totalVisits: 1,
        createdAt: new Date('2024-12-01T00:00:00'),
        updatedAt: new Date('2024-12-01T00:00:00'),
        visits: [
          {
            id: 'b3v1',
            visitDate: new Date('2024-12-25T15:00:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          },
          {
            id: 'b3v2',
            visitDate: new Date('2024-12-30T09:00:00'),
            status: VisitStatus.PENDING,
            durationInMinutes: 60
          }
        ]
      }
    ]
  }
]
