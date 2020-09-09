<template>
  <div class="marketChart">
    <section>
        <header class="marketChart-overview">
            <h4>Overview</h4>
            <ul class="marketChart-duration">
                <li class="duration">1Y</li>
                <li class="duration">6M</li>
                <li class="duration">1M</li>
                <li class="duration">24H</li>
            </ul>
        </header>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class MarketChart extends Vue {}
</script>

<style scoped lang="css">

.duration {
  cursor: pointer;
  text-decoration: none;
  background-color: #cbd5d3;
  color: #587e77;
  display: inline-flex;
  font-size: 13px;
  line-height: 12px;
  padding: 5px 10px;
  margin-bottom: 5px;
}

.duration:not(:last-child) {
  margin-right: 4px;
}

.marketChart-overview {
 padding: 30px 20px;
}

/* desktop only */
@media (min-width: 1025px) {
  .marketChart-overview {
     width: 827px;
  }

  .marketChart-overview, .marketChart-duration  {
     display: flex;
  }

  .marketChart-overview {
     justify-content: space-between;
  }
}
</style>
