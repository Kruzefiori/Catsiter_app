export interface Cat {
  id: number
  name: string
  gender: string
  age: number
  ownerId: number
  breed: string
  weight: number
  castrated: boolean
  conditions: string
  protectionScreen: boolean
  streetAccess: boolean
}

export const conditionsI18n = (conditions: string) => {
  switch (conditions) {
    case 'none':
      return 'Nenhuma'
    case 'diabetes':
      return 'Diabetes'
    case 'renal_insufficiency':
      return 'Insuficiência renal'
    case 'fiv':
      return 'FIV'
    case 'kidney_stones':
      return 'Cálculo renal'
    case 'gingivitis':
      return 'Gengivite'
    case 'felv':
      return 'FELV'
    case 'obesity':
      return 'Obesidade'
    default:
      return ''
  }
}

export const catCondition = [
  {
    id: 'castrated',
    label: conditionsI18n('castrated')
  },
  {
    id: 'diabetes',
    label: conditionsI18n('diabetes')
  },
  {
    id: 'renal_insufficiency',
    label: conditionsI18n('renal_insufficiency')
  },
  {
    id: 'fiv',
    label: conditionsI18n('fiv')
  },
  {
    id: 'kidney_stones',
    label: conditionsI18n('kidney_stones')
  },
  {
    id: 'gingivitis',
    label: conditionsI18n('gingivitis')
  },
  {
    id: 'felv',
    label: conditionsI18n('felv')
  },
  {
    id: 'obesity',
    label: conditionsI18n('obesity')
  }
]
