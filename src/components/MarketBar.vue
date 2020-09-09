<template>
  <div class="marketbar">
      <section class="market-tickers">
          <ul class="tickers">
              <li class="ticker" v-for="(ticker, key) in tickers" :key="key">
                  <div class="avatar-container">
                      <div class="avatar">
                          {{ ticker.ticker }}
                      </div>
                  </div>
                  <div class="ticker-details">
                        <h5>{{ ticker.name }}</h5>
                        <p>{{ ticker.sector }}</p>
                  </div>
              </li>
          </ul>
      </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { TickerInfo } from '@/store/models'

@Component
export default class MarketBar extends Vue {
    @Prop(Object) readonly tickers!: Record<string, TickerInfo>
}
</script>

<style lang="css" scoped>
.tickers {
    padding: 20px;
}

.ticker {
    margin: 10px 0;
    display: flex;
}
.avatar-container {
  display: inline-block;
  margin-right: 16px;
}

.avatar {
  font-size: 14px;
  line-height: 46px;
  width: 50px;
  height: 47px;
  text-align: center;
  text-transform: uppercase;
  border: 1px solid #f5f5f5;
  border-radius: 50%;
  color: #fff;
}

/* desktop only */
@media (min-width: 1025px) {
  .marketbar {
    border-left: 1px solid #eeee;
  }
}

</style>
