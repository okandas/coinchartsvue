<template>
  <Tabs :options="cryptocurrencyList" :onClick="handleCryptocurrencyChange" :selectedKey="selectedCryptoCurrency" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import currencyFormatter from 'currency-formatter'

import { CRYPTOCURRENCY_LIST, CRYPTOCURRENCY_KEYS, CRYPTOCURRENCY_DEFAULT, DEFAULT_SPOTPRICES } from '@/constants/cryptocurrency'
import { CURRENCY_KEYS, CURRENCY_DEFAULT } from '@/constants/currency'
import { CryptoCurrencyInfo } from '@/store/models'
import Tabs from '@/components/Tabs/Tabs.vue'

@Component({
  components: {
    Tabs
  }
})

export default class CrytoCurrencyTabs extends Vue {
  @Prop({
    required: true,
    type: String,
    default: CRYPTOCURRENCY_DEFAULT,
    validator: function (v: string) {
      return CRYPTOCURRENCY_KEYS.indexOf(v) !== -1
    }
  }) selectedCryptoCurrency!: string

  @Prop({
    required: true,
    type: String,
    default: CURRENCY_DEFAULT,
    validator: function (v: string) {
      return CURRENCY_KEYS.indexOf(v) !== -1
    }
  }) selectedCurrency!: string

  @Prop({ required: true, type: Function }) handleCryptocurrencyChange!: Function
  @Prop({ required: true, type: Object, default: DEFAULT_SPOTPRICES }) spotPrices!: { [key: string]: number }

  get cryptocurrencyList () {
    const list = CRYPTOCURRENCY_LIST.map((currentValue: CryptoCurrencyInfo) => {
      const price = currencyFormatter.format(this.spotPrices[currentValue.key], { code: this.selectedCurrency })

      const obj = {
        key: currentValue.key,
        codename: currentValue.name,
        element: `<span class="cryptoTabs"><span>${currentValue.name}</span><span>${price}</span></span>`
      }

      return obj
    })

    return list
  }
}
</script>

<style lang="css">
  .cryptoTabs  span + span::before {
    content: " · ";
  }
</style>
