<template>
    <div class="vertical-axis flex" data-testid="VerticalAxis" :style="{
            'align-items': align === 'right' ? 'flex-end' : 'flex-start',
            'justify-content': justify.length > 0 ? justify : '',
    }">
        <div class="tick">
            {{ showMaxPrice }}
        </div>
        <div class="tick">
            {{ showMinPrice }}
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

import { CURRENCY_KEYS } from '@/constants/currency'

import { PriceData } from '@/store/models'

import { extent } from 'd3-array'
// import { timeFormat } from 'd3-time-format'
import currencyFormatter from 'currency-formatter'

@Component
export default class VerticalAxis extends Vue {
    @Prop({ required: true, type: Array }) data!: Array<PriceData>
    @Prop({
      required: true,
      type: String,
      validator: function (v: string) {
        return CURRENCY_KEYS.indexOf(v) !== -1
      }
    }) currency!: string

    @Prop({ required: true, type: String }) align!: string
    @Prop({ required: true, type: String }) justify!: string

    minPrice = 0
    maxPrice = 0

    @Watch('data')
    onDataChanged (value: Array<PriceData>) {
      const [minPrice, maxPrice] = extent(value, d => d.price)
      this.minPrice = minPrice!
      this.maxPrice = maxPrice!
    }

    formatPrice (price: number) {
      return currencyFormatter.format(price, { code: this.currency, precision: 0 })
    }

    get showMaxPrice () {
      return this.formatPrice(this.maxPrice)
    }

    get showMinPrice () {
      return this.formatPrice(this.minPrice)
    }
}

</script>

<style scoped lang="css">

.vertical-axis {
    background-color: transparent;
    flex: 0 0 3em;
    max-width: 3em;
    padding: 0.5em 0;
    z-index: 10;
    flex-direction: column;
}

.tick {
    color: #7D95B6;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
}
</style>
