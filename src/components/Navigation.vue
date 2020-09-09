<template>
  <div class="navigation">
    <div class="logo">
        <router-link :to="{ name: 'landing', params: {} }" class="logo__wrapper">
           <h3 class="logo__brand">toramari</h3>
        </router-link>
    </div>

    <div class="navigation__right">

      <v-popover offset="5">
        <button class="navigation__button" v-if="loggedIn">
          {{ username }}
        </button>

        <template class="dropdown" slot="popover">
          <!-- You can put other components too -->
          <header class="dropdown__header">
            <h4 class="dropdown__title">Account</h4>
          </header>

          <ul class="dropdown__list">
            <li class="dropdown__item" @click="handleLogout">Log Out</li>
          </ul>
        </template>
      </v-popover>

      <button class="navigation__button-link" v-if="loggedOut">
        <router-link :to="{ name: 'signin', params: {} }" class="button-link">Sign In</router-link>
      </button>

      <button class="navigation__button"  v-if="loggedOut">
        <router-link :to="{ name: 'signup', params: {} }" class="button-link">Sign up</router-link>
      </button>

    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TokenServices from '@/services/token'

@Component
export default class Navigation extends Vue {
  get loggedOut () {
    return !TokenServices.loggedIn()
  }

  get loggedIn () {
    return TokenServices.loggedIn()
  }

  get username () {
    return this.$store.state.auth.user.username
  }

  handleLogout () {
    TokenServices.remove()
    this.$router.push({ name: 'signin' })
  }
}
</script>

<style scoped lang="css">
  .navigation {
    height: 60px;
    position: relative;
    display: flex;
    justify-content: space-between;
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

  .navigation__right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .navigation__right div {
    margin: 0 10px;
  }

  .navigation__button-link {
    display: inline-block;
    margin-bottom: 0;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    padding: 6px 12px;
    font-size: 13px;
    line-height: 1.35135;
    border-radius: 2px;
    user-select: none;
    background-color: #121212;
  }

  .navigation__button-link a {
      color: #fff;
      text-decoration: none;
      font-size: 15px;
  }

  .navigation__button-link a:hover {
    text-decoration: underline solid #fff 13px;
  }

  .navigation__button {
    display: inline-block;
    margin-bottom: 0;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    padding: 6px 12px;
    font-size: 15px;
    line-height: 1.35135;
    border-radius: 2px;
    user-select: none;
    color: #fff;
    background-color: #36353A;
  }

  .navigation__button a {
    text-decoration: none;
    color: #fff;
  }

  @import "../assets/tooltip.css";

</style>
