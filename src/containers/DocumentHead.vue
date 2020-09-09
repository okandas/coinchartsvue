<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class DocumentHead extends Vue {
  @Prop({ required: true, type: String }) selectedCryptocurrency!: string
  @Prop({ required: true, type: String }) selectedCurrency!: string
  @Prop({ required: true, type: Number }) spotPrice!: number
}
</script>

<style scoped lang="css">

</style>
