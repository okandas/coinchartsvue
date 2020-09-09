import { CryptoCurrencyInfo } from '@/store/models'

export const CRYPTOCURRENCY_DEFAULT = 'BTC'

export const DEFAULT_SPOTPRICES: { [key: string]: number } = {
  BTC: 0,
  BCH: 0,
  ETH: 0,
  LTC: 0
}

export const CRYPTOCURRENCY: Record<string, CryptoCurrencyInfo> = {
  BTC: {
    key: 'BTC',
    name: 'Bitcoin',
    fillColor: '#FFEBC5',
    strokeColor: '#FFB119'
  },
  BCH: {
    key: 'BCH',
    name: 'Bitcoin Cash',
    fillColor: '#E2F0D2',
    strokeColor: '#8DC451'
  },
  ETH: {
    key: 'ETH',
    name: 'Ethereum',
    fillColor: '#F0F1F8',
    strokeColor: '#6F7CBA'
  },
  LTC: {
    key: 'LTC',
    name: 'Litecoin',
    fillColor: '#ECECEC',
    strokeColor: '#B5B5B5'
  }
}

export const CRYPTOCURRENCY_LIST: Array<CryptoCurrencyInfo> = Object.keys(CRYPTOCURRENCY)
  .map(function (value: string) {
    return CRYPTOCURRENCY[value]
  })
export const CRYPTOCURRENCY_KEYS: Array<string> = Object.keys(CRYPTOCURRENCY)
  .map(function (value: string) {
    return CRYPTOCURRENCY[value].key
  })

export default {
  CRYPTOCURRENCY,
  CRYPTOCURRENCY_DEFAULT,
  CRYPTOCURRENCY_LIST,
  CRYPTOCURRENCY_KEYS
}
