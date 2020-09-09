<template>
    <div class="big-amount" v-if="type === 'currency'">
        <span class="superscript__positive" v-if="showPlusMinusSymbol && value > 0">
            {{ PLUS_SYMBOL }}
        </span>
        <span class="superscript" v-if="showPlusMinusSymbol && value < 0">
            {{ MINUS_SYMBOL }}
        </span>

        <span class="superscript" v-if="symbolOnLeft">
            {{ symbol }}{{ optionalSpacing }}
        </span>
        <span v-if="integerValue">{{ integerValue }}</span>

        <span class="superscript" v-if="decimalValue">{{ decimalSeparator }}{{ decimalValue }}</span>
        <span class="superscript" v-if="!symbolOnLeft">
            {{ optionalSpacing }}{{ symbol }}
        </span>
    </div>
    <div class="big-amount" v-else-if="type === 'percentage'">

        <span class="superscript__positive" v-if="showPlusMinusSymbol && value > 0">
            {{ PLUS_SYMBOL }}
        </span>
        <span class="superscript" v-if="showPlusMinusSymbol && value < 0">
            {{ MINUS_SYMBOL }}
        </span>
        <span>{{ formattedValue }}</span>
        <span>%</span>
    </div>
    <div class="big-amount" v-else>
        <span >
            {{ value }}
        </span>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import currencyFormatter from 'currency-formatter'
import { CURRENCY_DEFAULT } from '@/constants/currency'

@Component
export default class BigAmount extends Vue {
    @Prop({ required: true, type: Number }) value!: number
    @Prop({
      required: false,
      type: String,
      validator: function (v: string) {
        return ['currency', 'percentage'].indexOf(v) !== -1
      }
    }) type!: string | undefined

    @Prop({ required: false, type: String, default: CURRENCY_DEFAULT }) currency!: string

    @Prop({ required: false, type: Boolean, default: false }) showPlusMinusSymbol!: boolean

    MINUS_SYMBOL = '\u2212'
    PLUS_SYMBOL = '+'

    decimalSeparator = ''
    spaceBetweenAmountAndSymbol = false
    symbol = ''
    symbolOnLeft = false
    formattedValue = ''
    integerValue = ''
    decimalValue = ''
    optionalSpacing = ''

    @Watch('value')
    onValueChanged (value: number) {
      if (this.type === 'currency') {
        this.handleCurrency(value, this.currency)
      }

      if (this.type === 'percentage') {
        this.handlePercentage(value)
      }
    }

    handleCurrency (value: number, currency: string) {
      const Currency = currencyFormatter.findCurrency(currency)

      const formattedValue = currencyFormatter.format(Math.abs(value), {
        code: currency,
        symbol: ''
      })

      const [integerValue, decimalValue] = formattedValue.split(Currency.decimalSeparator)
      const optionalSpacing = Currency.spaceBetweenAmountAndSymbol ? ' ' : ''

      this.decimalSeparator = Currency.decimalSeparator
      this.spaceBetweenAmountAndSymbol = Currency.spaceBetweenAmountAndSymbol
      this.symbol = Currency.symbol
      this.symbolOnLeft = Currency.symbolOnLeft
      this.formattedValue = formattedValue
      this.integerValue = integerValue
      this.decimalValue = decimalValue
      this.optionalSpacing = optionalSpacing
    }

    handlePercentage (value: number) {
      this.formattedValue = Math.abs(value).toFixed(2)
    }

    mounted () {
      if (this.type === 'currency') {
        this.handleCurrency(this.value, this.currency)
      }

      if (this.type === 'percentage') {
        this.handlePercentage(this.value)
      }
    }
}

</script>

<style scoped lang="css">
    .big-amount {
        color: #4E5C6E;
        font-size: 48px;
        font-weight: 400;
    }

    .superscript {
        color: #4E5C6E;
        font-size: 30px;
        font-weight: 500;
        position: relative;
        top: -13px;
        vertical-align: baseline;
    }

    .superscript__positive {
        color: "#61CA00";
        font-size: 30px;
        font-weight: 500;
        position: relative;
        top: -13px;
        vertical-align: baseline;
    }
</style>
