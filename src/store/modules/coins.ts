import Vue from 'vue'
import { Action, Mutation, Module, VuexModule, getModule } from 'vuex-module-decorators'
import { scan } from 'd3-array'

import get from 'lodash.get'

import { CryptoInfo, PriceData } from '../models'
import store from '../index'

import CoinChartsApiService from '../../services/coinChartsApiService'

@Module({
  namespaced: true,
  store,
  name: 'coins',
  dynamic: true
})
class CoinsModule extends VuexModule {
  crypto: Array<PriceData> = []
  error = ''
  selectedCryptocurrency = 'BTC'
  selectedCurrency = 'USD'
  selectedDuration = 'day'
  price: {[key: string]: {[key: string]: Array<PriceData> | string | boolean | number | null}} = {
    status: {
      loading: false,
      error: null
    },
    history: {
    },
    spot: {
      BTC: 0
    }
  }

@Action
  fetchPriceHistory (ci: CryptoInfo) {
    CoinChartsApiService.fetchPriceHistory(ci.cryptoCurrency, ci.currency, ci.durationType)
      .then(response => {
        const priceHistory = get(response, ['data', 'data', 'prices'], [])
        /* array of key value objects
          [ {price: '35865.29', time: '2021-01-17T16:20:00Z'} ]
        */
        const sortedPriceHistory = priceHistory.sort((a: {[key: string]: string}, b: {[key: string]: string}) => +new Date(a.time) - +new Date(b.time))
          .map((priceObject: {[key: string]: string}) => {
            const newObject: {[key: string]: number | Date } = { price: Number(priceObject.price), time: new Date(priceObject.time) }
            return newObject
          })

        const payload = {
          name: `${ci.cryptoCurrency}-${ci.durationType}`,
          history: sortedPriceHistory
        }

        this.context.commit('handlePriceHistory', payload)
      }).catch(exception => {
        console.log(exception)
      })
  }

@Action
fetchSpotPrices (currency: string) {
  CoinChartsApiService.fetchSpotPrices(currency)
    .then(response => {
      const spotPrices = get(response, ['data', 'data'], [])
      /* array of key value objects
        [ {base: 'BAT', currency: 'USD', amount: '0.26460584024323'} ]
      */
      const formattedPrices = spotPrices.map((priceObject: {[key: string]: string}) => {
        const newObject: {[key: string]: number | string } = { amount: Number(priceObject.amount), base: priceObject.base, currency: priceObject.currency }
        return newObject
      })
      this.context.commit('handlePriceSpot', formattedPrices)
    }).catch(exception => {
      console.log(exception)
    })
}

@Action
selectCryptoCurrency (crypto: string) {
  this.context.commit('handleSelectedCryptocurrency', crypto)
}

@Action
selectCurrency (currency: string) {
  this.context.commit('handleSelectedCurrency', currency)
}

@Action
selectDuration (duration: string) {
  this.context.commit('handleSelectedDuration', duration)
}

@Mutation
handleCrytoPriceHistory (data: Array<PriceData> | []) {
  Vue.set(this, 'crypto', data)
}

@Mutation
handleSelectedCryptocurrency (crypto: string) {
  Vue.set(this, 'selectedCryptocurrency', crypto)
}

@Mutation
handleSelectedCurrency (currency: string) {
  Vue.set(this, 'selectedCurrency', currency)
}

@Mutation
handleSelectedDuration (duration: string) {
  Vue.set(this, 'selectedDuration', duration)
}

@Mutation
handlePriceStatus (status: {[key: string]: string | boolean }) {
  Vue.set(this.price.status, 'loading', status.loading)
  Vue.set(this.price.status, 'error', status.error)
}

@Mutation
handlePriceHistory (payload: { [key: string]: string | Array<PriceData> | []}) {
  const key = payload.name as string
  Vue.set(this.price.history, key, payload.history)
}

@Mutation
handlePriceSpot (prices: [{[key: string]: string | number }]) {
  const spotPrices = prices.reduce((spotPrices: {[key: string]: string | number }, currentValue: {[key: string]: string | number }) => {
    const key = currentValue.base
    const value = Number(currentValue.amount)

    spotPrices[key] = value
    return spotPrices
  }, {})

  Vue.set(this.price, 'spot', spotPrices)
}

get getSelectedCryptocurrency () {
  return this.selectedCryptocurrency
}

get getSelectedCurrency () {
  return this.selectedCurrency
}

get getSelectedDuration () {
  return this.selectedDuration
}

get getSelectedSpotPrice () {
  return this.price.spot[this.getSelectedCryptocurrency] as number
}

get getSelectedSpotPrices () {
  return this.price.spot
}

get getPrice () {
  return this.price
}

get getPriceStatus () {
  return this.price.status
}

get getPriceLoadingStatus () {
  return this.price.status.loading
}

get getPriceHistories () {
  return this.price.history
}

get getSelectedPriceHistory () {
  const key = `${this.getSelectedCryptocurrency}-${this.getSelectedDuration}`
  return this.getPriceHistories[key] !== undefined ? this.getPriceHistories[key] : []
}

get getSelectedPriceDifference () {
  const priceHistory = this.getSelectedPriceHistory as PriceData[]
  const spotPrice = this.getSelectedSpotPrice
  const lastIndex = scan(priceHistory, (a: PriceData, b: PriceData) => +new Date(a.time) - +new Date(b.time))
  const oldPrice = priceHistory[lastIndex!] && priceHistory[lastIndex!].price
  return spotPrice - oldPrice
}

get getSelectedPercentDifference () {
  const priceHistory = this.getSelectedPriceHistory as PriceData[]
  const spotPrice = this.getSelectedSpotPrice
  const lastIndex = scan(priceHistory, (a: PriceData, b: PriceData) => +new Date(a.time) - +new Date(b.time))
  const oldPrice = priceHistory[lastIndex!] && priceHistory[lastIndex!].price
  return (spotPrice / oldPrice - 1) * 100 || 0
}
}

export default getModule(CoinsModule)
