<template>
    <div class="flex table" role="tabpanel" :style="{
        'justify-content': 'space-around'
    }">
        <div class="table__cell" :style="{
                'justify-content': 'center'
        }">
            <BigAmount type="currency" :currency="currency" :value="spotPrice" />
            <div class="table__label">{{ cryptocurrencyLabel }} price</div>
        </div>

        <div v-if="durationLabel" class="table__cell" :style="{
                'justify-content': 'center'
        }">
            <BigAmount type="currency" :value="priceDifference" :currency="currency" :showPlusMinusSymbol="true"/>
            <div class="table__label">{{ durationLabel }} {{ (currency) }} price</div>
        </div>

        <div v-if="durationLabel" class="table__cell" :style="{
                'justify-content': 'center'
        }">
            <BigAmount type="percentage" :value="percentDifference" :showPlusMinusSymbol="true"/>
            <div class="table__label">{{ durationLabel}} (%)</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import BigAmount from '@/components/BigAmount/BigAmount.vue'

@Component({
  components: {
    BigAmount
  }
})

export default class Table extends Vue {
    @Prop({ required: true, type: String }) cryptocurrencyLabel!: string
    @Prop({ required: true, type: String }) durationLabel!: string
    @Prop({ required: true, type: Number }) percentDifference!: number
    @Prop({ required: true, type: Number }) priceDifference!: number
    @Prop({ required: true, type: Number }) spotPrice!: number
    @Prop({ required: true, type: String }) currency!: string
}
</script>

<style scoped lang="css">
    .table {
        box-sizing: border-box;
        text-align: center;
        padding: 16px 0;
        border-bottom: 1px solid rgb(218, 225, 233);
    }

    .table__cell {
        color: #4E5C6E;
        font-size: 48px;
        width: 100%;
    }

    .table__cell:not(:first-child) {
        border-left: 1px solid rgb(218, 225, 233);
    }

    .table__label {
        color: #7D95B6;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 2px;
        text-transform: uppercase;
    }
</style>
