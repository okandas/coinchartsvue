<template>
  <div>
    <Table
      :cryptocurrencyLabel="cryptocurrencyLabel"
      :durationLabel="durationLabel"
      :percentDifference="percentDifference"
      :priceDifference="priceDifference"
      :spotPrice="spotPrice"
      :currency="selectedCurrency"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import Table from '@/components/Table/Table.vue'
import { CURRENCY_DEFAULT, CURRENCY_KEYS } from '@/constants/currency'
import { CRYPTOCURRENCY_LIST, CRYPTOCURRENCY_DEFAULT, CRYPTOCURRENCY_KEYS } from '@/constants/cryptocurrency'
import { DURATION_LIST, DURATION_DEFAULT, DURATION_KEYS } from '@/constants/duration'
import { DurationInfo, CryptoCurrencyInfo } from '@/store/models'

@Component({
  components: {
    Table
  }
})

export default class PriceTable extends Vue {
  @Prop({ required: true, type: Number, default: 0 }) percentDifference!: number
  @Prop({ required: true, type: Number, default: 0 }) priceDifference!: number
  @Prop({ required: true, type: Number, default: 0 }) spotPrice!: number
  @Prop({ required: true, type: String, default: CURRENCY_DEFAULT }) currency!: string

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

  @Prop({
    required: true,
    type: String,
    default: DURATION_DEFAULT,
    validator: function (v: string) {
      return DURATION_KEYS.indexOf(v) !== -1
    }
  }) selectedDuration!: string

  get cryptocurrencyLabel () {
    const filtered = CRYPTOCURRENCY_LIST.filter((crypto: CryptoCurrencyInfo) => {
      return crypto.key === this.selectedCryptoCurrency
    })
    return filtered[0].name
  }

  get durationLabel () {
    const filtered = DURATION_LIST.filter((duration: DurationInfo) => {
      return duration.key === this.selectedDuration
    })
    return filtered[0].humanize
  }
}
</script>

<style scoped lang="css">

</style>
