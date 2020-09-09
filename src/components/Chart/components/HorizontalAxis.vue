<template>
    <div class="flex" data-testid="HorizontalAxis" :style="{
            'margin': hideRightMargin ? '10px 0 0 20px' : '10px 20px 0 20px',
            'justify-content': justify.length > 0 ? justify : '',
    }">
        <div class="tick" v-for="timeTick in formattedTimeTicks" :key="timeTick.timestamp">
          {{timeTick.label}}
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

import { DURATION, DURATION_KEYS } from '@/constants/duration'

import { PriceData, TimeTick } from '@/store/models'

import { extent } from 'd3-array'
import { timeFormat } from 'd3-time-format'

@Component
export default class HorizontalAxis extends Vue {
    
    @Prop({ required: true, type: Array }) data!: Array<PriceData>
    @Prop({
      required: true,
      type: String,
      validator: function (v: string) {
        return DURATION_KEYS.indexOf(v) !== -1
      }
    }) duration!: string

    @Prop({ required: true, type: Number }) tickCount!: number
    @Prop({ required: true, type: Boolean }) hideRightMargin!: boolean
    @Prop({ required: true, type: String }) justify!: string

    formattedTimeTicks: Array<TimeTick> = []

    @Watch('data')
    onDataChanged (value: Array<PriceData>) {
      const durationTicks = this.generateTicks(value, this.tickCount)

      this.formattedTimeTicks = durationTicks.map(timestamp => {
        return {
          timestamp: timestamp,
          label: this.formatTime(timestamp, this.duration)
        }
      })
    }

    formatTime (timestamp: number, duration: string) {
      switch (duration) {
        case DURATION.ALL.key:
          return timeFormat('%b %Y')(new Date(timestamp)) // 'Mmm YYYY'
        case DURATION.YEAR.key:
        case DURATION.MONTH.key:
        case DURATION.WEEK.key:
          return timeFormat('%b %_d')(new Date(timestamp)) // 'Mmm D'
        case DURATION.DAY.key:
        case DURATION.HOUR.key:
        default:
          return timeFormat('%I:%M %p')(new Date(timestamp)) // 'HH:MM PM/AM'
      }
    }

    generateTicks (data: Array<PriceData>, tickCount: number) {
      if (data.length < 2 || tickCount < 2) {
        return []
      }

      const [minTime, maxTime] = extent(data, d => d.time)

      const rangeStep = (new Date(maxTime!).valueOf() - new Date(minTime!).valueOf()) / (tickCount - 1)

      const generatedTicks = []

      for (let i = 0; i < tickCount; i++) {
        const time = new Date(minTime!).valueOf()
        generatedTicks.push(time + i * rangeStep)
      }

      return generatedTicks
    }
}
</script>

<style scoped lang="css">
  .tick {
    color: #7D95B6;
    font-size: 14px;
    font-weight: 500;
  }
</style>
