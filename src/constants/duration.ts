
import { DurationInfo } from '@/store/models'

export const DURATION_DEFAULT = 'day'

type Time = 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR' | 'ALL'

export const DURATION: Record<Time, DurationInfo> = {
  HOUR: { key: 'hour', codename: '1H', humanize: 'past hour' },
  DAY: { key: 'day', codename: '1D', humanize: 'since yesterday' },
  WEEK: { key: 'week', codename: '1W', humanize: 'since last week' },
  MONTH: { key: 'month', codename: '1M', humanize: 'since last month' },
  YEAR: { key: 'year', codename: '1Y', humanize: 'since last year' },
  ALL: { key: 'all', codename: 'ALL', humanize: '' }
}

export const DURATION_LIST: Array<DurationInfo> = Object.keys(DURATION)
  .map(function (value: string) {
    const search = value as Time
    return DURATION[search]
  })
export const DURATION_KEYS: Array<string> = Object.keys(DURATION)
  .map(function (value: string) {
    const search = value as Time
    return DURATION[search].key
  })

export default {
  DURATION,
  DURATION_DEFAULT,
  DURATION_LIST,
  DURATION_KEYS
}
