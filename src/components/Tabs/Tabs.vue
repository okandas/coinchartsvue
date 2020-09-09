<template>
    <div class="flex tabs" role="tabpanel" :style="{}">
        <div @click="onClick(option.key)" role="tab" v-for="option in options" :key="option.key" class="flex tab" :class="[selected(option.key)? 'selected__tab' : '']" tabIndex="-1" :aria-labelledby="option.codename" :aria-selected="selected(option.key)" :style="{
            'color': selected(option.key) ? '#0667D0' : '#7D95B6'
        }">
           <div v-html="option.element"></div>
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Tabs extends Vue {
    @Prop({ required: true, type: Array }) options!: Array<{ [key: string]: string }>
    @Prop({ required: true, type: String }) selectedKey!: string
    @Prop({ required: true, type: Function }) onClick!: Function

    selected (key: string): boolean {
      return this.selectedKey === key
    }
}

</script>

<style scoped lang="css">

.tabs {
  font-size: 14px;
  font-weight: 400;
  align-items: center;
  cursor: pointer;
}

.tab {
  height: inherit;
  margin: 0 0.5em;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  transition: all 0.25s ease;
}

.tab:first-child {
  margin-left: 0;
}

.tab:last-child {
  margin-right: 0;
}

.tab:focus {
  outline: none;
}

.selected__tab::after {
  border-bottom: 1px solid #0667D0;
  bottom: -1px;
  content: '';
  height: 1px;
  left: 0;
  position: absolute;
  width: 100%;
}

.tab:hover::after {
  border-bottom: 1px solid #0667D0;
  bottom: -1px;
  content: '';
  height: 1px;
  left: 0;
  position: absolute;
  width: 100%;
}

</style>
