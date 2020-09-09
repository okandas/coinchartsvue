import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface SignUp {
  email: string;
  mobile: string;
  password: string;
  username: string;
}

export interface SignIn {
  email: string;
  password: string;
}

export interface Token {
  token: string;
}

export interface Mail {
  email: string;
}

export interface User {
  email: string;
  username: string;
  mobile: string;
  created: string;
}

export interface Ticker {
  ticker: string,
  isin: string,
  best_ask: number,
  best_bid: number,
  current_price: number,
  ask_volume: number,
  bid_volume: number,
  full_company_name: string,
  prev_price: number,
  prev_per: number,
  prev_change: number
}

export interface MarketCap {
  id: number,
  market_cap: string,
  exchange: string,
  turnover: string,
  trades: number
}

export interface CompanyStock {
  id: number,
  name: string,
  intial_price: number,
  instrument: string
}

export interface ClosingPrice {
  key: string,
  area: boolean,
  values: Array<Array<number>>
}

export interface AuthenticatedUser {
  username: string;
  id: number;
}


export interface TokenServiceInstance {
  decode (data: Token): AuthenticatedUser | null
  decoded (): AuthenticatedUser | null
  loggedIn (): boolean
  remove (): void
  token (): string | undefined 
}

export interface DurationInfo {
  key: string,
  codename: string,
  humanize: string
}

export interface CurrencyInfo {
  key: string,
  name: string,
}

export interface CryptoCurrencyInfo {
  key: string,
  name: string,
  fillColor: string,
  strokeColor: string,
}

export interface CryptoInfo {
  cryptoCurrency: string,
  currency: string,
  durationType: string
}

export interface TickerInfo {
  name: string,
  sector: string,
  ticker: string
}

export interface CurrencyFormat {
  decimalSeparator: string,
  spaceBetweenAmountAndSymbol: boolean, 
  symbol: string,
  symbolOnLeft: boolean, 
  formattedValue: string, 
  integerValue: number, 
  decimalValue: number,
  optionalSpacing: string
}

export interface PriceData {
  price: number,
  time: Date
}
export interface SpotPriceData {
  name: number
}

export interface TimeTick {
  timestamp: number,
  label: string
}


export interface Color {
  fill: string,
  stroke: string
}