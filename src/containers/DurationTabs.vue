<template>
  <Tabs :options="durationList" :onClick="handleDurationChange" :selectedKey="selectedDuration" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { DURATION_LIST, DURATION_KEYS, DURATION_DEFAULT } from '@/constants/duration'
import { DurationInfo } from '@/store/models'

import Tabs from '@/components/Tabs/Tabs.vue'

@Component({
  components: {
    Tabs
  }
})

export default class DurationTabs extends Vue {
  @Prop({
    required: true,
    type: String,
    default: DURATION_DEFAULT,
    validator: function (v: string) {
      return DURATION_KEYS.indexOf(v) !== -1
    }
  }) selectedDuration!: string

  @Prop({ required: true, type: Function }) handleDurationChange!: Function

  get durationList () {
    const list = DURATION_LIST.map((currentValue: DurationInfo) => {
      const obj = {
        key: currentValue.key,
        codename: currentValue.codename,
        element: `<span>${currentValue.codename}</span>`
      }
      return obj
    })

    return list
  }
}
</script>

<style scoped lang="css">

</style>
