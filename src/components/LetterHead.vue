<template>
  <div class="letterhead">
    <div class="logo">
        <router-link :to="{ name: 'landing', params: {} }" class="logo__wrapper">
          <h3 class="logo__brand">{{ title }}</h3>
        </router-link>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class LetterHead extends Vue {
  @Prop(String) readonly title!: string
}
</script>

<style scoped lang="css">
  .letterhead {
    height: 60px;
    position: relative;
    display: flex;
    justify-content: center;
  }

  .logo__wrapper {
    display: block;
    text-decoration: none;
    margin-top: 15px;
  }

  .logo__brand {
    font-size: 26px;
    color: #fff;
    margin: 10px 0;
  }
</style>
