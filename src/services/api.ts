import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import TokenServices from '@/services/token'
import { TokenServiceInstance, SignUp, SignIn, Token, Mail } from '@/store/models'

class ApiServices {
  protected service: AxiosInstance
  public tokenService: TokenServiceInstance

  constructor () {
    this.service = axios.create({
      baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : 'http://localhost:9090'
    })

    this.tokenService = TokenServices

    this.service.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
      if (this.tokenService.token() !== undefined) {
        config.headers.Authorization = `Bearer ${this.tokenService.token()}`
      }

      return config
    })
  }

  public signup (data: SignUp): Promise<AxiosResponse<Token>> {
    return this.service.post('/user/signup', data)
  }

  public signin (data: SignIn): Promise<AxiosResponse<Token>> {
    return this.service.post('/user/signin', data)
  }

  public reserve (data: Mail): Promise<AxiosResponse<any>> {
    return this.service.post('/user/reserve', data)
  }
}

export default new ApiServices()
