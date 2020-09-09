
import { CurrencyInfo } from '@/store/models'

export const CURRENCY_DEFAULT = 'USD'

type SYMBOL = 'CAD' | 'USD'

export const CURRENCY: Record<SYMBOL, CurrencyInfo> = {
  CAD: { key: 'CAD', name: 'Canadian Dollar' },
  USD: { key: 'USD', name: 'US Dollar' }
}

export const CURRENCY_LIST: Array<CurrencyInfo> = Object.keys(CURRENCY)
  .map(function (value: string) {
    const search = value as SYMBOL
    return CURRENCY[search]
  })

export const CURRENCY_KEYS: Array<string> = Object.keys(CURRENCY)
  .map(function (value: string) {
    const search = value as SYMBOL
    return CURRENCY[search].key
  })

export default {
  CURRENCY,
  CURRENCY_DEFAULT,
  CURRENCY_LIST,
  CURRENCY_KEYS
}
