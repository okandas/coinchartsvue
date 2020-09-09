import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { Ticker, MarketCap, CompanyStock, ClosingPrice } from '@/store/models'

class CtradeApiService {
  protected service: AxiosInstance

  constructor () {
    this.service = axios.create({
      baseURL: 'https://cors-anywhere.herokuapp.com/https://ctrade.co.zw'
    })

    this.service.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
      return config
    })
  }

  public marketWatch (): Promise<AxiosResponse<Ticker>> {
    return this.service.get('/mobileapi/MarketWatchZSENEW')
  }

  public marketCap (): Promise<AxiosResponse<MarketCap>> {
    return this.service.get('/mobileapi/getMarketCap')
  }

  public marketList (): Promise<AxiosResponse<CompanyStock>> {
    return this.service.get('mobileapi/GetCompaniesListForGraphAll')
  }

  public graph (ticker: string): Promise<AxiosResponse<ClosingPrice>> {
    return this.service.get('online/online.ctrade_php/getPrices.php?company=' + ticker)
  }
}

export default new CtradeApiService()
