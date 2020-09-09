import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import { LOCAL_JSON_DATA_DIR } from '../constants'

class CoinChartsApiService {
  protected service: AxiosInstance

  constructor () {
    this.service = axios.create({
    })

    this.service.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
      return config
    })
  }

  private getPriceHistoryUrl (cryptoCurrency: string, currency: string, durationType: string): string {
    return `${LOCAL_JSON_DATA_DIR}/${cryptoCurrency}-${currency}-${durationType}.json`
  }

  private getSpotPriceUrl (currency: string): string {
    return `${LOCAL_JSON_DATA_DIR}/${currency}-spot.json`
  }

  public fetchPriceHistory (cryptoCurrency: string, currency: string, durationType: string) {
    const url = this.getPriceHistoryUrl(cryptoCurrency, currency, durationType)
    return this.service.get(url)
  }

  public fetchSpotPrices (currency: string) {
    const url = this.getSpotPriceUrl(currency)
    return this.service.get(url)
  }
}

export default new CoinChartsApiService()
