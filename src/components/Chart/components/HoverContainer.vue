<template>
  <div class="hover-container flex" data-testid="HoverContainer" :style="handleHover">
    <div class="hover-label" :style="{
            background: position === 'top' ? '#fff' : '#DAE1E9',
            border: position === 'top' ? '1px solid #DAE1E9' : 'none',
            color: position === 'top' ? '#DAE1E9' : '#fff' }">
          {{ label }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class HoverContainer extends Vue {
    @Prop({ type: String, default: '' }) label!: string
    @Prop({
      required: true,
      type: String,
      validator: function (v: string) {
        return ['top', 'bottom'].indexOf(v) !== -1
      }
    }) position!: string

    @Prop({ required: true, type: Boolean }) visible!: boolean
    @Prop({ required: true, type: Number }) x!: number
    @Prop({ required: true, type: String }) align!: string
    @Prop({ required: true, type: String }) justify!: string

    HOVER_CONTAINER_WIDTH = 180
    VERTICAL_OFFSET = -12

    get moveLeft () {
      return this.x - (this.HOVER_CONTAINER_WIDTH / 2)
    }

    get handleHover () {
      return {
        opacity: this.visible ? 1 : 0,
        'align-items': this.align === 'start' ? 'flex-start' : 'flex-end',
        'justify-content': this.justify.length > 0 ? this.justify : '',
        top: this.position === 'bottom' ? -12 + 'px' : 204 + 'px',
        bottom: this.position === 'top' ? 0 : 0,
        left: this.moveLeft + 'px'
      }
    }
}
</script>

<style scoped lang="css">
  .hover-container {
    position: absolute;
    width: 200px;
    transition: opacity 0.25s ease;
    z-index: 10;
    height: 30px;
  }

  .hover-label {
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    padding: 1px 6px;
  }

  @import "../../../assets/chart.css";

</style>
