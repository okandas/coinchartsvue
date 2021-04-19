<template>
  <div class="landing">
    <DocumentHead :selectedCryptocurrency="showSelectedCryptocurrency" :selectedCurrency="showSelectedCurrency" :spotPrice="showSelectedSpotPrice"/>
    <LetterHead title="CoinCharts"/>
    <div class="chart-view">
      <div class="coinTabs">
        <CryptoCurrencyTabs :handleCryptocurrencyChange="handleCryptoCurrencyChange" :selectedCurrency="showSelectedCurrency" :selectedCryptoCurrency="showSelectedCryptocurrency" :spotPrices='showSelectedSpotPrices'/>
        <DurationTabs :handleDurationChange="handleDurationChange" :selectedDuration="showSelectedDuration"/>
      </div>
      <div class="priceCharts">
        <PriceTable id="price-table"
          :selectedCurrency="showSelectedCurrency"
          :selectedCryptoCurrency="showSelectedCryptocurrency"
          :selectedDuration="showSelectedDuration"
          :percentDifference="showSelectedPercentDifference"
          :priceDifference="showSelectedPriceDifference"
          :spotPrice="showSelectedSpotPrice"
          :currency="showSelectedCurrency"
        />
        <PriceChart id="price-chart"
          :data="showSelectedPriceHistory"
          :currency="showSelectedCurrency"
          :durationType="showSelectedDuration"
          :selectedCryptoCurrency="showSelectedCryptocurrency"
        />
      </div>
    </div>
  </div>

</template>

<script lang="ts">

import LetterHead from '@/components/LetterHead.vue'
import DocumentHead from '@/containers/DocumentHead.vue'
import DurationTabs from '@/containers/DurationTabs.vue'
import CryptoCurrencyTabs from '@/containers/CryptoCurrencyTabs.vue'
import PriceTable from '@/containers/PriceTable.vue'
import PriceChart from '@/containers/PriceChart.vue'

import CoinsModule from '@/store/modules/coins'
import { CryptoInfo } from '@/store/models'

import store from '@/store'

import { Component, Vue } from 'vue-property-decorator'
import currencyFormatter from 'currency-formatter'

@Component({
  components: {
    PriceChart,
    CryptoCurrencyTabs,
    DocumentHead,
    DurationTabs,
    LetterHead,
    PriceTable
  }
})

export default class CoinCharts extends Vue {
unsubscribeAction!: () => void

cryptocurrencySymbol = this.showSelectedCryptocurrency.toUpperCase();
priceText = currencyFormatter.format(this.showSelectedSpotPrice, { code: this.showSelectedCurrency }) || ''

metaInfo = {
  title: this.showSelectedSpotPrice > 0 ? this.title : ''
}

handleCryptoCurrencyChange (crypto: string) {
  CoinsModule.selectCryptoCurrency(crypto)
}

handleDurationChange (duration: string) {
  CoinsModule.selectDuration(duration)
}

get showSelectedCryptocurrency () {
  return CoinsModule.getSelectedCryptocurrency
}

get showSelectedCurrency () {
  return CoinsModule.getSelectedCurrency
}

get showSelectedSpotPrice () {
  return CoinsModule.getSelectedSpotPrice
}

get showSelectedSpotPrices () {
  return CoinsModule.getSelectedSpotPrices
}

get showSelectedPriceHistory () {
  return CoinsModule.getSelectedPriceHistory
}

get showSelectedPriceDifference () {
  return CoinsModule.getSelectedPriceDifference
}

get showSelectedPercentDifference () {
  return CoinsModule.getSelectedPercentDifference
}

get showSelectedDuration () {
  return CoinsModule.getSelectedDuration
}

get title () {
  return `${this.cryptocurrencySymbol}: ${this.priceText}`
}

beforeMount () {
  const ci: CryptoInfo = { cryptoCurrency: 'BTC', currency: 'USD', durationType: 'day' }
  CoinsModule.fetchPriceHistory(ci)
  CoinsModule.fetchSpotPrices('USD')

  this.unsubscribeAction = store.subscribeAction({
    before: (action) => {
      console.log(`before action ${action.type}`)
    },
    after: (action) => {
      if (action.type === 'coins/selectCryptoCurrency' || action.type === 'coins/selectDuration') {
        const ci: CryptoInfo = {
          cryptoCurrency: CoinsModule.getSelectedCryptocurrency,
          currency: CoinsModule.getSelectedCurrency,
          durationType: CoinsModule.getSelectedDuration
        }
        CoinsModule.fetchPriceHistory(ci)
        CoinsModule.fetchSpotPrices('USD')
      }
    }
  })
}

beforeDestroy () {
  this.unsubscribeAction()
}
}
</script>

<style scoped lang="css">

.chart-view {
background-color: #fff;
border-radius: 4px;
margin-top: 20px;
}

.coinTabs {
display: flex;
justify-content: space-between;
flex-direction: row;
border-bottom: 1px solid rgb(218, 225, 233);
padding: 0px 20px;
}

.tabs {
height: 55px;
}

.priceCharts {
margin: 0px 20px 20px;
min-height: 395px;
}

/* desktop only */
@media (min-width: 1025px) {
.landing {
  margin: auto;
}
}
</style>
