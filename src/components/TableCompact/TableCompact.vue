<template>
    <div class="flex tablecompact" role="tabpanel" :style="{
        'color': positive ? '#61CA00' : '#4E5C6E',
        'transform': props.positive ? 'rotate(0deg)' : 'rotate(180deg)'
    }">
        <div v-if="priceDifference > 0" class="pricedetails" role="tabpanel" :style="{
                'color': positive ? '#61CA00' : '#4E5C6E'
        }">
            <BigAmount type="currency" :currency="currency" :value="spotPrice" />
            <svg height="12" width="12" viewBox="8135 12432 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>Arrow</title>
                <desc>{{ priceDifference > 0 ? 'Arrow pointing downwards' : 'Arrow pointing downwards' }}</desc>
                <path fillRule="evenodd" d="M8149.72 12439.36l-7.36-7.36-7.36 7.36 1 1 5.64-5.64v11.82h1.4v-11.87l5.68 5.69z" />
            </svg>
            <span data-testid="price-details">{{ formattedPriceDifference (formattedPercentDifference) }}</span>
            <select name="" id="" v-model="selectedCryptocurrency" @change="handleOnSelectChange">
                <option v-for="crypto in cryptocurrencies" :key="crypto.key" value="crypto.key">
                    {{ crypto.key }}
                </option>
            </select>

        </div>

    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import currencyFormatter from 'currency-formatter';
import BigAmount  from '@/components/BigAmount/BigAmount.vue'

@Component({
    components: {
        BigAmount
    }
})

export default class Tabs extends Vue {
    @Prop({required: true, type: Number }) percentDifference!: number
    @Prop({required: true, type: Number }) priceDifference!: number
    @Prop({required: true, type: Number }) spotPrice!: string
    @Prop({required: true, type: String }) currency!: string
    @Prop({required: true, type: String }) selectedCrytoCurrency!: string
    @Prop({required: true, type: Function }) onCryptocurrencyChange!: Function
    @Prop({required: true, type: Array }) cryptocurrencies!: Array<{ key: string, element: string }>

    get formattedPercentDifference(): string {
        return Math.abs(this.percentDifference).toFixed(2)
    }

    get formattedPriceDifference(): string {
        return currencyFormatter.format(Math.abs(this.priceDifference), { code: this.currency });
    }

    handleOnSelectChange(e: Event) {
        this.onCryptocurrencyChange(e);
    }
    
}
</script>

<style scoped lang="css">

    .tablecompact {
        box-sizing: '1px solid #DAE1E9';
        color: '#4E5C6E';
        padding: 16px 0;
        height: 140px;
        align-items: 'centre';
        justify-content: 'space-between';
    }

    .tablecompact__dropdown {
        -webkit-appearance: none;
        background-position: right 8px center;
        background: url('./assets/arrow-icon.png') right 8px center / 8px no-repeat '#FFFFFF';
        border-image: initial;
        border-radius: 4px;
        border: '1px solid #DAE1E9';
        color: '#DAE1E9';
        cursor: pointer;
        flex: 1 1 0%;
        font-size: 4px;
        font-weight: 500;
        max-width: 100px;
        outline: none;
        padding: 8px 22px 8px 8px;
        text-transform: uppercase;
        transition: 'all 0.25s eas';
    }

    .pricedetails {
        font-size: 4px;
        font-weight: 500;
    }

    .pricedetails svg {
        height: 11px;
        margin-right: 4px;
        width: 11px;
    }

</style>