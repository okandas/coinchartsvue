<template>
  <div>
    <div class='chart'>
      <VerticalAxis :data="data" :currency="currency" align="left" justify="space-between" />
      <div class="hover-region" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @mousemove="handleMouseMove" ref="node">
        <Graph :color="showColor" :data="data" :height="dimensions.height" :width="dimensions.width" />
        <CursorCrossHair :height="dimensions.height" :visible="hovered" :x="hoverX" :y="hoverY" v-if="!disableCursor"/>
        <HoverContainer align="end" justify="center" position="top" :label="hoveredValue.time" :visible="hovered" :x="hoverX" v-if="!disableCursor"/>
        <HoverContainer align="start" justify="center" position="bottom" :label="hoveredValue.price" :visible="hovered" :x="hoverX" v-if="!disableCursor"/>
      </div>
      <VerticalAxis :data="data" :currency="currency" align="left" justify="space-between" v-if="!hideRightVerticalAxis"/>
    </div>
    <HorizontalAxis :data="data" justify="space-between" :duration="durationType" :hideRightMargin="hideRightVerticalAxis" :tickCount="horizontalAxisTickCount" />
  </div>
</template>

<script lang="ts">

import CursorCrossHair from '@/components/Chart/components/CursorCrossHair.vue'
import Graph, { } from '@/components/Chart/components/Graph.vue'
import HorizontalAxis from '@/components/Chart/components/HorizontalAxis.vue'
import HoverContainer from '@/components/Chart/components/HoverContainer.vue'
import VerticalAxis from '@/components/Chart/components/VerticalAxis.vue'

import { PriceData } from '@/store/models'
import { CRYPTOCURRENCY_LIST, CRYPTOCURRENCY_DEFAULT, CRYPTOCURRENCY_KEYS } from '@/constants/cryptocurrency'

import { Component, Vue, Prop } from 'vue-property-decorator'
import currencyFormatter from 'currency-formatter'

import { extent } from 'd3-array'
import { scaleLinear } from 'd3-scale'

@Component({
  components: {
    CursorCrossHair,
    Graph,
    HorizontalAxis,
    HoverContainer,
    VerticalAxis
  }
})

export default class Chart extends Vue {
  @Prop({ required: true, type: Boolean }) color!: boolean
  @Prop({ required: true, type: Array }) data!: Array<PriceData>
  @Prop({ required: true, type: String }) currency!: string
  @Prop({ required: true, type: String }) durationType!: string
  @Prop({ type: Boolean, default: false }) disableCursor!: boolean
  @Prop({ type: Boolean, default: false }) hideRightVerticalAxis!: boolean
  @Prop({ type: Number, default: 7 }) horizontalAxisTickCount!: number

  @Prop({
    required: true,
    type: String,
    default: CRYPTOCURRENCY_DEFAULT,
    validator: function (v: string) {
      return CRYPTOCURRENCY_KEYS.indexOf(v) !== -1
    }
  }) selectedCryptoCurrency!: string

  GRAPH_PADDING_BOTTOM = 15 // spacing between lowest datum & border
  GRAPH_PADDING_TOP = 15 // spacing between highest datum & border

  dimensions = {
    height: 0,
    width: 0
  }

  hovered = false
  hoveredValue = {}
  hoverX = -1
  hoverY = -1

  // Show hover elements
  handleMouseEnter () {
    this.hovered = true
  }

  // Hide hover elements
  handleMouseLeave () {
    this.hovered = false
  }

  handleMouseMove (e: MouseEvent) {
    // Find closest data point to the x-coordinates of where the user's mouse is hovering
    const node = this.$refs.node as HTMLElement
    const hoverX = e.clientX - node.getBoundingClientRect().left
    const index = Math.round((hoverX / this.dimensions.width) * (this.data.length - 1))
    const hoveredDatapoint = this.data[index] || {}

    const hoveredValue = {
      price: hoveredDatapoint.price && currencyFormatter.format(hoveredDatapoint.price, { code: this.currency }),
      time: hoveredDatapoint.time && hoveredDatapoint.time.toLocaleString()
    }

    const [minPrice, maxPrice] = extent(this.data, d => d.price)

    const scalePriceToY = scaleLinear()
      .range([this.dimensions.height - this.GRAPH_PADDING_BOTTOM, this.GRAPH_PADDING_TOP])
      .domain([minPrice!, maxPrice!])

    const hoverY = scalePriceToY(hoveredDatapoint.price) || 0

    this.hovered = true
    this.hoveredValue = hoveredValue
    this.hoverX = hoverX
    this.hoverY = hoverY
  }

  handleResize () {
    const node = this.$refs.node as HTMLElement
    const { height, width } = node.getBoundingClientRect()
    this.dimensions.height = Math.round(height)
    this.dimensions.width = Math.round(width)
  }

  get showColor () {
    const cryptocurrency = CRYPTOCURRENCY_LIST.filter(e => e.key === this.selectedCryptoCurrency)[0]

    return {
      stroke: cryptocurrency.strokeColor,
      fill: cryptocurrency.fillColor
    }
  }

  mounted () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style type="text/css" scoped>
  .chart {
    display: flex;
    height: 225px;
    border-bottom: 1px solid #DAE1E9;
  }

  .hover-region {
    height: 100%;
    width: 100%;
    cursor: crosshair;
    position: relative;
  }
</style>
