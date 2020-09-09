<template>
  <div>
    <Chart
      :data="data"
      :currency="currency"
      :durationType="durationType"
      :color="true"
      :selectedCryptoCurrency="selectedCryptoCurrency"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { CRYPTOCURRENCY_DEFAULT, CRYPTOCURRENCY_KEYS } from '@/constants/cryptocurrency'

import Chart from '@/components/Chart/Chart.vue'
import { PriceData } from '@/store/models'

@Component({
  components: {
    Chart
  }
})

export default class PriceChart extends Vue {
  @Prop({ required: true, type: Array }) data!: Array<PriceData>
  @Prop({ required: true, type: String }) currency!: string
  @Prop({ required: true, type: String }) durationType!: string
  @Prop({ type: Boolean, default: true }) color!: boolean

  @Prop({
    required: true,
    type: String,
    default: CRYPTOCURRENCY_DEFAULT,
    validator: function (v: string) {
      return CRYPTOCURRENCY_KEYS.indexOf(v) !== -1
    }
  }) selectedCryptoCurrency!: string
}
</script>

<style scoped lang="css">

</style>
