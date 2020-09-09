<template>
  <svg data-testid="CursorCrossHair" :style="{ opacity: visible ? 1 : 0 }">
      <circle :cx="x" :cy="y" :r="5"/>
      <line :x1="x" :x2="x" :y1="0" :y2="height" />
  </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class CursorCrossHair extends Vue {
    @Prop({ required: true, type: Number }) x!: number
    @Prop({ required: true, type: Number }) y!: number
    @Prop({ required: true, type: Number }) height!: number
    @Prop({ required: true, type: Boolean }) visible!: boolean
}
</script>

<style scoped lang="css">
  svg {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    transition: opacity 0.25s ease;
  }

  circle {
    fill: #FFF;
    stroke: #7D95B6;
    stroke-width: 2;
  }

  line {
    stroke: #7D95B6;
    stroke-width: 1;
  }
</style>
