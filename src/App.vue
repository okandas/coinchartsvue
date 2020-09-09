<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

export default class App extends Vue {
  metaInfo = {
    titleTemplate: '%s | toramari'
  }
}
</script>

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import "assets/normalize.css";
@import "assets/layout.css";
@import "assets/snackbar.css";

#app {
  font-family: 'Poppins','Open Sans', Helvetica, Arial, sans-serif;
}

html, body {
  background: #050507;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  height: 100%;
}

svg:not(:root) {
  overflow: hidden;
}

#app {
  margin: 0 50px;
}

.flex {
  display: flex;
}

*,:after,:before {
  box-sizing: border-box
}

:focus {
  outline: 0
}

body,html {
  margin: 0;
  padding: 0;
  height: 100%;
}

h1,h2,h3,h4,p,ul {
  margin: 0;
  padding: 0;
}

@media (min-width: 241px) {
  html,body {
    font:400 14px / 1.5 Segoe UI,system-ui,-apple-system,sans-serif
  }
}

@media (min-width: 321px) {
  html,body {
    font:400 16px / 1.5 Segoe UI,system-ui,-apple-system,sans-serif
  }
}

h1,h2,h3,h4,h5,h6 {
    font: 400 18px / 1.33333;
    margin: 0;
    overflow: visible
}

li {
  list-style: none;
}

h1 {
    font: 500 38px / 1.31579 'Poppins';
    letter-spacing: -.5px;
    margin-top: 0px;
    margin-bottom: 9px
}

@media (min-width: 241px) {
    h1 {
        font: 900 49px / 1.32653 'Poppins';
        letter-spacing: -.5px;
    }
}

@media (min-width: 321px) {
    h1 {
        font: 900 56px / 1.32143  'Poppins';
        letter-spacing: 2px;
    }
}

h2 {
    font: 400 18px / 1.33333  'Poppins';
}

@media (min-width: 241px) {
    h2 {
        font:400 21px / 1.33333  'Poppins';
    }
}

@media (min-width: 321px) {
    h2 {
        font:400 24px / 1.33333  'Poppins';
    }
}

h3 {
    font: 500 13.5px / 1.48148  'Poppins';
}

@media (min-width: 241px) {
    h3 {
        font:500 16px / 1.375  'Poppins';
    }
}

@media (min-width: 321px) {
    h3 {
        font:500 20px / 1.2  'Poppins';
    }
}

h4 {
    font: 500 13.5px / 1.48148 "Google Sans",sans-serif;
}

@media (min-width: 241px) {
    h4 {
        font:500 16px / .9375 "Google Sans",sans-serif;
    }
}

@media (min-width: 321px) {
    h4 {
        font:500 19px / 1.05263 "Google Sans",sans-serif;
    }
}

p {
    font: 400 13.5px / 1.55556 Segoe UI,system-ui,-apple-system,sans-serif;

}

@media (min-width: 241px) {
    p {
        font:400 15px / 1.86667 Segoe UI,system-ui,-apple-system,sans-serif;
    }
}

@media (min-width: 321px) {
    p {
        font:400 18px / 1.77778 Segoe UI,system-ui,-apple-system,sans-serif;
    }
}
</style>
