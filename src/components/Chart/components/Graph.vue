<template>
    <svg class="Graph">
        <g ref="svgRef">
        </g>
    </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

import { PriceData, Color } from '@/store/models'

import { area as d3Area, line as d3Line } from 'd3-shape'
import { extent } from 'd3-array'
import { easeCubicOut } from 'd3-ease'
import { interpolatePath } from 'd3-interpolate-path'
import { scaleLinear, scaleTime } from 'd3-scale'
import { select } from 'd3-selection'
import 'd3-transition'

@Component
export default class Graph extends Vue {
    @Prop({ required: true, type: Array }) data!: Array<PriceData>
    @Prop({ required: true, type: Number }) height!: number
    @Prop({ required: true, type: Number }) width!: number
    @Prop({ required: true, type: Object }) color!: Color

    GRAPH_PADDING_BOTTOM = 15 // spacing between lowest datum & border
    GRAPH_PADDING_TOP = 15 // spacing between highest datum & border

    TRANSITION_DURATION = 500
    TRANSITION_EASE = easeCubicOut

    svgNode!: string

    newColor!: string
    previousColor!: Color
    previousScaledData: [number, number][] = []
    scaledData: [number, number][] = []
    skipTransition = false

    scaleData (data: Array<PriceData>, height: number, width: number): [number, number][] {
      const [minPrice, maxPrice] = extent(data, d => d.price)

      const scalePriceToY = scaleLinear()
        .range([height - this.GRAPH_PADDING_BOTTOM, this.GRAPH_PADDING_TOP])
        .domain([minPrice!, maxPrice!])

      const [minTime, maxTime] = extent(data, d => d.time)

      const scaleTimeToX = scaleTime()
        .range([0, width])
        .domain([minTime!, maxTime!])

      return data.map(({ price, time }) => (
        [scalePriceToY(price), scaleTimeToX(time)]
      ))
    }

    @Watch('data')
    onDataChanged (value: Array<PriceData>) {
      if (value.length > 0) {
        this.previousScaledData = this.scaledData
        this.scaledData = this.scaleData(value, this.height, this.width)
        this.updatedGraph(this.previousScaledData, this.scaledData)
      }
    }

    updatedGraph (previousScale: [number, number][], scale: [number, number][]) {
      const node = this.$refs.svgRef as HTMLElement
      this.previousColor = this.color
      const graph = select(node)
      const transitionDuration = this.skipTransition ? 0 : this.TRANSITION_DURATION

      // d[0] = price
      // d[1] = time

      const area = d3Area()
        .x((d: [number, number]) => d[1])
        .y0(this.height)
        .y1((d: [number, number]) => d[0])

      const line = d3Line()
        .x((d: [number, number]) => d[1])
        .y((d: [number, number]) => d[0])

      const previousAreaGraph = area(previousScale)
      const previousLineGraph = line(previousScale)
      const areaGraph = area(scale)
      const lineGraph = line(scale)

      graph.selectAll('path').remove()

      graph
        .append('path')
        .attr('class', 'area')
        .attr('d', previousAreaGraph!)
        .style('fill', this.previousColor.fill)
        .transition()
        .duration(transitionDuration)
        .ease(this.TRANSITION_EASE)
        .attrTween('d', () => {
          const interpolated = interpolatePath.bind(null, previousAreaGraph!, areaGraph!)
          return interpolated()
        })
        .style('fill', this.color.fill)

      graph
        .append('path')
        .attr('class', 'line')
        .attr('d', previousLineGraph!)
        .style('stroke', this.previousColor.stroke)
        .transition()
        .duration(transitionDuration)
        .ease(this.TRANSITION_EASE)
        .attrTween('d', () => {
          const interpolated = interpolatePath.bind(null, previousLineGraph!, lineGraph!)
          return interpolated()
        })
        .style('stroke', this.color.stroke)
        .style('fill', 'none')
    }

    beforeMount () {
      this.updatedGraph(this.previousScaledData, this.scaledData)
    }
}
</script>

<style scoped lang="css">
svg {
  height: 100%;
  width: 100%;
}

.area {
  pointer-events: none;
  stroke: none;
}

.line {
  fill: none;
  pointer-events: none;
  stroke-width: 2;
}
</style>
