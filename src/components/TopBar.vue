<template>
  <div class="topbar">
    <section class="top-bar">
        <div class="last-price">
          <h4>3.293403341</h4>
          <p>last price</p>
        </div>
        <div class="last-price">
          <h4>+5.48%</h4>
          <p>24H change</p>
        </div>
        <div class="last-price">
          <h4>0.2343255</h4>
          <p>24H low</p>
        </div>
        <div class="last-price">
          <h4>0.43432094</h4>
          <p>24H High</p>
        </div>
        <div class="last-price">
          <h4>5.432</h4>
          <p>24H Volume</p>
        </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class TopBar extends Vue {
}
</script>

<style scoped lang="css">

.topbar {
    border-bottom: 1px solid #eeee;
    margin-top: 50px;
}

.top-bar {
    border-right: 1px solid #eeee;
}
/* desktop only */
@media (min-width: 1025px) {
    .top-bar {
        display: flex;
        justify-content: space-between;
        width: 828px;
        padding: 0 20px;
        text-align: right;
    }
}
</style>
